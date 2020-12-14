# Generated by Django 3.1.4 on 2020-12-11 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('blogs', '0002_auto_20201210_0727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='category',
            field=models.ManyToManyField(related_name='category', to='categories.Category'),
        ),
    ]
