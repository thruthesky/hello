import { Component, Renderer, ViewChild } from '@angular/core';
import { ForumService } from '../../providers/forum';
import { SonubLatestPhoto } from '../../components/latest-photo/latest-photo';
import { PageScroll } from './../../../../providers/page-scroll';
import { App } from '../../../../providers/app';
import { Alert } from '../../../../providers/bootstrap/alert/alert';

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
        private alert: Alert,
        forum: ForumService,
        private pageScroll: PageScroll,
        private renderer: Renderer,
        public app: App
    ) {
        
        this.forums = forum.forums;
        this.forum_group = Object.keys( this.forums );
        // let modalRef = this.modalService
        //     .open( this.app.alertModal, { windowClass: 'information-modal' } )
        //     .result.then((result) => {
        //     console.info( `Closed with: ${result}` );
        //     }, (reason) => {
        //         console.info( "dismissed" );
        //     });
    }

    ngOnInit() {
        this.alert.open();
        this.pageScroll.watch( this.renderer, no => {
            this.page_no ++;
            this.sonubLatestPhoto.loadPage( this.page_no );
        } );
    }

    ngOnDestroy() {
        this.pageScroll.stop();
    }


}
