from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task, CustomUser
from .serializers import TaskSerializer
import json
from django.views.decorators.csrf import csrf_exempt
from django.db import connection

user_id = 0

class TaskList(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
# class UsersList(APIView):
#     def get(self, request):
#         friends = Users.objects.all()
#         serializer = UsersSerializer(friends, many=True)
#         return Response(serializer.data)


class ViewsFunction():
    def __init__(self) -> None:
        self.user_id = 0


    def friends(self, request):
        #friends = Users.objects.all()
        context = {
            "zb_coin": 2,
            "friends": "hh"
        }
        return render(request, 'pages/friends.html', context)


    def boost(self, request):
        try:
            user_id = request.session.get('user_id')
            user = CustomUser.objects.get(User_id=user_id)
            return render(request, 'pages/boost.html', {"zb_coin" : user.money})
        except CustomUser.DoesNotExist:
            return render(request, 'pages/boost.html', {'error': 'User not found'})
        

    def task(self, request):
        tasks = Task.objects.all()
        user_id = request.session.get('user_id')
        user = CustomUser.objects.get(User_id=user_id)
        context = {
            "zb_coin": user.money,
            "tasks": tasks
        }
        return render(request, 'pages/task.html', context)


    def game(self, request):
        return render(request, 'pages/game.html')


    def skins(self, request):
        return render(request, 'pages/notSupport.html')


    @csrf_exempt
    def print_user_id(self, request):
        if request.method == 'POST':
            try:
                data = json.loads(request.body)
                user_id = data.get('user_id')
                user_name = data.get('user_full_name')
                user_nickname = data.get('user_nickname')

                print(f'User ID: {user_id}\nUser Full Name: {user_name}\nUser NickName: {user_nickname}')  

                try:
                    user = CustomUser.objects.get(User_id=user_id)
                    user.user_nickname = user_nickname
                    user.user_name = user_name
                    user.save()
                except CustomUser.DoesNotExist:
                    user = CustomUser(User_id=user_id, user_nickname=user_nickname, user_name=user_name, money=0)
                    user.save()

                # Збереження user_id в сесії
                request.session['user_id'] = user_id

                return JsonResponse({'status': 'success', 'user_id': user_id})
            except json.JSONDecodeError:
                return JsonResponse({'status': 'fail', 'error': 'Invalid JSON'}, status=400)
        return JsonResponse({'status': 'fail'}, status=400)

    def index(self, request):
        user_id = request.session.get('user_id')
        if user_id:
            try:
                user = CustomUser.objects.get(User_id=user_id)
                return render(request, 'pages/index.html', {'zb_coin': user.money})
            except CustomUser.DoesNotExist:
                return render(request, 'pages/index.html', {'error': 'User not found'})
        else:
            return render(request, 'pages/index.html', {'error': 'User ID not found in session'})

    

