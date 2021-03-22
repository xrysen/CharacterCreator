from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import Race, SubRace, Class, Skill
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import RaceSerializer, ClassSerializer, SubRaceSerializer, SkillSerializer

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

class ClassApiView(APIView):
  
  def get(self, request, *args, **kwargs):
    classes = Class.objects.all()
    serializer = ClassSerializer(classes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class SubRaceApiView(APIView):

  def get(self, request, *args, **kwargs):
    sub_races = SubRace.objects.all().values()
    serializer = SubRaceSerializer(sub_races, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

class RaceList(generics.ListAPIView):
  serializer_class = RaceSerializer

  def get_queryset(self):

    queryset = Race.objects.all()
    race_name = self.request.query_params.get('race_name', None)
    if race_name is not None:
      queryset = queryset.filter(race_name=race_name)
    
    return queryset
