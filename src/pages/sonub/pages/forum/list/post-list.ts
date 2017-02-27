import { Component, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageScroll } from './../../../../../providers/page-scroll';
import { Post, PAGE, POSTS, POST, PAGE_OPTION, ADS, POST_TOP_ADS, POST_TOP_PREMIUM_ADS } from "../../../../../api/philgo-api/v2/post";
import { App } from '../../../../../providers/app';
import { Member, MEMBER_LOGIN } from '../../../../../api/philgo-api/v2/member';
//import { languageText } from './../../../../../etc/language-text';
import { SETTING_FORUM_LIST_STYLE } from './../../../../../etc/config';

@Component({
  selector: 'sonub-post-list',
  templateUrl: 'post-list.html'
})
export class SonubPostListPage {
  // pages: PAGES = <PAGES> [];
  login: MEMBER_LOGIN = null;
  posts: POSTS = <POSTS> [];
  view: POST = null;
  showPostCreateFrom: boolean = false;
  post_id: string = ''; // forum ( post ) id.
  post_name: string = ''; // forum name.
  user_id: string = ''; // post list by user id.
  page_no: number = 0;
  limit: number =  30;
  ads: ADS = null;
  post_top_ad: POST_TOP_ADS = null;
  post_top_premium_ad: POST_TOP_PREMIUM_ADS = null;
  scrollListener = null;
  scrollCount = 0;
  inPageLoading: boolean = false; // true while loading a page of posts.

  noMorePosts: boolean = false; // true when there are no more posts of a page.

  forumListStyle: string = null;
  ln: string = null;
  constructor( private post: Post,
               private member: Member,
               activated: ActivatedRoute,
               private renderer: Renderer,
               private app: App,
               private pageScroll: PageScroll ) {
    //console.log("SonubPostListPage::constructor()");

    post.setLanguage( app.language() );
    this.ln = app.language();

    this.login = member.getLoginData();
    this.forumListStyle = localStorage.getItem( SETTING_FORUM_LIST_STYLE );
    activated.params.subscribe( param => {

      this.app.checkNewMessage();

      //console.log("PostList::constructor::subscribe()")

      // clear everything and initialize here.
      this.noMorePosts = false;
      this.post_id = null;
      this.post_name = null; //
      window.scrollTo( 0, 0 ); // when a forum clicked on a forum in the middle of the page, it does not scroll top. 게시판이 열려 있는 상태에서 다시 게시판을 열면 scrollTop 이 안되므로, 여기서 임의적으로 해 준다.
      this.clearAds(); // it must be here to clear previous forum's ads.
      this.posts = <POSTS> []; // clear





      if ( param['user_id'] !== void 0 ) {
        this.loadUserPosts( param['user_id'] );
      }
      else {
        if ( param['post_id'] !== void 0 ) {
          this.loadPosts( param['post_id'] );
        }
        if ( param['idx_post'] !== void 0 ) {
          this.loadPost( param['idx_post'] );
        }
      }



    } );
  }

  ngOnInit() {

    this.pageScroll.watch( this.renderer, no => {
      if ( this.page_no == 0 ) {
        this.page_no ++; // since 1st page has been loaded in constructor()
      }
      if ( this.post_id || this.user_id ) this.loadPage(); // call 'loadPage()' after the view-post has been loaded. ( or when post-list clicked )
    } );
  }
  ngOnDestroy() {
    this.pageScroll.stop();
  }

  /**
   * It clears all ads array.
   */
  clearAds() {
    this.ads = null;
    this.post_top_ad = null;
    this.post_top_premium_ad = null;
  }

  /**
   * This loads posts for a page.
   *
   * It does some initialization before 'loadPage()'.
   * This must be called only one time per 'visit/view'.
   * If you need to load next page, call 'loadPage()'
   */
  loadPosts( post_id: string ) {
    this.post_id = post_id;

    this.page_no = 0;
    if ( this.post_id ) {
      this.post_id = this.post_id.replace('--', ','); // @deprecated. do not use "freetalk,qna,knowhow" to search many forums. // it will be removed soon.
      this.loadPage();
    }
    else {
      this.app.error("No post id provided");
    }
    // this.beginScroll();
  }


  loadUserPosts( user_id: string ) {
    this.user_id = user_id;
    this.page_no = 0;
    this.loadPage();
  }



  /**
   * This loads only one ( 1 ) post for 'view' mode and loads a bunch of posts for that post_id.
   */
  loadPost(idx_post) {
    // console.log("SonubPostListPage::loadPost("+idx_post+")");
    //this.post.debug = true;
    this.post.load(idx_post, response => {

      console.log("data loaded:", response);
      this.view = this.pre( <POST> response.post );
      if ( this.view == null ) return this.app.error("Post Not Found...");
      this.view['minimize'] = false;


      //console.log("Load a post for view : ", this.view );
      // console.log("Load post success on idx : ", idx_post);

      if ( ! this.post_id ) this.loadPosts( this.view.post_id );
    }, error => {
      this.app.error(error);
      /// this.app.error("Load post error" + error);
    });
  }

