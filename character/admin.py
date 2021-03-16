from django.contrib import admin

# Register your models here.
from .models import Race, SubRace

admin.site.register(Race)
admin.site.register(SubRace)