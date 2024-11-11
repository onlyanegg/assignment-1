"""
Django models for the casestudy service.

We have added the initial Security model for you with common fields for a
stock market security. Add any additional fields you need to this model to
complete the case study.

Once you have added a new field to the Security model or created any new
models you can run 'make migrations' to create the new Django migration files
and apply them to the database.

https://docs.djangoproject.com/en/4.2/topics/db/models/
"""

from django.db import models
from django.contrib.auth.models import User

class BaseModel(models.Model):
    objects = models.Manager()

    class Meta:
        abstract = True

# TODO: Add unique key on ticker
class Security(BaseModel):
    """
    Represents a Stock or ETF trading in the US stock market, i.e. Apple,
    Google, SPDR S&P 500 ETF Trust, etc.
    """

    # The security’s name (e.g. Netflix Inc)
    name = models.TextField(null=False, blank=False)

    # The security’s ticker (e.g. NFLX)
    ticker = models.TextField(null=False, blank=False, unique=True)

    # This field is used to store the last price of a security
    last_price = models.DecimalField(
        null=True, blank=True, decimal_places=2, max_digits=11,
    )

    # TODO: Add additional fields here.
    # ex: description, exchange name, etc.


# TODO: Add unique constraint on ticker and user
class Subscription(BaseModel):
    security = models.ForeignKey(Security, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(name="unique_security_id_user_id", fields=['security_id', 'user_id'])
        ]
