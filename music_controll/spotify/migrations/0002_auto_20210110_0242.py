# Generated by Django 3.1.4 on 2021-01-10 10:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Spotify',
            new_name='SpotifyToken',
        ),
    ]
