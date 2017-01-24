import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { Deploy, DeployDownloadOptions } from '@ionic/cloud-angular';
//import { IonicApi } from '../providers/ionic-api-0.2/ionic-api';
import { App } from '../providers/app';
import { Alert, ALERT_OPTION } from '../providers/bootstrap/alert/alert';
// import { parse_url } from '../etc/function';
declare let navigator;
@Component({
  selector: `app-component`,
  template: `
    <router-outlet (window:resize)="onResize($event)"></router-outlet>
    <template ngbModalContainer></template>
    <div class="toast" (click)="onClickHideToast()" [attr.active]="toast.active">{{toast.content}}</div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('alertModal') alertModal = null;
  url: string = null; // url of current page.
  prevUrl: string = null; // previos page url.
  toast: { active: boolean; content: string; } = { active: false, content: null };
  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
//      public deploy: Deploy,
//      private ionic: IonicApi,
      public app: App,
      private alert: Alert
  ) {
    app.appComponent = this;
    router.events.subscribe(event => {
      // console.log(event);
      this.prevUrl = this.url;
      this.url = event.url;
    });
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
    //this.updateApp();
    this.backButton();
    //this.registerPushNotification();
    //this.subscribePushNotification();
  }
  backButton() {
    //this.app.addBackButtonEventListener();

    document.addEventListener("backbutton", () => {
      console.log("backbutton clicked: prevUrl: " + this.prevUrl + ", this.url: ", this.url );
      if ( this.prevUrl == '/' ) {
        navigator.app.exitApp();
      }
      else {
        navigator.app.backHistory();
      }
    }, false );
  }

  // updateApp() {
  //   this.updateNewSnapshot_if_there_is();
  //   setInterval( () => this.updateNewSnapshot_if_there_is(), 60 * 5 * 1000 );
  // }

  // updateNewSnapshot_if_there_is() {
  //   console.log("checking app update on MyApp::updateNewSnapshot_if_there_is()");
  //   this.deploy.check().then( (snapshotAvailable: boolean) => {
  //     if ( snapshotAvailable ) { // snapshotAvailable 이 true 이면, 새로운 snapshot 을 사용 할 수 있다.
  //       let opt : DeployDownloadOptions = {
  //         onProgress: p => {
  //           console.info('Downloading = ' + p + '%');
  //         }
  //       };
  //       this.deploy.download( opt ).then( () => { // 새로운 snapshot 을 다운로드
  //         let opt : DeployDownloadOptions = {
  //           onProgress: p => {
  //             console.info('Extracting = ' + p + '%');
  //           }
  //         };
  //         return this.deploy.extract( opt ) // snapshot 압축 해제
  //             .then( () => {
  //               // this.router.navigateByUrl( '/' ); // base href='' 때문에 안전하게 home 으로 가서 load() 함.
  //               setTimeout( () => {
  //                 // this.deploy.load(); // reload 해서 새로운 snapshot 을 적용
  //                 // location.href = 'index.html';
  //                 // location.reload();
  //                 this.alert.open( { title: "App Updated !", content: "Restart your app!"}, () => {

  //                 });
  //               }, 1234);
  //             } );
  //       });
  //     }
  //   });
  // }

  // registerPushNotification() {
  //   this.ionic.registerPushNotification(
  //       token => { console.log("Push token saved into ionic cloud and philgo."); },
  //       error => this.app.error("Failed on push notification: " + error )
  //   );
  // }
  // subscribePushNotification() {
  //   this.ionic.subscribePushNotification( msg => {
  //     let option: ALERT_OPTION = {
  //       title: msg.title,
  //       content: msg.text
  //     }
  //     this.alert.open( option );
  //   } );
  // }

  onClickHideToast(){
    this.toast.active = false;
  }


}
