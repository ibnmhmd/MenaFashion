import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomerDetailsService {
  private baseApiUrl = GlobalVar.BASE_API_URL;

  constructor(private http: Http) { }

  getCustomerDetails() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken'),
      
    }); 
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.baseApiUrl + 'rest/V1/customers/me/', {headers: headers}).map(res => res.json());
  };

  updateCustomerProfile(profileData) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken'),
      
    }); 

    const options = new RequestOptions({headers: headers});
    return this.http.put(this.baseApiUrl + 'rest/V1/customers/me/', profileData, {headers: headers}).map(res => res.json());
  }

}
