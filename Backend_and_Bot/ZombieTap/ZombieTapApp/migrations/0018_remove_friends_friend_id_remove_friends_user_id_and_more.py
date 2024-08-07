# Generated by Django 5.0.6 on 2024-07-27 12:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0017_users_user_photo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='friends',
            name='friend_id',
        ),
        migrations.RemoveField(
            model_name='friends',
            name='user_id',
        ),
        migrations.AddField(
            model_name='friends',
            name='friend',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='friend_of', to='ZombieTapApp.users'),
        ),
        migrations.AddField(
            model_name='friends',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='friends', to='ZombieTapApp.users'),
        ),
    ]
