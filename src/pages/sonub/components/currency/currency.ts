import { Component } from '@angular/core';
import { Philgo } from '../../../../api/philgo-api/v2/philgo';
declare var Array;

@Component({
  selector: 'sonub-currency',
  templateUrl: 'currency.html'
})
export class SonubCurrency {
  currency = [];
  constructor( private philgo: Philgo) {
    //console.log("CurrencyComponent::constructor()");
    this.get_currency();
  }
  get_currency() {
    let url = this.philgo.apiEndpoint + "?module=ajax&action=currency&submit=1";
    this.philgo.get( { url: url, expire: 3600 }, re => {
      //console.log("currency data: ", re );
      if ( re['code'] ) console.log( re['message'] );
      else this.currency = re.currency;
    }, error => {
      this.philgo.error("current error");
    }, () => {
      console.log("current complete");
    });


  }
}
