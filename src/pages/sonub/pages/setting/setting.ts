import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
import { Config, SETTING_LANGUAGE } from './../../../../etc/config';
import { Router } from '@angular/router';
@Component({
    selector: 'setting-page',
    templateUrl: 'setting.html'
})
export class SonubSettingPage {


    language = null;
    constructor(
        public app: App,
        private router: Router
    ) {
        this.language = localStorage.getItem( SETTING_LANGUAGE );
    }

    onClickLanguage( language ) {
        localStorage.setItem( SETTING_LANGUAGE, language );
        this.language = language;

        this.router.navigate( ['reload',  '/setting'] );
    }


    onClickClearLocalStorage() {
        this.app.alarm( "Cache data has been deleted!");
        localStorage.clear();
    }
    
    

}
