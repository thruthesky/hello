import { Component } from '@angular/core';
import { App } from '../../../../../providers/app';
@Component({
    selector: 'job-left',
    templateUrl: 'job-left.html'
})
export class JobLeft {
    constructor( private app: App ) {

    }
    onLatestComponentError( error ) {
        this.app.error( error );
    }
}