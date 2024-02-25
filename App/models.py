from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    qr_code =  models.ImageField(upload_to='qr_codes/')
    qr_code_url = models.URLField()

@receiver(post_save, sender=User)
def createUserProfile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)    

@receiver(post_save, sender=UserProfile)
def saveUserProfile(sender, instance, **kwargs):
    instance.qr_code.save(f'{instance.user.username}_qr.png', instance.qr_code)

class HealthRecords(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField()
    doctor = models.TextField()
    duration = models.DurationField()
    doc = models.FileField()
    
    def __str__(self):
        return self.name
    



