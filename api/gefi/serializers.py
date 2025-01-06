from django.contrib.auth.models import User, Group
from rest_framework import serializers
from . import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "is_staff"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class MovimentationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MovimentationCategoryModel
        fields = "__all__"


class BenefitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BenefitedModel
        fields = "__all__"


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BenefitModel
        fields = "__all__"


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PaymentMethodModel
        fields = "__all__"


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CurrencyModel
        fields = "__all__"


class MovementsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.MovementsModel
        fields = "__all__"
        depth = 1


class MovementsUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.MovementsModel
        fields = "__all__"


class CurrentAccountBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CurrentAccountBalanceModel
        depth = 1
        fields = "__all__"


class CurrentAccountBalanceUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CurrentAccountBalanceModel
        fields = "__all__"
