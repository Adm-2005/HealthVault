import qrcode
from PIL import Image
from .models import UserProfile
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

        user_profile = UserProfile.objects.get(user=user)
        
        #qr code generation logic
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )

        qr.add_data()
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")

        user_profile.qr_code.save(f'{user.username}_qr.png', Image.fromarray(img.pixel_array))

        qr_code_url = request.build_absolute_url(user_profile.qr_code.url)
        user_profile.qr_code_url = qr_code_url
        user_profile.save()

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
    return redirect('home')

