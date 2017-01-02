import { Component, Input } from '@angular/core';
import { Post, PHOTO_OPTION, POSTS } from '../../../../../api/philgo-api/v2/post';

declare var Array;

@Component({
  selector: 'job-buy-and-sell',
  templateUrl: 'buy-and-sell.html'
})
export class JobBuyAndSell {
  @Input() title: string = null;
  @Input() post_id: string = null;
  @Input() limit: number = 1;
  @Input() photo: number = 1;
  posts: POSTS = <POSTS> [];
  constructor(private post: Post) {
    //console.log("LatestComponent::constructor()");
  }

  ngOnInit() {
    let option: PHOTO_OPTION = {
      post_id: this.post_id,
      limit: this.limit
    };
    // console.log('option::',option);

    this.post.latestPhotos(option, (posts: POSTS) => {
        
        //console.log("posts "+ this.post_id +" : ", posts);
        //console.log(this.photo + "this.photo_to_display "+ this.photo_to_display + " this.number_of_photo " + this.num_of_photo);
        this.posts = [];
        posts.map((v: any, i) => {
          setTimeout(() => {
            v.url = this.post.getLink(v);
            v.date = this.post.getDateTime( v.stamp);
            this.posts.push(v);
          }, i * 50);
        });
      },
      error => alert("LatestPhotos Error " + error));
  }

}
