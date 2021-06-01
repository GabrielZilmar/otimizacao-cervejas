from rest_framework.routers import DefaultRouter
from cerveja.api.views.ingredients import *
from django.urls import path

router = DefaultRouter()
router.register('ingredients', IngredientsViewSet, basename='ingredients')

urlpatterns = router.urls