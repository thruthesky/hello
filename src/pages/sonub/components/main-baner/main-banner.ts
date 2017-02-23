import { Component } from '@angular/core';
import { App } from './../../../../providers/app';
import { Post, PAGE, PAGE_OPTION } from './../../../../api/philgo-api/v2/post';
@Component({
    selector: 'sonub-main-banner',
    templateUrl: 'main-banner.html'
})
export class SonubMainBanner {
    constructor( app: App, post: Post ) {
        let option: PAGE_OPTION = {
            post_id: 'main_banner',
            limit: 1,
            expire: 604800 // one week.
        };

        post.page( option, (page: PAGE) => {
            console.log(page);
        },
        error => {
            app.error( error );
        },
        () => {} );
    }
}