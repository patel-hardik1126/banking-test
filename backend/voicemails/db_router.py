# voicemails/db_router.py

class ModelRouter:
    """
    A router to control all database operations on models in
    the same app, routing them to different databases.
    """

    def db_for_read(self, model, **hints):
        """Point read operations for model to the appropriate database."""
        if model._meta.model_name in ('DeviceDocument', 'UserDocument'):
            return 'mongodb'  # Read from the mongodb database
        else: 
            return 'default'  # Read from the default database
        return None

    def db_for_write(self, model, **hints):
        """Point write operations for model to the appropriate database."""
        if model._meta.model_name in ('DeviceDocument', 'UserDocument'):
            return 'mongodb'  # Read from the mongodb database
        else: 
            return 'default'  # Read from the default database
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """Allow relations if a model in the same app is involved."""
        if obj1._meta.app_label == obj2._meta.app_label:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Make sure the app's models get created on the right database."""
        if app_label == 'voicemails':
            if model_name in ('DeviceDocument', 'UserDocument'):
                return 'mongodb'  # Read from the mongodb database
            else: 
                return 'default'  # Read from the default database
        return None
