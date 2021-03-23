from django.urls import path

from . import views
from .views import RaceApiView, ClassApiView, SubRaceApiView, RaceList, ClassList

urlpatterns = [
  path('', views.index, name='index'),
  path('race/', RaceList.as_view()),
  path('class/', ClassList.as_view()),
  path('subrace/', SubRaceApiView.as_view()),
]