from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from . import serializers


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = serializers.UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by("name")
    serializer_class = serializers.GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
