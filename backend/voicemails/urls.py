from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import api

router = DefaultRouter()
router.register(r'details', api.UserViewSet)


urlpatterns = [
    path('v1/', include((router.urls, 'voicemails-api'), namespace='voicemails')),
]