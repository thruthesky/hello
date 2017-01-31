import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
import { Philgo } from '../../../../api/philgo-api/v2/philgo';
import { POINT_UPDATE_REQUEST, POINT_UPDATE_RESPONSE } from '../../../../api/philgo-api/v2/philgo-api-interface';
@Component({
    selector: 'event-page',
    templateUrl: 'event.html'
})
export class SonubEventPage {
    title: string = 'Event Page';

    constructor(
        public app: App,
        public philgo: Philgo
    ) {

    }


    onClickEvent( etc ) {

        let data: POINT_UPDATE_REQUEST = { etc: etc };
        this.philgo.pointUpdate( data,
            ( re: POINT_UPDATE_RESPONSE )=> {
                this.app.alarm( "이벤트 포인트가 충전되었습니다." );
            },
            ( error: string ) => {
                if ( error == 'wrong-etc' ) {
                    error = "이벤트가 존재하지 않거나, 진행중이지 않습니다."
                }
                else if ( error == 'point-updated-already' ) {
                    error = "해당 이벤트의 포인트가 이미 충전되었습니다.";
                }
                this.app.alarm( error );
            },
            () => {
                console.log('complete');
            }
        );
    }

}
