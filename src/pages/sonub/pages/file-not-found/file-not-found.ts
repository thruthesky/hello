import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { App } from '../../../../providers/app';
@Component({
    selector: 'file-not-found-page',
    templateUrl: 'file-not-found.html'
})
export class FileNotFoundPage {

    title: string = 'Page Not Found';
    url: string = null;
    constructor(
        private router: Router,
        public app: App
    ) {
        this.url = window.location.href;
    }

    onClickBack() {
        this.router.navigate( [ '/' ] );
    }

}
