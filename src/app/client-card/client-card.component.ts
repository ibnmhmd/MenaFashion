import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { CreditCardService } from '../services/credit-card.service';
import {CustomerDetailsService} from '../services/customer-details.service';
import { CreditCard } from '../interfaces/credit-card.interface';
import 'rxjs/add/operator/map';
declare var $:any;

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css'],
  providers: [ValidationService, CreditCardService, CustomerDetailsService]
})
export class ClientCardComponent implements OnInit {
  public creditCard : CreditCard;

  customerEmail;
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private route: ActivatedRoute,
              private http: Http,
              private router: Router,
              private creditCardService: CreditCardService,
              private customerDetailsService: CustomerDetailsService
              ) { }

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    this.customerDetailsService.getCustomerDetails().subscribe(data => {
  
      this.customerEmail = data.email;
    }, err => {

    }, () => {
      this.creditCardService.getCardList(this.customerEmail).subscribe(data => {
    
      }, err => {
        console.log(err)
      });

    });

  } // end ngOnInit



}
