# Generated by Django 3.1.7 on 2021-04-02 03:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0025_flaw_background'),
    ]

    operations = [
        migrations.AddField(
            model_name='background',
            name='description',
            field=models.TextField(default='Desc'),
            preserve_default=False,
        ),
    ]