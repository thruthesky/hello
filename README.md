# Ionic Hack

Ionic 2 project hack by JaeHo Song to use Angular2 framework with ionic 2.

## Repository

* We work on master branch. So, Modularity and Refactoring of folders, source files, asessts are highly important because many app will be made upon this single source repository.


## Work Environment
* 게시판 코멘트 쓸 때, push notification 이 제대로 되면, 일단 전반적으로 마무리.
    philgo api ajax module 에서 comment 를 새로 생성하면 그 코멘트의 조상들의 idx 와 varchar_9 를 리턴하도록 했다. token 으로 메세지를 봬면 된다.
    Andy OS 를 구매하면 여러개 실행 가능하다.
* toast() 에 창 닫기 옵션을 둘 것.
* toast() 가 한번에 많이 출력되면, 하나씩 아래로 차례대로 표시 할 것.
* app.alarm() app.error() app.warning design
* focus on textarea after openining textarrea
* app.note() design with class.
* file-not-found 페이지를 디자인 한다.
* 메인에 교민 사이트 무료 제작 배너.
* 메인에 필고 기업 회원 모집 배너. 기업회원 메뉴. 필고 비지니스 회원 모집. 필고, 페이스북, 네이버, 다음, 단톡에 광고.
* 하우스 메이드 앱만 따로 만들 것.
* Move philgippines region api into philgo class.
    * problem : the end point is not consistent and makes problem.
    * error handling is not right.
* philgo api push edit component uses 'ionic api' which means it is not independent.
    * separate edit component from philgo api.
* push notification.
* splash image / 웹에서 index.html 로더 아이콘 표시.
* message page design
* forum list/edit design.
* 메세지 검색을 하고, 취소(또는 메세지 목록을 바로 할 수 없음)
* job page design.
* message page desgin.
* all other page design.
* toolbar menu is not responsive.
* Loading is seen because
    there is not enough data to cover one page or there is no more data on the server.

    If the data is not enough to cover a page, when load more.
    If there is no more data, hide loader.


* When you do project, fork http://github.com/thruthesky/ionic-hack and use it.
    * for instance, there is a forked project at http://github.com/withcenter/sonub
    * all sonub developers should clone 'http://github.com/withcenter/sonub'
    * so, when there is any update, you can do pull request.

* Local clone should be 'ionic-hack' to avoid confusion which means, when you work on 'ionic-hack' repository, clone the project with same folder name.
    * work folder: c:/work/www/ionic/ionic-hack

* Test on web
    * ionic serve --address 192.168.26.2 --port 8000
* Test on mobile and web
    * ionic serve -lc





# TODO
* 쪽지 읽기에서 답변을 해도, push 를 보내개 한다. 현재는 쪽지 쓰기만된다.
* 글에 push 는 새글이 있을 때, 단, 최대 10분에 하나씩만 보낸다.
* put loader in index.html.
* Language option. korean/english
* 메뉴에. 언어 설정. 캐시. 추가.
* 새 메세지 개 수 표시와. 새 메세지 push notification.
* post-view 에서 맨위에 보여지는 글은 글(페이지) 목록에서 없앨 것. 
* 모든 페이지를 hme.html 처럼 table 로 layout 을 적용 할 것.
* 데스크톱에서 페이지가 스크롤이 많이 되면, 광고를 fixed 해서 양옆으로 보여 줄 수 있도록 한다.
* push notification on comment, message.
    - for message,
        when a new message arrives,
        but send push after 30 minutes from previous.

    - for comment,
        when a new message arrives,
        but send push after 40 minutes.
* send push notification by clicking user name  on page view.
* @done deploy test.

* 필고(소너브)를 firebase hosting 으로 올리니까 너무 좋다.
계정별/프로젝트별로 돈내는지 확인하고 계정별이면 firebase hosting 을 하고,
file.philgo.com 을 그냥 ssl 도메인을 하나 구입해서 file.philgo.com 만 ssl 로 올린다.

