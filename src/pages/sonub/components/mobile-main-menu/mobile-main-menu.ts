import { Component } from '@angular/core';
//import { Alert, ALERT_OPTION } from '../../../../providers/bootstrap/alert/alert';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { App } from '../../../../providers/app';
@Component({
    selector: 'mobile-main-menu',
    templateUrl: 'mobile-main-menu.html'
})
export class SonubMobileMainMenu {
    login: MEMBER_LOGIN = null;
    constructor(
        public app: App,
        public member: Member
    ) {
        member.getLogin( x => this.login = x );
    }
    onClickClearLocalStorage() {
        this.app.alarm( "Cache data has been deleted!");
        localStorage.clear();
    }
    
    onClickLogout() {
        this.login = null;
        this.member.logout();
    }

}
