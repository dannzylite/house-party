# Generated by Django 3.1.4 on 2021-01-10 10:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0002_auto_20210110_0242'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='SpotifyToken',
            new_name='Spotify',
        ),
    ]
