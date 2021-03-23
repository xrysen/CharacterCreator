# Generated by Django 3.1.7 on 2021-03-21 00:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0015_auto_20210320_1435'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tools',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tool_name', models.CharField(max_length=100)),
                ('tool_cost', models.CharField(max_length=20)),
                ('tool_weight', models.IntegerField()),
            ],
        ),
    ]