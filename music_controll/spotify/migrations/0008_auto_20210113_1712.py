# Generated by Django 3.1.4 on 2021-01-14 01:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0007_votes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='votes',
            name='song_id',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
