import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FileNotFoundPage } from './file-not-found/file-not-found';


@NgModule({
    declarations: [
        FileNotFoundPage
    ],
    imports: [
        BrowserModule,
    ],
    providers: []
})
export class BaseModule {}
