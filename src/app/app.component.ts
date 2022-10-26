import { Component, OnDestroy } from '@angular/core';
// import { AuthService } from './core/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { EventMqttService } from './shared/services/event-mqtt.service';
import { IMqttMessage } from 'ngx-mqtt';
import { DataSharedService } from './shared/services/data-shared.service';
import { IStatus } from './models/IStatus';
import { IMessage } from './models/IMessage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  appVersion: string;
  subscriptions: Subscription[] = [];
  users: string[] = [];
  messages: string[] = [];

  public appPages = [
    // { mittente: 'Inbox', url: '/folder/Inbox', icon: 'mail',  }
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public messaggiRicevuti = [

  ];

  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    mqttService: EventMqttService,
    dataShared: DataSharedService
  ) {

    this.appVersion = environment.version;

    const statusTopic = environment.MQTT.subscriptions.status;
    const textTopic = environment.MQTT.subscriptions.message;


    //CREO LA SOTTOSCRIZIONE AI DUE TOPIC, COME SCRITTO NEL PUNTO 2
    this.subscriptions.push(
      mqttService.topic(statusTopic).subscribe((response: IMqttMessage) => {
        const ris = response.payload.toString();
        if (ris !== '') {
          const status: IStatus = JSON.parse(ris);
          dataShared.refreshData(null, status);

           if(!this.users.includes(status.user)) {
             this.users.push(status.user);
             this.appPages.push({ mittente: status.user, url: '/folder/' + status.user, icon: 'mail' });
            // this.appPages.push({ messaggio: status.text, url: '/folder/' });
           }

        // this.appPages.push(status.user);
        // console.log(status.user);
       }
      })
      );

      this.subscriptions.push(
        mqttService.topic('stagechat/message/francesco_leuzzi').subscribe((response: IMqttMessage) => {
          const ris = response.payload.toString();
          if (ris !== '') {
            const message: IMessage = JSON.parse(ris);
            dataShared.refreshData(message, null);
            console.log(ris);

          // if(!this.users.includes(message.text)) {
          //   this.users.push(message.text);
          //   this.appPages.push({ title: message.text, url: '/folder/' + message.text, icon: 'mail' });
          // }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe);
  }
}
