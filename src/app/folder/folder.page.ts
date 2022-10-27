/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable object-shorthand */
import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { IMessage } from '../models/IMessage';
import { ActivatedRoute } from '@angular/router';

import { MqttService } from 'ngx-mqtt';

import { EventMqttService } from '../shared/services/event-mqtt.service';

import { Subscription } from 'rxjs';
import { DataSharedService } from '../shared/services/data-shared.service';

import { IStatus } from 'src/app/models/IStatus';
import { IChat } from '../models/IChat';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  @ViewChild('scrollMe') private myscrollContainer: ElementRef;

  public username: string;
  public messages: IMessage[] = [];
  public subscriptions: Subscription[] = [];
  chat: IChat;
  io = 'francesco.leuzzi';
  telInfo: IStatus | undefined;
  public time: string;

  message = '';
  dbmessage: IMessage[] = [];
  activeChat: IChat;
  formData: FormGroup = this.fb.group({
    //da riempire
   });
  chatUser: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataSharedService,
    private fb: FormBuilder,
    private _mqtt: MqttService,
    // public store: StoreMessagesService
    ) {
        this.chatUser = this.activatedRoute.snapshot.paramMap.get('id');
    }
    ngOnInit() {
      //persona con cui sto parlando
    this.username = this.activatedRoute.snapshot.paramMap.get('id');
    //VISUALIZZA TUTTI I MESSAGGI
    this.activeChat = this.data.chats.filter((value, index) => this.data.chats[index].users.includes(this.username))[0];
    console.log(this.activeChat);
    if (this.activeChat !== undefined ) {
      this.dbmessage = this.activeChat.messages;
    }

    //VISUALIZZA IL MESSAGGIO NUOVO
    // QUELLO DI SOPRA PIU QUELLO DI SOTTO COMPONGONO LA CHAT CORENTE
    this.data.message$.subscribe(r => {
      if(r !== null) {
        this.activeChat = this.data.chats.filter((value, index) => this.data.chats[index].users.includes(this.username))[0];
        console.log(this.activeChat);
        if (this.activeChat !== undefined ) {
          this.dbmessage = this.activeChat.messages;
        }
      }
      // this.message = r.text;
      // this.dbmessage.push(this.message);
      // console.log(this.message);
      // console.log(this.dbmessage);
      // //
      // console.log(this.formData);
    });

    console.log(this.formData);





    // MODIFICA STRINGA
    // this.username = this.username.replace('.',' ');
    // this.username = this.username.charAt(0).toUpperCase() + this.username.slice(1);
  }
  send(f: NgForm) {
  if (f.value.textToSend) {
    const now = new Date();
    const text = f.value.textToSend;
    const messageToSend: IMessage = { sender: 'francesco.leuzzi',
                                      receiver: this.username,
                                      timestamp: now,
                                      text: text
                                    };
    this._mqtt.unsafePublish(`stagechat/message/${this.username.replace('.', '_')}`, `{"sender": "francesco.leuzzi", "receiver": "${this.username}", "timestamp": "${now}", "text": "${text}" }` );
    //this.mqtt.unsafePublish(`stagechat/message/flavio_rodolfi`, `{"sender": "${this.user}", "receiver": "${this.id}", "timestamp": "${now}", "text": "${text}" }` );
    // const pageUpdate = this.folderPages.filter((value, index) => this.folderPages[index].title === messageToSend.receiver || this.folderPages[index].title === messageToSend.sender)[0];
    // this.folderPages = this.folderPages.filter((value, index) => this.folderPages[index].title !== messageToSend.sender && this.folderPages[index].title !== messageToSend.receiver);
    // this.folderPages.splice(0, 0, pageUpdate);
    // this.auth.pagesSubject.next(this.folderPages);
    // this.auth.authAppPages = this.folderPages;
    this.data.refreshData(messageToSend, null);
    this.chat = this.data.chats.filter((value, index) => this.data.chats[index].users.includes('francesco.leuzzi') && this.data.chats[index].users.includes(this.username))[0];
    if (this.chat) {
      this.messages = [];
      for (let i = 0; i < this.chat.messages.length; i++) {
        this.messages.push(this.chat.messages[i]);
      }
    }
    f.reset();
  }
}

}
