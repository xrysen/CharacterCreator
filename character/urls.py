from django.urls import path

from . import views
from .views import RaceApiView

urlpatterns = [
  path('', views.index, name='index'),
  path('api/', RaceApiView.as_view())
]