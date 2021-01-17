# Angular Django Chatroom
Web application built using Angular + Bulma + Django + Redis.

A chatroom web app that allows users to join chatrooms and message eachother. Users are initially prompted with a login screen asking for a username and chatroom name, before being redirected to the chatroom specified. 

This web app has not been deployed but can be run locally using the instructions below.

## Development
##### Requirements:
* Python 3.9+
* Node.js 
* Docker Desktop

### How to run:
1. From the root directory, ensure Docker Desktop is running and enter the following commands:
```
docker pull redis
docker run -p 6379:6379 -d redis

pip install -r server/requirements.txt

npm install -g @angular/cli
```

2. To run the Django backend:
```
cd server
python manage.py runserver
```

3. To run the Angular frontend:
```
cd ../client
ng serve --open
```
The last command should open a new browser window at http://localhost:4200/. From there you can start using the chatroom app. 
