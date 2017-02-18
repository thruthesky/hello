import { Component } from '@angular/core';
import { Member, MEMBER_LOGIN } from '../../../../../api/philgo-api/v2/member';
import { App } from '../../../../../providers/app';
import { Router } from '@angular/router';
@Component({
    selector: 'job-main-menu',
    templateUrl: '../../../../sonub/components/main-menu/main-menu.html'
})
export class JobMainMenu {
    login: MEMBER_LOGIN = null;
    constructor(
        private router: Router,
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
      this.router.navigateByUrl('/');
    }

}
