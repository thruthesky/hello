import { Component, Input } from '@angular/core';
import { Member, MEMBER_LOGIN_DATA } from '../../../../../api/philgo-api/v2/member';
import { AppRouter } from '../../../../../app/app.router';
import { App } from "../../../../../providers/app";
@Component ({
    selector: 'job-header',
    templateUrl: 'job-header.html'
})
export class JobHeader {
    isAllMenuActive: boolean = false;
    @Input() title: string = '';
    login: MEMBER_LOGIN_DATA = <MEMBER_LOGIN_DATA> {};
    constructor(
        public app: App,
        private member: Member,
        private router: AppRouter
    ) {
        //setTimeout(() => this.login = this.member.logged(), 10);
        app.menu = false;
        member.getLogin( x => this.login = x );
    }

    onClickHeader() {
        window.scrollTo( 0, 0 );
    }
    onClickLogout() {
        this.login = null;
        this.member.logout();
    }

    onClickMenu() {
        this.app.menu = ! this.app.menu;
    }
}