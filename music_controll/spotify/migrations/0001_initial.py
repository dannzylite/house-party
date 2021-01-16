# Generated by Django 3.1.4 on 2021-01-09 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Spotify',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=50, unique=True)),
                ('access_token', models.CharField(max_length=150)),
                ('refresh_token', models.CharField(max_length=150)),
                ('token_type', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expires_in', models.DateTimeField()),
            ],
        ),
    ]