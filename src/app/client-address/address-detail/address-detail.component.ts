import { Component, OnInit, Input,AfterViewInit } from '@angular/core';
import {FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClientAddress } from "app/client-address/model/client-address";
import { CustomerDataService } from "app/services/customer-data.service";
import { Region } from "app/client-address/model/region";
import { ClientAddressComponent } from "app/client-address/client-address.component";
import { ClientData } from "app/client-address/model/client-data";
import { DashboardComponent } from "app/dashboard/dashboard.component";

declare var $:any;
@Component({
    moduleId: module.id,
    selector: 'address-detail',
    templateUrl: 'address-detail.component.html',
    styleUrls: ['address-detail.component.css']
})

export class AddressDetailComponent implements OnInit, AfterViewInit{
 
    public modalId = "addressModal";
    public countryList: Array<any>;
    public regions: Array<Region> = [];
    public selectedRegionIndex: number = 0;
    public addressForm: FormGroup;
    formNotValid: boolean = true;
    disableCountry : boolean = true;
    countryName: any = "United Arab Emirates";
    @Input() currentAddress: ClientAddress = new ClientAddress( null, null, null, null, null,["", ""], null, null, null, null, null,null, false, false);
    @Input() clientAddresses: ClientAddress[] = [];
    @Input() customerData: ClientData = new ClientData(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    @Input() component: number = 0;
    nameValid:boolean = false;
    lastNameValid:boolean = false;
    phoneValid:boolean = false;
    cityValid:boolean = false;
    address1Valid:boolean = false;
    address2Valid:boolean = false;
    setDefaultBilling:boolean = true;
    getDefaultBilling:boolean = true;
    getDefaultShipping:boolean = true;
    titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    constructor(private service:
         CustomerDataService,
          private addressBook?: ClientAddressComponent,private _builder?:FormBuilder,
           private dashboard?: DashboardComponent, ) { 


           }

           ngAfterViewInit(): void {
            document.addEventListener('click', function(){
                $(".disabledPhone").click(function(event)
                {
                    $('.country-list').css('display', 'none')
                    return false;
                });
            });
        }
        
validateNumber (evt){
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
 
changeDefaultBilling(e)
    {
        if (e.target.checked)
        {
            this.getDefaultBilling = true;
        }else
        {
            this.getDefaultBilling = false;
        }
    }
changeDefaultShipping(e)
    {
        if (e.target.checked)
        {
            this.getDefaultShipping = true;
        }else
        {
            this.getDefaultShipping = false;
        }
    }
    ngOnInit() {
        this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
        this.nameValid = false;
        this.lastNameValid= false;
        this.phoneValid = false;
        this.cityValid = false;  
        this.address1Valid = false;
        this.address2Valid = false;
        this.setDefaultBilling = true;
        $('#cart_wrap').removeClass('blur');
        $('#header').removeClass('blur');
        $('.row').removeClass('blur'); 
        this.configureForm();
        this.getCountries();

        $("#dashboardPhone").intlTelInput({
            initialCountry: "auto", //AE
            utilsScript: "../assets/js/utils.js",
            geoIpLookup: function(callback) {
              $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
              });
            }
        });

        $.fn.intlTelInput.loadUtils("../assets/js/utils.js");
     
        $(".flag-container").addClass('disabledPhone');
        
       // $('').attr('disabled',true);
    }
  fadeOutMessage(fieldName)
  {
      if(fieldName== 'name')
      {
        this.nameValid = false;
      }else
      if(fieldName== 'lname')
        {
            this.lastNameValid = false;
        }else
        if(fieldName== 'phone')
        {
            this.phoneValid = false;
        }else
        if(fieldName== 'city')
            {
                this.cityValid = false;  
            }else
            if(fieldName== 'address1')
            {
                this.address1Valid = false;
            }else
            if(fieldName== 'address2')
            {
                this.address2Valid = false;
            }
  }
    getCountries() {
        this.service.getCountryList().subscribe(data => {
            this.countryList = data;
        }, err => {
            console.log(err)
        });
    }

    getRegions(country_id) {
        this.currentAddress.country_id = country_id;
        this.service.getRegionList(country_id).subscribe(data => {
            this.regions = [];
            if(data.available_regions != undefined)
            {            
                $.each(data.available_regions, (key, value)=>
              {
                let region = new Region("", "", 0);
                region.region = value.name;
                region.region_code = value.code;
                region.region_id = value.id;
                this.regions.push(region);
              });
            }
  
            

            let index = -1, self = this ;// = this.regions.findIndex(x => x.region_id == this.currentAddress.region.region_id);
            $.each(this.regions, (k, v)=> 
        {
             if(self.currentAddress.region != null)
             {
                if(v.region_id == self.currentAddress.region.region_id)
                {
                    index = 1;       
                }
             }
           
        })
    
            if (index == -1) {
                this.addressForm.controls["region"].setValue(0);
            } else {
                this.addressForm.controls["region"].setValue(index);
            }
        }, err => {
            console.log(err)
        });
    }

    setRegion(index) {
     
        this.currentAddress.country_id = index;
       
    }

