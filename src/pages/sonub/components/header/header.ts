import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';

import { Router } from '@angular/router';
@Component({
    selector: 'sonub-header',
    templateUrl: 'header.html'
})
export class SonubHeader {
    login: MEMBER_LOGIN = null;
    constructor(
        public app: App,
        public member: Member,
        private router: Router
    ) {
        // app.menu = app.size == 'small';
        app.menu = false;
        member.getLogin( x => this.login = x );
        this.onClickMenu();
    }
    onClickHeader() {
        window.scrollTo( 0, 0 );
        if ( this.app.menu ) this.app.menu = false;
    }
    onClickLogout() {
        this.login = null;
        this.member.logout();
    }

    onClickMenu( event? ) {
        if ( event ) event.stopPropagation();
        window.scrollTo( 0, 0 );
        this.app.menu = ! this.app.menu;
    }

    onClickRoute( url ) {
      console.log('#########activeroute', url);
      
      
      let active = this.router.isActive( url, true);
      if(active) {
        this.router.navigate( ['reload',  url] );
      }
      else {
        this.router.navigateByUrl( url );
      }

    }

}
