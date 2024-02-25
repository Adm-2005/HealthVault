from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login', views.login_user, name='login'),
    path('logout', views.logout_user, name='logout'),
    path('register', views.register_user, name='register'),
    path('about', views.about, name='about'),
    path('dashboard', views.dashboard_authenticated, name='dashboard_authenticated'),
    path('dashboard/<uuid:unique_url_identifier>/', views.dashboard, name='dashboard'),
    path('record-create', views.recordForm, name='recordForm')
]