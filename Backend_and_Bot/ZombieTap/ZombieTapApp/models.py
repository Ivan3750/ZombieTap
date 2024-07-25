from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Task(models.Model):
    task = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(default='https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp')

    def __str__(self):
        return self.task
    
class CustomUser(models.Model):
    User_id = models.BigIntegerField(unique=True, primary_key=True)
    user_nickname = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)
    money = models.DecimalField(max_digits=10, decimal_places=0, default=0)
    friends = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='user_friends')

    def __str__(self):
        return self.user_name