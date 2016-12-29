import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppRouter } from './app.router';


/** Import Pages Default Pages  **/
import { HelpPage } from '../pages/help/help';

/** Importing Sonub Pages **/
import { SonubHomePage } from "../pages/sonub/pages/home/home";
import { SonubLoginPage } from '../pages/sonub/pages/user/login/login';
import { SonubRegisterPage } from '../pages/sonub/pages/user/register/register';
import { SonubMessagePage } from '../pages/sonub/pages/message/message';
import { SonubForumIndexPage } from '../pages/sonub/pages/forum/index/forum-index';
import { SonubPostListPage } from '../pages/sonub/pages/forum/list/post-list';

/** Importing Job Pages **/
import { JobIndexComponent } from '../pages/job/pages/job-index/job-index.component';
import { JobListComponent } from "../pages/job/pages/job-list/job-list.component";
import { JobEditComponent } from "../pages/job/pages/job-edit/job-edit.component";
import { JobViewComponent } from "../pages/job/pages/job-view/job-view.component";

/** Importing Base Pages **/
import { FileNotFoundPage } from "../pages/base/file-not-found/file-not-found";


const appRoutes: Routes = [

    /** Default Pages **/
    { path: '', component: SonubHomePage },
    { path: 'help', component: HelpPage },


    /** Sonub Pages **/
    { path: 'user/register', component: SonubRegisterPage },
    { path: 'user/login', component: SonubLoginPage },
    { path: "forum", component: SonubForumIndexPage },
    { path: "forum/:post_id", component: SonubPostListPage },
    { path: "article/:idx_post", component: SonubPostListPage },
    { path: "message", component: SonubMessagePage },

    /** Job Pages **/
    { path: "job", component: JobIndexComponent },
    { path: "job/post", component: JobEditComponent },
    { path: "job/post/:idx", component: JobEditComponent },
    { path: "job/list", component: JobListComponent },
    { path: "job/view/:idx", component: JobViewComponent },

    /** Base Pages **/
    { path: '**', component: FileNotFoundPage }
];

@NgModule({
    declarations: [
        HelpPage
    ],
    imports: [
        RouterModule.forRoot( appRoutes )
    ],
    exports: [
        RouterModule
    ],
    providers: [ AppRouter ]
})
export class AppRouteModule {}
