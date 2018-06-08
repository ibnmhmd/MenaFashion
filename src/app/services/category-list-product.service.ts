import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";


@Injectable()
export class CategoryListProductService {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  private  tempHolder = "";
    // ---------------------- time logger for error handling ----------
   
    currentdate = new Date(); 
    datetime = "Log Information ==> : " + this.currentdate.getDate() + "/"
                   + (this.currentdate.getMonth()+1)  + "/" 
                   + this.currentdate.getFullYear() + " @ "  
                   + this.currentdate.getHours() + ":"  
                   + this.currentdate.getMinutes() + ":" 
                   + this.currentdate.getSeconds();
                 
    // ------------------------------------------------------------------
  
  constructor( private http: Http) { }
  

  /****** alt *****/
  // getMensCategories(): Observable<any[]> {
  //   return this.http
  //     .get(this.CATEGORY_PATH)
  //     .map(resp => resp.json().men)
  //     .catch((error: any) => Observable.throw(error.json()));
  // }


  getCategoryProductList(params) {
    let body = new FormData(), param, tempHolder="";
      body.append('cat_id', params.cat_id);
      body.append('count', params.count);
     
     if(params.hasOwnProperty('size')) {
        body.append('size', params.size);
     }  
     if(params.hasOwnProperty('brand')) {
        body.append('brand', params.brand);
     }else
         {
          params.brand = "";
         } 
     if(params.hasOwnProperty('min_price')) {
        body.append('min_price', params.min_price);
     } 
     if(params.hasOwnProperty('price_range')) {
        body.append('price_range', params.price_range);
     } 
     if(params.hasOwnProperty('max_price')) {
        body.append('max_price', params.max_price);
     } 
     if(params.hasOwnProperty('sort_order')) {
        body.append('sort_order', params.sort_order);
     } 
     if(params.hasOwnProperty('color')) {
        body.append('color', params.color);
     } 
     if(params.hasOwnProperty('sort_criteria')) {
        body.append('sort_criteria', params.sort_criteria);
     } 
     
     // -------------- check params and append corresponding values ----

      // ------------------- sort order ----------------
      if(params.sort_order !== undefined && params.sort_order !== "" && params.sort_order != null)
      {
           tempHolder +='&sort_order='+params.sort_order+'&sort_criteria=price';
      }
     // ----------------------- ends -------------------------

      // -------------------------- sort criteria-----------------------
     if(params.sort_criteria !== undefined && params.sort_criteria !== "" && params.sort_criteria != null)
     {
        tempHolder +='&sort_criteria='+params.sort_criteria;
     }
    // ---------------------- ends ---------------------------

    
     // ----------------------- brands -------------------------
     if(params.brand !== undefined && params.brand !== "" && params.brand != null)
      {
        tempHolder +='&brand='+params.brand;
      }
    // -------------------------------- sort parameters ----------------

   // ---------------------------- color parameter -----------------
   if(params.color_id !== undefined && params.color_id !== "" && params.color_id != null)
   {
     tempHolder +='&color='+params.color_id;
   }
   // ----------------------------------- color ends ---------------------
      // ---------------------------- price parameter -----------------
      if((params.min_price !== undefined && params.min_price !== "" && params.min_price != null) )
      {
         tempHolder +='&min_price='+params.min_price;
      }
      if((params.max_price !== undefined && params.max_price !== "" && params.max_price != null) )
      {
         tempHolder +='&max_price='+params.max_price;
      }
      if(params.hasOwnProperty('sale_flag'))
      {
        tempHolder += '&sale=1';
      }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
   // headers.append('X-Forwarded-Port', '443789'); 


   //param = 'cat_id=' + params.cat_id+'&count=' + params.count + '&page=' + params.page + tempHolder + '&stn=' + 1 ;
     param = params.cat_id + '/' + params.page + '/' + params.count + '/?stn=1' + tempHolder;   
    //   this.baseApiUrl + 'restapis?' + param

    //'https://api.menamall.com/live/catalog/list/'+ param
 
      return this.http
        .get('https://api.myjson.com/bins/1c32ze')
        .map(resp => resp.json().data)
        .catch((error: any) => Observable.throw(error.json()));
    
  //  return this.http.get('https://api.menamall.com/live/catalog/list/'+ param, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }

  getFilteredProducts(params) {
    let body = new FormData(params);
    body.append('count', params.count);

     if(params.hasOwnProperty('cat_id')) {
        body.append('cat_id', params.cat_id); 
     }
     if(params.hasOwnProperty('size')) {
        body.append('size', params.size);
     }  
     if(params.hasOwnProperty('brand')) {
        body.append('brand', params.brand);
     } 
     if(params.hasOwnProperty('min_price')) {
        body.append('min_price', params.min_price);
     } 
     if(params.hasOwnProperty('price_range')) {
        body.append('price_range', params.price_range);
     } 
     if(params.hasOwnProperty('max_price')) {
        body.append('max_price', params.max_price);
     } 
     if(params.hasOwnProperty('sort_order')) {
        body.append('sort_order', params.sort_order);
     } 
     if(params.hasOwnProperty('color')) {
        body.append('color', params.color);
     } 
     if(params.hasOwnProperty('sort_criteria')) {
        body.append('sort_criteria', params.sort_criteria);
     } 

    let headers = new Headers();
   // headers.append('X-Forwarded-Port', '443789'); 
    
     return this.http.post(this.baseApiUrl + 'restapis', body, {headers: headers}).map(res => res.json()).catch(this.handleError);
  }
  

  getLiveQuantitiesForAllProducts(_groupSkus)
  {
    let postBody = new FormData(), headers = new Headers();
    postBody.append('getQuantity',_groupSkus);
    return this.http.post(this.baseApiUrl+'restapis?ncr=1' , postBody,  {headers: headers}).map( resp => resp.json()).catch(this.handleError);
  }
 getSearchResult(params)
 {
  let body = new FormData(), param, tempHolder="";
  body.append('cat_id', params.searchTerm);
  body.append('count', params.count);
 
 if(params.hasOwnProperty('size')) {
    body.append('size', params.size);
 }  
 if(params.hasOwnProperty('brand')) {
    body.append('brand', params.brand);
 }else
     {
      params.brand = "";
     } 
 if(params.hasOwnProperty('min_price')) {
    body.append('min_price', params.min_price);
 } 
 if(params.hasOwnProperty('price_range')) {
    body.append('price_range', params.price_range);
 } 
 if(params.hasOwnProperty('max_price')) {
    body.append('max_price', params.max_price);
 } 
 if(params.hasOwnProperty('sort_order')) {
    body.append('sort_order', params.sort_order);
 } 
 if(params.hasOwnProperty('color')) {
    body.append('color', params.color);
 } 
 if(params.hasOwnProperty('sort_criteria')) {
    body.append('sort_criteria', params.sort_criteria);
 } 

 // -------------- check params and append corresponding values ----

  // ------------------- sort order ----------------
  if(params.sort_order !== undefined && params.sort_order !== "" && params.sort_order != null)
  {
       tempHolder +='&order='+params.sort_order;
  }else
  if(params.sort_criteria !== undefined && params.sort_criteria !== "" && params.sort_criteria != null)
  {
     tempHolder +='&order='+params.sort_criteria;
  }else
  {
   tempHolder +='&order=';
  }
// ---------------------- ends ---------------------------


 // ----------------------- brands -------------------------
 if(params.brand !== undefined && params.brand !== "" && params.brand != null)
  {
    tempHolder +='&brand='+params.brand;
  }
// -------------------------------- sort parameters ----------------

// ---------------------------- color parameter -----------------
if(params.color_id !== undefined && params.color_id !== "" && params.color_id != null)
{
 tempHolder +='&color='+params.color_id;
}
// ----------------------------------- color ends ---------------------
  // ---------------------------- price parameter -----------------
  if((params.min_price !== undefined && params.min_price !== "" && params.min_price != null) )
  {
     tempHolder +='&price_from='+params.min_price;
  }
  if((params.max_price !== undefined && params.max_price !== "" && params.max_price != null) )
  {
     tempHolder +='&price_to='+params.max_price;
  }



let headers = new Headers();
headers.append('Content-Type', 'application/json');

 // /http://playground-dev.tools.kskdigital.com/IO.php?type=all&term=nike&count=24&page=3
  param = 'term='+params.searchTerm+'&count='+params.count+'&page='+params.page+tempHolder;

  return this.http.get('https://ocs.menamall.com/elastic/IO.php?type=all&'+param).map( resp => resp.json()).catch(this.handleError);  
 }


 getMatchResult(params)
 {
  let body = new FormData(), param, tempHolder="";
  body.append('cat_id', params.searchTerm);
  body.append('count', params.count);
 
 if(params.hasOwnProperty('size')) {
    body.append('size', params.size);
 }  
 if(params.hasOwnProperty('brand')) {
    body.append('brand', params.brand);
 }else
     {
      params.brand = "";
     } 
 if(params.hasOwnProperty('min_price')) {
    body.append('min_price', params.min_price);
 } 
 if(params.hasOwnProperty('price_range')) {
    body.append('price_range', params.price_range);
 } 
 if(params.hasOwnProperty('max_price')) {
    body.append('max_price', params.max_price);
 } 
 if(params.hasOwnProperty('sort_order')) {
    body.append('sort_order', params.sort_order);
 } 
 if(params.hasOwnProperty('color')) {
    body.append('color', params.color);
 } 
 if(params.hasOwnProperty('sort_criteria')) {
    body.append('sort_criteria', params.sort_criteria);
 } 

 // -------------- check params and append corresponding values ----

  // ------------------- sort order ----------------
  if(params.sort_order !== undefined && params.sort_order !== "" && params.sort_order != null)
  {
       tempHolder +='&order='+params.sort_order;
  }else
  if(params.sort_criteria !== undefined && params.sort_criteria !== "" && params.sort_criteria != null)
  {
     tempHolder +='&order='+params.sort_criteria;
  }else
  {
   tempHolder +='&order=';
  }
 // ----------------------- ends -------------------------

//   // -------------------------- sort criteria-----------------------
//  else
//  {
//   tempHolder +='&order=""';
//  }
// ---------------------- ends ---------------------------


 // ----------------------- brands -------------------------
 if(params.brand !== undefined && params.brand !== "" && params.brand != null)
  {
    tempHolder +='&brand='+params.brand;
  }
// -------------------------------- sort parameters ----------------

// ---------------------------- color parameter -----------------
if(params.color_id !== undefined && params.color_id !== "" && params.color_id != null)
{
 tempHolder +='&color='+params.color_id;
}
// ----------------------------------- color ends ---------------------
  // ---------------------------- price parameter -----------------
  if((params.min_price !== undefined && params.min_price !== "" && params.min_price != null) )
  {
     tempHolder +='&price_from='+params.min_price;
  }
  if((params.max_price !== undefined && params.max_price !== "" && params.max_price != null) )
  {
     tempHolder +='&price_to='+params.max_price;
  }




let headers = new Headers();
headers.append('Content-Type', 'application/json');
  param = 'category='+params.searchTerm+'&count='+params.count+'&page='+params.page+tempHolder;
  return this.http.get('https://ocs.menamall.com/elastic/IO.php?type=all&'+param).map( resp => resp.json()).catch(this.handleError); 
 }

 supplierQuantityUpdate(entityId)
 {
   return this.http.get(this.baseApiUrl+'restapis?_gcrtid='+entityId+"&ncr=1").map( resp => resp.json()).catch(this.handleError);  
 }

  handleError(err:Response)
  {
    return Observable.throw ("& Error log is =====>"+JSON.stringify(err)|| "Error Occured @ ====>"+this.datetime);  
  }
}
