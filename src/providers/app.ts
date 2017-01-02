import { Injectable } from '@angular/core';
@Injectable()
export class App {
    _width: number = 0;
    menu: boolean = false;
    constructor() {
        console.log("App::constructor()");
    }
    /**
     * Everytime window resizes, this is set.
     */
    setWidth( width ) {
        this._width = width;
        console.log("setWidth(): ", this._width);
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

}