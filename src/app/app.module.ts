import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedPageModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeItExtra from '@angular/common/locales/extra/it';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { RouteReuseStrategy } from '@angular/router';



registerLocaleData(localeIt, 'it-IT', localeItExtra);

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  connectOnCreate: false,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AppRoutingModule,
    SharedPageModule,
    IonicModule.forRoot(),
    BrowserModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
