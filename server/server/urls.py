from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('username-availability/<room_name>/<username>', views.checkUsernameAvailability)
]