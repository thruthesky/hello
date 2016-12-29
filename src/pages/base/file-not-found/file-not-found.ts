
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'file-not-found-page',
  templateUrl: 'file-not-found.html'
})
export class FileNotFoundPage {

  title: string = 'Page Not Found';
  constructor(
      private router: Router
  ) {

  }

  onClickBack() {
    this.router.navigate( [ '/' ] );
  }

}
