from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer


class TaskList(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


def index(request):
    return render(request, 'pages/index.html', {"zb_coin" : 1, "num": range(1, 11)})

def friends(request):
    return render(request, 'pages/friends.html')

def boost(request):
    return render(request, 'pages/boost.html', {"zb_coin" : 2})

def task(request):
    tasks = Task.objects.all()
    context = {
        "zb_coin": 2,
        "tasks": tasks
    }
    return render(request, 'pages/task.html', context)

def game(request):
    return render(request, 'pages/game.html')


def skins(request):
    return HttpResponse("Page Not Created")


# @csrf_exempt
# def register(request):
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         password = request.POST.get('password')
        
#         print(email, password)

#         cursor.execute("SELECT * FROM users WHERE id = %s", (1,))
#         record = cursor.fetchone()
    
#         if record is None:
#                 cursor.execute("INSERT INTO users (id) VALUES (1)")
#                 conn.commit()


#         cursor.execute("UPDATE users SET email = %s WHERE id = 1", (email,))
#         conn.commit()
#         cursor.execute("UPDATE users SET password = %s WHERE id = 1", (password,))
#         conn.commit()
        
#         # Для прикладу, будемо просто повертати повідомлення про успішну реєстрацію
#         return JsonResponse({'status': 'success', 'message': 'Реєстрація пройшла успішно!'})
    
#     return JsonResponse({'status': 'failed', 'message': 'Реєстрація не вдалася.'})