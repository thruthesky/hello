import { Component } from '@angular/core';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
@Component({
    selector: 'sonub-header',
    templateUrl: 'header.html'
})
export class SonubHeader {
    login: MEMBER_LOGIN = null;
    constructor( public member: Member ) {
        member.getLogin( x => this.login = x );
    }
    onClickLogout() {
        this.login = null;
        this.member.logout();
    }
}