from django.shortcuts import render
from django.http import HttpResponse
from .models import Race, SubRace
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RaceSerializer

# Create your views here.
def index(request):
  all_races = Race.objects.all()
  sub_races = SubRace.objects.all()
  context = {
    'races': all_races,
    'sub_races': sub_races
  }

  return render(request, 'index.html', context)

class RaceApiView(APIView):

  def get(self, request, *args, **kwargs):
    races = Race.objects.all()
    serializer = RaceSerializer(races, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)