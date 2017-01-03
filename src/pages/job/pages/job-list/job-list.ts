import { Component,Renderer } from '@angular/core';
import { Post} from '../../../../api/philgo-api/v2/post';
import { PAGE, PAGES } from '../../../../api/philgo-api/v2/philgo-api-interface';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { PageScroll } from './../../../../providers/page-scroll';
import { App } from '../../../../providers/app';

@Component({
  selector: 'job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {

  login: MEMBER_LOGIN = {
    id:''
  };
  sharePath = 'job/view';
  today = new Date();
  currentYear = this.today.getFullYear();
  moreButton = [];
  posts = [];
  post_id = 'jobs';
  page_no: number = 0;
  pages: PAGES = [];

  scrollListener = null;
  scrollCount = 0;
  inPageLoading: boolean = false; // true while loading a page of posts.
  noMorePosts: boolean = false; // true when there are no more posts of a page.

  constructor(private post: Post,
              private renderer: Renderer,
              private member: Member,
              private pageScroll: PageScroll,
              public app: App
  ) {
    member.getLogin( x => {
      this.login = x;
    });
    this.loadPage();
  }

  ngOnInit() {
    this.pageScroll.watch( this.renderer, no => {
      if ( this.page_no == 0 ) {
        this.page_no ++; // since 1st page has been loaded in constructor()
      }
      this.loadPage();
    } );
  }

  ngOnDestroy() {
    this.pageScroll.stop();
  }

  loadPage() {
    if ( this.inPageLoading ) {
      console.info("in page loading");
      return;
    }
    this.inPageLoading = true;
    //this.post.debug = true;
    console.log("page no: ", this.page_no);
    this.post.page( {post_id: this.post_id, page_no: ++this.page_no, limit: 4}, (page: PAGE) => {
      console.log('PostList::loadPage() page:', page);
      this.inPageLoading = false;
      if ( page.posts.length == 0 ) {
        this.noMorePosts = true;
        //this.endScroll();
        return;
      }
      if ( page.page_no == 1 ) this.pages[0] = page;
      else this.pages.push( page );
      setTimeout( () => this.lazyProcess( page ), 100 );
    }, e => {
      this.inPageLoading = false;
      if ( e == 'http-request-error maybe no-internet or wrong-domain or timeout or server-down' ) {
        alert("You have no internet.");
      }
      else alert(e);
    });
  }

  /**
   * To reduce rendering load.
   */
  lazyProcess( page: PAGE ) {
    if ( page.posts.length == 0 ) {
      return;
    }

    // for date.
    page.posts.map( post => {
      post['date'] = this.post.getDateTime( post.stamp );
      if ( post.comments === void 0 ) return;
      post.comments.map( comment => comment['date'] = this.post.getDateTime( comment.stamp ) );
    });

    // for link
    page.posts.map( post => post['link'] = this.getLink( post, this.sharePath ) );

  }

  getLink( post, path = '-' ) {
    let full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    full += '/' + path + '/' + post.idx;
    return full;
  }

}
