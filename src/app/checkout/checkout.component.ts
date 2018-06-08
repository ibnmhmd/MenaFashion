import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import {CheckoutService} from '../services/checkout.service';
import {CouponCodeService} from '../services/coupon-code.service';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerDetailsService } from '../services/customer-details.service';
import { ValidationService } from '../services/validation.service';
import { CreditCardService } from '../services/credit-card.service';
import { Checkout } from '../interfaces/checkout.interface';
import { CreditCard } from '../interfaces/credit-card.interface';

import { ClientData } from "app/client-address/model/client-data";
import { ClientAddress } from "app/client-address/model/client-address";
import{SingleProductDetailsService} from '../services/single-product-details.service';
import { CategoryListProductService } from '../services/category-list-product.service';
import 'rxjs/add/operator/map';
declare var $:any;
declare var paypal:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CategoryListProductService,CheckoutService, ValidationService, CouponCodeService, CustomerDetailsService, CreditCardService]
})
export class CheckoutComponent implements OnInit,AfterViewInit {
  public submitAddresses : Checkout={shippingfirstname:"",
                                  shippinglastname:"", 
                                  shippingcity:"",
                                  shippingcompany:"",
                                shippingcountries:"",shippingcountry:"",
                                shippingemail:"",shippingphone:"",shippingpostcode:"",shippingregion:{}, shippingstate:"",
                                  shippingstreet:"",
                                billingcity:"", billingcompany:"",billingcountries:"",billingemail:"",
                              billingfirstname:"",billingpostcode:"",billingregion:{},
                            billingstreet:"",billingstate:"",billinglastname:"",billingphone:"",billingcountry:""};

  public editCustomerShippingForm;
  public editCustomerBillingForm: Checkout;

  public customerNewDataAddressShippingForm;

  public customerNewDataAddressBillingForm;

  public customerNewDataAddressShippingFormOwerwrite;

  public creditCard : CreditCard;

  showPayment: boolean = true;
  showAddress: boolean = true;
  checkOutFlag:boolean = false;
  disableCountry:boolean = true;
  checkedShipping:boolean = false ;
  checkOutLog : any = "";
  wishNotif:any = "";
   cartItems;
   countryList;
   selectedCountries;
   shippingStateList;
   billingStateList;
   customerCartId;
   cartNotEmpty: boolean = true;
   couponCode = '';
   couponErr = false;
   couponNotValid = false;
   couponValid = false;
   nameoncard= "Menamall Beta Tester";
   prodAttrs = [];
   orderDetail;
   cartSubtotalArr =[];
   cartSubtotal;
   shippingInclTax;
   grandTotal;
   discountAmount= 0;
   nextError:boolean =false;
  shippingBillingForm = false;
  guestUser = false;
  sameAsShipping = true;
  hasRegion = true;
  sameAsShippingCustomer: boolean = false ;
  shippingfirstname;
  shippingLastname;
  shippingEmail;
  shippingPhone;
  shippingCountries;
  shippingRegion;
  shippingCity;
  shippingStreet;
  shippingPostcode;
  shippingCompany;
  
  billingFirstname;
  billingLastname;
  billingEmail;
  billingPhone;
  selectedBillingCountry;
  selectedBillingState;
  billingCity;
  billingStreet;
  billingPostcode;
  billingCompany;
  exchangeRateCheckOut:any = 1;
  finalbillingfirstname;
  finalbillinglastname;
  finalbillingemail;
  finalbillingphone;
  finalbillingcountries;
  finalbillingregion;  //submitAddresses.shippingcountries
  finalbillingcity;
  finalbillingstreet;
  finalbillingpostcode;
  finalbillingcompany;
  errMsg:any = "";
  customerSameBill = false;
  customerReadyForPayment = false;

  getShippingMethod;
  shippingMethodCode;
  shippingCarrierCode;
  message:any = "";

  selectedPaymentMethod = "creditcard";
  checkoutCardId;
  guestBilling;
  guestBillingEmail;
  successOrder = false;
  successOrderDetails;

   itemii = [];
   paypalGuest;
   paypalGuestReady = false;
   noPaymentInfoRequired:boolean = false;
creditNumber: boolean= true ;
setDefaultBilling:boolean = true;

   //////////// CUSTOMER ////////////////

  noDefaultShipping = true;
  noDefaultBilling = true;
  customerShipping = {
    firstname: "",
    lastname: "",
    phone: "",
    country: "",
    city: "",
    street1: "",
    street2: "",
    postcode: "123456",
    countries:"",
    region: "",
    company:"",
  };

  customerBilling = {
    firstname: "",
    lastname: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    street1: "",
    street2: "",
    postcode: "123456",
    countries:"",
    region: "",
    company: ""
  };

  defaultShippingId;
  customerCarierCode;
  customerMethodCode;

  creditCardByEmail;
  noPreviosCustomerCard = true;
  noSaveCardDetail: boolean = false;

