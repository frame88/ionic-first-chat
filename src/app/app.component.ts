import { Component, OnDestroy } from '@angular/core';
// import { AuthService } from './core/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { EventMqttService } from './shared/services/event-mqtt.service';
import { IMqttMessage } from 'ngx-mqtt';
import { DataSharedService } from './shared/services/data-shared.service';
import { IStatus } from './features/home/models/IStatus';
import { IMessage } from './features/home/models/IMessage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  appVersion: string;
  subscriptions: Subscription[] = [];

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    mqttService: EventMqttService,
    dataShared: DataSharedService
  ) {
    this.appVersion = environment.version;

    const statusTopic = environment.MQTT.subscriptions.status;
    const textTopic = environment.MQTT.subscriptions.text;

    this.subscriptions.push(
      mqttService.topic(statusTopic).subscribe((response: IMqttMessage) => {
        const rtn = response.payload.toString();
        if (rtn !== '') {
          const status: IStatus = JSON.parse(rtn);
          dataShared.refreshData( null, status);
        }
      })
    );

    this.subscriptions.push(
      mqttService.topic(textTopic).subscribe((response: IMqttMessage) => {
        const rtn = response.payload.toString();
        if (rtn !== '') {
          const message: IMessage = JSON.parse(rtn);
          dataShared.refreshData(message, null);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe);
  }
}
