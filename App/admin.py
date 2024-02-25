from django.contrib import admin
from .models import UserProfile, HealthRecords

admin.site.register(UserProfile)
admin.site.register(HealthRecords)
