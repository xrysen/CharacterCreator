from django.db import models

# Create your models here.
class Race(models.Model):
  race_name = models.CharField(max_length=50)
  race_description = models.TextField()
  race_str_mod = models.IntegerField()
  race_dex_mod = models.IntegerField()
  race_con_mod = models.IntegerField()
  race_int_mod = models.IntegerField()
  race_wis_mod = models.IntegerField()
  race_cha_mod = models.IntegerField()