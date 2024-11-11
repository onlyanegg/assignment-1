import os 
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "casestudy.settings")
django.setup()

import requests
from celery import Celery
from casestudy.models import Security, Subscription
from django.conf import settings

app = Celery('tasks', broker='redis://redis')

@app.task(name="update_tickers")
def update_tickers():
    tickers = requests.get(
        url="https://app.albert.com/casestudy/stock/tickers/",
        headers={
            "Albert-Case-Study-API-key": "d2db5753-33f6-4e25-b915-6cbdda7953e7"
        }
    )
    securities = [Security(name=name, ticker=ticker) for ticker, name in tickers.json().items()]
    Security.objects.bulk_create(securities, ignore_conflicts=True)

@app.task(name="update_prices")
def update_prices():
    # TODO: create index on security?
    subscriptions = Subscription.objects.prefetch_related("security").distinct('security')
    tickers = ",".join(s.security.ticker for s in subscriptions)
    prices = requests.get(
        url="https://app.albert.com/casestudy/stock/prices/",
        params={
            "tickers": tickers
        },
        headers={
            "Albert-Case-Study-API-key": "d2db5753-33f6-4e25-b915-6cbdda7953e7"
        }
    )

    print(prices.json())

    # TODO: bulk update
    # TODO: create index on ticker
    for ticker, price in prices.json().items():
        security = Security.objects.get(ticker=ticker)
        security.last_price = price
        security.save()

app.conf.beat_schedule = {
    "update_tickers": {
        "task": "update_tickers",
        "schedule": 300.0
    },
    "update_prices": {
        "task": "update_prices",
        "schedule": 5.0
    }
}
