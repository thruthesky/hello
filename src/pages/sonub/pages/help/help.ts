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

}
