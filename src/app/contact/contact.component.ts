import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import {ContactForm} from '../interfaces/contact-form.interface';
import { GlobalVar } from '../globals';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var $:any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ValidationService]
})
export class ContactComponent implements OnInit {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  public contactForm : ContactForm;
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private http: Http) { }


  contactUs(model: ContactForm, isValid: boolean) {
    if(isValid) {
      $('#loading').show();

      let headers = new Headers({});
    let options = new RequestOptions({headers: headers});

       let body = new URLSearchParams();
       body.set('contact_email', model.email);
       body.set('contact_subject', model.subject);
       body.set('contact_message', model.message);

      
      return this.http.post(this.baseApiUrl + 'restapis?ncr=1', body, options
          ).map(res => res).subscribe(
            data => {
 
               $('#loading').hide();
               $('.contact-message').show();
               setTimeout(function() {
                 $('.contact-message').hide();
               }, 4000);
             },
            err => { 
              
              $('.error-message').show();
              setTimeout(function() {
                $('.error-message').hide();
              }, 4000);
              $('#loading').hide();
            },
            () => { 
                
            });
     } 
  };


  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    window.scrollTo(0,0);
    this.contactForm = {
          name: "",
          email: "", 
          phone: "",
          subject: "", 
          message: ""
      };
  }

}
