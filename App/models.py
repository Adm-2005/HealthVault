from django.db import models
from django.contrib.auth.models import User

class HealthRecords(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField()
    doctor = models.TextField()
    duration = models.DurationField()
    doc = models.FileField()
    
    def __str__(self):
        return self.name
    
class QRCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)


