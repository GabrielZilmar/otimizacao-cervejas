from django.db import models

class Ingredients(models.Model):
  name = models.CharField(max_length=45, blank=False, unique=True, null=False)
  variable = models.CharField(max_length=3, blank=False, unique=True, null=False)
  price = models.FloatField(blank=False, null=False)
  
  class Meta:
    db_table = 'ingredients'