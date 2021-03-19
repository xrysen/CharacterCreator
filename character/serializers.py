from rest_framework import serializers
from character.models import Race, Class, SubRace

class RaceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Race
    fields = '__all__'

class ClassSerializer(serializers.ModelSerializer):
  class Meta:
    model = Class
    fields = '__all__'

