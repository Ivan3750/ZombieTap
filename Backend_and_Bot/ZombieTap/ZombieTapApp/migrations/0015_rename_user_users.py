# Generated by Django 5.0.6 on 2024-07-27 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0014_rename_customuser_user'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Users',
        ),
    ]