* deploy 에서 에러가 나지 않도록 재 실행하고, go back 버튼에서 홈이면 종료하게 해도, 여전히 에러가 발생한다.
그래서  file not found 까지 그냥 home 으로 바로 이동하ㅔㄱ 한다.

* 새 메세지 개수 표시. 하루에 한번씩 알림창으로 표시하기.
* file not found page design.
* 내가 잠든 사이에 push 가 100 개 와 있으면 100 개의 창이 뜨나?
* genymotion,  andyos 에서 qna 와 talk 페이지 이동이 안좋은 것 같다.
QnA => talk 으로 못간다 간다. 다만 광고가 위에 보인다.

* @done Show 'Logout' after login

* @done add 'reset data' on menu.

* @done Do '*ngIf' on break-point 'NOT TO load un-necessary data on small width device.'
    각 라우트마다 새로운 컴포넌트가 로드되므로 top,left,right,bottom 을 모두 코딩 해야한다.
    하지만 모든 서브 경로를 IndexComponent 로 통일하고,
        IndexComponent 에서 top, left, right, bottom 을 한번씩만 코딩학,
        center 부분에서만
            <home-page-component *ngIf=" home "></home-page-component>
            <post-list-page-component *ngIf=" postList "></post-list-page-component>
            <message-component *ngIf=" message "></message-component>
        와 같이 하는 것도 좋은 생각인 것 같기도 하다.
        하지만 또 한편으로는 이렇게 할 필요가 있을 까 생각이 들기도 한다.
        만약, 각 페이지별로 top, left, right, bottom 을 커스터마징 해야하는 경우에는 이 경우가 오히려 불편해진다.

        <sonub-header> 에 left 부분을 포함할 수 있는지,
             <table><tr><td></td><td> 까지 넣을 수 있는지 본다.

        * .hidden-xx-up/down is no good since it produce HTML and run all the JS code.
            * it never needs on mobile.

        * left, right side 를 *ngIf 로 보이기 말기를 한다. 왜냐하면 display:none 으로하면 결국 모든 내용을 다 불러로아야하게 때문에 속  속도가 느릳ㄴ다. 느리다.    

* @done google analystic code 추가. 문서화 할 것.


* @done  Show 10 next posts and 10 previous posts under a post view page.

* add splash images.

* add proper icons.


* do right config.xml ( app names, etc.. )


* test in offline.
    오프라인에서 테스트를 해서 각종 에러 없앤다.
    Test all error handlings without internet.

* post search.


* double check if the site users thumbanil image.
    image 크기를 최대한 resize 해서 작게 한다. 매우 작게 해서, 빨리 로드되도록 한다.

* 게시판 글 목록을 보여 줄 때, 제목만 보여주는 기능.
    클릭하면 코멘트 전체를 보여주거나
    마지막 코멘트 5개만 보여주는 기능.
* sonub design : https://drive.google.com/drive/u/0/folders/0B5Phg9Wn9p3EVFRPSnozNTh2czg

* cordova 에서는 URL 링크를 숨긴다. URL 이 file:///-/123 과 같이 나온다.

* sanitizing erorr 를 reproduce 하지 못해서 수정을 하지 못했다.


* dobule check security isssue by putting raw HTML into 'innerHTML' on view-component.html
````
    <div class="content" [hidden]="hideContent" innerHTML="{{ safeHtml( post.content ) }}"></div>
````


# TODO for fixing ionic-hack.

* dev mode 와 prod 모드에서 따로 index.html 과 ionic.config.json 을 사용 하거나 수정 할 수 있도록.
    * 그래서 모바일에서 실행 할 때, index.html 의 base href 를 수정하지 않아도 되도록 한다.
    

## TODO For hello philippines and sonub.com

* 헬로필리핀은 필고 방식으로 글 목록.
    보여줄 내용은 다 가져와서 제목만 보여주고, 클릭하면 전체를 보여 줄 것.
    이렇게하면, 코멘트가 많을 때, 5개만 먼저 보여 줄 필요가 없다. 더 간단하다.

