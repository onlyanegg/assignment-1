# Generated by Django 4.2 on 2024-11-11 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('casestudy', '0002_subscription'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subscription',
            old_name='ticker',
            new_name='security',
        ),
        migrations.AlterField(
            model_name='security',
            name='ticker',
            field=models.TextField(unique=True),
        ),
        migrations.AddConstraint(
            model_name='subscription',
            constraint=models.UniqueConstraint(fields=('security_id', 'user_id'), name='unique_security_id_user_id'),
        ),
    ]
