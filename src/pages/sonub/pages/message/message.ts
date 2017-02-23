import { Component, Renderer } from '@angular/core';
import { Message, MESSAGE, MESSAGES, MESSAGE_LIST, MESSAGE_FORM } from '../../../../api/philgo-api/v2/message';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { App } from '../../../../providers/app';
//import { IonicApi } from '../../../../providers/ionic-api-0.2/ionic-api';
//import { IONIC_PUSH_MESSAGE } from '../../../../providers/ionic-api-0.2/ionic-share';
import * as _ from 'lodash';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'sonub-message-page',
    templateUrl: 'message.html'
})
export class SonubMessagePage {
    // data : MESSAGE_LIST = <MESSAGE_LIST>{};

    login: MEMBER_LOGIN = null;
    messages: MESSAGES = [];
    showCreateForm: boolean = false;
    form: MESSAGE_FORM = <MESSAGE_FORM> {};
    showSearchForm: boolean = false;
    key: string = null;
    page_no: number = 0;

    scrollListener = null;
    scrollCount = 0;
    inPageLoading: boolean = false; // true while loading a page of posts.
    noMorePosts: boolean = false; // true when there are no more posts of a page.
    constructor(
        public app: App,
        private message: Message,
        private member: Member,
        private renderer: Renderer,
        activated: ActivatedRoute,
     //   private ionic: IonicApi
    ) {
        console.log("SonubMessagePage::constructor()");

        this.login = member.getLoginData();
        if ( this.login ) {
            this.getMessages();
            this.beginScroll();
        }

        // setTimeout ( () => this.getMessages(), 1000 );
        /*
        setInterval ( () => {
        this.form.id_recv = 'lancelynyrd';
        this.form.content = 'This is the content' + (new Date()).getTime();
        this.onClickCreateFormSubmit(); }, 3000 );
        */


      activated.params.subscribe( param => {
        console.log("PostList::constructor::subscribe()")


        if ( param['user_id'] !== void 0 ) {
          this.form.id_recv = param['user_id'];
          this.showCreateForm = true;
        }

      } );
    }

    beginScroll() {
      this.scrollListener = this.renderer.listenGlobal( 'document', 'scroll', _.debounce( () => this.pageScrolled(), 50));
    }
    endScroll() {
        // this.scrollListener(); // THIS IS ERROR. IT ACUTALLY CREATES CRITICAL ERROR.
        if ( typeof this.scrollListener == 'function' ) this.scrollListener();
    }

    pageScrolled() {
      console.log("scrolled:", this.scrollCount++);
      let pages = document.querySelector(".pages");
      if ( pages === void 0 || ! pages || pages['offsetTop'] === void 0) return; // @attention this is error handling for some reason, especially on first loading of each forum, it creates "'offsetTop' of undefined" error.
      let pagesHeight = pages['offsetTop'] + pages['clientHeight'];
      let pageOffset = window.pageYOffset + window.innerHeight;
      if( pageOffset > pagesHeight - 200) { // page scrolled. the distance to the bottom is within 200 px from
        console.log("page scroll reaches at bottom: pageOffset=" + pageOffset + ", pagesHeight=" + pagesHeight);
        this.getMessages();
      }
    }

    ngOnDestroy() {
      this.endScroll();
    }

    onClickToggleContent(message : MESSAGE) {
        if ( message['show_content'] ) {
            message['show_content'] = false;
            return;
        }
        message['show_content'] = true;

        if ( message.stamp_open != "0" ) return;

        this.message.opened( message.idx, data => {
            console.log("onClickShowContent() : data: ", data);
            message.stamp_open = "1";
        },
        error => this.app.error("error on reading: " + error ),
        () => {}
        );
    }



    onClickHideContent(message : MESSAGE){
        message['show_content'] = false;
    }

    onClickReplyFormSubmit( message: MESSAGE ) {
        console.log("onClickReplyFormSubmit(): ", message);
        this.form.id_recv = message.from.id;
        this.message.send( this.form, re => {
            console.log("reply sucess: ", re);
            message['showReplyForm'] = false;
            this.sendPushNotification( re );
        },
        error => this.app.error("error on reply: " + error),
        () => {} );
    }

    getMessages( key = '' ) {
        this.inPageLoading = true;
        this.message.list( { key: key, page_no: ++this.page_no }, ( data: MESSAGE_LIST ) => {
            //console.log("this.message.list() data: ", data);
            this.inPageLoading = false;
            if ( data.messages.length == 0 ) {
              this.noMorePosts = true;
              this.endScroll();
              return;
            }
            if ( data.messages.length == 0 ) return;
            if ( this.noMorePosts == true ) {
                this.noMorePosts = false;
                this.beginScroll();
            }
            this.lazyProcess(data);
        },
        error => {
          this.inPageLoading = false;
          this.app.error( error );
        },
        () => {
            console.log("message list complete");
        });
      console.log("messages::", this.messages);
    }


     lazyProcess( data: MESSAGE_LIST ) {

        //this.pre(data);
        //this.data.messages = [];
        data.messages.map( ( v: MESSAGE, i ) => {
                setTimeout( () => {
                    this.messages.push( this.pre( v ) );
                    //this.onClickDelete(v);
                  this.app.renderPage();
                }, i * 50 );
        } );
     }




     pre (message: MESSAGE ) {
        message['date_created'] = this.member.getDateTime( message['stamp_created'] );
        return message;
     }


    addZero(i : number){
        return i >= 10 ? i : "0" + i;
    }

    onClickCreateFormSubmit() {
        this.message.send( this.form, re => {
            console.log("message send success: ", re);
            if( re.code == 0 ) {
                //this.app.error("Message successfully sent to " + this.form.id_recv);
                this.form.id_recv = '';
                this.form.content = '';
                this.showCreateForm = false;
                console.log(re);
               //this.sendPushNotification( re );

            }
            else {
                this.app.error("Message sending error");
            }
        },
        error => this.app.error("message sending error: " + error ),
        () => { }
        );
    }

    sendPushNotification( re ) {
        /*
        let option: IONIC_PUSH_MESSAGE = {
            token: re['pushToken'],
            title: "New Message",
            content: "You have a new message. Please open the message menu."
        };

        this.ionic.sendPushNotification( option, () => {
            console.info("push notification OK");
        }, err => {
            console.error("push notification error: ", err);
        });
*/
    }

    onClickMakeAllRead() {
        this.message.makeAllRead( re => {
            console.log("make all read sucess: ", re);
            //this.data = <MESSAGE_LIST>{};
            this.messages = [];
            this.page_no = 0;
            this.getMessages();
        },
        error => this.app.error("error on make all read: " + error),
        () => {} );
    }

    onClickSearchFormSubmit() {
        if ( this.showSearchForm === false ) {
            this.showSearchForm = true;
            return;
        }

        //this.data = <MESSAGE_LIST>{};
        //this.message.debug = true;
        this.messages = [];
        this.page_no = 0;
        this.getMessages( this.key );
    }


    onClickDelete( message: MESSAGE ) {
        //let re = confirm("Do you want to delete this message?");
        //if ( ! re ) return;
        this.message.delete( message.idx, re => {
            console.log("message delete success: ", re);
            message.idx = null;
        },
        error => this.app.error("error on message delete: " + error ),
        () => {} );
    }



}
