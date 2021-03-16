from django.contrib import admin

# Register your models here.
from .models import Race, SubRace, Class

admin.site.register(Race)
admin.site.register(SubRace)
admin.site.register(Class)