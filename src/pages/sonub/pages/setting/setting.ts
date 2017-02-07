import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
import { Config, SETTING_LANGUAGE, SETTING_FORUM_LIST_STYLE } from './../../../../etc/config';
import { Router } from '@angular/router';
@Component({
    selector: 'setting-page',
    templateUrl: 'setting.html'
})
export class SonubSettingPage {


    language = null;
    forumListStyle = null;
    constructor(
        public app: App,
        private router: Router
    ) {
        this.language = localStorage.getItem( SETTING_LANGUAGE );
        this.forumListStyle = localStorage.getItem( SETTING_FORUM_LIST_STYLE );
    }

    onClickLanguage( language ) {
        localStorage.setItem( SETTING_LANGUAGE, language );
        this.language = language;

        this.router.navigate( ['reload',  '/setting'] );
        // this.app.renderPage();
    }


    onClickClearLocalStorage() {
        this.app.alarm( "Cache data has been deleted!");
        localStorage.clear();
    }
    
    onClickForumListStyle( mode ) {
        localStorage.setItem( SETTING_FORUM_LIST_STYLE, mode );
        this.forumListStyle = mode;
    }
    

}