  loadPage() {
    if ( this.inPageLoading ) {
      // console.info("in page loading");
      return;
    }
    this.inPageLoading = true;
    this.page_no++;

    let option: PAGE_OPTION = {
      post_id: this.post_id,
      user_id: this.user_id,
      page_no: this.page_no,
      limit: this.limit
    };
    // this.post.debug = true;
    // console.log("load page: ", option);
    this.post.page( option, (page: PAGE) => { // two 1st page because there is a cache for 1st page.
        // console.log("Page no: ", page);
        this.post_name = page.post_name;
        this.inPageLoading = false;



        if ( page.posts.length == 0 || page.posts.length < this.limit ) {
          this.noMorePosts = true;
          //this.endScroll();
        }

        //page.posts.map( post => this.posts.push( post ) );



        if ( page.page_no == 1 ) {
          this.replacePush( page, option );
          //if ( page.post_top_ad !== void 0 && page.post_top_ad.length ) this.post_top_ad = page.post_top_ad;
          if ( page.ads !== void 0 ) this.ads = page.ads;
          if ( page.post_top_ad !== void 0 && page.post_top_ad.length ) {
            for ( let ad of page.post_top_ad ) {
              let arrEx = this.post.explode( '%3D', ad.url );
              let no = arrEx[ arrEx.length -1 ];
              ad['ad_idx'] = no;
            }
            this.post_top_ad = page.post_top_ad;
            // console.log(this.post_top_ad);
          }
          if ( page.post_top_premium_ad !== void 0 && page.post_top_premium_ad.length ) {
            for ( let ad of page.post_top_premium_ad ) {
              let arrEx = this.post.explode( '%3D', ad.url );
              let no = arrEx[ arrEx.length -1 ];
              ad['ad_idx'] = no;
            }
            this.post_top_premium_ad = page.post_top_premium_ad;
          }
        }
        else this.delayPush( page );
        //console.log('################', this.posts);


      },
      error => {
        this.inPageLoading = false;
        this.app.error( error );
        // this.post.error("Page Load Error: " + error);
      },
      () => {} );
  }

  delayPush( page:PAGE ) {
    let posts = page.posts;
    posts.map( ( v, i ) => {
      setTimeout( () => {
          this.posts.push ( this.pre(v) );
        this.app.renderPage();
        },
        100 + i * 50 );
    });
  }
  /**
   * 이것은 글 하나씩 바꿔치기하므로 blinking 이 발생하지 않는다.
   * 또한 첫 페이지에서 기존 글이 모두 올바로 제거된다.
   * 새로운 글이 있으면 맨 아래의 기존 글은 다음페이지에 보이므로
   * 그냥 해당 갯 수 만큼 바꿔치기 하면 된다.
   * 요점 : 한꺼번에 한 페이지 전체를 바꿔치기 하지 않고, 약간의 시간차로 하나씩 바꿔치기 한다.
   */
  replacePush( page: PAGE, option: PAGE_OPTION ) {
    for( let i = 0; i < option.limit; i ++ ) {
      setTimeout( () => {
        this.posts[i] = this.pre(page.posts[i]);
        this.app.renderPage();
      }, 100 + i * 30);
    }
  }
  /**
   * 이것은 그냥 첫 페이지 게시글을 한번에 없애버리므로 blinking 이 발생한다.
   */
  removeFirstPage( option: PAGE_OPTION ) {
    // console.log("removeFirstPage() : ", option);
    if ( this.posts.length == 0 ) {
      // console.log("No post. just return");
      return;
    }
    // console.log("before: ", this.posts.length);
    this.posts.splice( 0, option.limit );
    // console.log("after: ", this.posts.length);
  }


  /**
   * @return POST DATA or null if the post is wrong/malformed.
   */
  pre( post: POST ) : POST {


    //console.log('pre: ', post);
    if ( post === void 0 ) return null; // this error really happened.
    if ( post.idx === void 0 || ! post.idx ) return null;


    if ( post.idx_parent !== void 0 ) {
      post['url'] = this.post.getPermalink( post );
    }

    if ( this.forumListStyle == 'max' ) {
      post['minimize'] = false;
    }
    else {
      post['minimize'] = true;
      post['more'] = true;
    }



/**
 * @deprecared - divide comments into two.
 *
    if(post['comments']){
      if( post['comments'].length > 5 ) {
        post['last_five_comment'] = post['comments'].splice(post['comments'].length - 5, 5);
      }
      else {
        post['last_five_comment'] = post['comments'];
        post['comments'] = null;
      }
    }
*/
    return post;
  }




  onClickPostCreate( ) {
    this.showPostCreateFrom = this.showPostCreateFrom ? false : true;
  }

  onEditPost( post: POST ) {
    console.log("PostList::onEditPost()", post);
    let element:HTMLElement = <HTMLElement>document.querySelector(`article[idx="${post.idx}"]`);
    element.scrollIntoView();
    //let content = document.querySelector(`section.content`);
    //console.log("element: ", element);
    //console.log("content: ", content);
    //content.scrollTo( 0, element.scrollTop );
  }

  onViewComponentError( error ) {
    //console.error("onViewComponentError:", error);
    this.app.error( error );
  }

  onViewComponentNotice( error ) {
    //console.info("onViewComponentNotice:", error);
    this.app.notice( error );
  }

  OnEditComponentError( error ) {
    this.app.error( error );
  }

  OnEditComponentCancel() {
    this.showPostCreateFrom = false;
  }

  OnEditComponentSuccess() {
    this.showPostCreateFrom = false;
  }

  onViewComponentShowImage( url ) {
    this.app.imageFullView( url );
  }

  onEditComponentShowMemberInfo( post ) {
    post.member['regDate'] = this.post.getDateTime( post.member.stamp ) ;
    this.app.memberInfoView( post );
  }

  onClickFold( event, post ) {
    event.stopPropagation();
    post.minimize = !post.minimize;
  }

}
