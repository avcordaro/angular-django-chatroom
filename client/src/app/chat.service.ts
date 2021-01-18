import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { WebsocketService } from "./websocket.service";
import { ChatMessage } from "./chat-message";

const CHAT_URL = 'ws://' + window.location.host + '/ws/chat/' + 'Lobby' + '/';

@Injectable()
export class ChatService {
  public messages: Subject<ChatMessage>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<ChatMessage>>wsService.connect(CHAT_URL).map(
      (response: MessageEvent): ChatMessage => {
        let data = JSON.parse(response.data);
        return {
          message: data.message,
          user: data.user,
          timestamp: data.timestamp
        };
      }
    );
  }
}