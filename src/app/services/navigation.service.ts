import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class NavigationService {
    private baseApiUrl = GlobalVar.BASE_API_URL;
    public brandFilter = "";
    
  
     currentdate:Date = new Date(); 
     datetime = "Log Information ==> : " + this.currentdate.getDate() + "/"
                    + (this.currentdate.getMonth()+1)  + "/" 
                    + this.currentdate.getFullYear() + " @ "  
                    + this.currentdate.getHours() + ":"  
                    + this.currentdate.getMinutes() + ":" 
                    + this.currentdate.getSeconds();

    constructor( private http: Http) { }

    
    getMenuCategories() {
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json'); 
        //  this.baseApiUrl + 'rest/V1/categories/'
        // 'https://api.menamall.com/live/categories/list'

        // getting from online json host
         return this.http.get('https://api.myjson.com/bins/k1ke2', { headers: headers }).map(res => res.json()).catch(this.handleError);

    }

    getLandingPage(url)
    {
        let headers = new Headers();
        //headers.append('Content-Type', 'application/json'); 

        //  this.baseApiUrl+'restapis?getPageContent='  https://api.menamall.com/live/static/
        return this.http.get('https://api.menamall.com/live/static/'+url, { headers: headers }).map(res => res.json()).catch(this.handleError);
    }

    getSuggestions()
    {
        let headers = new Headers();
        return  this.http.get('https://api.myjson.com/bins/1amg4d',{ headers: headers }).map(res => res.json()).catch(this.handleError);        
    }

    getCategoriesTotalProduct(_sale)
    {
        let headers = new Headers(), param="";
        //headers.append('Content-Type', 'application/json'); 
        if(_sale !== undefined && _sale !== null && _sale === 'sale')
        {
            param = '_gcd=1&sale=1';
        }else
        {
            param = '_gcd=1';
        }
        return this.http.get(this.baseApiUrl+'restapis?'+param, { headers: headers }).map(res => res.json()).catch(this.handleError);  
    }
     handleError(err: Response)
     {
         return Observable.throw(err.json()|| "######### Error Occured while loading Categories")
     }
} 