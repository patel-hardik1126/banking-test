# devices/management/commands/import_data_default.py
import json
import time
from datetime import datetime
from django.core.management.base import BaseCommand
from voicemails.models import User, Device  # Adjust according to your app name

class Command(BaseCommand):
    help = "Import data from a JSON file into the default Django database."

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str)
        
    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        with open(file_path, 'r') as file:
            data = json.load(file)

        for entry in data:
            # Convert originationTime to Unix timestamp if it's not already in that format
            origination_time = entry['originationTime']
            if isinstance(origination_time, str):
                dt = datetime.strptime(origination_time, "%Y-%m-%d %H:%M:%S")
                origination_time = int(time.mktime(dt.timetuple()))

            # Save to Django's default database
            user = User(
                userId=entry['userId'],
                clusterId=entry['clusterId'],
                originationTime=origination_time,  # Already in UNIX timestamp
            )
            user.save()

            # Access device directly since it's not a list
            device_data = entry.get('devices')
            if isinstance(device_data, dict):  # Ensure device_data is a dictionary
                device_instance = Device(
                    phone=device_data['phone'],  # Access phone
                    voicemail=device_data['voicemail']  # Access voicemail
                )
                device_instance.save()
                user.devices.add(device_instance)  # Link the device to the user

        self.stdout.write(self.style.SUCCESS('Data imported successfully into the default database!'))
