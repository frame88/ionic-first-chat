import { Injectable } from '@angular/core';
import { IMqttMessage, IMqttServiceOptions, MqttConnectionState, MqttService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EventMqttService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    connectOnCreate: false,
    hostname: environment.MQTT.server,
    port: Number(environment.MQTT.port),
    path: '/ws',
    protocol: environment.MQTT.protocoll === 'ws' ? 'ws' : 'wss',
    username: environment.MQTT.username,
    password: environment.MQTT.password,
  };

  constructor(private mqttService: MqttService) {
    mqttService.connect(this.MQTT_SERVICE_OPTIONS);
  }

  connectionState = (): Observable<MqttConnectionState> =>
  this.mqttService.state;

  topic = (topic: string): Observable<IMqttMessage> =>
    this.mqttService.observe(`${topic}`);
}
