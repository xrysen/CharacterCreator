from django.contrib import admin

# Register your models here.
from .models import Race, SubRace, Class, Skill, Tool, Alignment, PersonalityTrait, Ideal, Bond, Background, Flaw, Weapon, WeaponCategory, WeaponProperty, WeaponType
from .models import Armor, ArmorCategory

admin.site.register(Race)
admin.site.register(SubRace)
admin.site.register(Class)
admin.site.register(Skill)
admin.site.register(Tool)
admin.site.register(Alignment)
admin.site.register(Background)
admin.site.register(PersonalityTrait)
admin.site.register(Ideal)
admin.site.register(Bond)
admin.site.register(Flaw)
admin.site.register(Weapon)
admin.site.register(WeaponCategory)
admin.site.register(WeaponProperty)
admin.site.register(WeaponType)
admin.site.register(Armor)
admin.site.register(ArmorCategory)