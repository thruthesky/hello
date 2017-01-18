import { NgModule } from '@angular/core';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicApi } from './ionic-api';
import { IONIC_PUSH_SENDER_ID } from './ionic-share';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '3603867b'
  },
  'push': {
    'sender_id': IONIC_PUSH_SENDER_ID,
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [ ],
  imports: [
    CloudModule.forRoot(cloudSettings)
  ],
  providers: [ IonicApi ]
})
export class IonicApiModule {}