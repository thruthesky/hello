import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertContent } from './alert-content';
export interface ALERT_OPTION {
    title: string;
    content: string;
    'class'?: string;
}
@Injectable()
export class Alert {
    constructor( private modalService: NgbModal  ) {
    }

    open( option: ALERT_OPTION, yesCallback?: () => void, noCallback?: () => void ) : NgbModalRef {
        
        //console.log("AlertContent: ", AlertContent);

        let modalOption = {};
        if ( option.class ) modalOption['windowClass'] = option.class;
        let modalRef = this.modalService
            .open( AlertContent, modalOption );
        
        modalRef.componentInstance['title'] = option.title;
        modalRef.componentInstance['content'] = option.content;
        
        modalRef.result.then((result) => {
            console.info( `Closed with: ${result}` );
            if ( yesCallback ) yesCallback();
        }, (reason) => {
            console.info( "dismissed" );
            if ( noCallback ) noCallback();
        });

        return modalRef;
    }
}