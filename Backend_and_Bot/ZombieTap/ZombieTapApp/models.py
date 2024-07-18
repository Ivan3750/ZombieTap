from django.db import models

# Create your models here.
class Task(models.Model):
    task = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=1000, decimal_places=0)

    def __str__(self):
        return self.task
    

