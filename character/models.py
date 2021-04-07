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

class Skill(models.Model):
  skill_name = models.CharField(max_length=50)
  skill_stat = models.CharField(max_length=10)
  skill_url = models.TextField()

  def __str__(self):
    return self.skill_name

class Tool(models.Model):
  tool_name = models.CharField(max_length=100)
  tool_cost = models.CharField(max_length=20)
  tool_weight = models.IntegerField()

  def __str__(self):
    return self.tool_name

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
  class_num_skills = models.IntegerField()
  class_skills = models.ManyToManyField(Skill, related_name = "skill_list")
  class_tools = models.ManyToManyField(Tool, related_name="tool_list")

  def __str__(self):
    return self.class_name

class Alignment(models.Model):
  alignment_name = models.CharField(max_length=50)
  alignment_description = models.TextField()

  def __str__(self):
    return self.alignment_name

class Background(models.Model):
  name = models.CharField(max_length=50)
  description = models.TextField()
  skills = models.ManyToManyField(Skill, related_name = "background_skill_list")
  num_languages = models.IntegerField()

  def __str__(self):
    return self.name

class PersonalityTrait(models.Model):
  description = models.TextField()
  background = models.ForeignKey(Background, on_delete=models.CASCADE, related_name="background_traits")

  def __str__(self):
    return self.description

class Ideal(models.Model):
  name = models.CharField(max_length=40)
  description = models.TextField()
  background = models.ForeignKey(Background, on_delete=models.CASCADE, related_name="background_ideals")

  def __str__(self):
    return self.name

class Bond(models.Model):
  description = models.TextField()
  background = models.ForeignKey(Background, on_delete=models.CASCADE, related_name = "background_bonds")

  def __str__(self):
    return self.description

class Flaw(models.Model):
  description = models.TextField()
  background = models.ForeignKey(Background, on_delete=models.CASCADE, related_name="background_flaws")

  def __str__(self):
    return self.description

class WeaponCategory(models.Model):
  name = models.CharField(max_length=30)

  def __str__(self):
    return self.name

