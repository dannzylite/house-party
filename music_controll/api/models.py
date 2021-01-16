from django.db import models
import random
import string

# Create your models here.
def get_code():
    lenght = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=lenght))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

class Room(models.Model):
    code = models.CharField(max_length=8, default=get_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guess_can_pause = models.BooleanField(null=False, default=False)
    vote_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)

