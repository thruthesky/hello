import { Component, Injectable, ViewChild, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Injectable()
@Component({
    selector: 'ngb-alert',
    template: `
    <template #box let-c="close" let-d="dismiss">
      <div class="modal-header">
        <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">{{ title }}</h4>
      </div>
      <div class="modal-body">
        <p>{{ content }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="c('Close click')">Close</button>
      </div>
    </template>
    `
})
export class Alert {
    @ViewChild('box') box;
    constructor( private modalService: NgbModal  ) {
    }

    open() {
        console.log("Alert::open() this.box: ", this.box);
        let modalRef = this.modalService
            .open( this.box, { windowClass: 'just-box-modal' } )
            .result.then((result) => {
            console.info( `Closed with: ${result}` );
            }, (reason) => {
                console.info( "dismissed" );
            });
    }
}