  nameCardEdit;
  expiryMMCardEdit;
  expiryYYCardEdit;
  editCardDefault;
  cardNum;
  setDefaultCardNum;
  setDfaultCountry:any ='AE';
  setDfaultCountryBilling:any= 'AE';
  setCustomerDfaultCountry:any ='AE';
  setCustomerDfaultCountryBilling:any= 'AE';
  customerData = new ClientData(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  defaultBilling = new ClientAddress(null, null, null, null, null, null, null, null, null, null,null, null, null);
  defaultShipping = new ClientAddress(null, null, null, null, null, null, null, null, null, null,null, null, null);
 disablePayment:boolean = true;
 hideValidation:boolean = true;
 titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";

  constructor(private route: ActivatedRoute,
              private http: Http,
              private router: Router,
              private checkoutService: CheckoutService,
              private couponCodeService: CouponCodeService,
              private customerDetailsService: CustomerDetailsService,
              private _fb: FormBuilder,
              private creditCardService: CreditCardService,
              private categoryListProductService: CategoryListProductService,
              public sanitizer: DomSanitizer,private singleProductDetailsService:SingleProductDetailsService
              ) { }

                      //------------ encode sku --------------
                      encodeProductSku(sku)
                      {
                          if(sku !== undefined && sku !== null)
                          {
                              return window.btoa(sku);
                          }
                          return sku;
                      }

                      showAlert(name, itemQty, id, qty)
                      {
                        this.message = "";
                        this.message = "Sorry, We don't have as many ("+ name +") as you requested, we have only ("+ itemQty +") in stock";
                        $('#wishModalCheckOut').modal('show');
                        setTimeout(function()
                        {
                          $('#wishModalCheckOut').modal('hide');
                        }, 5000); 
                        
                        $('#item'+id).val(qty);
                      }                  
                      qrtAlert(qty)
                      {
                        this.message = "";
                        this.message = "Item quantity updated to ("+ qty +")";
                        $('#wishModalCheckOutQty').modal('show');
                        setTimeout(function()
                        {
                          $('#wishModalCheckOutQty').modal('hide');
                        }, 3000);    
                      }

              ngAfterViewInit(): void 
              {
                $('#customerPhoneNumberOriginal, #customerPhoneNumberSecond,#customerPhoneNumberEdit, #customerPhoneNumber').intlTelInput({
                  initialCountry: 'AE', //AE
                  // utilsScript: '../assets/js/utils.js',
                  // geoIpLookup: function(callback) {
                  //   $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                  //     var countryCode = (resp && resp.country) ? resp.country : "";
                  //     callback(countryCode);
                  //   });
                 // }
                
                });

           

                $('#customerPhoneNumberBilling, #customerPhoneNumberBillingEdit').intlTelInput({
                  initialCountry: 'AE', //AE
                  // utilsScript: '../assets/js/utils.js',
                  // geoIpLookup: function(callback) {
                  //   $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                  //     var countryCode = (resp && resp.country) ? resp.country : "";
                  //     callback(countryCode);
                  //   });
                  // }
                
                });

                // $('#customerPhoneNumberSecond').intlTelInput({
                //   initialCountry: 'auto', //AE
                //   utilsScript: '../assets/js/utils.js',
                //   geoIpLookup: function(callback) {
                //     $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                //       var countryCode = (resp && resp.country) ? resp.country : "";
                //       callback(countryCode);
                //     });
                //   }    
                // });

                // $('#customerPhoneNumberEdit').intlTelInput({
                //   initialCountry: 'auto', //AE
                //   utilsScript: '../assets/js/utils.js',
                //   geoIpLookup: function(callback) {
                //     $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                //       var countryCode = (resp && resp.country) ? resp.country : "";
                //       callback(countryCode);
                //     });
                //   }    
                // });
                
                // $('#customerPhoneNumberBilling').intlTelInput({
                //   initialCountry: 'auto', //AE
                //   utilsScript: '../assets/js/utils.js',
                //   geoIpLookup: function(callback) {
                //     $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                //       var countryCode = (resp && resp.country) ? resp.country : "";
                //       callback(countryCode);
                //     });
                //   }    
                // });

                // $('#customerPhoneNumberBillingEdit').intlTelInput({
                //   initialCountry: 'auto', //AE
                //   utilsScript: '../assets/js/utils.js',
                //   geoIpLookup: function(callback) {
                //     $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                //       var countryCode = (resp && resp.country) ? resp.country : "";
                //       callback(countryCode);
                //     });
                //   }    
                // });
                
                $(".flag-container").addClass('disabledPhone');

                document.addEventListener('click', function(){
                  $(".disabledPhone").click(function(event)
                  {
                      $('.country-list').css('display', 'none')
                      return false;
                  });
                 })


                 // ----- initialize the help popover with an image -----
                 $('a[rel=popover]').popover({
                  html: true,
                  trigger: 'hover',
                  placement: 'right',
                  content: function()
                  {
                    return '<img src = "../assets/img/cvv.jpg" style="width:500px;" />';
                  }
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

            // -------------- exclude any special character from the url------
excludeSpecialCharacter(string)
{
    if(string != undefined && string != null)
    {
        return string.replace(/[^\w\s]/gi," ")
    }
   return string;
}

// ------------ trick address ----------
mockAddressObject()
{
  let shippingInformation;
  shippingInformation = {
      "addressInformation": {
          "shippingAddress": {
              "country_id":'AE',// this.finalbillingcountries,
              "street": ['mock street'],
              "company":"n/a",
              "telephone":"12344",
              "postcode":'123456',
              "city": "n/a",
              "firstname":"n/a",
              "lastname":"n/a",
              "email":"mock@test.com",
              "prefix": "address_",
              "sameAsBilling": 1
          },
          "billingAddress": {
              "street": [null],
              "postcode":'123456',
              "prefix": "address_"
          },
          "shipping_method_code":"flatrate",
          "shipping_carrier_code":"flatrate"
      }
  }

  return shippingInformation;
}
              getLastDigit(_number)
              {
                  return _number%10;
              }
                removeFraction(priceValue){
                        let price , _modifiedPrice = 0;
                        if(priceValue !== null && priceValue !== undefined && priceValue !== false) 
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
 // calculateShipping()
   updateItemCart(itemId, itemSku, itemEntity, name, itemQty) {
    if(localStorage.getItem('customerToken') === null) {
      let cartId = localStorage.getItem('shopGuestCartId');
      let itemQty = $('#item'+itemSku).val();

   if(isNaN(parseInt(itemQty)) || parseInt(itemQty) < 1)
   {    
     this.message = "";
     this.message = "Please enter a valid quantity !";
     $('#wishModalCheckOut').modal('show');
     setTimeout(function() {
      $('#wishModalCheckOut').modal('hide');
     }, 2000);
   }else
   {
    $('#loading').show();
    let cartItem = {
      "cartItem": {
        "item_id": itemId,
        "qty": itemQty,
        "quote_id": cartId
      }
    };
    this.categoryListProductService.supplierQuantityUpdate(itemEntity).subscribe(payload =>  
      {
          //this.generalAvailableQty                            
           if(payload.data !== undefined && payload.data !== null)
           {
               if(parseInt(itemQty) <= Math.trunc(parseInt(payload.data[0].quantity)))
               {
                  this.checkoutService.updateGuestCart(cartItem).subscribe(data => {
                    this.checkoutService.getGuestCart(localStorage.getItem('shopGuestCartId')).subscribe(data => {
                      this.cartItems = data;
                        let price= 0;
                      if(data !== undefined)
                      {
                        $.each(data, (key,value) =>
                        {
                          price += this.removeFraction(value.price*value.qty);
                        });
                      }
     
                    this.checkoutService.getGuestTotals().subscribe(data => {

        this.cartSubtotal = data.subtotal;
        if(data.shipping_amount === undefined)
        {
          this.shippingInclTax = 0;
        }else{
          this.shippingInclTax = data.shipping_amount;
        }

        this.grandTotal =price+this.shippingInclTax;
        this.discountAmount =Math.abs(data.discount_amount) ;
        $('#loading').hide();

        this.qrtAlert(parseInt(itemQty));
      }, err => {
        $('#loading').hide();
      });

            $('.minicart-update').click();
               });
            });
          }else
          {
            $('#loading').hide();
             this.showAlert(name, parseInt(payload.data[0].quantity),itemId,itemQty);
           }
      }else
      {
        $('#loading').hide();
        this.message = "";
        this.message = "Error occured please try again ."
        $('#wishModalCheckOut').modal('show');
        setTimeout(function()
        {
          $('#wishModalCheckOut').modal('hide');
        }, 2000);    
      }
}, err => { console.log(err)});
        
   }
     
    } else {
      // if user is loged in
      let cartId = localStorage.getItem('shopCartId');
      let itemQty = $('#item'+itemSku).val();
      if(isNaN(parseInt(itemQty)) || parseInt(itemQty) < 1)
      {
        this.message = "";
        this.message = "Please enter a valid quantity !";
        $('#wishModalCheckOut').modal('show');
        setTimeout(function() {
         $('#wishModalCheckOut').modal('hide');
        }, 2000);
      }else
      {

        $('#loading').show();
        let cartItem = {
          "cartItem": {
            "item_id": itemId,
            "quote_id": this.customerCartId,
            "qty": itemQty,

          }
        };

        this.categoryListProductService.supplierQuantityUpdate(itemEntity).subscribe(payload =>  
          {
              //this.generalAvailableQty                            
               if(payload.data !== undefined && payload.data !== null)
               {
                   if(parseInt(itemQty) <= Math.trunc(parseInt(payload.data[0].quantity)))
                   {
        this.checkoutService.updateCustomerCart(cartItem).subscribe(data => {
          this.checkoutService.getCustomerCart().subscribe(data => {
      
            this.cartItems = data;

            this.checkoutService.getCustomerTotals().subscribe(data => {
              this.cartSubtotal = data.subtotal;
              if(data.shipping_amount === undefined)
              {
                this.shippingInclTax = 0;
              }else{
                this.shippingInclTax = data.shipping_amount;
              }
              this.grandTotal = data.grand_total;
              this.discountAmount =Math.abs(data.discount_amount*this.exchangeRateCheckOut) ;
              $('#loading').hide();
              this.qrtAlert(parseInt(itemQty));
           }, err => {
            $('#loading').hide();
           });
                $('.minicart-update').click();
              });
            });
          }else
          {
            $('#loading').hide();
            this.showAlert(name, parseInt(payload.data[0].quantity),itemId,itemQty);
          }
      }else
      {
        $('#loading').hide();
        this.message = "";
        this.message = "Error occured please try again ."
        $('#wishModalCheckOut').modal('show');
        setTimeout(function()
        {
          $('#wishModalCheckOut').modal('hide');
        }, 2000);    
      }
    }, err => { console.log(err)})
        
      }
    };
  };

  // -------- remove item from cart ---------------
  removeFromCart(prodId) {
    $('#loading').show();
    if(localStorage.getItem('customerToken') === null) {
      var cartId = localStorage.getItem('shopGuestCartId');
      this.checkoutService.deleteGuestCartItem(cartId, prodId).subscribe(data => {

        this.checkoutService.getGuestCart(localStorage.getItem('shopGuestCartId')).subscribe(data => {
          
          this.cartItems = data;
          let price= 0;
          if(data !== undefined)
          {
            $.each(data, (key,value) =>
            {
              price += this.removeFraction(value.price);
            });
          }
          
          $('#loading').hide();
          this.checkoutService.getGuestTotals().subscribe(data => {
            this.cartSubtotal = data.subtotal;
            if(data.shipping_amount === undefined)
            {
              this.shippingInclTax = 0;
            }else{
              this.shippingInclTax = data.shipping_amount;
            }
         //   this.grandTotal =this.removeFraction(data.grand_total);

          // ------- get grand total from total number of items' prices + shipping amount ---
            this.grandTotal =price+this.shippingInclTax;
            this.discountAmount =Math.abs(data.discount_amount) ;
          });
          $('.minicart-update').click();
        });
      });
    } else {
      //remove if user loged in
      var cartId = localStorage.getItem('shopCartId');
      this.checkoutService.deleteCustomerCartItem(prodId).subscribe(data => {
  
       this.checkoutService.getCustomerCart().subscribe(data => {
       
        this.cartItems = data;
        this.checkoutService.getCustomerTotals().subscribe(data => {
           
            this.cartSubtotal = data.subtotal;
            if(data.shipping_amount === undefined)
            {
              this.shippingInclTax = 0;
            }else{
              this.shippingInclTax = data.shipping_amount;
            }
            this.grandTotal = data.grand_total;
            this.discountAmount =Math.abs(data.discount_amount*this.exchangeRateCheckOut) ;
            $('#loading').hide();
        });

        $('.minicart-update').click();
      })
      });
    };
  }

  applyCoupon() {
    if(this.couponCode == '') {
      this.couponErr = true;
      this.couponNotValid = false;

    } else {
      $('#loading').show();
      this.couponErr = false;
   
      this.couponNotValid = false;

      // check if guest
      if(localStorage.getItem('customerToken') === null) {
        this.couponCodeService.checkGuestCouponCode(localStorage.getItem('shopGuestCartId'), this.couponCode).subscribe(data => {
         
          $('#loading').hide();
          this.couponValid = true;

          this.checkoutService.getGuestTotals().subscribe(data => {
           
            this.cartSubtotal = data.subtotal;
            if(data.shipping_amount === undefined)
            {
              this.shippingInclTax = 0;
            }else{
              this.shippingInclTax = data.shipping_amount;
            }
            this.grandTotal = data.grand_total;
            this.discountAmount =Math.abs(data.discount_amount*this.exchangeRateCheckOut);
           
          });

        }, err => {
          this.couponNotValid = true;
          this.couponValid = false;
          $('#loading').hide();
        });

      //check if customer
      } else {
        this.couponCodeService.checkCustomerCouponCode(this.couponCode).subscribe(data => {
      
          $('#loading').hide();
          this.couponValid = true;

          this.checkoutService.getCustomerTotals().subscribe(data => {
        
            this.cartSubtotal = data.subtotal;
            if(data.shipping_amount === undefined)
            {
              this.shippingInclTax = 0;
            }else{
              this.shippingInclTax = data.shipping_amount;
            }
            this.grandTotal = data.grand_total;
            this.discountAmount =Math.abs(data.discount_amount*this.exchangeRateCheckOut);
          
          });

        }, err => {
          this.couponNotValid = true;
          this.couponValid = false;
          $('#loading').hide();
        });
      }

    };
  } // end applyCoupon


  // ------- set billing ------
  setBilling(model: Checkout)
  {
     
    if($('.shippingCheckBox').is(':checked'))
    {
      this.setDefaultBilling = true ;
      this.sameAsShipping = true;
    }else
    {
      this.setDefaultBilling = false ;
      this.sameAsShipping = false;
    }
    
    if(!this.sameAsShipping) {
      model.billingfirstname = "";
      $('#billingfirstname').val("");
      this.finalbillingfirstname = "";

      model.billinglastname = "";
      $('#billinglastname').val("");
      this.finalbillinglastname = "";

      model.billingemail = "";
      $('#billingemail').val("");
      this.finalbillingemail = "";

      model.billingphone = "";
      $('#guestPhoneNumber').val("");
      this.finalbillingphone = "";

      model.billingcountries =  "";
      this.finalbillingcountries = "";

      model.billingregion = "";
      this.finalbillingregion = "";

      model.billingcity = "";
      $('#billingcity').val("");
      this.finalbillingcity = "";

      model.billingstreet = "";
      $('#billingstreet').val("");
      this.finalbillingstreet = "";

      model.billingpostcode = "";
      $('#billingpostcode').val("");
      this.finalbillingpostcode = "";

      model.billingcompany = "";
      $('#billingcompany').val("");
      this.finalbillingcompany = "";
    } else {

      model.billingfirstname = model.shippingfirstname;
      $('#billingfirstname').val(model.billingfirstname);
      this.finalbillingfirstname = model.billingfirstname;
  

      model.billinglastname = model.shippinglastname;
      $('#billinglastname').val(model.shippinglastname);
      this.finalbillinglastname = model.billinglastname;

      model.billingemail = model.shippingemail;
      $('#billingemail').val(model.shippingemail);
      this.finalbillingemail = model.billingemail;
    
      model.billingphone = model.shippingphone;
      $('#guestPhoneNumber').val(model.shippingphone);
      this.finalbillingphone = model.billingphone;

      model.billingcountries = 'AE';// model.shippingcountries;
      this.finalbillingcountries = model.billingcountries;

      model.billingregion = model.shippingregion;
      this.finalbillingregion = model.billingregion;

      model.billingcity = model.shippingcity;
      $('#billingcity').val(model.shippingcity);
      this.finalbillingcity = model.billingcity;

      model.billingstreet = model.shippingstreet;
      $('#billingstreet').val(model.shippingstreet);
      this.finalbillingstreet = model.billingstreet;

      model.billingpostcode = '123456';
      $('#billingpostcode').val(model.shippingpostcode);
      this.finalbillingpostcode = model.billingpostcode;

      model.billingcompany = model.shippingcompany;
      $('#billingcompany').val(model.shippingcompany);
      this.finalbillingcompany = model.billingcompany;
    }
  }
  // -------------
  ngOnInit() {
    this.titleName = 'menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more';
    $('.user-information1').hide();
    $('#loading').show();
    $('#footer').show();
    this.noPaymentInfoRequired = false;
    this.sameAsShippingCustomer = false;
    this.nextError = false;
    this.errMsg = "";
    let self = this ;
    this.checkedShipping = false ;
    this.nameoncard= "Menamall Beta Tester";
    this.creditNumber = true ;
    this.setDefaultBilling = true;
    this.sameAsShipping = true;
    self.exchangeRateCheckOut  = 1;
    this.cartNotEmpty = true;
    console.log($('.shippingCheckBox').is(':checked'))
    if(localStorage.getItem('customerToken') === null) {
      this.guestUser = true;
      this.shippingBillingForm = true;
     
      this.checkoutService.getGuestCart(localStorage.getItem('shopGuestCartId')).subscribe(data => {
    
         //  // set shipping information
      $('#loading').show();
      let price= 0;
      // ------- pass mocked object and get the shipping amount alongside the grand and sub total ------
      this.checkoutService.setGuestShippingInformation(this.mockAddressObject()).subscribe(payLoad => 
         {  
             if(payLoad.totals.shipping_amount !== undefined)
             {
              this.shippingInclTax = this.removeFraction(payLoad.totals.shipping_amount);
             } 
               $.each(data, (key,value) =>
               {
                 price += this.removeFraction(value.price)*value.qty;
               });
               this.cartSubtotal = price;
               this.grandTotal = price+this.shippingInclTax;
               $('#loading').hide();
          }, err => {
           $('#loading').hide();
          })
          // -------------------- ends -----------------------------------

             this.cartItems = data;  
             this.checkoutService.getGuestTotals().subscribe(data => {
         //   this.grandTotal =this.removeFraction(data.grand_total);
            this.discountAmount =Math.abs(data.discount_amount) ;

            for(let item of data.items) {
              this.prodAttrs.push(JSON.parse("[" + item.options + "]"))
            };
            $('#loading').hide();
          });
    //  $('#loading').hide();

      });
    } else {
      // ----- get cart items for logged in user -----------
   
          // this.checkoutService.customerShippingInformation(this.mockCustomerData()).subscribe(data =>
          //      {
          //        console.log(JSON.stringify(data))
          //      }), err =>
          //      {
             
          //      };

      this.checkoutService.getCustomerCart().subscribe(data => {
       // $('#loading').show();     
        this.customerCartId = localStorage.getItem('shopCartId');
        this.cartItems = data;
        this.checkoutService.getCustomerTotals().subscribe(data => {
          
            this.cartSubtotal = data.subtotal;
            if(data.shipping_amount === undefined)
            {
              this.shippingInclTax = 0;
            }else{
              this.shippingInclTax = data.shipping_amount;
            }
            this.grandTotal = data.grand_total;
            this.discountAmount =Math.abs(data.discount_amount) ;

            for(let item of data.items) {
              this.prodAttrs.push(JSON.parse("[" + item.options + "]"))
            };

          //  $('#loading').hide();
        });
      }, (err) => {
         console.log(err);
        $('#loading').hide();
      });
    }


    this.checkoutService.getCountryList().subscribe(data => {
      this.countryList = data;
    
    }, err => {
      console.log(err)
      $('#loading').hide();
    });

	this.populateCustomerData();

  } // end ngOnInit

replaceSpaces(string)
{
    if(string != undefined && string != null)
    {
		var newString = string.replace(/\s/g, '-');
		return newString;
    }
   return string;
}

  showAddressSection() {
    // $('#address-item-section').show();
    // $('#address-itm').show();
    // $('html, body').animate({
    //     scrollTop: $('#address-item-section').offset().top - 120 + 'px'
    // }, 'fast');

    if(localStorage.getItem('customerToken') === null){
  
    } else {
      this.getCustomerData();
    }


  }


  expandCartTa(para) {
    $('#loading').show();
    $('.cart-tab-body').slideUp();
    $('#'+para).slideToggle();
    setTimeout(()=> { 
      $('#loading').hide();
  
    }, 2000)
   
  }


  expandCartTab(param, tabNumber) {
    $('#loading').show();
    $('.cart-tab-body').slideUp();
    $('#'+param).slideToggle();
    let time =2000;
    if(tabNumber === '002')
    {
      time = 5000;
    }
    setTimeout(()=>
  {
    $('#loading').hide();
  },time);

    if(tabNumber == '01')
    {
      this.showPayment = true;
      this.showAddress = true;
    }else
      if(tabNumber == '001')
      {
        this.showPayment = true;
        this.showAddress = false;
      }else
      if(tabNumber == '002')
      {
        this.showPayment = false;
        this.showAddress = false;
      }else
         if(tabNumber == '03')
         {
          this.showPayment = false;
          this.showAddress = false;
         }
   
  }

  shippingCountrySelected(id) {
    this.checkoutService.getRegionList(id).subscribe(data => {
      this.shippingStateList = data;
 
      if(data.hasOwnProperty('available_regions')) {
     
        this.hasRegion = true;
      } else {
  
        this.hasRegion = false;
      }
    });
  }
  shippingRegionCode(code) {
 
  }

  billingCountrySelected(id) {
    this.checkoutService.getRegionList(id).subscribe(data => {
      this.billingStateList = data;
  
      if(data.hasOwnProperty('available_regions')) {
   
        this.hasRegion = true;
      } else {
     
        this.hasRegion = false;
      }
    });
  }
  billingRegionCode(code) {
 
  }
  getRegionData(state) {
  
  }

  shippingUseForBilling(model: Checkout) {

    console.log(this.sameAsShipping)

    if(!this.sameAsShipping) {
      model.billingfirstname = "";
      $('#billingfirstname').val("");
      this.finalbillingfirstname = "";

      model.billinglastname = "";
      $('#billinglastname').val("");
      this.finalbillinglastname = "";

      model.billingemail = "";
      $('#billingemail').val("");
      this.finalbillingemail = "";

      model.billingphone = "";
      $('#guestPhoneNumber').val("");
      this.finalbillingphone = "";

      model.billingcountries =  "";
      this.finalbillingcountries = "";

      model.billingregion = "";
      this.finalbillingregion = "";

      model.billingcity = "";
      $('#billingcity').val("");
      this.finalbillingcity = "";

      model.billingstreet = "";
      $('#billingstreet').val("");
      this.finalbillingstreet = "";

      model.billingpostcode = "";
      $('#billingpostcode').val("");
      this.finalbillingpostcode = "";

      model.billingcompany = "";
      $('#billingcompany').val("");
      this.finalbillingcompany = "";
    } else {

      model.billingfirstname = model.shippingfirstname;
      $('#billingfirstname').val(model.billingfirstname);
      this.finalbillingfirstname = model.billingfirstname;
  

      model.billinglastname = model.shippinglastname;
      $('#billinglastname').val(model.shippinglastname);
      this.finalbillinglastname = model.billinglastname;

      model.billingemail = model.shippingemail;
      $('#billingemail').val(model.shippingemail);
      this.finalbillingemail = model.billingemail;
    
      model.billingphone = model.shippingphone;
      $('#guestPhoneNumber').val(model.shippingphone);
      this.finalbillingphone = model.billingphone;

      model.billingcountries = 'AE';// model.shippingcountries;
      this.finalbillingcountries = model.billingcountries;

      model.billingregion = model.shippingregion;
      this.finalbillingregion = model.billingregion;

      model.billingcity = model.shippingcity;
      $('#billingcity').val(model.shippingcity);
      this.finalbillingcity = model.billingcity;

      model.billingstreet = model.shippingstreet;
      $('#billingstreet').val(model.shippingstreet);
      this.finalbillingstreet = model.billingstreet;

      model.billingpostcode = '123456';
      $('#billingpostcode').val(model.shippingpostcode);
      this.finalbillingpostcode = model.billingpostcode;

      model.billingcompany = model.shippingcompany;
      $('#billingcompany').val(model.shippingcompany);
      this.finalbillingcompany = model.billingcompany;
    }

  }

  showPaymentSection(model: Checkout, isValid: boolean, item) {
    // if form is valid

    if(isValid) {

      if(this.setDefaultBilling && this.sameAsShipping)
      {
        this.shippingUseForBilling(model);
      }
      this.expandCartTab('payment-itm', '002');
      this.checkOutLog =null;
      // if guest user
      $('#loading').show();
      if(localStorage.getItem('customerToken') === null) {
        if(this.sameAsShipping) {
          // when same as shipping is checked
          let getShippingMethodSameAsBilling
         
             getShippingMethodSameAsBilling = {
              "address": {
                  "country_id":'AE',// this.finalbillingcountries,
                  "street": [
                      this.finalbillingstreet
                  ],
                  "company": this.finalbillingcompany,
                  "telephone": this.finalbillingphone,
                  "postcode":'123456',
                  "city": this.finalbillingcity,
                  "firstname": this.finalbillingfirstname,
                  "lastname": this.finalbillinglastname,
                  "email": this.finalbillingemail,
                  "prefix": "address_",
                  "sameAsBilling": 1
              }
            }
          this.guestBillingEmail = this.finalbillingemail;
         
            this.guestBilling = {
            "city": this.finalbillingcity,
            "company": this.finalbillingcompany,
            "countryId":'AE',// this.finalbillingcountries,
            "firstname": this.finalbillingfirstname,
            "lastname": this.finalbillinglastname,
            "postcode": '123456',
            "saveInAddressBook": null,
            "street": [
              this.finalbillingstreet
            ],
            "telephone": this.finalbillingphone
          };

       
        this.checkoutService.estimateGuestShippingMethods(getShippingMethodSameAsBilling).subscribe(data => {
 
          if(data.length != 0)
          {
            if(data.shipping_amount === undefined)
            {
              this.shippingInclTax = 0;
            }else{
              this.shippingInclTax = data.shipping_amount;
            } 
            this.shippingMethodCode = data[0].method_code;
            this.shippingCarrierCode = data[0].carrier_code;
          }
      }, (err) => {
  
        $('#loading').hide();
      }, () => {
    
        let shippingInformation;
          shippingInformation = {
              "addressInformation": {
                  "shippingAddress": {
                      "country_id":'AE',// this.finalbillingcountries,
                      "street": [
                          model.shippingstreet
                      ],
                      "company": model.shippingcompany,
                      "telephone": model.shippingphone,
                      "postcode":'123456',
                      "city": model.shippingcity,
                      "firstname": model.shippingfirstname,
                      "lastname": model.shippinglastname,
                      "email": model.shippingemail,
                      "prefix": "address_",
                      "sameAsBilling": 1
                  },
                  "billingAddress": {
                      "street": [
                          model.billingstreet
                      ],
                      "company": model.billingcompany,
                      "telephone": model.billingphone,
                      "postcode":'123456',
                      "city": model.billingcity,
                      "firstname": model.billingfirstname,
                      "lastname": model.billinglastname,
                      "email": model.billingemail,
                      "prefix": "address_"
                  },
                  "shipping_method_code": this.shippingMethodCode,
                  "shipping_carrier_code":this.shippingCarrierCode
              }
          }
        // set shipping information
        this.checkoutService.setGuestShippingInformation(shippingInformation).subscribe(data => {
     
           if(data.totals.shipping_amount !== undefined)
           {
            this.shippingInclTax = this.removeFraction(data.totals.shipping_amount);
           }
         
        }, err => {

        })

    });

        } else {
          // when same as shipping is not checked
          let getShippingMethodNotSameAsBilling;
         
            getShippingMethodNotSameAsBilling = {
             "address": {
                "country_id":'AE', // model.shippingcountries,
                "street": [
                    model.shippingstreet
                ],
                "company": model.shippingcompany,
                "telephone": model.shippingphone,
                "postcode": '123456',
                "city": model.shippingcity,
                "firstname": model.shippingfirstname,
                "lastname": model.shippinglastname,
                "email": model.shippingemail,
                "prefix": "address_"
            }
          }
        this.checkoutService.estimateGuestShippingMethods(getShippingMethodNotSameAsBilling).subscribe(data => {
          $('#loading').hide();
      
          if(data.length != 0)
          {
          
            this.shippingMethodCode = data[0].method_code;
            this.shippingCarrierCode = data[0].carrier_code;
          }

          let shippingInformation;
        
            shippingInformation = {
              "addressInformation": {
                  "shippingAddress": {
                      "country_id":'AE',// model.shippingcountries,
                      "street": [
                          model.shippingstreet
                      ],
                      "company": model.shippingcompany,
                      "telephone": model.shippingphone,
                      "postcode":'123456',
                      "city": model.shippingcity,
                      "firstname": model.shippingfirstname,
                      "lastname": model.shippinglastname,
                      "email": model.shippingemail,
                      "prefix": "address_"

                  },
                  "billingAddress": {
                      "country_id": model.billingcountries,
                      "street": [
                          model.billingstreet
                      ],
                      "company": model.billingcompany,
                      "telephone": model.billingphone,
                      "postcode": '123456',
                      "city": model.billingcity,
                      "firstname": model.billingfirstname,
                      "lastname": model.billinglastname,
                      "email": model.billingemail,
                      "prefix": "address_"
                  },
                  "shipping_method_code": this.shippingMethodCode,
                  "shipping_carrier_code": this.shippingCarrierCode
              }
           }
          this.guestBillingEmail = model.billingemail;
            this.guestBilling = {
            "city": model.billingcity,
            "company": model.billingcompany,
            "countryId":'AE',// model.billingcountries,
            "firstname": model.billingfirstname,
            "lastname": model.billinglastname,
            "postcode": '123456',
            "saveInAddressBook": null,
            "street": [
              model.billingstreet
            ],
            "telephone": model.billingphone
          };
        // set shipping information
        this.checkoutService.setGuestShippingInformation(shippingInformation).subscribe(data => {
     
          if(data.totals.shipping_amount !== undefined)
          {
           this.shippingInclTax = this.removeFraction(data.totals.shipping_amount);
          }
    
        })
            
        });

      }
      } else {
              
      }

      // ---------------------------------------------------
    
       
    // ----------------- set thank you info ----------------
    this.successOrderDetails = model;

    // ---------------- if form is not valid -----------------
    } else {
      
    }
  } // end showPaymentSection

  creditCardPayment() {
    this.disablePayment = false;
    $('#guest-credit-card').show();
    $('#customer-credit-card').show();
    this.selectedPaymentMethod = "creditcard";
  }

  paypalPayment() {
  
    $('#guest-credit-card').hide();
    $('#customer-credit-card').hide();
    this.selectedPaymentMethod = "paypal";
  }

  placeOrder() {
    $('#loading').show();
    // if credit card
    this.checkOutLog =null;
    if(this.selectedPaymentMethod == "creditcard") {

		//always guest
		//$('#submit-guest-card-details').click();

    this.checkOutFlag = false ;
    this.checkOutLog = "" ;
		//if guest
		if(localStorage.getItem('customerToken') === null) {
			$('#submit-guest-card-details').click();

		 // if customer
		}
      else {
        if(this.noPreviosCustomerCard) {
         ///////////////////////////////////////
          //CUSTOMER PAY BY CARD NO PREVIOS CARD
          //////////////////////////////////////
          $('#submit-customer-card-details').click();

        } else {
       
          ///////////////////////////////////////
          //CUSTOMER PAY BY CARD HAS PREVIOS CARD
          //////////////////////////////////////
          this.finalizeCustomerOrderPreviosCard();

        }
      }


    // if paypal
    } else if(this.selectedPaymentMethod == "paypal") {

      // if guest
      if(localStorage.getItem('customerToken') === null) {
        this.checkoutService.guestPaypalPayment().subscribe(data => {
      
          this.paypalGuest = data;
          this.paypalGuestReady = true;
          this.checkOutFlag = false;
          $('#paypalModal').modal('show');
          $('#loading').hide();
        }, err => {
          
          this.checkOutFlag = true ;
          this.checkOutLog = err ;
          $('#loading').hide();
        })
      }
    }

  };

  guestCreditcardPay(model: CreditCard, isValid: boolean) {
    if(isValid) {
      $('#loading').show();
     
      let card = {
        "name": model.nameoncard,
        "cvv": model.cvv,
        "expiryMonth": model.expirymm,
        "expiryYear": model.expiryyy,
        "number": model.cardnumber,
        "requestSource": "JS"
      };


      this.checkoutService.checkoutGuestToken(card).subscribe(data => {
        $('#loading').hide();
     
        this.checkoutCardId = data.id;
        this.checkOutFlag = false ;
      }, (err) => {

        this.checkOutFlag = true ;
        this.checkOutLog = err ;
        $('#loading').hide();
      }, ()=> {
        // finalize order
        $('#loading').show();
		
		let orderDetail = {
          "email": this.guestBillingEmail,
		  "cartId": this.checkoutCardId,	
          "billingAddress" : this.guestBilling,
		  "paymentMethod": {
				"method": "checkout_com",
				"additional_data": {
					"cc_cid": "",
					"cc_type": "",
					"cc_exp_year": "",
					"cc_exp_month": "",
					"cc_number": "",
					"card_token_id": this.checkoutCardId
				}
			}
			  
          
        }
		
		/*
        let orderDetail = {
          "email": this.guestBillingEmail,
          "ba": this.guestBilling,
          "qp": {
            "additional_data": {
              "token": this.checkoutCardId
            },
            "method": "dfe_checkout_com"
          }
        }*/
   
        let self =this;
        $('#loading').show();
        this.checkoutService.checkoutGuestFinalizeOrder(orderDetail).subscribe(data => {
            this.successOrder = true;
            $('.minicart-update').click()
            localStorage.removeItem('shopGuestCartId');

          $('#loading').hide();
        }, (err => {

          this.checkOutFlag = true ;
          this.checkOutLog = err ;
          $('#loading').hide();

        }));
      });

    } else {
       $('#loading').hide();
    }
  }; // end guestCreditcardPay

  saveCard() {
    this.noSaveCardDetail != this.noSaveCardDetail;
  }





  ///////////////////////////////////////
  //CUSTOMER PAY BY CARD NO PREVIOS CARD
  //////////////////////////////////////
  customerCreditcardPay(model: CreditCard, isValid: boolean) {
    if(isValid) {

      $('#loading').show();
      this.successOrderDetails = {
        "shippingfirstname" : this.customerShipping.firstname,
        "shippinglastname": this.customerShipping.lastname,
        "shippingstreet": this.customerShipping.street1,
        "shippingcity" : this.customerShipping.city,
        "shippingregion": { "name":"N/A" },
        "shippingcountries": this.customerShipping.country,
        "shippingpostcode": '123456',
        "shippingphone": this.customerShipping.phone
      };

       let cardData = {
          "name": model.nameoncard,
          "cvv": model.cvv,
          "expiryMonth":model.expirymm,
          "expiryYear":model.expiryyy,
          "number": model.cardnumber,
          "requestSource": "JS"
        };

      ////////////// SAVE CREDIT CARD ///////////////
      if(this.noSaveCardDetail) {
        this.creditCardService.customerCardPaySave(cardData).subscribe(data => {
    
          $('#loading').hide();
          this.checkOutFlag = false ;
        }, err => {
     
          this.checkOutFlag = true ;
          this.checkOutLog = err ;
          $('#loading').hide();
        })

      ////////////// NO SAVE CREDIT CARD ///////////////
      } else {
        this.creditCardService.customerCardPayNoSave(cardData).subscribe(data => {
          $('#loading').hide();
          this.checkoutCardId = data.id;
          this.checkOutFlag = false ;
        },err => {
          this.checkOutFlag = true ;
          this.checkOutLog = err ;
          $('#loading').hide();
        },() => {
          let address;

          ////////// IF CUSTOMER SAME AS BILLING ///////////
          if(!this.customerSameBill) {
            // same as shippin

			address =  {
			  "cartId": this.checkoutCardId,	
              "billingAddress": {
                    "city": this.customerShipping.city,
                    "company": this.customerShipping.company,
                    "countryId": this.customerShipping.country,
                    "customerAddressId": this.customerData.default_shipping,
                    "customerId": this.customerData.id,
                    "firstname": this.customerShipping.firstname,
                    "lastname": this.customerShipping.lastname,
                    "postcode": '123456',
                    "saveInAddressBook": null,
                    "street": [
                      this.customerShipping.street1,
                      this.customerShipping.street2
                    ],
                    "telephone": this.customerShipping.phone
                  },
				"paymentMethod": {
					"method": "checkout_com",
					"additional_data": {
						"cc_cid": "",
						"cc_type": "",
						"cc_exp_year": "",
						"cc_exp_month": "",
						"cc_number": "",
						"card_token_id": this.checkoutCardId
					}
				}  
            };
			/*
            address =  {
              "ba": {
                    "city": this.customerShipping.city,
                    "company": this.customerShipping.company,
                    "countryId": this.customerShipping.country,
                    "customerAddressId": this.customerData.default_shipping,
                    "customerId": this.customerData.id,
                    "firstname": this.customerShipping.firstname,
                    "lastname": this.customerShipping.lastname,
                    "postcode": '123456',
                    "saveInAddressBook": null,
                    "street": [
                      this.customerShipping.street1,
                      this.customerShipping.street2
                    ],
                    "telephone": this.customerShipping.phone
                  },
              "qp": {
                "additional_data": {
                  "token": this.checkoutCardId
                },
                "method": "dfe_checkout_com"
              }
            };
			*/
            if(this.hasRegion) {
              // address.ba['region'] = this.customerShipping.region['region'];
              // address.ba['regionCode'] = this.customerShipping.region['region_code'];
              // address.ba['regionId'] = this.customerShipping.region['region_id'];
            };


          } else {
            ////////// IF CUSTOMER NOT SAME AS BILLING ///////////
			
			address =  {
					"cartId": this.checkoutCardId,  
                    "billingAddress": {
                          "city": this.customerBilling.city,
                          "company": this.customerBilling.company,
                          "countryId":'AE',// this.customerBilling.country,
                          "customerAddressId": this.customerData.default_billing,
                          "customerId": this.customerData.id,
                          "firstname": this.customerBilling.firstname,
                          "lastname": this.customerBilling.lastname,
                          "postcode": '123456',
                          "saveInAddressBook": null,
                          "street": [
                            this.customerBilling.street1,
                            this.customerBilling.street2
                          ],
                          "telephone": this.customerBilling.phone
                        },
                    "paymentMethod": {
							"method": "checkout_com",
							"additional_data": {
								"cc_cid": "",
								"cc_type": "",
								"cc_exp_year": "",
								"cc_exp_month": "",
								"cc_number": "",
								"card_token_id": this.checkoutCardId
							}
						} 
                  };
				  /*
                  address =  {
                    "ba": {
                          "city": this.customerBilling.city,
                          "company": this.customerBilling.company,
                          "countryId":'AE',// this.customerBilling.country,
                          "customerAddressId": this.customerData.default_billing,
                          "customerId": this.customerData.id,
                          "firstname": this.customerBilling.firstname,
                          "lastname": this.customerBilling.lastname,
                          "postcode": '123456',
                          "saveInAddressBook": null,
                          "street": [
                            this.customerBilling.street1,
                            this.customerBilling.street2
                          ],
                          "telephone": this.customerBilling.phone
                        },
                    "qp": {
                      "additional_data": {
                        "token": this.checkoutCardId
                      },
                      "method": "dfe_checkout_com"
                    }
                  };
				*/	
                  if(this.hasRegion) {
                    // address.ba['region'] = this.customerBilling.region['region'];
                    // address.ba['regionCode'] = this.customerBilling.region['region_code'];
                    // address.ba['regionId'] = this.customerBilling.region['region_id'];
                  };

           }



           $('#loading').show();
           this.checkoutService.customerPlaceOrderByCard(address).subscribe(data => {
              this.successOrder = true;
              localStorage.removeItem('shopCartId');
              $('.minicart-update').click();
              $('#loading').hide();
              this.checkOutFlag = false ;
            }, err => {

              this.checkOutFlag = true ;
              this.checkOutLog = err ;
              $('#loading').hide();
            });




        });

      };

    // if card not valid
    } else {
      $('#loading').hide();
    }
  };











    /////////////////////////////////////////////
   /////////// CUSTOMER SECTION ////////////////
  /////////////////////////////////////////////

  getCustomerData() {
    $('#loading').show()
    this.customerDetailsService.getCustomerDetails().subscribe(data => {

      this.customerData = data;
     
      if(data.addresses == 0) {
        // show button for billing and shipping
        this.noDefaultBilling = true;
        this.noDefaultShipping = true;
 
      } else {
        this.noDefaultBilling = true;
        this.noDefaultShipping = true;
     
        for (let item of data.addresses) {
          if (item.hasOwnProperty('default_shipping')){
            // show shipping info
      
            this.noDefaultShipping = false;
            this.defaultShippingId = item.id;
            this.customerShipping.firstname = item.firstname;
            this.customerShipping.lastname = item.lastname;
            this.customerShipping.phone = item.telephone;
            this.customerShipping.country = item.country_id;
            this.customerShipping.region = "N/A";
            this.customerShipping.city = item.city;
            this.customerShipping.street1 = item.street[0];
            this.customerShipping.street2 = item.street[1];
            this.customerShipping.postcode = '123456';
            this.customerShipping.company = item.company;
          }
        };

        for (let item of data.addresses) {
          if (item.hasOwnProperty('default_billing')){
            // show billing info
            
            this.noDefaultBilling = false;
            // this.customerBilling = item;
            this.customerBilling.firstname = item.firstname;
            this.customerBilling.lastname = item.lastname;
            this.customerBilling.phone = item.telephone;
            this.customerBilling.country = item.country_id;
            this.customerBilling.region = "N/A";
            this.customerBilling.city = item.city;
            this.customerBilling.street1 = item.street[0];
            this.customerBilling.street2 = item.street[1];
            this.customerBilling.postcode = '123456';
            this.customerBilling.company = item.company;
          }
        };

        if(this.customerShipping.firstname != "" && this.customerShipping.firstname != null && this.customerShipping.firstname != undefined
         && this.customerShipping.lastname != "" && this.customerShipping.lastname != null && this.customerShipping.lastname !=undefined && this.customerShipping.phone != "")
        {
          this.noDefaultShipping = false;
        }

        if(this.customerBilling.firstname != "" && this.customerBilling.firstname != null && this.customerBilling.firstname != undefined
        && this.customerBilling.lastname != "" && this.customerBilling.lastname != null && this.customerBilling.lastname !=undefined && this.customerBilling.phone != "")
       {
         this.noDefaultBilling = false;
       }
        //show customer payment button if shipping and billing is set
        if(!this.noDefaultShipping && !this.noDefaultBilling) {
          this.customerReadyForPayment = true;
        };

        this.errMsg = "";
        this.nextError =false;
      };


    }, err => {
      $('#loading').hide();
     
    }, () => {
      // this.editCustomerShippingForm.shippingfirstname = this.customerShipping.firstname;
      $('#loading').hide();
    
    });
  } // end getCustomerData



  populateCustomerData() {

    $('#loading').show();
    this.customerDetailsService.getCustomerDetails().subscribe(data => {
      this.customerData = data;
	  //this.customerEmail = data.email;
      if(data.addresses == 0) {
        // show button for billing and shipping
       
        this.noDefaultBilling = true;
        this.noDefaultShipping = true;

      } else {
        this.noDefaultBilling = true;
        this.noDefaultShipping = true;

        for (let item of data.addresses) {
          if (item.hasOwnProperty('default_shipping')){
            // show shipping info
    
            this.noDefaultShipping = false;
            this.defaultShippingId = item.id;
            this.customerShipping.firstname = item.firstname;
            this.customerShipping.lastname = item.lastname;
            this.customerShipping.phone = item.telephone;
            this.customerShipping.country = item.country_id;
            this.customerShipping.region ="N/A";
            this.customerShipping.city = item.city;
            this.customerShipping.street1 = item.street[0];
            this.customerShipping.street2 = item.street[1];
            this.customerShipping.postcode = '123456';
            this.customerShipping.company = item.company;
          }
        };

        for (let item of data.addresses) {
          if (item.hasOwnProperty('default_billing')){
            // show billing info
       
            this.noDefaultBilling = false;
            // this.customerBilling = item;
            this.customerBilling.firstname = item.firstname;
            this.customerBilling.lastname = item.lastname;
            this.customerBilling.phone = item.telephone;
            this.customerBilling.country = item.country_id;
            this.customerBilling.region = "N/A";
            this.customerBilling.city = item.city;
            this.customerBilling.street1 = item.street[0];
            this.customerBilling.street2 = item.street[1];
            this.customerBilling.postcode ='123456';
            this.customerBilling.company = item.company;
          }
        };

        //show customer payment button if shipping and billing is set
        if(!this.noDefaultShipping && !this.noDefaultBilling) {
          this.customerReadyForPayment = true;
        };

      };
	
    $('#loading').hide();
    }, err => {
      $('#loading').hide();
 
    }, () => {

     // $('#loading').hide();
    
    });
  }


  editCustomerShipping() {
  
    this.shippingCountrySelected(this.customerShipping.country);
    $('#shippingEditModal').modal('show');
  }

  editCustomerBilling() {
    this.billingCountrySelected(this.customerBilling.country);
    $('#billingEditModal').modal('show');
  }

  editCustomerShippingSubmit(model, isValid: boolean) {
    if(isValid) {
      $('#loading').show();
      let streetObj;
      if(this.hasRegion) {
        streetObj = this.shippingStateList.available_regions.filter(function( obj ) {
        return obj.name == model.shippingregion;
      });
    };


      let customerUpdatedAddress = this.customerData;

      let customerAddressList = [];
      customerAddressList.push(customerUpdatedAddress.addresses);


      let rowIndex = 0;

      for (let item of customerAddressList[0]) {
        rowIndex++;
        if (item.hasOwnProperty('default_shipping')){
          if(this.hasRegion) {
            item = {
              city: model.shippingcity,
              company: model.shippingcompany,
              country_id: model.shippingcountries,
              customer_id: item.customer_id,
              default_shipping: item.default_shipping,
              firstname: model.shippingfirstname,
              id: item.id,
              lastname: model.shippinglastname,
              postcode: '123456',
              region: {
                region: "N/A",
                region_code: "123456",
                region_id:0
              },
              region_id: 0,
              street: [this.customerShipping.street1, this.customerShipping.street2],
              telephone: model.shippingphone
            };


          } else {
            item = {
              city: model.shippingcity,
              company: model.shippingcompany,
              country_id: model.shippingcountries,
              customer_id: item.customer_id,
              default_shipping: item.default_shipping,
              firstname: model.shippingfirstname,
              id: item.id,
              lastname: model.shippinglastname,
              postcode:'123456',
              street: [this.customerShipping.street1, this.customerShipping.street2],
              telephone: model.shippingphone
            };

          }
          customerAddressList[0][rowIndex-1] = item;

        }
      }

      let customerUpdatedAddressFinal = {
        "customer":{
            "id":customerUpdatedAddress.id,
            "group_id":customerUpdatedAddress.group_id,
            "default_billing":customerUpdatedAddress.default_billing,
            "default_shipping":customerUpdatedAddress.default_shipping,
            "created_at":customerUpdatedAddress.created_at,
            "updated_at":customerUpdatedAddress.updated_at,
            "created_in":customerUpdatedAddress.created_in,
            "email":customerUpdatedAddress.email,
            "firstname":customerUpdatedAddress.firstname,
            "lastname":customerUpdatedAddress.lastname,
            "store_id":customerUpdatedAddress.store_id,
            "website_id":customerUpdatedAddress.website_id,
            "addresses":customerAddressList[0]
        }
      };
   

      this.checkoutService.editCustomerDataAddress(customerUpdatedAddressFinal).subscribe(data => {
       
        $('#loading').hide();
        this.getCustomerData();
        $('#shippingEditModal .close').click();
      }, err => {
        console.log(err);
      })


    } else {

      $('#loading').hide();
    }
  }


  editCustomerBillingSubmit(model: Checkout, isValid: boolean) {
    if(isValid) {
    
      $('#loading').show();
      let streetObj;
      if(this.hasRegion) {
        // streetObj = this.billingStateList.available_regions.filter(function( obj ) {
        // return obj.name == model.billingregion;
        // });
      };


      let customerUpdatedAddress = this.customerData;
      let customerAddressList = [];
      customerAddressList.push(customerUpdatedAddress.addresses);
      let rowIndex = 0;

      for (let item of customerAddressList[0]) {
        rowIndex++;
        if (item.hasOwnProperty('default_billing')){
          if(this.hasRegion) {
            item = {
              city: model.billingcity,
              company: model.billingcompany,
              country_id: model.billingcountries,
              customer_id: item.customer_id,
              default_billing: item.default_billing,
              firstname: model.billingfirstname,
              id: item.id,
              lastname: model.billinglastname,
              postcode: '123456',
              region: {
                region: "N/A",
                region_code: "123456",
                region_id: 0
              },
              region_id: 0,
              street: [this.customerBilling.street1, this.customerBilling.street2],
              telephone: model.billingphone
            };
          } else {
            item = {
              city: model.billingcity,
              company: model.billingcompany,
              country_id: model.billingcountries,
              customer_id: item.customer_id,
              default_billing: item.default_billing,
              firstname: model.billingfirstname,
              id: item.id,
              lastname: model.billinglastname,
              postcode: '123456',
              street: [this.customerBilling.street1, this.customerBilling.street2],
              telephone: model.billingphone
            };
          }

          customerAddressList[0][rowIndex-1] = item;
        }
      }
      let customerUpdatedAddressFinal = {
        "customer":{
            'id':customerUpdatedAddress.id,
            "group_id":customerUpdatedAddress.group_id,
            "default_billing":customerUpdatedAddress.default_billing,
            "default_shipping":customerUpdatedAddress.default_shipping,
            "created_at":customerUpdatedAddress.created_at,
            "updated_at":customerUpdatedAddress.updated_at,
            "created_in":customerUpdatedAddress.created_in,
            "email":customerUpdatedAddress.email,
            "firstname":customerUpdatedAddress.firstname,
            "lastname":customerUpdatedAddress.lastname,
            "store_id":customerUpdatedAddress.store_id,
            "website_id":customerUpdatedAddress.website_id,
            "addresses":customerAddressList[0]
        }
      };

      this.checkoutService.editCustomerDataAddress(customerUpdatedAddressFinal).subscribe(data => {
  
        this.getCustomerData();
        $('#loading').hide();
        $('#billingEditModal .close').click();
      }, err => {
        console.log(err);
        $('#loading').hide();
      })


    } else {
    }
  }


  customerAddNewShippingAddress() {
    $('#customerPhoneNumberOriginal, #customerPhoneNumberSecond, #customerPhoneNumber').intlTelInput({
      initialCountry: 'AE', //AE
      // utilsScript: '../assets/js/utils.js',
      // geoIpLookup: function(callback) {
      //   $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //     callback(countryCode);
      //   });
      // }
    
    });

    $('#customerPhoneNumberEdit').intlTelInput({
      initialCountry: 'AE', //AE
    });
    $('#customer-new-data-address-shipping').modal('show');
    
  }

  customerAddNewBillingAddress() {

    $('#customerPhoneNumberBilling, #customerPhoneNumberBillingEdit, #guestrPhoneNumber').intlTelInput({
      initialCountry: 'auto', //AE
      utilsScript: '../assets/js/utils.js',
      geoIpLookup: function(callback) {
        $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        });
      }
    
    });
    
    $('#customer-new-data-address-billing').modal('show');
  
  }

  customerAddNewShippingAddressOverwrite() {
    $('#customer-new-data-address-shipping-owerwrite').modal('show');
  }




  customerNewDataAddressShippingSubmit(model, isValid: boolean) {
    if(isValid) {
      $('#loading').show();

     let state;
     if(this.hasRegion) {
      //   state = this.shippingStateList.available_regions.filter(function( obj ) {
      //   return obj.name == model.shippingregion;
      // });
     }

      let addressList = [];
      addressList.push(this.customerData.addresses[0]);
      // if(this.hasRegion) {
      //   // addressList.push({
      //   //       "city": model.shippingcity,
      //   //       "company": model.shippingcompany,
      //   //       "country_id": model.shippingcountries,
      //   //       "customer_id": this.customerData.id,
      //   //       "default_shipping": true,
      //   //       "firstname": model.shippingfirstname,

      //   //       "lastname": model.shippinglastname,
      //   //       "postcode":'123456',
      //   //       "region": {
      //   //         "region":"N/A",
      //   //         "region_code": "123456",
      //   //         "region_id": 0
      //   //       },
      //   //       "region_id":0,
      //   //       "street": [model.shippingstreet1, model.shippingstreet1],
      //   //       "telephone": model.shippingphone
      //   // });
      // } else { }
      
        addressList.push({
              "city": model.shippingcity,
              "company": model.shippingcompany,
              "country_id":'AE',// model.shippingcountries,
              "customer_id": this.customerData.id,
              "default_shipping": true,
              "firstname": model.shippingfirstname,

              "lastname": model.shippinglastname,
              "postcode": '123456',
              "street": [model.shippingstreet1, model.shippingstreet1],
              "telephone": model.shippingphone
        });
     


        // remove address if undefined
        let addressIndex = 0;
        for(let item of addressList) {
          addressIndex++;
          if(item == undefined) {
            addressList.splice(addressIndex-1, 1);
          }
        };

      let newCustomerShipping =  {
        "customer":{
            "id": this.customerData.id,
            "group_id":this.customerData.group_id,
            "created_at":this.customerData.created_at,
            "updated_at":this.customerData.updated_at,
            "created_in":this.customerData.created_in,
            "email":this.customerData.email,
            "firstname":this.customerData.firstname,
            "lastname":this.customerData.lastname,
            "store_id":this.customerData.store_id,
            "website_id":this.customerData.website_id,
            "addresses":addressList
        }
      };

      this.checkoutService.editCustomerDataAddress(newCustomerShipping).subscribe(data => {
        this.getCustomerData();

        $('#loading').hide();
        $('#customer-new-data-address-shipping .close').click();
      }, err => {
        $('#loading').hide();
      });

    } else {
      $('#loading').hide();
    }

  }




  customerNewDataAddressBillingSubmit(model, isValid: boolean) {
        if(isValid) {
          $('#loading').show();
      let state;
      if(this.hasRegion) {
      //   state = this.billingStateList.available_regions.filter(function( obj ) {
      //   return obj.name == model.billingregion;
      // });
      }


      let addressList = [];
      addressList.push(this.customerData.addresses[0]);
      // if(this.hasRegion) {
      //   // addressList.push({
      //   //       "city": model.billingcity,
      //   //       "company": model.billingcompany,
      //   //       "country_id": model.billingcountries,
      //   //       "customer_id": this.customerData.id,
      //   //       "default_billing": true,
      //   //       "firstname": model.billingfirstname,

      //   //       "lastname": model.billinglastname,
      //   //       "postcode": '123456',
      //   //       "region": {
      //   //         "region": "N/A",
      //   //         "region_code":"123456",
      //   //         "region_id": 0
      //   //       },
      //   //       "region_id":123456,
      //   //       "street": [model.billingstreet1, model.billingstreet1],
      //   //       "telephone": model.billingphone
      //   // });
      // } else {
        addressList.push({
              "city": model.billingcity,
              "company": model.billingcompany,
              "country_id":'AE',// model.billingcountries,
              "customer_id": this.customerData.id,
              "default_billing": true,
              "firstname": model.billingfirstname,

              "lastname": model.billinglastname,
              "postcode":'123456',
              "street": [model.billingstreet1, model.billingstreet1],
              "telephone": model.billingphone
        });
     


        // remove address if undefined
        let addressIndex = 0;
        for(let item of addressList) {
          addressIndex++;
          if(item == undefined) {
            addressList.splice(addressIndex-1, 1);
          }
        };

      let newCustomerBilling =  {
        "customer":{
            "id": this.customerData.id,
            "group_id":this.customerData.group_id,
            "created_at":this.customerData.created_at,
            "updated_at":this.customerData.updated_at,
            "created_in":this.customerData.created_in,
            "email":this.customerData.email,
            "firstname":this.customerData.firstname,
            "lastname":this.customerData.lastname,
            "store_id":this.customerData.store_id,
            "website_id":this.customerData.website_id,
            "addresses":addressList
        }
      };

      this.checkoutService.editCustomerDataAddress(newCustomerBilling).subscribe(data => {
    
        this.getCustomerData();
        $('#loading').hide();
        $('#customer-new-data-address-billing .close').click();
      }, err => {
        console.log(err);
        $('#loading').hide();
      });

    } else {
    
      $('#loading').hide();
    }
  };


  customerNewDataAddressShippingOwerwriteSubmit(model, isValid: boolean) {
    if(isValid) {
    
      $('#loading').show();
      // let state = this.shippingStateList.available_regions.filter(function( obj ) {
      //   return obj.name == model.shippingregionover;
      // });

      let addressList = [];

      for(let item of this.customerData.addresses) {
        addressList.push(item)
      };

      for (let item of addressList) {
        if (item.hasOwnProperty('default_shipping')){
          delete item.default_shipping;
        }
      };

      addressList.push({
              "city": model.shippingcityover,
              "company": model.shippingcompanyover,
              "country_id": 'AE',//model.shippingcountriesover,
              "customer_id": this.customerData.id,
              "default_shipping": true,
              "firstname": model.shippingfirstnameover,

              "lastname": model.shippinglastnameover,
              "postcode": '123456',
              "region": {
                "region": "N/A",
                "region_code": "123456",
                "region_id": 0
              },
              "region_id":0,
              "street": [model.shippingstreet1over, model.shippingstreet1over],
              "telephone": model.shippingphoneover
        });

        // remove address if undefined
        // let addressIndex = 0;
        // for(let item of addressList) {
        //   addressIndex++;
        //   if(item == undefined) {
        //     addressList.splice(addressIndex-1, 1);
        //   }
        // };

      let newCustomerShipping =  {
        "customer":{
            "id": this.customerData.id,
            "group_id":this.customerData.group_id,
            "created_at":this.customerData.created_at,
            "updated_at":this.customerData.updated_at,
            "created_in":this.customerData.created_in,
            "email":this.customerData.email,
            "firstname":this.customerData.firstname,
            "lastname":this.customerData.lastname,
            "store_id":this.customerData.store_id,
            "website_id":this.customerData.website_id,
            "addresses":addressList
        }
      };
      this.checkoutService.editCustomerDataAddress(newCustomerShipping).subscribe(data => {
        this.getCustomerData();
        $('#loading').hide();
        $('#customer-new-data-address-shipping-owerwrite .close').click();
      }, err => {
        $('#loading').hide();
      });

    } else {
    }

  };

  customerSameBilling() {
  
    if(!this.customerSameBill && this.customerShipping != null)
    {
 
      this.noDefaultBilling = false;
      this.customerReadyForPayment = true;
      this.customerBilling. firstname = this.customerShipping.firstname;
      this.customerBilling. lastname = this.customerShipping.lastname;
      this.customerBilling. phone = this.customerShipping.phone;
      this.customerBilling. country = this.customerShipping.country;
      this.customerBilling. city = this.customerShipping.city;
      this.customerBilling. street1 = this.customerShipping.street1;
      this.customerBilling. street2 = this.customerShipping.street2;
      this.customerBilling. postcode = '123456';
      this.customerBilling. countries ='AE';// this.customerShipping.countries;
      this.customerBilling. region = "N/A";
      this.customerBilling. company = this.customerShipping.company;
    }else
     {
      this.noDefaultBilling = true;
      this.customerReadyForPayment = false;
      this.customerBilling. firstname = "";
      this.customerBilling. lastname = "";
      this.customerBilling. phone = "";
      this.customerBilling. country = "";
      this.customerBilling. city = "";
      this.customerBilling. street1 = "";
      this.customerBilling. street2 = "";
      this.customerBilling. postcode = "";
      this.customerBilling. countries = "";
      this.customerBilling. region = "";
      this.customerBilling. company = ""; 
     }
   
  };
  useShippingForBilling(event)
  {
    if(event.checked)
    {
      this.checkedShipping = true ;
    }else{
         this.checkedShipping = false ;
    }
  }
  procedCustomerPayment() {
    $('#loading').show();
    this.getCustomerData();
    this.checkOutLog = null;
    this.checkoutService.getCustomerTotals().subscribe(data => {
      
        this.cartSubtotal = data.subtotal;
        if(data.shipping_amount === undefined)
        {
          this.shippingInclTax = 0;
        }else{
          this.shippingInclTax = data.shipping_amount;
        } //base_shipping_incl_tax
        this.grandTotal = data.grand_total;
        this.discountAmount =Math.abs(data.discount_amount*this.exchangeRateCheckOut) ;
      
        this.nextError =false;
        this.errMsg = "";
        for(let item of data.items) {
          this.prodAttrs.push(JSON.parse("[" + item.options + "]"))
        };
    }, err => {
      $('#loading').hide();
      this.errMsg = err;
      this.nextError =true;
      console.error(err)
    });


    this.checkoutService.estimateCustomerShippingMethods(this.defaultShippingId).subscribe(data => {
      this.customerCarierCode = data[0].carrier_code;
      this.customerMethodCode = data[0].method_code;
   
    }, err => {
      $('#loading').hide();
    }, () => {
      let shipping;
      let billing;

    
      for (let item of this.customerData.addresses) {
        if (item.hasOwnProperty('default_shipping')){
          // if(this.hasRegion) {
          //   shipping = {
          //   "customer_id":item.customer_id,
          //   "customer_address_id": item.id,
          //   "region":"N/A",
          //   "region_id":123456,
          //   "country_id":item.country_id,
          //   "street":item.street,
          //   "company": item.company,
          //   "telephone":item.telephone,
          //   "postcode": '123456',
          //   "city": item.city,
          //   "firstname": item.firstname,
          //   "lastname": item.lastname
          // }
          // } else {
            shipping = {
            "customer_id":item.customer_id,
            "customer_address_id": item.id,
            "country_id":'AE',//item.country_id,
            "street":item.street,
            "company": item.company,
            "telephone":item.telephone,
            "postcode":'123456',
            "city": item.city,
            "firstname": item.firstname,
            "lastname": item.lastname
        //  }
          }

          if(this.checkedShipping && this.customerShipping != null)
          {    
            billing = shipping;
          }

       } else if(item.hasOwnProperty('default_billing')) {
          // if(this.hasRegion) {
          //   billing = {
          //     "customer_id":item.customer_id,
          //     "customer_address_id": item.id,
          //     "region":"N/A",
          //     "region_id": 123456,
          //     "country_id":item.country_id,
          //     "street":item.street,
          //     "company": item.company,
          //     "telephone":item.telephone,
          //     "postcode": '123456',
          //     "city": item.city,
          //     "firstname": item.firstname,
          //     "lastname": item.lastname
          //   }
          // } else {
            billing = {
              "customer_id":item.customer_id,
              "customer_address_id": item.id,
              "country_id":'AE',//item.country_id,
              "street":item.street,
              "company": item.company,
              "telephone":item.telephone,
              "postcode": '123456',
              "city": item.city,
              "firstname": item.firstname,
              "lastname": item.lastname
            }
         // }

         if(this.checkedShipping && this.customerShipping != null)
         {    
           billing = shipping;
         }
        }
      }

   

    

      // shipping information
       let info = {
            "addressInformation":{
                "shippingAddress": shipping,
                "billingAddress": billing,
                "shipping_method_code": this.customerMethodCode,
                "shipping_carrier_code": this.customerCarierCode
            }
        };
        $('#loading').show();
      this.checkoutService.customerShippingInformation(info).subscribe(data => {

        this.errMsg = "";
        this.nextError =false;
        if(data.payment_methods !== undefined && data.payment_methods !== null)
        {
          if(data.payment_methods[1] !== undefined && data.payment_methods[1] !== null)
          {
            if(data.payment_methods[1].code === 'free' && data.payment_methods[1].title === 'No Payment Information Required')
            {
              this.noPaymentInfoRequired = true;
              this.disablePayment = true;
            }else
            {
              this.noPaymentInfoRequired = false;
              this.disablePayment = false;
            }
          }
        }
        $('#loading').hide();
      }, err => {
        console.log(err)
        this.errMsg = err;
        this.nextError =true;
        this.customerReadyForPayment = false;
        $('#loading').hide();
      }, () => {
        // $('#payment-item-section').show();
       
        //    $('#payment-itm').show();
        //   $('html, body').animate({
        //       scrollTop: $('#payment-item-section').offset().top - 120 + 'px'
        //   }, 'fast');
        // get card list

      });

    });



    // get card details
    this.creditCardService.getCustomerCardDetails().subscribe(data => {
	 /*
      this.creditCardByEmail = JSON.parse(data);
      console.log('CARD', data);
      $('.loading').hide();

      if(this.creditCardByEmail.success == 0) {
        this.noPreviosCustomerCard = true;
        console.log(this.creditCardByEmail.success)
      } else if(this.creditCardByEmail.success == 1) {



        console.log(this.creditCardByEmail.success)
        this.noPreviosCustomerCard = false;
      }
	  */

    }, err => {

    }, () => {

    });

  }


  // -------------- mock customer data -----------
  mockCustomerData()
  {
    let shipping, info ;
    shipping= {
      "customer_id":123,
      "customer_address_id":456,
      "country_id":'AE',//item.country_id,
      "street":['testing mock'],
      "company": "testing mock",
      "telephone":"12345",
      "postcode":'123456',
      "city": "testing mock",
      "firstname": "testing mock",
      "lastname": "testing mock"
      };

      info= {
        "addressInformation":{
            "shippingAddress": shipping,
            "shipping_method_code": "flatrate",
            "shipping_carrier_code": "flatrate"
        }
    };

    return info;
  }
  removeCard(customerId) {
    $('#loading').show();
    this.creditCardService.removeCard(customerId).subscribe(data => {
      let res = JSON.parse(data);
      if( res.result.errorCode == "83041" ) {
      }
    }, err => {
      console.log(err)
    }, () => {
      this.procedCustomerPayment();
    });
  };
  customerAddCard() {
    $('#customer-add-card').modal('show');
  }
  addNewCustomerCreditCard(model, isValid) {
    if(isValid) {
      $('#loading').show();
      let cardData = {
        "name": model.nameoncard,
        "cvv": model.cvv,
        "expiryMonth":model.expirymm,
        "expiryYear": model.expiryyy,
        "number":model.cardnumber,
        "requestSource": "JS",
        // "billingDetails":{
        //     "addressLine1":"test",
        //     "addressLine2":"test",
        //     "postcode":"430415",
        //     "country":"RO",
        //     "city":"test",
        //     "state":"Maramure",
        //     "phone":{
        //         "countryCode":"40",
        //         "number":"1234567890"
        //     }
        //   }
      }
      this.creditCardService.customerCardPaySave(cardData).subscribe(data => {
        }, err => {
          console.log(err)
        }, () => {
          $('#customer-add-card').modal('hide');
          this.procedCustomerPayment();
        })
    }
  };
  setDefaultCard(card) {
    this.setDefaultCardNum = card.id;
  }
  editCreditCard(index) {
    this.cardNum = this.creditCardByEmail.result.cards.data[index];

   this.nameCardEdit = this.creditCardByEmail.result.cards.data[index].name;
   this.expiryMMCardEdit = this.creditCardByEmail.result.cards.data[index].expiryMonth;
   this.expiryYYCardEdit = this.creditCardByEmail.result.cards.data[index].expiryYear;
   if(this.creditCardByEmail.result.cards.data[index].defaultCard == true) {
    this.editCardDefault = this.creditCardByEmail.result.cards.data[index].defaultCard
   } else {
      this.editCardDefault = false;
   }

    $('#customer-edit-card').modal('show');
  }

  editCustomerCreditCardSubmit(model, isValid: boolean) {
    if(isValid) {
      $('#loading').show();
      let name = "Menamall Beta Tester"; // model.nameoncard,
     let card = {
        "card": {
              "name": name,
              "expiryMonth": model.expirymm,
              "expiryYear": model.expiryyy,
              // "billingDetails": {
              //     "addressLine1": this.cardNum.billingDetails.addressLine1,
              //     "addressLine2": this.cardNum.billingDetails.addressLine2,
              //     "postcode": this.cardNum.billingDetails.postcode,
              //     "country": this.cardNum.billingDetails.country,
              //     "city": this.cardNum.billingDetails.city,
              //     "state": this.cardNum.billingDetails.state,
              //     "phone" : {
              //         "countryCode" : this.cardNum.billingDetails.phone.countryCode,
              //         "number" : this.cardNum.billingDetails.phone.number
              //     }
              // },
        }
      };
      if(model.savecard) {
        card.card['defaultCard'] = true
      };

      this.creditCardService.customerEditCard(card, this.cardNum.id).subscribe(data => {
        $('#loading').hide();
      }, err => {
        $('#loading').hide();
        console.log(err)
      }, () => {
        $('#customer-edit-card').modal('hide');
          this.procedCustomerPayment();
          $('#loading').hide();
      });

    }

  }

  finalizeCustomerOrderPreviosCard() {
    let cardIndex = $(".selected-card:checked").val();
    let orderDetail;

    if(!this.customerSameBill) {
      
            orderDetail =  {
              "ba": {
                    "city": this.customerShipping.city,
                    "company": this.customerShipping.company,
                    "countryId": this.customerShipping.country,
                    "customerAddressId": this.customerData.default_shipping,
                    "customerId": this.customerData.id,
                    "firstname": this.customerShipping.firstname,
                    "lastname": this.customerShipping.lastname,
                    "postcode": '123456',
                    "saveInAddressBook": null,
                    "street": [
                      this.customerShipping.street1,
                      this.customerShipping.street2
                    ],
                    "telephone": this.customerShipping.phone
                  },
              "qp": {
                "additional_data": {
                  "cardId": this.creditCardByEmail.result.cards.data[cardIndex].id,
                   "token": this.checkoutCardId
                },
                "method": "dfe_checkout_com"
              }
            };

            if(this.hasRegion) {
              // orderDetail.ba['region'] = this.customerShipping.region['region'];
              // orderDetail.ba['regionCode'] = this.customerShipping.region['region_code'];
              // orderDetail.ba['regionId'] = this.customerShipping.region['region_id'];
            };


          } else {
            ////////// IF CUSTOMER NOT SAME AS BILLING ///////////
            $('#loading').show();
                  orderDetail =  {
                    "ba": {
                          "city": this.customerBilling.city,
                          "company": this.customerBilling.company,
                          "countryId":'AE',// this.customerBilling.country,
                          "customerAddressId": this.customerData.default_billing,
                          "customerId": this.customerData.id,
                          "firstname": this.customerBilling.firstname,
                          "lastname": this.customerBilling.lastname,
                          "postcode": '123456',
                          "saveInAddressBook": null,
                          "street": [
                            this.customerBilling.street1,
                            this.customerBilling.street2
                          ],
                          "telephone": this.customerBilling.phone
                        },
                    "qp": {
                      "additional_data": {
                        "cardId": this.creditCardByEmail.result.cards.data[cardIndex].id,
                        "token": this.checkoutCardId
                      },
                      "method": "dfe_checkout_com"
                    }
                  };

                  if(this.hasRegion) {
                    // orderDetail.ba['region'] = this.customerBilling.region['region'];
                    // orderDetail.ba['regionCode'] = this.customerBilling.region['region_code'];
                    // orderDetail.ba['regionId'] = this.customerBilling.region['region_id'];
                  };

           }
    this.checkoutService.customerPlaceOrderByCard(orderDetail).subscribe(data => {
      $('#loading').hide();
     
    }, err => {
      $('#loading').hide();
    });

  }

// ------------- disable payment info --------
disablePayementMethod()
{
  this.hideValidation = true;
  this.disablePayment = true ;
}

// ---------- place order with no info ------
placeOrderWithNoInformation()
{   
  $('#loading').show();
  	//if guest
    if(localStorage.getItem('customerToken') === null)
     {
		  this.guestPayWithNoCard();
     }else
     {
      // if customer
      this.customerPayWithNoCard();
     }
 
}


   ///////////////////////////////////////
  //CUSTOMER DOESN'T REQUIRE CARD
  //////////////////////////////////////
  customerPayWithNoCard() {
     // $('#loading').show();
      this.successOrderDetails = {
        "shippingfirstname" : this.customerShipping.firstname,
        "shippinglastname": this.customerShipping.lastname,
        "shippingstreet": this.customerShipping.street1,
        "shippingcity" : this.customerShipping.city,
        "shippingregion": { "name":"N/A" },
        "shippingcountries": this.customerShipping.country,
        "shippingpostcode": '123456',
        "shippingphone": this.customerShipping.phone
      };
          let address;
          ////////// IF CUSTOMER SAME AS BILLING ///////////
          if(!this.customerSameBill) {
            // same as shippin

			address =  {
			  "cartId": this.checkoutCardId,	
              "billingAddress": {
                    "city": this.customerShipping.city,
                    "company": this.customerShipping.company,
                    "countryId": this.customerShipping.country,
                    "customerAddressId": this.customerData.default_shipping,
                    "customerId": this.customerData.id,
                    "firstname": this.customerShipping.firstname,
                    "lastname": this.customerShipping.lastname,
                    "postcode": '123456',
                    "saveInAddressBook": null,
                    "street": [
                      this.customerShipping.street1,
                      this.customerShipping.street2
                    ],
                    "telephone": this.customerShipping.phone
                    },
				  "paymentMethod": {
					"method": "free"
			         	}  
            };
          } else {
            ////////// IF CUSTOMER NOT SAME AS BILLING ///////////
			
			address =  {
					"cartId": this.checkoutCardId,  
                    "billingAddress": {
                          "city": this.customerBilling.city,
                          "company": this.customerBilling.company,
                          "countryId":'AE',// this.customerBilling.country,
                          "customerAddressId": this.customerData.default_billing,
                          "customerId": this.customerData.id,
                          "firstname": this.customerBilling.firstname,
                          "lastname": this.customerBilling.lastname,
                          "postcode": '123456',
                          "saveInAddressBook": null,
                          "street": [
                            this.customerBilling.street1,
                            this.customerBilling.street2
                          ],
                          "telephone": this.customerBilling.phone
                        },
                    "paymentMethod": {
							"method": "free"
						                 } 
           }
          }
           $('#loading').show();
           this.checkoutService.customerPlaceOrderByCard(address).subscribe(data =>
             {
              this.successOrder = true;
              localStorage.removeItem('shopCartId');
              $('.minicart-update').click();
              $('#loading').hide();
              this.checkOutFlag = false ;
             }, err => {

              this.checkOutFlag = true ;
              this.checkOutLog = err ;
              $('#loading').hide();
            });
      };
    

  
    // -------------- geust doesn't need card -------------
  guestPayWithNoCard() {
   
		let orderDetail = {
          "email": this.guestBillingEmail,
		  "cartId": this.checkoutCardId,	
          "billingAddress" : this.guestBilling,
		  "paymentMethod": {
				"method": "free"
			}	  
    }
        let self =this;
        this.checkoutService.checkoutGuestFinalizeOrder(orderDetail).subscribe(data => {
    
          if(data == "") {
            this.successOrder = true;
            $('.minicart-update').click()
            localStorage.removeItem('shopGuestCartId');
          
           // tslint:disable-next-line:no-trailing-whitespace  
           }
          $('#loading').hide();
        }, (err => {
          this.checkOutFlag = true ;
          this.checkOutLog = err ;
          $('#loading').hide();
        }));
  }; // end guestCreditcardPay

}
