import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';

@Injectable()
export class CouponCodeService {
  private baseApiUrl = GlobalVar.BASE_API_URL;

  constructor(private http: Http) { }

  checkCustomerCouponCode(couponCode) {
    // PUT /rest/V1/carts/mine/coupons/:couponcode
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let body ="";
    return this.http.put(this.baseApiUrl + 'rest/V1/carts/mine/coupons/' + couponCode, body, {headers: headers}).map(res => res.json());
  }

  checkGuestCouponCode(guestId, couponCode) {
    // PUT /rest/V1/guest-carts/:id/coupons/:couponcode
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let body ="";
    return this.http.put(this.baseApiUrl + 'rest/V1/guest-carts/' + guestId + '/coupons/' + couponCode, body, {headers: headers}).map(res => res.json());
  }

}
