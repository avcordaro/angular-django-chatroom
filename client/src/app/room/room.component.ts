import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { ChatMessage } from '../chat-message';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

	chatMessages: ChatMessage[] = [
		{ user: "johnsmith", message: 'Hey there!', timestamp: '19:40:32' },
		{ user: "avcordaro", message: 'Hey there! Hows it going lads ;)', timestamp: '19:40:45'},
	  { user: "casseynigel", message: 'Hey there! Im good thanks how about you', timestamp: '19:41:43' },
	  { user: "susanboyle", message: 'Hey there! You obviously know who I am, I am really famous lol.', timestamp: '19:42:02' }
	];

  form = new FormGroup({
    message: new FormControl('')
  });

	username!: string;
	roomName!: string;
	faUser = faUser;
	faPaperPlane = faPaperPlane;
	faSignOutAlt = faSignOutAlt;
	ws!: WebSocket;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.username = this.route.snapshot.queryParamMap.get("user")!;
  	this.roomName = this.route.snapshot.paramMap.get("roomName")!;
  }

  sendMessage(): void {
  	let msg = { user: this.username, message: this.form.get('message')!.value, timestamp: Date().toString().substring(15, 24) };
  	this.form.patchValue({message: ''});
  	this.chatMessages.push(msg);
  	let chatboxDiv = document.getElementById("chatbox")!;
  	setTimeout(() => { chatboxDiv.scrollTop = chatboxDiv.scrollHeight; }, 50);
  }

}
