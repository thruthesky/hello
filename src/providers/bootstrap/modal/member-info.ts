import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'member-info-modal',
  template: `
    <div class="modal-body">
        <div>{{nickname}} 
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button></div>
        <hr>
        <div>Send Message</div>
        <div>List post of this user</div>
        <div>Level :</div>
        <div>Reg Date :</div>
    </div>
    `
})
export class MemberInfoModal {
  nickname : string = null;
  constructor( public activeModal: NgbActiveModal) {}
}
