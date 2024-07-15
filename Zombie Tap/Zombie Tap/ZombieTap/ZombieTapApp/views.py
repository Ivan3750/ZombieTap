from django.shortcuts import render
from django.http import HttpResponse


def index(request):
        return render(request, 'pages/index.html')

def friends(request):
        return render(request, 'pages/friends.html')

def boost(request):
        return render(request, 'pages/boost.html')

def task(request):
        return render(request, 'pages/task.html')

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