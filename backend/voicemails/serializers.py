
import logging
from rest_framework import serializers
from .models import User, Device
from datetime import datetime
logger = logging.getLogger(__name__)


# Serializer for Django's Device model
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['phone', 'voicemail']

# Serializer for Django's User model
class UserSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True)

    class Meta:
        model = User
        fields = ['userId', 'clusterId', 'originationTime', 'devices', '_id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['originationTime'] = representation['originationTime'].strftime('%Y-%m-%d %I:%M %p')
        # Flatten the devices into a single dict for the response
        if representation['devices']:
            device = representation['devices'][0]  # Assuming you want the first device
            representation['devices'] = {
                'phone': device['phone'],
                'voicemail': device['voicemail']
            }
        
        return representation