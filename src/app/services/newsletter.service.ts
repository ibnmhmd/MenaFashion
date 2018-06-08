import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { GlobalVar } from '../globals';

import 'rxjs/add/operator/map';

@Injectable()
export class NewsletterService {

  constructor(private http: Http) { }


  subscribeToNewsletter(details) {
    //  let headers = new Headers({
    //  'Content-Type': 'application/x-www-form-urlencoded'
    // });
  
    // let body = new FormData();
    //   body.append('email', details.email);
    //   body.append('list', details.list);
    //   body.append('boolean', "true");

      // let body = `email=${details.email}&list=${details.list}`;

      let headers = new Headers({});
      let options = new RequestOptions({headers: headers});

       let body = new URLSearchParams();
       body.set('email', details.email);
       body.set('list', details.list);
       body.set('boolean', 'true');
       

    return this.http.post('https://mail-service.menamall.com/subscribe', body, options).map(res => res);
  }

  

}
