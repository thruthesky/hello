import { Component, Renderer, ViewChild } from '@angular/core';
import { ForumService } from '../../providers/forum';
import { SonubLatestPhoto } from '../../components/latest-photo/latest-photo';
import { PageScroll } from './../../../../providers/page-scroll';
import { App } from '../../../../providers/app';
import { Post } from "../../../../api/philgo-api/v2/post";
@Component({
    selector: 'sonub-home-page',
    templateUrl: 'home.html'
})
export class SonubHomePage {
    forums;
    forum_group;
    page_no: number = 0;
    @ViewChild('sonubLatestPhoto') sonubLatestPhoto: SonubLatestPhoto;
    constructor(
        forum: ForumService,
        private pageScroll: PageScroll,
        private renderer: Renderer,
        public app: App,
        private post: Post
    ) {




        // app.alarm("App Alert Content!");
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
        this.pageScroll.watch( this.renderer, no => {
            this.page_no ++;
            console.log("ngOnInit() => pageScroll() => no: ", this.page_no);
            this.sonubLatestPhoto.loadPage( this.page_no );
        } );
    }

    ngOnDestroy() {
        this.pageScroll.stop();
    }

    onEditComponentShowMemberInfo( post ) {
      post.member['regDate'] = this.post.getDateTime( post.member.stamp ) ;
      this.app.memberInfoView( post );
    }


}
