import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Deploy, DeployDownloadOptions } from '@ionic/cloud-angular';
import { IonicApi } from '../providers/ionic-api-0.2/ionic-api';
import { App } from '../providers/app';
import { Alert } from '../providers/bootstrap/alert/alert';
import { parse_url } from '../etc/function';
declare let navigator;
@Component({
  selector: `app-component`,
  template: `
    <router-outlet (window:resize)="onResize($event)"></router-outlet>
    <template ngbModalContainer></template>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('alertModal') alertModal = null;
  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public deploy: Deploy,
      private ionic: IonicApi,
      public app: App,
      private alert: Alert
  ) {
    app.setWidth( window.innerWidth );
    document.addEventListener("deviceready", () => this.onDevinceReady(), false);
  }
  ngOnInit() {
    
  }
  onResize(event) {
    this.app.setWidth( window.innerWidth);
  }

  /**
   * Do things on 'deviceready'
   * 
   * @note only cordova will run this code.
   * 
   */
  onDevinceReady() {
    console.log("yes, I am running in cordova.");
    this.updateApp();
    this.backButton();
    // this.registerPushNotification();
  }
  backButton() {
    document.addEventListener("backbutton", () => {
      let url = parse_url( location.href );
      if ( url['path'] == '/' || url['path'] == '/android_asset/www/') {
        navigator.app.exitApp();
      }
      else {
        navigator.app.backHistory();
      }
    }, false );
    
  }

  updateApp() {
    this.updateNewSnapshot_if_there_is();
    setInterval( () => this.updateNewSnapshot_if_there_is(), 30 * 1000 );
  }

  updateNewSnapshot_if_there_is() {
    console.log("MyApp::updateNewSnapshot_if_there_is()");
    this.deploy.check().then( (snapshotAvailable: boolean) => {
      if ( snapshotAvailable ) { // snapshotAvailable 이 true 이면, 새로운 snapshot 을 사용 할 수 있다.
        let opt : DeployDownloadOptions = {
          onProgress: p => {
            console.info('Downloading = ' + p + '%');
          }
        };
        this.deploy.download( opt ).then( () => { // 새로운 snapshot 을 다운로드
          let opt : DeployDownloadOptions = {
            onProgress: p => {
              console.info('Extracting = ' + p + '%');
            }
          };
          return this.deploy.extract( opt ) // snapshot 압축 해제
              .then( () => {
                // this.router.navigateByUrl( '/' ); // base href='' 때문에 안전하게 home 으로 가서 load() 함.
                setTimeout( () => {
                  // this.deploy.load(); // reload 해서 새로운 snapshot 을 적용
                  // location.href = 'index.html';
                  // location.reload();
                  this.alert.open( { title: "App Updated !", content: "Restart your app!"}, () => {

                  });
                }, 1234);
              } );
        });
      }
    });
  }


  registerPushNotification() {
    this.ionic.registerPushNotification(
        re => {},
        error => alert("Failed on push notification: " + error )
    );
  }


}
