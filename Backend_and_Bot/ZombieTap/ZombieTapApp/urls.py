from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import TaskList


urlpatterns = [
    path('', views.index, name='index'),
    path('friends/', views.friends, name="friends"),
    path('boost/', views.boost, name="boost"),
    path('task/', views.task, name="task"),
    path('skins/', views.skins, name="skins"),
    path('task-api-view/', TaskList.as_view(), name='task-api-view'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)