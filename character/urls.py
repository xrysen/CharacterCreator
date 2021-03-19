from django.urls import path

from . import views
from .views import RaceApiView, ClassApiView

urlpatterns = [
  path('', views.index, name='index'),
  path('race/', RaceApiView.as_view()),
  path('class/', ClassApiView.as_view()),
  
]