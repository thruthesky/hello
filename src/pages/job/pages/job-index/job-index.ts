import { Component, Renderer, OnInit } from '@angular/core';
import { PhilippineRegion } from  '../../providers/philippine-region'
import { PAGES } from '../../../../api/philgo-api/v2/philgo-api-interface';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { Post, SEARCH_QUERY_DATA } from '../../../../api/philgo-api/v2/post';
import { PageScroll } from './../../../../providers/page-scroll';
import { App } from '../../../../providers/app';
import * as _ from 'lodash';

declare var Array;

@Component({
  selector: 'job-index',
  templateUrl: 'job-index.html'
})
export class JobIndexPage{

  login: MEMBER_LOGIN = {
    id: ''
  };
  page_no: number = 0;
  numbers = Array.from(new Array(20), (x,i) => i+1);

  //variables used in range
  shareUrl = 'http://192.168.26.2:8000/job/view/';
  minAge: number = 18;
  maxAge: number = 60;
  minAgeRange = Array.from(new Array( this.maxAge - this.minAge), (x,i) => i+1);
  maxAgeRange = this.minAgeRange;
  minAgeSelected: number = this.minAge;
  maxAgeSelected: number = this.maxAge;
  betweenAge: number = this.minAge -1;

  today = new Date();
  currentYear = this.today.getFullYear();

  provinces: Array<string> = [];
  cities = [];
  showCities: boolean = false;
  pages: PAGES;
  condition: string = '';
  urlDefault: string = "assets/img/anonymous.gif";
  urlPhoto: string = this.urlDefault;
  query = {
    sub_category: 'all',
    name: '',
    varchar_2: 'all', //province
    varchar_3: 'all', //city
    int_1: 'all', //work experience
    gender: 'all',
    male: false,
    female: false
  };

  searchBy: { location?, profession?, more? } = {};
  scrollListener = null;
  scrollCount = 0;
  inPageLoading: boolean = false; // true while loading a page of posts.
  noMorePosts: boolean = false; // true when there are no more posts of a page.

  constructor(private region: PhilippineRegion,
              private post: Post,
              private member: Member,
              private renderer: Renderer,
              private pageScroll: PageScroll,
              public app: App
  ) {

    // this.login = this.member.getLoginData();
    member.getLogin( x => {
      this.login = x;
    } );

    region.get_province( re => {
      this.provinces = re;
    }, e => {
      //console.log('error location.get_province::', e);
    });
    this.search();
  }

  ngOnInit() {
    this.pageScroll.watch( this.renderer, no => {
      if ( this.page_no == 0 ) {
        this.page_no ++; // since 1st page has been loaded in constructor()
      }
      this.doSearch();
    } );
  }

  get cityKeys() {
    return Object.keys( this.cities );
  }

  ngOnDestroy() {
    this.pageScroll.stop();
  }

  search() {
    if ( this.inPageLoading ) {
      console.info("in page loading");
      return;
    }
    this.inPageLoading = true;
    this.noMorePosts = false;
    this.condition = '';
    this.pages = [];
    this.page_no = 1;

    let min = this.currentYear-this.minAgeSelected;
    let max = this.currentYear-this.maxAgeSelected;
    //ageRange
    this.condition+= " AND int_2 <= '"+ min +"'"; //min age
    this.condition+= " AND int_2 >= '"+ max +"'"; //max age
    //profession
    if( this.query.sub_category != 'all') this.condition += " AND sub_category = '"+ this.query.sub_category +"'";
    //province
    if( this.query.varchar_2 != 'all') this.condition += " AND varchar_2 = '"+ this.query.varchar_2 +"'";
    //city
    if( this.query.varchar_3 != 'all') this.condition += " AND varchar_3 = '"+ this.query.varchar_3 +"'";
    //work experience
    if( this.query.int_1 != 'all') this.condition += " AND int_1 = '"+ this.query.int_1 +"'";
    //name
    if( this.query.name ) this.condition += " AND text_1 LIKE '%"+ this.query.name +"%'";

    //gender
    if( this.query.male != this.query.female ) {
      let gender = '';
      console.log("Male is " + this.query.male,"Female is " + this.query.female );
      gender = this.query.male ? 'm' : 'f';
      this.condition += " AND char_1 = '"+ gender +"'";
    }

    this.debounceDoSearch();
    //this.doSearch();
  }

  private debounceDoSearch = _.debounce( () => this.doSearch(), 1000);

  doSearch() {
    console.log('###############doSearch###############');
    let page = this.page_no++;
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "idx,idx_member,gid,sub_category,post_id,text_1,text_2,text_3,int_1,int_2,int_3,int_4,char_1,varchar_1,varchar_2,varchar_3,varchar_4,varchar_6";
    data.from = "sf_post_data";
    data.where = "post_id = 'jobs' AND idx_parent=0" + this.condition;
    data.limit = "4";
    data.orderby = "idx desc";
    data.page = page;
    data.post = 1;
    this.post.debug = true;
    this.post.search( data, re => {
      console.log("search result: ", re);
      this.displayPosts( re );
    }, error => alert("error on search: " + error ) );
  }

  displayPosts( page ) {
    this.inPageLoading = false;
    if ( page.search.length == 0 ) {
      this.noMorePosts = true;
      //this.endScroll();
    }
    if ( page.page_no == 1 ) this.pages[0] = page;
    else this.pages.push( page );
    setTimeout( () => this.lazyProcess( page ), 100 );
  }

  lazyProcess( page ) {
    if ( page.search.length == 0 ) {
      return;
    }

    // for date.
    page.search.map( post => {
      post['date'] = this.post.getDateTime( post.stamp );
      if ( post.comments === void 0 ) return;
      post.comments.map( comment => comment['date'] = this.post.getDateTime( comment.stamp ) );
    });

    // for link
    let path = 'job/view';
    page.search.map( post => post['link'] = this.getLink( post, path ) );

  }
  getLink( post, path = '-' ) {
    let full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    full += '/' + path + '/' + post.idx;
    return full;
  }

  onClickProvince() {
    if( this.query.varchar_2 != 'all') {
      this.query.varchar_3 = this.query.varchar_2;
      this.region.get_cities( this.query.varchar_2, re => {
        //console.log('cities', re);
        if(re) {
          this.cities = re;
          //console.log(re);
          this.showCities = true;
        }
      }, e => {
        //console.log('error location.get_cities::', e);
      });
    }
    else {
      this.query.varchar_3 = 'all';
      this.showCities = false;
    }
    this.search();
  }

  onChange() {
      this.search();
  }

  minRangeChange(){
    this.betweenAge = this.minAgeSelected - 1;
    this.maxAgeRange = this.getRange( this.minAgeSelected, this.maxAge);
    this.search();
  }
  maxRangeChange(){
    this.minAgeRange = this.getRange( this.minAge, this.maxAgeSelected);
    this.search();
  }
  getRange(min , max) {
    return Array.from(new Array( max - min), (x,i) => i+1);
  }

  onClickProfession(){
    this.searchBy = (!this.searchBy.profession || this.searchBy.more ) ? {profession: true} : {};
    console.log('SearchBy', this.searchBy);
  }

  onClickLocation(){
    this.searchBy = (!this.searchBy.location || this.searchBy.more ) ? {location: true} : {};
    console.log('SearchBy', this.searchBy);
  }


  onClickMore(){
    this.searchBy = (!this.searchBy.more) ? this.searchBy = { profession: true, more: true,location: true } : {};
  }

}
