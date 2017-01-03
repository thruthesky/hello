
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'file-not-found-page',
  templateUrl: 'file-not-found.html'
})
export class FileNotFoundPage {

  title: string = 'Page Not Found';
  url: string = null;
  constructor(
      private router: Router
  ) {

    this.url = window.location.href;

  }

  onClickBack() {
    this.router.navigate( [ '/' ] );
  }

}
