/* eslint-disable @typescript-eslint/prefer-for-of */
import { IChat } from './../../features/home/models/IChat';
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMessage } from 'src/app/features/home/models/IMessage';
import { IStatus } from 'src/app/features/home/models/IStatus';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  private statusSubject = new Subject<IStatus>();
  private messageSubject = new Subject<IMessage>();

  public status$ = this.statusSubject.asObservable();
  public message$ = this.messageSubject.asObservable();

  public chats: IChat[] = [];


  constructor() { }

  refreshData(message: IMessage | null, status: IStatus | null){

    if (status != null) {
      this.statusSubject.next(status);
    }

    if (message != null) {
      this.messageSubject.next(message);

      if(this.chats.length === 0) {
        const chatItem: IChat = {
          users: [message.receiver, message.sender],
          messages: [message]
        };
        this.chats.push(chatItem);
      } else {
        for (let i = 0; i < this.chats.length; i++) {
          if(this.chats[i].users.includes(message.receiver) && this.chats[i].users.includes(message.sender)) {
            this.chats[i].messages.push(message);
          } else {
            const chatItem: IChat = {
              users: [message.receiver, message.sender],
              messages: [message]
            };
            this.chats.push(chatItem);
          }

        }

      }
    }

  }

}
