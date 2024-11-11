from rest_framework import serializers
from casestudy.models import Security, Subscription

class SecuritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Security
        fields = "__all__"

class SubscriptionSerializer(serializers.ModelSerializer):
    security = SecuritySerializer()

    class Meta:
        model = Subscription
        fields = "__all__"
