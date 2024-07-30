# Generated by Django 5.0.6 on 2024-07-28 09:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0027_delete_friends'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friends',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('friend', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='friend_of', to='ZombieTapApp.users')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='friends', to='ZombieTapApp.users')),
            ],
            options={
                'unique_together': {('user', 'friend')},
            },
        ),
    ]