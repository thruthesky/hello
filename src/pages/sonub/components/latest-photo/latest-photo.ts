/**
 * @see ../../../README.md
 *
 */
import { Component, Input } from '@angular/core';
import { Post, PHOTO_OPTION, POSTS, POST } from '../../../../api/philgo-api/v2/post';
import { App } from '../../../../providers/app';
@Component({
  selector: 'sonub-latest-photo',
  templateUrl: 'latest-photo.html'
})
export class SonubLatestPhoto {
  @Input() title: string = null;
  @Input() post_id: string = null;
  @Input() limit: number = 1;
  @Input() page_no: number = 1;
  posts: POSTS = <POSTS> [];
  constructor(
    private app: App,
    private post: Post
   ) {
    //console.log("LatestComponent::constructor()");
  }
  ngOnInit() {
    this.loadPage(this.page_no);
  }

  loadPage( page_no: number ) {

    let option: PHOTO_OPTION = {
      post_id: this.post_id,
      limit: this.limit,
      limit_comment: 1,
      page_no: page_no
    };
    //console.log(option);
    //this.post.debug = true;
    this.post.latestPhotos( option, (posts: POSTS) => {
      //console.log("posts: ", posts);
      //this.posts = [];
      posts.map( ( v:POST, i ) => {
        setTimeout( () => {
          v.url = this.post.getPostUri( v );
          v['date'] = this.post.getDateTime( v.stamp );
          v.content = this.post.strip_tags( v.content );
          if ( v.comments && v.comments.length ) {
            v.comments.map( (v: POST) => v.content = this.post.strip_tags( v.content ) ); 
          }
          this.posts.push( v );
        }, i * 50 );
      });
      //console.log('this.posts::', this.posts);
    },
    error => this.app.error("SonubLatestPhoto::loadPage() => LatestPhotos Error " + error));
  }

}
