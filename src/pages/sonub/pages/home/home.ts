import { Component, ViewChild } from '@angular/core';
import { ForumService } from '../../providers/forum';
import { SonubLatestPhoto } from '../../components/latest-photo/latest-photo';
@Component({
    selector: 'sonub-home-page',
    templateUrl: 'home.html'
})
export class SonubHomePage {
    forums;
    forum_group;
    page_no: number = 1;
    @ViewChild('SonubLatestPhoto') sonubLatestPhoto: SonubLatestPhoto;
    constructor(
        forum: ForumService
    ) {
        this.forums = forum.forums;
        this.forum_group = Object.keys( this.forums );
        // console.log( this.forums);
    }

    ngOnInit() {
        this.sonubLatestPhoto.loadPage( 2 );
    }
}