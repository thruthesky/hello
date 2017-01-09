import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PhilippineRegion } from '../providers/philippine-region';
import { LanguagePipeModule } from "../../../pipes/language/language.pipe.module";


import { JobIndexPage } from '../pages/job-index/job-index';
import { JobListPage } from "../pages/job-list/job-list";
import { JobPostPage } from "../pages/job-post/job-post";
import { JobViewPage } from "../pages/job-view/job-view";

import { JobHeader } from '../pages/job-components/job-header/job-header';
import { JobLeft } from '../pages/job-components/job-left/job-left';
import { JobRight } from '../pages/job-components/job-right/job-right';
import { JobMainMenu } from '../pages/job-components/main-menu/main-menu';
import { JobListing } from "../pages/job-components/job-listing/job-listing";



import { PhilgoApiModule } from "../../../api/philgo-api/v2/philgo-api-module";
import { JobCurrency } from "../pages/job-components/currency/currency";
import { JobBuyAndSell } from "../pages/job-components/buy-and-sell/buy-and-sell";




/**
export let ROUTES = [
        { path: "job", component: JobIndexComponent, name: 'JobIndex' },
        { path: "job/post", component: JobEditComponent, name: 'JobEdit' },
        { path: "job/post/:idx", component: JobEditComponent, name: 'JobEdit' },
        { path: "job/list", component: JobListComponent, name: 'JobList' },
        { path: "job/view/:idx", component: JobViewComponent, name: 'JobView' }
];
 **/


@NgModule({
  declarations: [
      JobIndexPage,
      JobListPage,
      JobPostPage,
      JobViewPage,
      JobHeader,
      JobLeft,
      JobRight,
      JobMainMenu,
      JobListing,
      JobCurrency,
      JobBuyAndSell,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      RouterModule,
      LanguagePipeModule,
      PhilgoApiModule,
  ],
  providers: [ PhilippineRegion ]
})
export class JobModule {}




