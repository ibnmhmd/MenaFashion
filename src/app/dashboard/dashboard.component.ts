import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { CustomerDetailsService } from '../services/customer-details.service';
import 'rxjs/add/operator/map';
import { CustomerDataService } from "app/services/customer-data.service";
import { Order } from "app/client-orders/model/order";

import { ClientData } from "app/client-address/model/client-data";
import { ClientAddress } from "app/client-address/model/client-address";
import { ClientAddressComponent } from "app/client-address/client-address.component";
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CustomerDetailsService]
})
export class DashboardComponent implements OnInit {
  defaultBilling = new ClientAddress(null, null,null, null, null, null, null, null, null, null, null, null, null);
  defaultShipping = new ClientAddress(null, null,null, null, null, null, null, null, null, null, null, null, null);
  clientOrders: Array<Order> = [];
  customerData =  new ClientData(null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  clientAddresses: Array<ClientAddress> = [];
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private router: Router,
    private customerDetailsService: CustomerDetailsService,
    private service: CustomerDataService
  ) { }

  getLastDigit(_number)
  {
      return _number%10;
  }

  removeFractionSpecial(price)
  {
    return Math.trunc(price);
  }
  removeFraction(priceValue){
          let price , _modifiedPrice = 0;
          if(priceValue != null && priceValue != undefined && priceValue != false) 
          {
              price = priceValue.toString().split(".");

            if(price[1] !== '0000' && price[1] !== undefined)
            {
                _modifiedPrice = parseInt(price[0])+1 ;
            }else
            {
                _modifiedPrice = parseInt(price[0]);
            }
            _modifiedPrice = Math.trunc(_modifiedPrice); 
          }
        return _modifiedPrice;
      }

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    $('#loading').show();
    $('.user-information').hide();
    this.getCustomerDetails();
    this.getCustomerOrders();
  }

  updateUI() {
    for (let item of this.clientAddresses) {
        if (item.hasOwnProperty('default_billing')) {
          this.defaultBilling = item;
        } else if (item.hasOwnProperty('default_shipping')) {
          this.defaultShipping = item;
        }
      }
  }

  getCustomerDetails() {
    this.customerDetailsService.getCustomerDetails().subscribe(data => {
      this.customerData = data;
      this.clientAddresses = data.addresses;
      this.updateUI();
    });
  }

  getCustomerOrders() {
    this.service.getCustomerOrderHistory()
      .subscribe(data => {
    
        if(data !== 'There is No Data' && data !== null)
        {
          for (let order of data) {
            var orderData = new Order(null,null,null, null, null, null, null, null, null, null, null, null, null, null);
            orderData.created_at = order["created_at"];
            orderData.currency = order["currency"];
            orderData.cust_id = order["cust_id"];
            orderData.customer_name = order["customer_name"];
            orderData.grand_total = order["grand_total"];
            orderData.order_number = order["order_number"];
            orderData.payment_method = order["payment_method"];
            orderData.product_details = order["product_details"];
            orderData.shipping_amount = order["shipping_amount"];
            orderData.shipping_method = order["shipping_method"];
            orderData.status = order["status"];
            orderData.subtotal = order["subtotal"];
            orderData.discount_amount =Math.abs(order["discount_amount"]).toString();
            orderData.coupon_code = order["coupon_code"];
            this.clientOrders.push(orderData);
          }
        }
      
        
        $('#loading').hide();
      },
      err =>  
      
      console.error(err));
  }

}
