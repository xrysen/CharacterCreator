from django.shortcuts import render
from django.http import HttpResponse
from .models import Race, SubRace

# Create your views here.
def index(request):
  all_races = Race.objects.all()
  sub_races = SubRace.objects.all()
  context = {
    'races': all_races,
    'sub_races': sub_races
  }

  return render(request, 'index.html', context)