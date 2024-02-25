import uuid
import qrcode
from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    qr_code =  models.ImageField(upload_to='qr_codes/')
    qr_code_url = models.URLField(null=True)
    unique_url_identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

@receiver(post_save, sender=User)
def createUserProfile(sender, instance, created, **kwargs):
    if created and instance.is_authenticated:
        user_profile = UserProfile.objects.create(user=instance)

        qr_code_url = f'https://healthvault.onrender.com/dashboard/{user_profile.unique_url_identifier}/'
        img = qrcode.make(qr_code_url)
        img_path = f'qr_codes/{user_profile.unique_url_identifier}_QR.png'
        img.save(img_path)

        user_profile.qr_code.name = img_path
        user_profile.save()

post_save.connect(createUserProfile, sender=User)

class HealthRecords(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.TextField()
    doctor = models.TextField()
    date = models.DateField(null=True)
    doc = models.FileField()
    
    def __str__(self):
        return self.name
    



