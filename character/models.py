from django.db import models

# Create your models here.
class Race(models.Model):
  race_name = models.CharField(max_length=50)
  race_description = models.TextField()
  race_img = models.TextField()
  race_str_bonus = models.IntegerField()
  race_dex_bonus = models.IntegerField()
  race_con_bonus = models.IntegerField()
  race_int_bonus = models.IntegerField()
  race_wis_bonus = models.IntegerField()
  race_cha_bonus = models.IntegerField()
  race_spd = models.IntegerField()
  race_darkvision = models.BooleanField()
  race_has_subrace = models.BooleanField()
  race_has_special = models.BooleanField()

  def __str__(self):
    return self.race_name

class SubRace(models.Model):
  sub_race_name = models.CharField(max_length=50)
  sub_race_parent = models.ForeignKey(Race, on_delete=models.CASCADE, related_name="sub_races")
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

class Class(models.Model):
  class_name = models.CharField(max_length=50)
  class_image = models.TextField()
  class_description = models.TextField()
  class_hit_die = models.IntegerField()
  class_first_hp = models.IntegerField()
  class_later_hp = models.IntegerField()
  class_later_hp_avg = models.IntegerField()
  class_save_throw1 = models.CharField(max_length=15)
  class_save_throw2 = models.CharField(max_length=15)
  class_armor = models.TextField()
  class_weapons = models.TextField()

  def __str__(self):
    return self.class_name