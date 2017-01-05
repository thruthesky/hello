import { Injectable } from '@angular/core';
//declare let navigator;
@Injectable()
export class App {
    _width: number = 0;
    menu: boolean = false;
    page: string = null; // current page tag(name or id)
    constructor() {
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
    //         alert( this.page );
    //         if ( this.page == 'home' ) {
    //             navigator.app.exitApp();
    //         }
    //         else {
    //             navigator.app.backHistory();
    //         }
    //     }, false );
    // }

}