import { Component } from '@angular/core';
import { App } from './../../../../providers/app';
import { Post, PAGE, PAGE_OPTION } from './../../../../api/philgo-api/v2/post';
@Component({
    selector: 'sonub-main-banner',
    templateUrl: 'main-banner.html'
})
export class SonubMainBanner {
    link: string = null;
    src: string = null;
    constructor( app: App, post: Post ) {
        let option: PAGE_OPTION = {
            post_id: 'main_banner',
            limit: 1,
            expire: 604800 // one week.
        };

        post.page( option, (page: PAGE) => {
            console.log('main-banner:', page);
            
            if ( page.posts && page.posts.length ) {
                let post = page.posts[0];
                this.link = post.link;
                if ( post.photos !== void 0 ) {
                    this.src = post.photos[0].url;
                }
            }

            

        },
        error => {
            app.error( error );
        },
        () => {} );
    }
}