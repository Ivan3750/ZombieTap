# Generated by Django 5.0.6 on 2024-07-27 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0021_alter_users_user_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='user_photo',
            field=models.CharField(default=None, max_length=1000, null=True),
        ),
    ]
