from django.db import models

# Create your models here.
class Task(models.Model):
    task = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=1000, decimal_places=0)
    image_url = models.URLField(max_length=10000000, default='https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp')

    def __str__(self):
        return self.task
    

