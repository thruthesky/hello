import { Component, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageScroll } from './../../../../../providers/page-scroll';
import { Post, PAGE, POSTS, POST, PAGE_OPTION, ADS, POST_TOP_ADS, POST_TOP_PREMIUM_ADS } from "../../../../../api/philgo-api/v2/post";
import { App } from '../../../../../providers/app';
@Component({
    selector: 'sonub-post-list',
    templateUrl: 'post-list.html'
})
export class SonubPostListPage {
    // pages: PAGES = <PAGES> [];
    posts: POSTS = <POSTS> [];
    view: POST = null;
    showPostCreateFrom: boolean = false;
    post_id: string = '';
    page_no: number = 0;
    limit: number =  2;
    ads: ADS = null;
    post_top_ad: POST_TOP_ADS = null;
    post_top_premium_ad: POST_TOP_PREMIUM_ADS = null;
    scrollListener = null;
    scrollCount = 0;
    inPageLoading: boolean = false; // true while loading a page of posts.

    noMorePosts: boolean = false; // true when there are no more posts of a page.
    constructor( private post: Post,
                 activated: ActivatedRoute,
                 private renderer: Renderer,
                 private app: App,
                 private pageScroll: PageScroll ) {
        // console.log("SonubPostListPage::constructor()");

        activated.params.subscribe( param => {
            
            this.clearAds(); // it must be here to clear previous forum's ads.
            this.posts = <POSTS> [];
            if ( param['post_id'] !== void 0 ) {
                this.loadPosts( param['post_id'] );
            }
            else if ( param['idx_post'] !== void 0 ) {
                this.loadPost( param['idx_post'] );
            }
        } );
    }

    ngOnInit() {
        this.pageScroll.watch( this.renderer, no => {
            if ( this.page_no == 0 ) {
                this.page_no ++; // since 1st page has been loaded in constructor()
            }
            if ( this.post_id ) this.loadPage(); // call 'loadPage()' after the view-post has been loaded. ( or when post-list clicked )
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
        this.post_id = this.post_id.replace('--', ',');
        this.page_no = 0;
        if ( this.post_id ) {
            this.loadPage();
        }
        else {
            this.app.error("No post id provided");
        }
        // this.beginScroll();
    }

    

    /**
     * This loads only one ( 1 ) post for 'view' mode and loads a bunch of posts for that post_id. 
     */
    loadPost(idx_post){
        //this.post.debug = true;
        this.post.load(idx_post, response =>{
            this.view = <POST> response.post;
            // console.log("Load a post for view : ", this.view );
            // console.log("Load post success on idx : ", idx_post);
            this.loadPosts( this.view.post_id );
        }, error =>{
            this.app.error(error);
            /// this.app.error("Load post error" + error);
        });
    }


/*
    beginScroll() {
      this.scrollListener = this.renderer.listenGlobal( 'document', 'scroll', _.debounce( () => this.pageScrolled(), 50));
    }
    endScroll() {
        if ( this.scrollListener ) this.scrollListener();
    }
    pageScrolled() {
      console.log("scrolled:", this.scrollCount++);
      let pages = document.querySelector(".pages");
      if ( pages === void 0 || ! pages || pages['offsetTop'] === void 0) return; // @attention this is error handling for some reason, especially on first loading of each forum, it creates "'offsetTop' of undefined" error.
      let pagesHeight = pages['offsetTop'] + pages['clientHeight'];
      let pageOffset = window.pageYOffset + window.innerHeight;
      if( pageOffset > pagesHeight - 200) { // page scrolled. the distance to the bottom is within 200 px from
        console.log("page scroll reaches at bottom: pageOffset=" + pageOffset + ", pagesHeight=" + pagesHeight);
        this.loadPage();
      }
    }*/

    loadPage() {
        if ( this.inPageLoading ) {
            console.info("in page loading");
            return;
        }
        this.inPageLoading = true;
        this.page_no++;

        let option: PAGE_OPTION = {
            post_id: this.post_id,
            page_no: this.page_no,
            limit: this.limit
        };
        // this.post.debug = true;
        // console.log("load page: ", option);
        this.post.page( option, (page: PAGE) => { // two 1st page because there is a cache for 1st page.
            console.log("Page no: ", page);
            this.inPageLoading = false;
            if ( page.posts.length == 0 ) {
              this.noMorePosts = true;
              //this.endScroll();
            }

            if ( page.page_no == 1 ) {
                this.replacePush( page, option );
                if ( page.ads !== void 0 ) this.ads = page.ads;
                if ( page.post_top_ad !== void 0 && page.post_top_ad.length ) this.post_top_ad = page.post_top_ad;
                if ( page.post_top_premium_ad !== void 0 ) this.post_top_premium_ad = page.post_top_premium_ad;
                // this.removeFirstPage( option );
            }
            else this.delayPush( page );
        },
        error => {
            this.app.error( error );
            // this.post.error("Page Load Error: " + error);
        } );
    }

    delayPush( page:PAGE ) {
        let posts = page.posts;
        posts.map( ( v, i ) => {
            setTimeout( () => {
                this.posts.push ( this.pre(v) );
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
                this.posts[i] = page.posts[i];
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
    pre( post ) : POST {
        post.url = this.post.getPermalink( post );
        return post;
    }

    onClickPostCreate( ) {
        this.showPostCreateFrom = true;
    }
    editComponentOnCancel() {
        this.showPostCreateFrom = false;
    }

    editComponentOnSuccess() {
        this.showPostCreateFrom = false;
    }

}
