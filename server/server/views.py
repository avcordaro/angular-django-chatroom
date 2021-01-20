from django.shortcuts import render
from django.http import HttpResponse
from chat.models import RoomUser
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def checkUsernameAvailability(request, room_name, username):
	result = RoomUser.objects.filter(roomName=room_name, username=username)
	if result:
		return HttpResponse("Unavailable")
	return HttpResponse("Available")

    