import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
@Component({
    selector: 'help-page',
    templateUrl: 'help.html'
})
export class SonubHelpPage {

    post_id : string;
    showPostCreateFrom : boolean = false;
    constructor(
        public app: App
    ) {

    }


     onClickPostCreate( post_id ) {
        this.post_id = post_id;
        this.showPostCreateFrom = true;
     }


       editComponentOnCancel() {
        this.showPostCreateFrom = false;
    }

    editComponentOnSuccess() {
        this.showPostCreateFrom = false;
    }

}
