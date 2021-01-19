import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import RoomUser

class ChatConsumer(WebsocketConsumer):
    
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.username = self.scope['url_route']['kwargs']['username']
        self.room_group_name = 'chat_%s' % self.room_name

        self.user = RoomUser(username = self.username, roomName = self.room_name)
        self.user.save()

        roomUsers = RoomUser.objects.all().filter(roomName = self.room_name)

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': "room_users",
                'users': [str(user) for user in roomUsers]
            }
        )

    def disconnect(self, close_code):

        self.user.delete()

        roomUsers = RoomUser.objects.all().filter(roomName = self.room_name)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': "room_users",
                'users': [str(user) for user in roomUsers]
            }
        )

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': text_data_json['message'],
                'user': text_data_json['user'],
                'timestamp': text_data_json['timestamp']
            }
        )

    def chat_message(self, event):
        self.send(text_data=json.dumps({
            'type': "message",
            'message': event['message'],
            'user': event['user'],
            'timestamp': event['timestamp']
        }))

    def room_users(self, event):
        self.send(text_data=json.dumps({
            'type': "room_users",
            'users': event['users']
        }))