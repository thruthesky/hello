import { Injectable } from '@angular/core';
//declare let navigator;
import { Alert, ALERT_OPTION } from '../providers/bootstrap/alert/alert';
@Injectable()
export class App {
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
        if ( this.width < 760 ) return 'small';
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
        this.showModal( option );
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
}