import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertContent } from './alert-content';
import { ImageModal } from '../modal/image';
import { MemberInfoModal } from "../modal/member-info";
export interface ALERT_OPTION {
  title: string;
  content: string;
  'class'?: string;
}

export interface IMAGE_OPTION {
  'class'?: string;
  url : string;
}

export interface MEMBER_OPTION {
  'class'?: string;
  nickname : string;
  id: string;
  level:string;
  regDate: string;
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


  openImage( option: IMAGE_OPTION) {

    let modalOption = {};
    if ( option.class ) modalOption['windowClass'] = option.class;
    let modalRef = this.modalService
      .open( ImageModal, modalOption );

    modalRef.componentInstance['url'] = option.url;

  }

  openMemberInfo( option: MEMBER_OPTION) {

    let modalOption = {};
    if ( option.class ) modalOption['windowClass'] = option.class;
    let modalRef = this.modalService
      .open( MemberInfoModal, modalOption );

    modalRef.componentInstance['nickname'] = option.nickname;
    modalRef.componentInstance['id'] = option.id;
    modalRef.componentInstance['level'] = option.level;
    modalRef.componentInstance['regDate'] = option.regDate;

  }
}
