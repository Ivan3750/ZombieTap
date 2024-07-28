from django.contrib import admin
from .models import Task, Users, Friends

admin.site.register(Task)

admin.site.register(Users)

admin.site.register(Friends)