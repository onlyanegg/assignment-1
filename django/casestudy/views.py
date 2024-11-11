"""
For more information on setting up DRF views see docs:
https://www.django-rest-framework.org/api-guide/views/#class-based-views
"""
from re import I, sub
import requests

from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from casestudy.models import Subscription, Security
from casestudy.serializers import SecuritySerializer, SubscriptionSerializer


class LoginView(APIView):
    """
    Login view for the API.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        """
        Login view for the API.
        """
        username = request.data['username']
        user = User.objects.get(username=username)
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "user": user_data,
            "token": token.key
        })

class SecuritiesView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        securities = Security.objects.all()

        return Response(SecuritySerializer(securities, many=True).data)

class SubscriptionsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        subscriptions = Subscription.objects.filter(user__id=request.user.id).prefetch_related("security")

        return Response(SubscriptionSerializer(subscriptions, many=True).data)

    def post(self, request, format=None):
        ticker = request.data['ticker']

        user = User.objects.get(id=request.user.id)
        security = Security.objects.get(ticker=ticker)

        try:
            subscription = Subscription()
            subscription.user = user
            subscription.security = security
            subscription.save()
        except IntegrityError:
            return Response(status=204)
        except Exception as e:
            return Response(status=500)

        return Response(SubscriptionSerializer(subscription).data)

class SubscriptionView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, format=None, ticker=None):
        if ticker == None:
            return Response(status='400')

        security = Security.objects.get(ticker=ticker)
        subscription = Subscription.objects.get(security=security, user=request.user.id)
        subscription.delete()

        return Response(status='204')

class DebugView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        tickers = requests.get("https://app.albert.com/casestudy/stock/tickers/", headers={"Albert-Case-Study-API-key": "d2db5753-33f6-4e25-b915-6cbdda7953e7"})
        securities = [Security(name=name, ticker=ticker) for ticker, name in tickers.json().items()]
        Security.objects.bulk_create(securities, ignore_conflicts=True)

        return Response()
