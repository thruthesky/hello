import { Injectable, NgZone } from '@angular/core';
import { AppComponent } from '../app/app.component';
import { LanguagePipe } from '../pipes/language/language.pipe';
import { Config, SETTING_LANGUAGE } from '../etc/config';
//declare let navigator;
import { Alert, ALERT_OPTION, IMAGE_OPTION, MEMBER_OPTION } from '../providers/bootstrap/alert/alert';
const BREAK_POINT = 760; // it should match in vars.scss
@Injectable()
export class App {
    appComponent: AppComponent = null;
    _width: number = 0;
    menu: boolean = false;
    page: string = null; // current page tag(name or id)
    constructor( private alertService: Alert,
        private ln: LanguagePipe,
        private ngZone: NgZone ) {
        // console.log("App::constructor()");
    }


    /**
     * Everytime window resizes, this is set.
     */
    setWidth( width ) {
        this._width = width;
        this.renderPage();
        // console.log("setWidth(): ", this._width);
    }
    get width() {
        return this._width;
    }
    get size() {
        if ( this.width < BREAK_POINT ) return 'small';
        else return 'big';
    }

    /**
     * @warning This may return false if this is called before 'deviceready'event fired.
     *  so, be sure you call it after 'deviceready' event.
     */
    isCordova () {
        if ( !! window['cordova'] ) return true;
        if ( document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1 ) return true;
        return false;
    }

    // addBackButtonEventListener() {

    //     document.addEventListener("backbutton", () => {
    //         a lert( this.page );
    //         if ( this.page == 'home' ) {
    //             navigator.app.exitApp();
    //         }
    //         else {
    //             navigator.app.backHistory();
    //         }
    //     }, false );
    // }



    private showModal( option: ALERT_OPTION ) {
        option.content = this.ln.t( option.content );
        this.alertService.open( option, () => {
            console.info("alert OK");
        });
    }


    private showImageModal( option: IMAGE_OPTION ) {
      this.alertService.openImage( option );
    }

    private showMemberInfoModal( option: MEMBER_OPTION ) {
      this.alertService.openMemberInfo( option );
    }


    imageFullView( url ) {
      let option: IMAGE_OPTION = {
        'class': 'full-image',
        url : url
      };
      this.showImageModal( option );
    }

    memberInfoView( post ) {
      let option: MEMBER_OPTION = {
        'class': 'member-info',
        nickname : post.member.nickname
      };
      this.showMemberInfoModal( option );
    }

    warning( content ) {
        let option: ALERT_OPTION = {
            title: "WARNING",
            content: content,
            class: 'warning'
        };
        this.showModal( option );
    }
    alarm( content: string ) {
        let option: ALERT_OPTION = {
            title: "ALARM",
            content: content,
            class: 'alarm'
        };
        this.showModal( option );
    }

    error( content ) {
        let option: ALERT_OPTION = {
            title: "ERROR",
            content: content,
            class: 'error'
        };
        console.log(option);
        this.toast( option );
    }

    notice( content ) {
        let option: ALERT_OPTION = {
            title: "NOTICE",
            content: content,
            class: 'notice'
        };
        console.log(option);
        this.toast( option );
    }


    toast( option ) {
        this.appComponent.toast.class = option.class;
        this.appComponent.toast.active = true;
        this.appComponent.toast.content = this.ln.t(option.content);
        setTimeout( () => this.appComponent.toast.active = false, 350000 );
    }

    renderPage() {
        this.ngZone.run( () => {

        });
    }


    language() : string {
        let language_code = Config.language;
        let lc = localStorage.getItem( SETTING_LANGUAGE );
        if ( lc ) language_code = lc;
        return lc;
    }

}
