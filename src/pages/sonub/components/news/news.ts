/**
 * @see ../../../README.md
 *
 */
import { Component, Input} from '@angular/core';
import { Post, PAGE, PAGE_OPTION, POSTS, ONE_MINUTE_STAMP } from '../../../../api/philgo-api/v2/post';
import { App } from '../../../../providers/app';
@Component({
  selector: 'sonub-news',
  templateUrl: 'news.html'
})
export class SonubNews {
  @Input() title: string = null;
  @Input() post_id: string = 'news';
  @Input() limit: number = 5;

  posts: POSTS = <POSTS> [];
  constructor( private app: App, private post: Post ) {
    //console.log("LatestComponent::constructor()");
  }
  ngOnInit() {
    let option: PAGE_OPTION = {
      post_id: this.post_id,
      file: 1,
      limit: this.limit,
      expire: ONE_MINUTE_STAMP,
      fields: 'idx,idx_parent,subject,SUBSTRING(content_stripped,1,70) as content,deleted,gid,good,no_of_comment,no_of_view,post_id,stamp'
    };
    // console.log('option::',option);
    this.post.debug = true;
    this.post.page( option, ( page: PAGE ) => {
        console.log("news page:: ", page);
        page.posts.map( ( v:any, i ) => {
          setTimeout( () => {
            v.url = this.post.getPostUri( v );
            this.posts.push( v );
          }, i * 50 );
        } );
      },
      error => this.app.error( error ),
      () => {});
    // console.log('this.posts',this.posts);
  }

}