* 검색 기능 : Post search, comment search, search by category, search by user, date, search by fields

* 글 게시판 아이디를 통한 몇몇 게시판만 출력.
    * 메인 화면, 커뮤니티, 질문, 여행, 광고 등 몇 개의 메뉴만으로 게시판 전체를 사용 할 수 있도록 함.

* 글 목록과 component 글 쓰기, 수정, 삭제 등을 component 화 한다.
    특히, 글 목록에서는 글을 표시 하는 것 자체를 하나의 component 로 만들고,
    글 목록과 글 읽기에서 동일한 컴포넌트를 사용 할 수 있도록 한다.

    즉, 하나의 글 보기 component 가 글 수정/삭제/각종 버튼을 하면서 동시에 코멘트의 것도 한다.
    특히, 글 하나 보기 컴포넌트에서 글 수정, 삭제, 코멘트, 파일 업로드등을 다 할 수 있도록 한다.
    즉, 글 목록과 글 보기 페이지 두개의 장소에서 하나의 컴포넌트를 만든다.
    edit-component 에 form 이 2개가 있는데 하나로 만들 것.
    두개를 만들어 놓으니 확실히 많이 헷갈린다.




* 필리핀 도시 선택을 캡슐화 할 것.

## TODO For Aonic = Angular + Ionic
https://github.com/thruthesky/aonic
* Put base code, plus
    * ng-bootstrap
    * fontawesome
    * lazy loading
    * lodash
    * ionic deploy
    * firebase auth, db, storage

## TODO Much laster

* lazy loading.




## DONE list

* @done - partly - need to update - 각종 에러 메시지 변환.

* @done 글 작성/수정 페이지에서 사진 업로드/삭제시에 확실하게 loader 를 표시한다.
    웹에서는 progress 가 잘되는데, 모바일에서는 잘 안되는 것 같다.


* @done URL 로 접속 할 수 있는 라우팅.


* @done 게시글을 가져 올 때, 필요한 필드만 가져올 수 있도록 한다. 전체 필드를 가져오니 양이 너무 많고, 홈페이지/앱이 느린 것 같다.
    그리고 실제로 binding 하기 전에 필요 없는 property 를 delete 한다.


* @done 글/코멘트 삭제.
* @done 글 정보 표시. 글 쓴이, 날짜, 조회수, 추천, 반대 등.
* @done 글 추천, 리포트,

* @recheck - 개념은 좋은 뭘 어떻게 하라는 건지 명확하지 않다. 즉, 짧고 명료하게 재 작성해야 한다.
    모듈화 & 컴포넌트 디렉티브 화. 그래서 philgo api 관련된 코드를 직접 작성하는 것이 아니라,
    그냥 directive 를 추가하므로서 글 CRUD, 코멘트 쓰기 CRUD 를 할 수 있도록.
    단, 글 목록은 directive 로 하지 않는다.

* @deprecated. 글 쓰기 외에, 글 수정/코멘트쓰기/수정 등을 모두 modal popup 으로 한다. modal popup 이 ui 상으로 좋지 못하다.


* @done improve philgo api uniqid(). it is too simple and may cause problem.

* @done 게시판 첨부 파일 업로드. post-edit.ts onChangeFile() 에 있는 데로
    data.uploadPostFile( gid, event ) 형식을 값을 받는다.
    이것은 회원 정보에서 사진 업로드 마찬가지로 한다.

* @done cordova-plugin-transfer 를 philgo api data.ts 에 포함해서
    보다 쉽게 사용 할 수 있도록 한다.
    
* @done 게시판 글을 보여 줄 때, loader 를 보여 준다. 특히, 캐시가 없을 때, 시간이 걸린다.
* @rejected 글 수정을 bootstrap modal 로 한다.
    * 글 수정 후, 원래 글 업데이트.
* @duplication 코멘트 CRUD, vote, report, 사진 업로드.

