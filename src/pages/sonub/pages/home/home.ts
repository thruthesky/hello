import { Component, Renderer, ViewChild } from '@angular/core';
import { ForumService } from '../../providers/forum';
import { SonubLatestPhoto } from '../../components/latest-photo/latest-photo';
import { PageScroll } from './../../../../providers/page-scroll';
import { App } from '../../../../providers/app';
@Component({
    selector: 'sonub-home-page',
    templateUrl: 'home.html'
})
export class SonubHomePage {
    forums;
    forum_group;
    page_no: number = 1;
    @ViewChild('sonubLatestPhoto') sonubLatestPhoto: SonubLatestPhoto;
    constructor(
        forum: ForumService,
        private pageScroll: PageScroll,
        private renderer: Renderer,
        public app: App
    ) {
        this.forums = forum.forums;
        this.forum_group = Object.keys( this.forums );
        // console.log( this.forums);
    }

    ngOnInit() {
        this.pageScroll.watch( this.renderer, no => {
            this.page_no ++;
            this.sonubLatestPhoto.loadPage( this.page_no );
        } );
    }

    ngOnDestroy() {
        this.pageScroll.stop();
    }

}
