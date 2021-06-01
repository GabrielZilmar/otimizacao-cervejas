from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from cerveja.api.serializers.ingredients import IngredientsSerializer
from cerveja.models import Ingredients

class IngredientsViewSet(ModelViewSet):
    serializer_class = IngredientsSerializer
    queryset = Ingredients.objects.all()
    pagination_class = None