from rest_framework import viewsets
from django_filters import rest_framework as filters
from rest_framework.permissions import AllowAny
from .. import models
from .. import serializers

# Django ViewSet for User Model
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    permission_classes = [AllowAny]