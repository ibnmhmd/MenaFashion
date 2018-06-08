import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";


@Injectable()
export class PasswordResetService {

  private baseApiUrl = GlobalVar.BASE_API_URL;

  constructor(private httpInstance :Http) { }
 // ----------- customer token validation -------
 validateCustomerToken(param)
 {
  if(param.hasOwnProperty('userId') && param.hasOwnProperty('userToken'))
  {
    return this.httpInstance.get(this.baseApiUrl + 'rest/V1/customers/' + param.userId + '/password/resetLinkToken/' + param.userToken).map(resp => resp.json()).catch(this.handleErrorPassword);    
  }

 }


 // ------------------- reset customer password ---------------
 resetCustomerPassword(param)
 {
  if(param.hasOwnProperty('email') && param.hasOwnProperty('password') && param.hasOwnProperty('token'))
  {   
    const headers = new Headers({'Content-Type': 'application/json'});

   const body = {
                    'email': param.email,
                    'resetToken': param.token,
                    'newPassword': param.password
                };


    return this.httpInstance.post(this.baseApiUrl + 'rest/V1/custom/reset/password', body, {headers: headers}).map(resp => resp.json()).catch(this.handleErrorPassword);    
  }
 }
 handleErrorPassword(err)
 {
   return Observable.throw (err.json()|| "Error Occured in Password Reset Service . . ."); 
 }
}
