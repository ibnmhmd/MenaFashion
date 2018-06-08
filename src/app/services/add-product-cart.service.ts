import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';

@Injectable()
export class AddProductCartService {
  private baseApiUrl = GlobalVar.BASE_API_URL;


  //---------------------- time logger for error handling ----------
  currentdate:Date = new Date(); 
  datetime = "Log Information ==> : " + this.currentdate.getDate() + "/"
                 + (this.currentdate.getMonth()+1)  + "/" 
                 + this.currentdate.getFullYear() + " @ "  
                 + this.currentdate.getHours() + ":"  
                 + this.currentdate.getMinutes() + ":" 
                 + this.currentdate.getSeconds();
  //------------------------------------------------------------------
  constructor(private http: Http) { }

  getCartGuestId() {
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseApiUrl + 'rest/V1/guest-carts' , 
    {headers: headers}).map(res => res.json()).catch(this.handleError);
  }
  getCartId() {
     let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let options = new RequestOptions({headers: headers});
    let body ="";
    return this.http.post(this.baseApiUrl + 'rest/V1/carts/mine' , body, options).map(res => res.json()).catch(this.handleError);
  }

  addItemToCart(productAttr) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseApiUrl + 'rest/V1/custom-guest-carts/'+ localStorage.getItem('shopGuestCartId') +'/items' , JSON.stringify(productAttr), {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  addItemToCustomerCart(productAttr) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('customerToken'))
    return this.http.post(this.baseApiUrl + 'rest/V1/carts/mine/items', JSON.stringify(productAttr), {headers: headers}).map(res => res.json()).catch(this.handleError);
  }
  
  handleError(err)
  {
	  console.log('in error');
	  //customer session expired
	  if(err.status == 401 && localStorage.getItem('customerToken')){
		
		if(document.getElementById('systemMessages')){
			console.log('in element');
			document.getElementById('systemMessages').style.display = 'block';
		}
		
		localStorage.removeItem('customerToken');
		localStorage.removeItem('shopCartId');
		localStorage.removeItem('customerId');
		
		console.log('Your session has expired');
		location.reload();
	  }
	 
	 //guest cart expired
	  if(err.status == 404 && localStorage.getItem('shopGuestCartId')){
		if(document.getElementById('systemMessages')){
			document.getElementById('systemMessages').style.display = 'block';
		}	
		
		localStorage.removeItem('shopGuestCartId');
		console.log('Your cart has expired');
		//location.reload();
	  }	 
     let body = err._body;
     let object = JSON.parse(body);
     return Observable.throw (object.message || "Error Occured ");  
  }
  

}
