import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from "app/services/customer-data.service";
import { Order } from "app/client-orders/model/order";
import { Product } from "app/client-orders/model/product";
import { CustomerDetailsService } from "app/services/customer-details.service";
import { ClientData } from "app/client-address/model/client-data";
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-client-orders',
  templateUrl: 'client-orders.component.html',
  styleUrls: ['client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit {
  clientOrders: Array<Order> = [];
  status:any = "";
  clientOrdersCheck;
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private service: CustomerDataService, private customerDetailsService: CustomerDetailsService, ) { }

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    $('#loading').show();
    $('.user-information').hide();
    this.getCustomerOrders();
  }

  getCustomerOrders() {
    this.service.getCustomerOrderHistory()
      .subscribe(data => {
        if(data == 'There is No Data') {
          this.clientOrdersCheck = false;
        } else {
          this.clientOrdersCheck = true;
        }
          for (let order of data) {
            var orderData = new Order(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
            orderData.discount_amount = Math.abs(order["discount_amount"]).toString();
            orderData.coupon_code = order["coupon_code"];
            this.status = order["status"];
            
            this.clientOrders.push(orderData);

          }

        $('#loading').hide();
      },
      err => console.error(err));
  }

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

}