– @ok form validity.
– @done Show comment box at the bottom of the post. When enter key clicked, post the comemnt.
– @done show all the buttons of the post and comment properly.
– @done Do infinite scroll.
– @done Do file upload.
– @done Use bootstrap v4 and use it properly.
– @done Expose all the data so users can view without login.
– @done post create/edit: do not reload/move page to show edit form or after edit.
- @reject just use a bootstrap modal popup.
* @see 'TODO' list of philgo-api REDME
* apply c:\work\angular\sonub as much as it can be on https://github.com/withcenter/sonub
    * @see angular/sonub/README.md
 
* @done base/user/register 에서 update 를 한다.
    * update 하면서 코드를 정리하고,
    * 모바일 사진 업로드하면서, 파일 업로드 관련 코드를 
        완전히 간결하게 한다.
* /user/profile to show user profile to others.
* @done philgo Member primary photo
    * with firebase auth.
* @done complete templating for RWD design.
    * [loader](https://docs.google.com/document/d/1ZEplms60Dr9U4gMCvqxjMEAbyrH5duPkifEqxuPUiYc/edit#heading=h.dtpu4gybsdzf)
* @deprecated let developers clone https://github.com/withcenter/sonub
    since this, fork out 'https://github.com/thruthesky/ionic-hack' and continue a new project. if there is update, submit full request.

* @depcreated. clould based backend without philgo api. hosting, database with full text search, file storage.



## TODO : BUGS

* ng-boostrap modal was removed although it does not look like an error of bootstrap modal ( it looks like an error of @ionic/app-scripts. there is an issue. ), it is an disturbance to code.
    * wait until the issue disappears.
* sharing place holder of formProcess does not work on IE.


````
    <i class="fa fa-gear fa-stack-1x fa-inverse" [class.fa-spin]="process.loader"></i>
````

* [class.fa-spin]="process.loader" is not working when it is changed in other component.



# Installation

* npm install
* ionic serve ; To create cordova environment. There will be error. Ignore it.


## Submodule Installation

If you clone a repository which was forked, then you do not need to do 'git submodule update --init'. but may need to do 'git checkout master'.

* git submodule update --init
* git submodule foreach git branch
* git submodule foreach git checkout master

## Plugin Insallation
ionic platform add browser
npm install --save @ng-bootstrap/ng-bootstrap
ionic platform add android
ionic plugin add cordova-plugin-camera
ionic plugin add cordova-plugin-file-transfer
ionic plugin add cordova-plugin-dialogs
cordova plugin add ionic-plugin-deploy


ionic plugin add phonegap-plugin-push



## Update @ionic/app-scripts copy.config.js

Copy the code below into @ionic/app-scripts/config/copy.config.js


````

module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html'],
    dest: '{{WWW}}'
  },
  copyPolyfills: {
    src: ['{{SRC}}/etc/hack/polyfills/polyfills.js'],
    dest: '{{BUILD}}'
  }
}

````







## Packages installed by 'npm install'

You do not need to install these module one by one. these are installed by 'npm install'.

* npm i ng2-file-upload --save
* npm i lodash --save



# Folder Structure

* Since this single repository is used for many apps, this actually has different kinds of app source codes.
* All the source code for each app must be kept inside src/apps folder.
    * For instance, you want to build an app named 'sonub'.
        * put all your code under 'src/apps/sonub' foler and don't touch outside.
        





# Form Submission

* When you submit a form, Use 'share.formProcess'

# Language Translation

* @see README.md at pipes/language folder





# Locations of Philippines

* @see philgo api.



# Safe HTML for security

use SafeHTMLPipe

# Modal box, Alert, Confirm, etc

Use providers/bootstrap/alert/bootstrap.




# history

2016-12-02

fork of withcenter



# PUSH notification

새로운 소너브(웹/앱)에서만 된다.
단, 웹에서 전송은 되지만 수신은 안된다. 웹은 모바일이 아니기 때문이다.
