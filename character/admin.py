from django.contrib import admin

# Register your models here.
from .models import Race, SubRace, Class, Tool, Skill

admin.site.register(Race)
admin.site.register(SubRace)
admin.site.register(Class)
admin.site.register(Tool)
admin.site.register(Skill)