# Generated by Django 5.1.4 on 2025-01-02 23:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gefi', '0003_currentaccountbalancemodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='movementsmodel',
            name='valid',
            field=models.BooleanField(default=True, verbose_name='the movement is valid or not'),
        ),
    ]
