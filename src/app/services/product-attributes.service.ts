import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';

@Injectable()
export class ProductAttributesService {
  private baseApiUrl = GlobalVar.BASE_API_URL;

  constructor(private http: Http) { }

  getProductSizes() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseApiUrl + 'rest/V1/products/attributes/size' , {headers: headers}).map(res => res.json());
  };
  getProductBrands(categoryId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseApiUrl+'/restapis?brand_category='+categoryId+'&list_brands=1' , {headers: headers}).map(res => res.json());
  };
  getProductColors() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseApiUrl + 'rest/V1/custom/products/attributes/color' , {headers: headers}).map(res => res.json());
  };

  getProductSizeChart() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseApiUrl + 'rest/V1/products/attributes/size_chart' , {headers: headers}).map(res => res.json());
  }

}
