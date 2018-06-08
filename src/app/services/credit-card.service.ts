import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreditCardService {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  private checkoutPublicKey = GlobalVar.CHECKOUT_PUBLIC_KEY;

  constructor(private http: Http) { }

  getCardList(email) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.checkoutPublicKey
    });

    return this.http.get('https://sandbox.checkout.com/api2/v2/customers/' + email, {headers: headers}).map(res => res.json());
  };

  getCustomerCardDetails() {
    // /rest/V1/checkout/customers/me
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });

    return this.http.get(this.baseApiUrl + '/rest/V1/checkout/customers/me', {headers: headers}).map(res => res.json()).catch(this.handleError); 
  };

  customerCardPayNoSave(card) {
    // https://sandbox.checkout.com/api2/v2/tokens/card

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.checkoutPublicKey
    });
    let body = card;

    return this.http.post('https://api2.checkout.com/v2/tokens/card', body, {headers: headers}).map(res => res.json()).catch(this.handleErrorCredit);
  }

  customerCardPaySave(card) {
    // /rest/V1/checkout/customers/me/cards

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let body = card;

    return this.http.post(this.baseApiUrl + '/rest/V1/checkout/customers/me/cards', body, {headers: headers}).map(res => res.json()).catch(this.handleError);
  };



  removeCard(customerId) {
    // /rest/V1/checkout/customers/me/cards

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });

    return this.http.delete(this.baseApiUrl + '/rest/V1/checkout/customers/me/cards/' + customerId, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  customerEditCard(card, cardNum) {
    // /rest/V1/checkout/customers/me/cards/:cardId
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let body = card;
    return this.http.put(this.baseApiUrl + '/rest/V1/checkout/customers/me/cards/' + cardNum, body, {headers: headers}).map(res => res.json()).catch(this.handleError);
  };

  handleErrorCredit(err)
  {
    return Observable.throw (err.json().errors || "Error Occured in Checkout Service . . ."); 
  }

  handleError(err)
  {
    return Observable.throw (err.json().message || "Error Occured in Checkout Service . . .");  
  }

}
