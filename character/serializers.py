from rest_framework import serializers
from character.models import Race, Class, SubRace


class SubRaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubRace
        fields = "__all__"


class RaceSerializer(serializers.ModelSerializer):
    sub_races = SubRaceSerializer(many=True, read_only=True)

    class Meta:
        model = Race
        fields = ['id', 'race_name', 'race_img', 'race_description', 'race_str_bonus', 'race_con_bonus',
                  'race_dex_bonus', 'race_int_bonus', 'race_wis_bonus', 'race_cha_bonus', 'race_has_subrace', 'sub_races']


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'
