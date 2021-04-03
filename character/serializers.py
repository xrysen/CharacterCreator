from rest_framework import serializers
from character.models import Race, Class, SubRace, Skill, Background, PersonalityTrait, Bond, Flaw, Ideal

class PersonalityTraitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalityTrait
        fields = '__all__'

class BondSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bond
        fields = '__all__'

class FlawSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flaw
        fields = '__all__'

class IdealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ideal
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class BackgroundSerializer(serializers.ModelSerializer):
    background_traits = PersonalityTraitSerializer(many=True, read_only=True)
    background_bonds = BondSerializer(many=True, read_only=True)
    background_ideals = IdealSerializer(many=True, read_only=True)
    background_flaws = FlawSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Background
        fields = ['id','name','skills','description', 'background_traits', 'background_bonds', 'background_ideals', 'background_flaws']


class ClassSerializer(serializers.ModelSerializer):
    class_skills = SkillSerializer(many=True, read_only=True)
    class Meta:
        model = Class
        fields = '__all__'


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



