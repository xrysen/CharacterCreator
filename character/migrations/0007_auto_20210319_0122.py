# Generated by Django 3.1.7 on 2021-03-19 08:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0006_class_class_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subrace',
            name='sub_race_parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sub_races', to='character.race'),
        ),
    ]