    configureForm(address?: ClientAddress) {

          // ----- reset message -----
          this.nameValid = false;
          this.lastNameValid= false;
          this.phoneValid = false;
          this.cityValid = false;  
          this.address1Valid = false;
          this.address2Valid = false;
         // --------- reset ends -----

         $('#cart_wrap').removeClass('blur');
         $('#header').removeClass('blur');
         $('.row').removeClass('blur'); 

        if (address) {
            this.currentAddress = new ClientAddress(
                address.id,
                address.customer_id,
                address.region,
                address.region_id,
                address.country_id,
                address.street,
                address.company,
                address.telephone,
                address.postcode,
                address.city,
                address.firstname,
                address.lastname,             
                address.default_billing,
                address.default_shipping
            );
            this.getRegions(address.country_id);
        } else {
            this.selectedRegionIndex = 0;
        }

        this.addressForm = new FormGroup({
            company: new FormControl(this.currentAddress.company, Validators.required),
            telephone: new FormControl(this.currentAddress.telephone, Validators.required),
            firstname: new FormControl(this.currentAddress.firstname, Validators.required),
            lastname: new FormControl(this.currentAddress.lastname, Validators.required),
            city: new FormControl(this.currentAddress.city, Validators.required),
            postcode: new FormControl(123456),
            country: new FormControl(this.currentAddress.country_id),
            region: new FormControl(this.selectedRegionIndex),
            streetline1: new FormControl(this.currentAddress.street[0], Validators.required),
            streetline2: new FormControl(this.currentAddress.street[1]),
            default_billing: new FormControl(this.currentAddress.default_billing),
            default_shipping: new FormControl(this.currentAddress.default_shipping),
           
        });

      
    }

   
    submitForm(model:any, isValid:boolean) {

    //--------- if the form is valid -------------
     if( model.firstname != null && model.firstname !== "" &&
         model.lastname !=null &&   model.lastname !== "" &&
         model.telephone != null &&  model.telephone !== ""
         && model.city != null && model.city != "" && 
         model.streetline1 != null && model.streetline1 !="" &&
         model.streetline2 != null &&model.streetline2 != "")
         {
            if(this.currentAddress.country_id === null)
            {
                this.currentAddress.country_id = $('#country-dropdown').val();
            }

          //  console.log($("#dashboardPhone").intlTelInput("getNumber"))
            // -------------- set addresses -------------           
        this.currentAddress.city = this.addressForm.value["city"];
        this.currentAddress.company = this.addressForm.value["company"];
        this.currentAddress.firstname = this.addressForm.value["firstname"];
        this.currentAddress.lastname = this.addressForm.value["lastname"];
        this.currentAddress.telephone =this.addressForm.value["telephone"];// this.addressForm.value["telephone"];
        this.currentAddress.postcode =123456;
        this.currentAddress.street = [this.addressForm.value["streetline1"], this.addressForm.value["streetline2"]];
        // this.currentAddress.special_notes = this.addressForm.value["special_notes"];
        this.currentAddress.default_billing = this.getDefaultBilling;
        this.currentAddress.default_shipping = this.getDefaultShipping;
        // this.currentAddress.specialNotes = this.addressForm.value["special_notes"];
 
        if (this.currentAddress.id) {
            this.updateAddress();
        } else {
            this.addAddress();
        }

        $('#addressModal').modal('hide');
         }else{
               // ----validate form starts------------
            if(model.firstname == null || model.firstname === "")
            {
                this.nameValid = true ;
            }else
            {
               this.nameValid = false ;
            }
   
            if(model.lastname == null || model.lastname === "" )
            {
                this.lastNameValid = true ;
            }else
            {
               this.lastNameValid = false ;
            }
   
            if(model.city == null || model.city === "")
            {
                this.cityValid = true ;
            }else
            {
               this.cityValid = false ;
            }
   
            if(model.streetline1 == null || model.streetline1 === "")
            {
                this.address1Valid = true ;
            }else
            {
               this.address1Valid = false ;
            }
   
            if(model.streetline2 == null || model.streetline2 === "")
            {
                this.address2Valid = true ;
            }else
            {
               this.address2Valid = false ;
            }
   
            if(model.telephone == null || model.telephone === "")
            {
                this.phoneValid = true ;
            }else
            {
               this.phoneValid = false ;
            }
            //--------- form validation ends -----------
         }
    }

    addAddress() {
     
        this.clientAddresses.push(this.currentAddress);
        this.customerData.addresses = this.clientAddresses;
        this.service.addCustomerAddress(this.customerData);
        if(this.component == 1){
            this.addressBook.updateUI();
        } else {
            
            this.dashboard.updateUI();
        }
        
    }

    updateAddress() {
    
        var index = this.clientAddresses.findIndex(x => x.id == this.currentAddress.id);
        if (index != -1) {
            this.clientAddresses[index] = this.currentAddress;
        }
        this.customerData.addresses = this.clientAddresses;

        this.service.updateCustomerAddress(this.customerData);
  
        if(this.component == 1){
     
            this.addressBook.updateUI();
        } else {
         
            this.dashboard.updateUI();
        }
    }

    freshForm() {
        // ----- reset message -----
        this.nameValid = false;
        this.lastNameValid= false;
        this.phoneValid = false;
        this.cityValid = false;  
        this.address1Valid = false;
        this.address2Valid = false;
        this.addressForm.reset({});
        this.cleanAddress();
    }

    cleanAddress() {
        this.currentAddress = new ClientAddress(null, null,null, null, null, ["", ""], null, null, null, null, null,null, false, false);
    }
}