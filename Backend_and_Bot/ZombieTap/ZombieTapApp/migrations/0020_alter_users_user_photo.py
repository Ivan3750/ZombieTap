# Generated by Django 5.0.6 on 2024-07-27 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0019_alter_users_user_photo_alter_friends_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='user_photo',
            field=models.URLField(default='https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp', max_length=1000),
        ),
    ]