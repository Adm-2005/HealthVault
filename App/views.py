from django.contrib import messages
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

def home(request):
    return render(request, 'pages/index.html', context={})

def about(request):
    return render(request, 'pages/about.html', context={})

def register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        firstname = request.POST.get('first_name')
        lastname = request.POST.get('last_name')
        email = request.POST.get('email')
        password = request.POST.get('password1')
        confirm_password = request.POST.get('password2')
        User.objects.create(username=username,
                            first_name=firstname,
                            last_name=lastname,
                            email=email,
                            password=password)
        user = authenticate(username=username, password=password)
        user = authenticate(username=username, password=password)
        login(request, user)
        messages.success(request, ("Signed Up successfully."))
        return redirect('/')

    else:
        return render(request, 'authentication/register.html')


def login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password1')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # messages.success(request, ("Successfully Signed In."))
            return redirect('/')
        else:
            messages.error(request, ("Sign In unsuccessful. Try Again."))
            return redirect('/login')

    else:
        return render(request, 'authentication/login.html', {})


def logout(request):
    logout(request)
    return redirect('index')

