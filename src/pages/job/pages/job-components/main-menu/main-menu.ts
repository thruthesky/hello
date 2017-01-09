import { Component } from '@angular/core';
//import { Alert, ALERT_OPTION } from '../../../../providers/bootstrap/alert/alert';
import { Member, MEMBER_LOGIN } from '../../../../../api/philgo-api/v2/member';
import { App } from '../../../../../providers/app';
@Component({
    selector: 'job-main-menu',
    templateUrl: 'main-menu.html'
})
export class JobMainMenu {
    login: MEMBER_LOGIN = null;
    constructor(
        public app: App,
        public member: Member
    ) {
        member.getLogin( x => this.login = x );
    }
    onClickMenu() {
        this.app.menu = false;
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
