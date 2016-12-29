import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRouteModule } from './app.route.module';

import { BaseModule } from "../pages/base/base.module";

import { SonubModule } from "../pages/sonub/sonub.module";

import { JobModule } from "../pages/job/app/job.module";

import { IonicApiModule } from "../providers/ionic-api-0.2/ionic-api.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    IonicApiModule,
    BaseModule,
    SonubModule,
    JobModule,
  ],
  bootstrap: [ AppComponent ],
  providers: [ ]
})
export class AppModule {}


