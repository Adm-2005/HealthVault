from django.shortcuts import render

def home(request):
    return render(request, 'pages/index.html', context={})

def about(request):
    return render(request, 'pages/about.html', context={})

def login(request):
    return render(request, 'authentication/login.html', context={})

def register(request):
    return render(request, 'authentication/register.html', context={})

