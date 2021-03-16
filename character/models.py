from django.db import models

# Create your models here.
class Race(models.Model):
  race_name = models.CharField(max_length=50)
  race_description = models.TextField()
  race_str_bonus = models.IntegerField()
  race_dex_bonus = models.IntegerField()
  race_con_bonus = models.IntegerField()
  race_int_bonus = models.IntegerField()
  race_wis_bonus = models.IntegerField()
  race_cha_bonus = models.IntegerField()
  race_spd = models.IntegerField()
  race_darkvision = models.BooleanField()
  race_has_subrace = models.BooleanField()

  def __str__(self):
    return self.race_name