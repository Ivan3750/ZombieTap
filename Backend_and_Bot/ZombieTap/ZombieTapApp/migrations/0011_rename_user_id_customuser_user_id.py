# Generated by Django 5.0.6 on 2024-07-20 10:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0010_alter_customuser_options_alter_customuser_managers_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='user_id',
            new_name='User_id',
        ),
    ]