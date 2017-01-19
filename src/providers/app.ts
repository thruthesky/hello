import { Injectable } from '@angular/core';
import { AppComponent } from '../app/app.component';
//declare let navigator;
import { Alert, ALERT_OPTION } from '../providers/bootstrap/alert/alert';
const BREAK_POINT = 760; // it should match in vars.scss
@Injectable()
export class App {
    appComponent: AppComponent = null;
    _width: number = 0;
    menu: boolean = false;
    page: string = null; // current page tag(name or id)
    constructor( private alertService: Alert ) {
        // console.log("App::constructor()");
    }
    /**
     * Everytime window resizes, this is set.
     */
    setWidth( width ) {
        this._width = width;
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
        this.alertService.open( option, () => {
            console.info("alert OK");
        });
    }

    error( content ) {
        let option: ALERT_OPTION = {
            title: "ERROR",
            content: content,
            class: 'error'
        };
        console.log(option);
        // this.showModal( option );
        this.toast( option );
    }

    warning( content ) {
        let option: ALERT_OPTION = {
            title: "WARNING",
            content: content,
            class: 'warning'
        };
        this.showModal( option );
    }
    alarm( content ) {
        let option: ALERT_OPTION = {
            title: "ALARM",
            content: content,
            class: 'alarm'
        };
        this.showModal( option );
    }

    toast( option ) {
        this.appComponent.toast.active = true;;
        this.appComponent.toast.content = option.content;
        setTimeout( () => this.appComponent.toast.active = false, 1000 );
    }
    
}