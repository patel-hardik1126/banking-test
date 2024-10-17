import uuid  # Import the uuid module
from django.db import models
from unixtimestampfield.fields import UnixTimeStampField
from .Device import Device
class User(models.Model):
    userId = models.BigIntegerField()
    clusterId = models.CharField(max_length=255)
    originationTime = UnixTimeStampField(auto_now=True)
    devices = models.ManyToManyField(Device)  # Assuming a user can have multiple devices
    _id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


    def __str__(self):
        return f"{self.userId} - {self.clusterId}"