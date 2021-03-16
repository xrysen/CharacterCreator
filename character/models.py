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

class SubRace(models.Model):
  sub_race_name = models.CharField(max_length=50)
  sub_race_parent = models.ForeignKey(Race, on_delete=models.CASCADE)
  sub_race_description = models.TextField()
  sub_race_str_bonus = models.IntegerField()
  sub_race_dex_bonus = models.IntegerField()
  sub_race_con_bonus = models.IntegerField()
  sub_race_int_bonus = models.IntegerField()
  sub_race_wis_bonus = models.IntegerField()
  sub_race_cha_bonus = models.IntegerField()
  sub_race_spd = models.IntegerField()

  def __str__(self):
    return self.sub_race_name