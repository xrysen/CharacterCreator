# Generated by Django 3.1.7 on 2021-03-20 18:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0012_class_class_num_skills'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classskill',
            name='class_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='class_id', to='character.class'),
        ),
    ]
