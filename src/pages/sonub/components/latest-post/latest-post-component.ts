import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
@Component({
    selector: 'latest-post-component',
    templateUrl: 'latest-post-component.html'
})
export class LatestPostComponent {
    constructor( private app: App ) {

    }
    onLatestComponentError( error ) {
        console.error( error );
        this.app.error( error );
    }
}



