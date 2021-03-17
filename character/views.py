from django.shortcuts import render
from django.http import HttpResponse
from .models import Race

# Create your views here.
def index(request):
  all_races = Race.objects.all()
  context = {
    'races': all_races
  }

  return render(request, 'index.html', context)