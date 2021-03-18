from rest_framework import serializers
from character.models import Race, Class

class RaceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Race
    fields = ['id','race_name', 'race_img', 'race_description', 'race_str_bonus', 'race_dex_bonus', 'race_con_bonus', 'race_int_bonus', 'race_wis_bonus', 'race_cha_bonus', 'race_darkvision', 'race_has_subrace', 'race_has_special']

class ClassSerializer(serializers.ModelSerializer):
  class Meta:
    model = Class
    fields = ['id', 'class_name', 'class_image', 'class_description', 'class_hit_die', 'class_save_throw1', 'class_save_throw2', 'class_armor', 'class_weapons']
    