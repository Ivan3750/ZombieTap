from django.db import models


# Create your models here.
class Task(models.Model):
    task = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    image_url = models.URLField(default='https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp')

    def __str__(self):
        return self.task
    

from django.db import models
from decimal import Decimal  # Імпорт Decimal

class Users(models.Model):
    user_id = models.BigIntegerField(unique=True, primary_key=True)
    user_nickname = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)
    user_photo_url = models.URLField(max_length=100, null=True)
    money = models.DecimalField(max_digits=10, decimal_places=0, default=Decimal(0))
    last_game = models.DateTimeField(null=True, default=None)
    hurt_limit_lvl = models.DecimalField(max_digits=5, decimal_places=0, default=Decimal(1))
    regeneration_lvl = models.DecimalField(max_digits=5, decimal_places=0, default=Decimal(1))
    multitap_lvl = models.DecimalField(max_digits=5, decimal_places=0, default=Decimal(1))

    def __str__(self):
        return self.user_name


    def __str__(self):
        return self.user_name
    
class Friends(models.Model):
    user = models.ForeignKey(Users, related_name='friends', on_delete=models.CASCADE, null=True)
    friend = models.ForeignKey(Users, related_name='friend_of', on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('user', 'friend')
