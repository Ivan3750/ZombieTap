# Generated by Django 5.0.6 on 2024-07-21 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0011_rename_user_id_customuser_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='user_nickname',
            field=models.CharField(max_length=50),
        ),
    ]