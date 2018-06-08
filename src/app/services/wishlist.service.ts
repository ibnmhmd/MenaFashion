import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WishlistService {
  private baseApiUrl = GlobalVar.BASE_API_URL;

  constructor(private http: Http) { }

  addToWishlist(id) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let options = new RequestOptions({headers: headers});
    let body ="";
    
    return this.http.post(this.baseApiUrl + 'rest/V1/wishlistextend/add/' + id,body, options).map(res => res.json()).catch(this.handleError);
  }

  checkWishlist() {
        let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('customerToken')
         });
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.baseApiUrl + 'rest/V1/wishlistextend/items/', options).map(res => res.json()).catch(this.handleError);
  }

  removeWishlistItem(id) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let options = new RequestOptions({headers: headers});
    let body ="";
    
    return this.http.delete(this.baseApiUrl + 'rest/V1/wishlistextend/delete/' + id, options).map(res => res.json()).catch(this.handleError);
  };

  handleError(err)
  {
	  //console.log("Error Occured ");
	  //console.log(err._body);
	  console.log(err.status);
	  if(err.status == 401 && localStorage.getItem('customerToken')){
		  
		if(document.getElementById('systemMessages')){
			document.getElementById('systemMessages').style.display = 'block';
		}  
		
		localStorage.removeItem('customerToken');
		localStorage.removeItem('shopCartId');
		localStorage.removeItem('customerId');
		
		console.log('Your session1 has expired');
		location.reload();
	  }
	 // return true;
     let object = JSON.parse(err._body);
     return Observable.throw (object.message || "Error Occured ");  
  }
  
  
}
