from django.contrib import admin

# Register your models here.
from .models import Race, SubRace, Class, Skill, Tool, Alignment, PersonalityTrait, Ideal, Bond

admin.site.register(Race)
admin.site.register(SubRace)
admin.site.register(Class)
admin.site.register(Skill)
admin.site.register(Tool)
admin.site.register(Alignment)
admin.site.register(PersonalityTrait)
admin.site.register(Ideal)
admin.site.register(Bond)