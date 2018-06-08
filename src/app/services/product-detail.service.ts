import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";


import 'rxjs/add/operator/map';

@Injectable()
export class ProductDetailService {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  

  constructor(private http: Http) { }

  getProductDetails(sku) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseApiUrl + 'rest/V1/custom/products/' + sku , {headers: headers}).map(res => res.json()).catch(this.handleError);
  };

  getProductDetailsCore(sku) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseApiUrl + 'rest/V1/products/' + sku , {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

 getDetailForInstanceOfTheProduct(productSku)
 {
  return this.http.get(this.baseApiUrl + 'restapis?singleView='+productSku).map(res => res.json()).catch(this.handleError);  
 }
  handleError(err)
  {
    return Observable.throw ("Error occurred while loading data in 'Product Details Service', & Error log is ======>"+ err.json());
    
  }

  getExchangeRate()
  {
    return this.http.get(this.baseApiUrl + 'restapis?getExchangeRate=1').map(res => res.json()).catch(this.handleError);  
  }
}
