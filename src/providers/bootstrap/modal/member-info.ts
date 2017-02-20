import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'member-info-modal',
  template: `
    <div class="modal-body">
        <div class="text nickname">{{nickname}} ( {{id}} )
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button></div>
        <hr>
        <div class="text message" routerLink="message/{{id}}" (click)="activeModal.close('send message click')">Send Message</div>
        <div class="text post-list" routerLink="forum/user/{{id}}" (click)="activeModal.close('post of this user click')">List post of this user</div>
        <div class="text level">Level : {{level}}</div>
        <div class="text reg-date">Reg Date : {{regDate}}</div>
    </div>
    `
})
export class MemberInfoModal {
  nickname : string = null;
  id : string = null;
  level : string = null;
  regDate : string = null;
  constructor( public activeModal: NgbActiveModal) {}
}
