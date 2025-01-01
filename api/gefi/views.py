from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from . import serializers, models


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = serializers.UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by("name")
    serializer_class = serializers.GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class MovimentationCategoryViewSet(viewsets.ModelViewSet):
    queryset = models.MovimentationCategoryModel.objects.all()
    serializer_class = serializers.MovimentationCategorySerializer
    filter_backend = [DjangoFilterBackend]
    permission_classes = [permissions.IsAuthenticated]


class BenefitedViewSet(viewsets.ModelViewSet):
    queryset = models.BenefitedModel.objects.all()
    serializer_class = serializers.BenefitedSerializer
    filter_backend = [DjangoFilterBackend]
    permission_classes = [permissions.IsAuthenticated]
    # filterset_fields = "__all__"


class BenefitViewSet(viewsets.ModelViewSet):
    queryset = models.BenefitModel.objects.all()
    serializer_class = serializers.BenefitSerializer
    filter_backend = [DjangoFilterBackend]
    permission_classes = [permissions.IsAuthenticated]
    # filterset_fields = "__all__"


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = models.PaymentMethodModel.objects.all()
    serializer_class = serializers.PaymentMethodSerializer
    filter_backend = [DjangoFilterBackend]
    permission_classes = [permissions.IsAuthenticated]
    # filterset_fields = "__all__"


class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = models.CurrencyModel.objects.all()
    serializer_class = serializers.CurrencySerializer
    filter_backend = [DjangoFilterBackend]
    permission_classes = [permissions.IsAuthenticated]
    # filterset_fields = "__all__"


class MovementsViewSet(viewsets.ModelViewSet):
    queryset = models.MovementsModel.objects.all()
    serializer_class = serializers.MovementsSerializer
    filter_backend = [DjangoFilterBackend]
    permission_classes = [permissions.IsAuthenticated]
    # filterset_fields = "__all__"


class CurrentAccountBalanceViewSet(viewsets.ModelViewSet):
    queryset = models.CurrentAccountBalanceModel.objects.all()
    serializer_class = serializers.CurrentAccountBalanceSerializer
    filter_backend = [DjangoFilterBackend]
    permission_classes = [permissions.IsAuthenticated]
    # filterset_fields = "__all__"
