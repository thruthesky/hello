import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
@Component({
    selector: 'help-page',
    templateUrl: 'help.html'
})
export class SonubHelpPage {

    post_id : string;
    post_name : string;
    showPostCreateFrom : boolean = false;
    constructor(
        public app: App
    ) {

    }


     onClickPostCreate( post_id , post_name) {
        this.post_name = post_name;
        this.post_id = post_id;
        this.showPostCreateFrom = true;
     }


    editComponentOnCancel() {
        this.post_name =  "";
        this.showPostCreateFrom = false;
    }

    editComponentOnSuccess() {
         this.post_name =  "";
         this.showPostCreateFrom = false;
    }

    editComponentOnError() {
         this.post_name = "";
         this.showPostCreateFrom = false;
    }

}
