// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: require('../../package.json').name.charAt(0).toUpperCase() + require('../../package.json').name.slice(1),
  version: require('../../package.json').version + '-dev',
  middleware: "api/",
  MQTT: {
    username: require('../assets/config/config.dev.json').MQTT.username,
    password: require('../assets/config/config.dev.json').MQTT.password,
    server: require('../assets/config/config.dev.json').MQTT.server,
    port: require('../assets/config/config.dev.json').MQTT.port,
    protocoll: require('../assets/config/config.dev.json').MQTT.protocoll,
    endpoint: require('../assets/config/config.dev.json').MQTT.endpoint,
    subscriptions: {
      status: require('../assets/config/config.dev.json').MQTT.subscriptions.status,
      text: require('../assets/config/config.dev.json').MQTT.subscriptions.text
    }
  },
  GoogleKey: require('../assets/config/config.dev.json').GoogleKey
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
