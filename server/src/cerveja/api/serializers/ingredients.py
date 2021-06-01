from rest_framework.serializers import ModelSerializer
from cerveja.models import Ingredients

class IngredientsSerializer(ModelSerializer):
    
    class Meta:
        model = Ingredients
        fields = '__all__'