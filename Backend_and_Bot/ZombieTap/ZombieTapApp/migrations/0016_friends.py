# Generated by Django 5.0.6 on 2024-07-27 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0015_rename_user_users'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friends',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.BigIntegerField(max_length=20)),
                ('friend_id', models.BigIntegerField(max_length=20)),
            ],
        ),
    ]
