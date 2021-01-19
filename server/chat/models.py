from django.db import models

class RoomUser(models.Model):
    username = models.CharField(max_length=30)
    roomName = models.CharField(max_length=30)

    def __str__(self):
        return self.username