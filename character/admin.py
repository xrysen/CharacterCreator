from django.contrib import admin

# Register your models here.
from .models import Race, SubRace, Class, Skill

admin.site.register(Race)
admin.site.register(SubRace)
admin.site.register(Class)
admin.site.register(Skill)