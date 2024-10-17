from django.db import models

# Django Model for Default Database
class Device(models.Model):
    phone = models.CharField(max_length=255)
    voicemail = models.CharField(max_length=255)  # Store the voicemail directly as a string