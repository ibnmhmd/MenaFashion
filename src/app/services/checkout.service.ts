import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CheckoutService {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  private checkoutPrivateKey = GlobalVar.CHECKOUT_PUBLIC_KEY;

  constructor(private http: Http) { }

  getGuestCart(cartId) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
	//console.log("inguestcartid");
     return this.http.get(this.baseApiUrl + 'rest/V1/custom-guest-carts/' + cartId + '/items', {headers: headers}).map(res => res.json()).catch(this.handleError);
  }
  getCustomerCart() {
    // /V1/carts/mine
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
     return this.http.get(this.baseApiUrl + 'rest/V1/custom-carts/mine/items', {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  getCustomerTotals() {
    // /rest/V1/carts/mine/totals
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
     return this.http.get(this.baseApiUrl + 'rest/V1/carts/mine/totals', {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  getGuestTotals() {
    // /rest/V1/guest-carts/:id/totals
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
     return this.http.get(this.baseApiUrl + '/rest/V1/guest-carts/'+ localStorage.getItem('shopGuestCartId') +'/totals', {headers: headers}).map(res => res.json()).catch(this.handleError);
  }
  
  updateGuestCart(cartItem) {
    // PUT V1/guest-carts/:cartId/items/:itemId
	//console.log("inupdateguestcart");
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
     return this.http.put(this.baseApiUrl + 'rest/V1/guest-carts/' + cartItem.cartItem.quote_id + '/items/' + cartItem.cartItem.item_id, cartItem, {headers: headers}).map(res => res.json()).catch(this.handleError);

  }

  updateCustomerCart(cartItem) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
  //  let body = cartItem;
    return this.http.post(this.baseApiUrl + 'rest/V1/carts/mine/items', JSON.stringify(cartItem), {headers: headers}).map(res => res.json()).catch(this.handleError);
  //  return this.http.put(this.baseApiUrl + 'rest/V1/carts/mine/items/' + cartItem.cartItem.item_id, body, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  deleteGuestCartItem(cartId, prodId) {
    // /V1/guest-carts/{cartId}/items/{itemId}
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
     return this.http.delete(this.baseApiUrl + 'rest/V1/guest-carts/' + cartId + '/items/' + prodId, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }
  deleteCustomerCartItem(prodId) {
    // /V1/carts/mine/items/{itemId}
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });

    return this.http.delete(this.baseApiUrl + 'rest/V1/carts/mine/items/' + prodId, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  getCountryList() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
     return this.http.get(this.baseApiUrl + 'rest/V1/directory/countries', {headers: headers}).map(res => res.json()).catch(this.handleError);
  }
  getRegionList(id) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
     return this.http.get(this.baseApiUrl + 'rest/V1/directory/countries/' + id, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  estimateGuestShippingMethods(shippingInformation) {
    // /rest/V1/guest-carts/:cartId/estimate-shipping-methods

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let body = shippingInformation;

    return this.http.post(this.baseApiUrl + '/rest/V1/guest-carts/' + localStorage.getItem('shopGuestCartId') + '/estimate-shipping-methods', body, {headers: headers}).map(res => res.json()).catch(this.handleError);

  }

  setGuestShippingInformation(shippingInformation) {
    // /rest/V1/guest-carts/:cartId/shipping-information
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let body = shippingInformation;

    return this.http.post(this.baseApiUrl + 'rest/V1/guest-carts/' + localStorage.getItem('shopGuestCartId') + '/shipping-information', body, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  checkoutGuestToken(card) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.checkoutPrivateKey
    });
    let body = card;
	//console.log("inguesttoken");
    return this.http.post('https://api2.checkout.com/v2/tokens/card', body, {headers: headers}).map(res => res.json()).catch(this.handleErrorCredit);
  }

  checkoutGuestFinalizeOrder(order) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let body = order;
	//console.log("infinalizeorder");
    return this.http.post(this.baseApiUrl + '/rest/V1/guest-carts/' + localStorage.getItem('shopGuestCartId') + '/payment-information', body, {headers: headers}).map(res => res.json()).catch(this.handleError);
    //return this.http.post(this.baseApiUrl + 'rest/default/V1/df-payment/' + localStorage.getItem('shopGuestCartId') + '/place-order', body, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }



  editCustomerDataAddress(customerAddress) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken'),
    });
    let body = customerAddress;


    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.baseApiUrl + "rest/V1/customers/me", body, options).map(data => data.json()).catch(this.handleError);
  };

  estimateCustomerShippingMethods(shippingInformation) {
    // /rest/V1/carts/mine/estimate-shipping-methods-by-address-id
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let body = { "addressId": shippingInformation }

    return this.http.post(this.baseApiUrl + '/rest/V1/carts/mine/estimate-shipping-methods-by-address-id', body, {headers: headers}).map(res => res.json()).catch(this.handleError);

  };


  customerShippingInformation(info) {
    // /rest/V1/carts/mine/shipping-information
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let body = info;

    return this.http.post(this.baseApiUrl + '/rest/V1/carts/mine/shipping-information', body, {headers: headers}).map(res => res.json()).catch(this.handleError);
  };

  customerPlaceOrderByCard(data) {
    // /rest/default/V1/df-payment/mine/place-order
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('customerToken')
    });
    let body = JSON.stringify(data);

    return this.http.post(this.baseApiUrl + '/rest/default/V1/carts/mine/payment-information', body, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

 
  customerCardList(email) {
    
  }





  guestPaypalPayment() {
    // //rest/V1/custom-guest-carts/:id/getpaypaltoken
    let headers = new Headers({
      //'Content-Type': 'application/json'
    });

     return this.http.get(this.baseApiUrl + 'rest/V1/custom-guest-carts/'+ localStorage.getItem('shopGuestCartId') +'/getpaypaltoken', {headers: headers}).map(res => res.json()).catch(this.handleError);
  };

  handleError(err)
  {
	  
	  if(err.status == 401 && localStorage.getItem('customerToken')){
		
		if(document.getElementById('systemMessages')){
			document.getElementById('systemMessages').style.display = 'block';
		}
		
		localStorage.removeItem('customerToken');
		localStorage.removeItem('shopCartId');
		localStorage.removeItem('customerId');
		console.log('Your session has expired');
		location.reload();
	  }

	  
	  if(err.status == 404 && localStorage.getItem('shopGuestCartId')){
		
		if(document.getElementById('systemMessages')){
			document.getElementById('systemMessages').style.display = 'block';
		}	
		  
		localStorage.removeItem('shopGuestCartId');
		console.log('Your cart has expired');
		location.reload();
	  }	
    return Observable.throw (err.json().message || "Error Occured in Checkout Service . . .");
    
  }

  handleErrorCredit(err)
  {
    return Observable.throw (err.json().errors || "Error Occured in Checkout Service . . ."); 
  }
}
