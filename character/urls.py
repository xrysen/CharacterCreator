from django.urls import path

from . import views
from .views import RaceApiView, ClassApiView, SubRaceApiView, RaceList, ClassList

urlpatterns = [
  path('', views.index, name='index'),
  path('character_sheet', views.character_sheet, name="character_sheet"),
  path('race/', RaceList.as_view()),
  path('class/', ClassList.as_view()),
  path('subrace/', SubRaceApiView.as_view()),
]