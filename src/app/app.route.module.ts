import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppRouter } from './app.router';



/** Importing Sonub Pages **/
import { SonubHomePage } from "../pages/sonub/pages/home/home";
import { SonubLoginPage } from '../pages/sonub/pages/user/login/login';
import { SonubRegisterPage } from '../pages/sonub/pages/user/register/register';
import { SonubMessagePage } from '../pages/sonub/pages/message/message';
import { SonubForumIndexPage } from '../pages/sonub/pages/forum/index/forum-index';
import { SonubPostListPage } from '../pages/sonub/pages/forum/list/post-list';
import { SonubBusinessPage } from '../pages/sonub/pages/business/business';
import { SonubHelpPage } from '../pages/sonub/pages/help/help';
import { SonubEventPage } from '../pages/sonub/pages/event/event';
import { SonubSettingPage } from '../pages/sonub/pages/setting/setting';

import { FileNotFoundPage } from "../pages/sonub/pages/file-not-found/file-not-found";


/** Importing Job Pages **/
import { JobIndexPage } from '../pages/job/pages/job-index/job-index';
//import { JobListPage } from "../pages/job/pages/job-list/job-list";
import { JobPostPage } from "../pages/job/pages/job-post/job-post";
import { JobViewPage } from "../pages/job/pages/job-view/job-view";


import {SonubReloadPage} from "../pages/sonub/pages/reload/reload";

const appRoutes: Routes = [

    /** Job Pages **/
    { path: "job/post", component: JobPostPage },
    { path: "job/post/:idx", component: JobPostPage },
    // { path: "job/list", component: JobListPage },
    { path: "job/view/:idx", component: JobViewPage },
    { path: "job", component: JobIndexPage },


    /** Sonub Pages **/
    { path: 'user/register', component: SonubRegisterPage },
    { path: 'user/login', component: SonubLoginPage },

    { path: "message/:user_id", component: SonubMessagePage },
    { path: "message", component: SonubMessagePage },
    { path: "business", component: SonubBusinessPage },
    { path: "help", component: SonubHelpPage },
    { path: "event", component: SonubEventPage },
    { path: "setting", component: SonubSettingPage },


    /** Sonub forum routes */
    { path: "forum/user/:user_id", component: SonubPostListPage },
    { path: "forum/:post_id/:idx_post", component: SonubPostListPage },
    { path: "forum/:post_id", component: SonubPostListPage },
    { path: "article/:idx_post", component: SonubPostListPage },
    { path: "forum", component: SonubForumIndexPage },


    { path: "reload/:url", component: SonubReloadPage },
    { path: "reload", component: SonubReloadPage },

    { path: '', component: SonubHomePage },

    /** Default Base Pages **/
    { path: '**', component: FileNotFoundPage }
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes, { useHash: ! history.pushState })
    ],
    exports: [
        RouterModule
    ],
    providers: [ AppRouter ]
})
export class AppRouteModule {}
