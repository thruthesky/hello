/**
 * @see ./README.md
 */
import { Component, Input } from '@angular/core';
import { Config } from './../../../../../etc/config';
import { PAGES } from '../../../../../api/philgo-api/v2/philgo-api-interface';
import { Post } from '../../../../../api/philgo-api/v2/post';
import { MEMBER_LOGIN } from '../../../../../api/philgo-api/v2/member';
import { Router } from '@angular/router';
import { App } from '../../../../../providers/app';

@Component({
  selector: 'job-listing',
  templateUrl: 'job-listing.html',
})
export class JobListing {
  isPost: boolean = false;
  isComment: boolean = false;
  hideContent: boolean = false;
  cordova = true;


  ek = Config.englishOrKorean;
  t = Config.translate;

  today = new Date();
  currentYear = this.today.getFullYear();
  @Input() mode : string = 'posts';
  @Input() pages : PAGES = null;
  @Input() login : MEMBER_LOGIN = {
    id: ''
  };
  @Input() root = [];

  //active: boolean = false; // "active==true" means, the use is in editing.

  constructor(private router: Router,
              private _post: Post,
              public app: App) {
    this.cordova = this._post.isCordova();
    console.log("JobListing()");
  }

  ngOnInit() {
    if (this.pages === null) return this.app.error("Listing Component Error: post is null");
    console.log('this.pages', this.pages);
  }


  onClickEdit(idx){
    this.router.navigate(['/job/post', idx]);
  }


  onClickDelete( post ) {
    let re = confirm("Are you sure you want to delete this post?");
    if ( re ) {
      this._post.delete( post.idx, re => {
          this.app.notice("Successful on Deleting this post...");
          post.idx = null;
        },
        error => this._post.error("delete error: " + error )
      );
    }
    else {
      //console.log('delete Was Canceled');
    }
  }
}
