import qrcode
from PIL import Image
from django.contrib import messages
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from .models import UserProfile, HealthRecords
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout


def home(request):
    return render(request, 'pages/index.html', context={})

def about(request):
    return render(request, 'pages/about.html', context={})

def register_user(request):
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
        user = authenticate(request, username=username, password=password)
        login(request, user)

        return redirect('dashboard_authenticated')

    else:
        return render(request, 'authentication/register.html')


def login_user(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
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


def logout_user(request):
    logout(request)
    return redirect('home')

@login_required
def dashboard_authenticated(request):
    user_profile = get_object_or_404(UserProfile, user=request.user)
    records = HealthRecords.objects.filter(patient=request.user)
    return render(request, 'pages/dashboard.html', context={'user_profile':user_profile, 'records':records})

@login_required
def dashboard(request, unique_url_identifier):
    user_profile = get_object_or_404(UserProfile, unique_url_identifier=unique_url_identifier)
    records = HealthRecords.objects.filter(patient=user_profile.user)
    return render(request, 'pages/dashboard.html', context={'user_profile':user_profile, 'records':records})

def recordForm(request):
    if request.method=="POST":
        record_name = request.POST.get('record_name')
        record_doctor = request.POST.get('record_doctor')
        record_date = request.POST.get('record_date')
        record_file = request.FILES['record_file']
        HealthRecords.objects.create(name=record_name, 
                                     doctor=record_doctor, 
                                     date=record_date, 
                                     doc=record_file)
        return redirect('/dashboard')
    else:
        return render(request, 'pages/record_form.html', context={})

