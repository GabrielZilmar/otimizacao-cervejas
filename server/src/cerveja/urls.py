from rest_framework.routers import DefaultRouter
from cerveja.api.views.ingredients import cerveja
from django.urls import path

urlpatterns = [
    path('cerveja', cerveja),
]
