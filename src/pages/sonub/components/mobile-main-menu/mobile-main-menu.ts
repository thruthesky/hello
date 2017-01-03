import { Component } from '@angular/core';
import { Alert, ALERT_OPTION } from '../../../../providers/bootstrap/alert/alert';
@Component({
    selector: 'mobile-main-menu',
    templateUrl: 'mobile-main-menu.html'
})
export class SonubMobileMainMenu {
    constructor( private alert: Alert ) { }
    onClickClearLocalStorage() {

        let o: ALERT_OPTION = {
            title: 'Erase',
            content: 'Do you want to delete cache data?',
            class: 'warning'
        }
        this.alert.open(o, () => {
            console.log("clearing cache on localStorage");
            localStorage.clear();
        });
    }
}
