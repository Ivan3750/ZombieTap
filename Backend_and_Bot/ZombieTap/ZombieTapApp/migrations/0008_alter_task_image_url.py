# Generated by Django 5.0.6 on 2024-07-18 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ZombieTapApp', '0007_alter_task_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='image_url',
            field=models.URLField(default='https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp', max_length=10000000),
        ),
    ]