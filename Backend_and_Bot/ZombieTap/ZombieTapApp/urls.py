from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import TaskList, ViewsFunction

views_var = ViewsFunction()

urlpatterns = [
    path('user-id/', views_var.print_user_id, name='user-id'),
    path('', views_var.index, name='index'),
    path('friends/', views_var.friends, name="friends"),
    path('boost/', views_var.boost, name="boost"),
    path('task/', views_var.task, name="task"),
    path('skins/', views_var.skins, name="skins"),
    path('task-list/', TaskList.as_view(), name='task-list'),
    path('game/', views_var.game, name="game"),
    path('add-money/', views_var.add_money, name="add_money")
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
