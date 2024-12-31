# Generated by Django 5.1.4 on 2024-12-31 21:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MovimentationCategoryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='name of the category')),
                ('signal', models.SmallIntegerField(choices=[(-1, 'perda'), (1, 'ganho')], verbose_name='positive = gain, negative = loss')),
                ('active', models.BooleanField(default=False, verbose_name='the current category model is active or not')),
            ],
            options={
                'ordering': ['-active', 'signal'],
                'constraints': [models.UniqueConstraint(fields=('name', 'signal'), name='unique_name_signal_combination')],
            },
        ),
        migrations.CreateModel(
            name='BenefitedModel',
            fields=[
                ('name', models.CharField(max_length=200, primary_key=True, serialize=False, unique=True, verbose_name='name of the benefited')),
                ('benefited_type', models.PositiveSmallIntegerField(choices=[(1, 'pessoa física'), (2, 'pessoa jurídica')], verbose_name='if the benefited type is a physical person or juridic person')),
                ('registered_timestamp', models.DateTimeField(auto_now_add=True, verbose_name='datetime when the benefited was registered')),
                ('last_modified_timestamp', models.DateTimeField(auto_now=True, verbose_name='datetime when the last update happened')),
                ('benefited_category', models.PositiveSmallIntegerField(choices=[(1, 'cliente'), (2, 'fornecedor'), (3, 'ambos')], verbose_name='is a client, supplier or both')),
                ('movimentation_categories', models.ManyToManyField(to='gefi.movimentationcategorymodel')),
            ],
            options={
                'ordering': ['-registered_timestamp'],
            },
        ),
        migrations.CreateModel(
            name='BenefitModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='name of the product or service')),
                ('last_movement_timestamp', models.DateTimeField(blank=True, null=True, verbose_name='last time that the movement was done')),
                ('benefited_category', models.SmallIntegerField(choices=[(1, 'produto'), (2, 'serviço')], verbose_name='if the benefit is a product or service')),
                ('benefited_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='gefi.benefitedmodel', verbose_name='the related benefited of the product')),
            ],
            options={
                'ordering': ['-last_movement_timestamp'],
                'constraints': [models.UniqueConstraint(fields=('name', 'benefited_model'), name='unique_name_benefited_constraint')],
            },
        ),
    ]