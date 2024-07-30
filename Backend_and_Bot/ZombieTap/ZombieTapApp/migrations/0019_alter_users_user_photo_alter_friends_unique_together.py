# Generated by Django 5.0.6 on 2024-07-27 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0018_remove_friends_friend_id_remove_friends_user_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='user_photo',
            field=models.URLField(default='https://www.photo.com', max_length=1000),
        ),
        migrations.AlterUniqueTogether(
            name='friends',
            unique_together={('user', 'friend')},
        ),
    ]