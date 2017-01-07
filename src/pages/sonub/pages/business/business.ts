import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
@Component({
    selector: 'business-page',
    templateUrl: 'business.html'
})
export class SonubBusinessPage {
    title: string = 'Page Not Found';

    constructor(
        public app: App
    ) {

    }

}
