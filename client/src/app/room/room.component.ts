import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { ChatMessage } from '../chat-message';
import { webSocket } from "rxjs/webSocket";


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

	chatMessages: ChatMessage[] = [];
  roomUsers: string[] = [];

  form = new FormGroup({
    message: new FormControl('')
  });

	username!: string;
	roomName!: string;
	ws!: any;
	faUser = faUser;
	faPaperPlane = faPaperPlane;
	faSignOutAlt = faSignOutAlt;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.username = this.route.snapshot.queryParamMap.get("user")!;
  	this.roomName = this.route.snapshot.paramMap.get("roomName")!;
    this.ws = webSocket('ws://localhost:8000/ws/chat/' + this.roomName + '/' + this.username + '/');
    this.ws .subscribe(
		  (msg: any) => this.handleWebSocketMessage(msg),
		  (err: any) => console.log(err),
		  () => console.log('Websocket connection closed.')
		);
  }

  sendMessage(): void {
  	this.ws.next({
      message: this.form.get('message')!.value,
      user: this.username,
      timestamp: Date().toString().substring(16, 24)
    });
    this.form.patchValue({message: ''});
  }

  handleWebSocketMessage(msg: any): void {
    if(msg.type === "room_users") {
      this.roomUsers = msg.users
      console.log(this.roomUsers)
    } else {
      let chatMessage = { user: msg.user, message: msg.message, timestamp: msg.timestamp }
      this.chatMessages.push(chatMessage);
    	let chatboxDiv = document.getElementById("chatbox")!;
    	setTimeout(() => { chatboxDiv.scrollTop = chatboxDiv.scrollHeight; }, 50);
    }
  }
}
