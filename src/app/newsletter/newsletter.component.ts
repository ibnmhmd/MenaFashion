import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators, Validator, FormsModule, ReactiveFormsModule, NgModel, NgForm, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { NewsletterForm } from '../interfaces/newsletter.interface';
import {NewsletterService} from '../services/newsletter.service';
declare var $:any;
@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css'],
  providers: [ValidationService, NewsletterService]
})
export class NewsletterComponent implements OnInit {
  email;
  subscribeSuccess = false;
  subscribeExist = false;
  public newsletterForm : NewsletterForm;
  subNotif:String = "";
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private http: Http, private newsletterService: NewsletterService) { }

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    this.newsletterForm = {
          email: ""
      };
  }

  onFormSubmit(newsletterForm, isValid: boolean) {
    if(isValid) { 
      $('#loading').show();
      let details = {
        "email": newsletterForm.email,
        "list": "89rid6ZanyTcCY3vMpaCUQ"
      }

      this.newsletterService.subscribeToNewsletter(details).subscribe(data => {
        $('#loading').hide();
        if(data['_body'] == 1) {
      
         this.subNotif = "";
         this.subNotif = "You have been successfully subscribed to our newsletter."
         $('#subscriptionNotif').modal('show');
          setTimeout(function() {
            $('#subscriptionNotif').modal('hide');
          }, 4000)
          
        } else if(data['_body'] == 'Already subscribed.') {
          this.subNotif = "";
          this.subNotif = "You have already subscribed to our newsletter."
          $('#subscriptionNotifErr').modal('show');
             setTimeout(function() {
              $('#subscriptionNotifErr').modal('hide');
          }, 4000)

        }

      
      }, err => {
        $('#loading').hide(); })
     } 
  }

}
