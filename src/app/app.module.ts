import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route.module';

import { App } from '../providers/app';


import { SonubModule } from "../pages/sonub/sonub.module";

import { JobModule } from "../pages/job/app/job.module";

import { IonicApiModule } from "../providers/ionic-api-0.2/ionic-api.module";


import { PageScroll } from '../providers/page-scroll';


import { BootstrapModule } from '../providers/bootstrap/bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    IonicApiModule,
    SonubModule,
    JobModule,
    BootstrapModule
  ],
  bootstrap: [ AppComponent ],
  providers: [ App, PageScroll ]
})
export class AppModule {}


