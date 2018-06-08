import { Injectable } from '@angular/core';
import { RequestOptionsArgs, RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { GlobalVar } from "app/globals";
import { ClientAddress } from "app/client-address/model/client-address";
import { ClientData } from 'app/client-address/model/client-data';

@Injectable()
export class CustomerDataService {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  private customerData = { "customer": {} };
  private clientData = new ClientData(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  customerAddresses: Array<ClientAddress> = [];

  constructor(private http: Http) { }
  // var jsonData = data.json();
  //       this.clientData.id = jsonData["id"];
  //       this.clientData.website_id = jsonData["website_id"];
  //       this.clientData.created_at = jsonData["created_at"];
  //       this.clientData.created_in = jsonData["created_in"];
  //       this.clientData.default_billing = jsonData["default_billing"];
  //       this.clientData.default_shipping = jsonData["default_shipping"];
  //       this.clientData.disable_auto_group_change = jsonData["disable_auto_group_change"];
  //       this.clientData.email = jsonData["email"];
  //       this.clientData.firstname = jsonData["firstname"];
  //       this.clientData.lastname = jsonData["lastname"];
  //       this.clientData.store_id = jsonData["store_id"];
  //       this.clientData.group_id = jsonData["group_id"];
  //       this.clientData.updated_at = jsonData["updated_at"];

  getCustomerAddress(): Observable<any> {
    const url = this.baseApiUrl + "/rest/V1/customers/me";
    const queryParams = "";

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken'),
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
      .map(data => data.json())
      .catch(err => {
        console.error("Unable to get customers address - ", err);
        return Observable.throw(err.json());
      });
  }

  updateCustomerData(clientData: ClientData) {
    this.customerData.customer = clientData;

    const url = this.baseApiUrl + "rest/V1/customers/me";
    const queryParams = "";

    let body = JSON.stringify(this.customerData);
 
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken'),
    });

    let options = new RequestOptions({ headers: headers });

    this.http.put(url, body, options)
      .map(data => data.json()).subscribe(data => {
     
      }, err => {
        console.log(err)
      });
  }


  addCustomerAddress(clientData: ClientData) {
    this.updateCustomerData(clientData);
  }

  updateCustomerAddress(clientData: ClientData) {
    this.updateCustomerData(clientData);
  }

  removeCustomerAddress(clientData: ClientData) {
    this.updateCustomerData(clientData);
  }

  getCustomerOrderHistory(): Observable<any> {
    const url = this.baseApiUrl + "/rest/V1/orderhistoryextend/customerid/";
    const queryParams = localStorage.getItem("customerId");

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken'),
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.get(url + queryParams, options)
      .map(data => data.json())
      .catch(err => {
        console.error("Unable to get customers orders - ", err);
        return Observable.throw(err.json());
      });
  }

  getCountryList() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.baseApiUrl + 'rest/V1/directory/countries', { headers: headers }).map(res => res.json());
  }

  getRegionList(id) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.baseApiUrl + 'rest/V1/directory/countries/' + id, { headers: headers }).map(res => res.json());
  }

}
