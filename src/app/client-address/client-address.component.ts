import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from "app/services/customer-data.service";
import { ClientAddress } from './model/client-address';
import { AddressDetailComponent } from './address-detail/address-detail.component';
import { ClientData } from "app/client-address/model/client-data";
import { DashboardComponent } from "app/dashboard/dashboard.component";

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-client-address',
  templateUrl: 'client-address.component.html',
  styleUrls: ['client-address.component.css']
})
export class ClientAddressComponent implements OnInit {
  clientAddresses: Array<ClientAddress> = [];
  additionlClientAddresses: Array<ClientAddress> = [];
  defaultClientAddresses: Array<ClientAddress> = [];
  currentAddress = new ClientAddress(null, null, null, null, null,null, null, null, null, null, null, null, null);
  customerData = new ClientData(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private service: CustomerDataService) { }

  ngOnInit() {
    this.titleName = 'menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more';
    $('#loading').show();
    this.getClientAddress();
  }

  getClientAddress() {
    this.service.getCustomerAddress()
      .subscribe(data => {
        this.customerData = data;
        this.clientAddresses = data["addresses"];
        this.updateUI();
  
        $('#loading').hide();
      },
      err => console.error(err));
  }

  updateUI() {
    this.defaultClientAddresses = [];
    this.additionlClientAddresses = [];
  
    for (let add of this.clientAddresses) {
      var addressData = new ClientAddress(null, null, null, null, null, null, null, null, null, null,null, null, null);
     
      if(add["id"] != null)
      {
        addressData.id = add["id"];
      }else{
        addressData.id =0;
      }
     
     if(add["customer_id"] != null)
     {
      addressData.customer_id = add["customer_id"];
     } else
     {
      addressData.customer_id =0;
     }
      
     if(add["region"] != null)
     {
      addressData.region = add["region"];
     } 
     
     if(add["region_id"] != null)
     {
      addressData.region_id = add["region_id"];
     }else
     {
      addressData.region_id = 0;
     }
     
     if(add["country_id"] != null)
     {
      addressData.country_id = add["country_id"];
     }else
     {
      addressData.country_id = 0;
     }
      
      addressData.street = add["street"];
      addressData.company = add["company"];
      addressData.telephone = add["telephone"];
      addressData.postcode = add["postcode"];
      addressData.city = add["city"];
      addressData.firstname = add["firstname"];
      addressData.lastname = add["lastname"];

      if (add.hasOwnProperty('default_billing')) {
        addressData.default_billing = add["default_billing"];
      } else if (add.hasOwnProperty('default_shipping')) {
        addressData.default_shipping = add["default_shipping"];
      }

      if (add.default_billing == true && add.default_shipping == true) {
        this.defaultClientAddresses.push(add);
        this.defaultClientAddresses.push(add);
      } else if (add.default_billing == true || add.default_shipping == true) {
        this.defaultClientAddresses.push(add);
      } else {
        this.additionlClientAddresses.push(add);
      }

      // this.clientAddresses.push(addressData);
    }

    this.customerData.addresses = this.clientAddresses;
  }

  removeAddress(address: ClientAddress) {
    var index = this.clientAddresses.findIndex(x => x.id == address.id);
    if (index != -1) {
      this.clientAddresses.splice(index, 1);
    }
    this.updateUI();
    this.service.removeCustomerAddress(this.customerData);
  }
}
