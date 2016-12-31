import { Injectable } from '@angular/core';
@Injectable()
export class App {
    _width: number = 0;
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

}