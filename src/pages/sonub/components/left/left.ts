import { Component } from '@angular/core';
import { ForumService } from '../../providers/forum';
import { App } from '../../../../providers/app';
@Component({
    selector: 'sonub-left',
    templateUrl: 'left.html'
})
export class SonubLeft {
    forums;
    forum_group;
    constructor(
        private app: App,
        forum: ForumService
    ) {
        // console.log("SonubLeft::constructor()");
        this.forums = forum.forums;
        this.forum_group = Object.keys( this.forums );
        // console.log( this.forums);
    }
    
    onLatestComponentError( error ) {
        this.app.error( error );
    }

}