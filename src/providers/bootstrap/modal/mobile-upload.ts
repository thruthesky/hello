import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'mobile-upload-modal',
  template: `
    <div class="modal-body">
        <div class="text nickname">Image Upload...
        <button type="button" class="close" (click)="activeModal.dismiss('cross')">
          <span aria-hidden="true">&times;</span>
        </button></div>
        <hr>
        <div class="text camera" (click)="activeModal.close('camera')">CAMERA</div>
        <div class="text photo" (click)="activeModal.close('photo')">PHOTOS</div>
    </div>
    `
})
export class MobileUploadModal {
  constructor( public activeModal: NgbActiveModal) {}
}
