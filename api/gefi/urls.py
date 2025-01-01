from django.urls import path, include
from rest_framework import routers
from . import views


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)
router.register(r"MovimentationCategory", views.MovimentationCategoryViewSet)
router.register(r"Benefited", views.BenefitedViewSet)
router.register(r"Benefit", views.BenefitViewSet)
router.register(r"PaymentMethod", views.PaymentMethodViewSet)
router.register(r"Currency", views.CurrencyViewSet)
router.register(r"Movements", views.MovementsViewSet)
router.register(r"CurrentAccountBalance", views.CurrentAccountBalanceViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
