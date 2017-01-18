import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Push, PushToken, PushSaveTokenOptions, IPushMessage } from '@ionic/cloud-angular';
import { Member } from '../../api/philgo-api/v2/member';
import { IONIC_PUSH_API_TOKEN, IONIC_PUSH_MESSAGE, IONIC_PROFILE_TAG_NAME } from '../ionic-api-0.2/ionic-share';
@Injectable()
export class IonicApi {
    
    url: string = "https://api.ionic.io/";
    headers: Headers = new Headers({
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + IONIC_PUSH_API_TOKEN
    });
    options = new RequestOptions({ "headers" : this.headers });

    constructor(
        private http: Http,
        private push: Push,
        private member: Member
    ) {

        // console.log("IonicApi::constructor()");
        // this.receivedPushNotification();
        
    }

    /**
     * 푸시를 등록한다.
     * 
     * 이 메쏘드는 앱이 실행 될 때마다, 로그인을 할 때 마다 실행되어야 한다.
     * 공식 문서에서는 실행 될 때 마다 등로하라고 나와 있다.
     * 
     * @note 앱으로 실행을 해야지만, 이 메소드가 호출 된다.
     *          즉, 회원이 앱으로 로그인을 했다가, 웹으로 로그인을 한다고 해서, 기존의 토큰 값을 없애거나 덮어쓰지 않는다.
     * @note 필고에 token 을 등록해야지 successCallback() 이 호출 된다.
     */
    registerPushNotification( succssCallback: ( token: string ) => void, errorCallback: ( error : string ) => void ) {
        if ( ! this.member.isCordova() ) return console.info( 'Push notification : does not support browser.');
        this.push.register()
            .then( (pushToken: PushToken) => {
                let options: PushSaveTokenOptions = { ignore_user: true };
                return this.push.saveToken( pushToken, options );
            } ).then( (pushToken: PushToken) => {
                localStorage.setItem('push.token', pushToken.token );
                this.updatePhilgoToken( pushToken.token, succssCallback, errorCallback );
            }, errorCallback );
    }

    /**
     * ionic 에 등록한 푸시 토큰을 필고의 회원 정보에 varchar_9 에 저장한다.
     * registerPushNotification() 이 실행 될 때 자동으로 실행된다.
     */
    updatePhilgoToken( token: string, succssCallback: ( token: string ) => void, errorCallback: ( error : string ) => void ) {
        if ( this.member.getLoginData() ) { // if user logged in, update push token to philgo.
            this.member.update( {varchar_9: token}, re => {
                // success push registration and update it to philgo server.
                succssCallback( token );
            }, 
            errorCallback
            );
        }
    }

    // receivedPushNotification(){
    //     this.push.rx.notification()
    //         .subscribe( msg => {
    //             a lert ( msg.title + ': ' + msg.text );
    //             console.log( "Push notification received." );
    //         } );
    // }

    subscribePushNotification( callback: (msg: IPushMessage) => void ) {
        return this.push.rx.notification()
            .subscribe( msg => {
                callback( msg );
                // a lert( msg.title + ': ' + msg.text );
                // console.log( "Push notification received." );
            } );;
    }

    sendPushNotification( option: IONIC_PUSH_MESSAGE, successCallback?: () => void, failureCallback?: (err) => void ) {

        if ( ! option.token ) return failureCallback("input token"); // 모바일을 쓰지 않는 회원은 token 이 없다.
        if ( ! option.title ) return failureCallback("input title");
        if ( ! option.content ) return failureCallback("input content");
        

        let data = {
            "tokens": [ option.token ],
            "profile": IONIC_PROFILE_TAG_NAME,
            "notification": {
                "title" : option.title,
                "message": option.content
            }
        };

        console.log('push data: ', data);

        this.http.post( this.url + "push/notifications" , data , this.options)
            .subscribe( successCallback, failureCallback );
    }

}