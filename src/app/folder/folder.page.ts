import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { IMessage } from '../models/IMessage';
import { ActivatedRoute } from '@angular/router';

import { MqttService } from 'ngx-mqtt';

import { EventMqttService } from '../shared/services/event-mqtt.service';

import { Subscription } from 'rxjs';
import { DataSharedService } from '../shared/services/data-shared.service';

import { IStatus } from 'src/app/models/IStatus';
import { IChat } from '../models/IChat';

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

  telInfo: IStatus | undefined;
  public time: string;

  message = 'ciao' ;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataSharedService
    ) { }
  ngOnInit() {
    this.username = this.activatedRoute.snapshot.paramMap.get('id');

    this.data.message$.subscribe(r => {
      this.message = r.text;
      console.log(this.message);
    });
  }


}
