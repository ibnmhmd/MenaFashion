import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router ,NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, Validator, FormsModule, ReactiveFormsModule, NgModel, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { CustomerDetailsService } from '../../services/customer-details.service';
import {UserRegister} from '../../interfaces/user-register.interface';
import {UserForgotPassword} from '../../interfaces/user-forgot-password.interface';
import {UserLogin} from '../../interfaces/user-login.interface';
import { GlobalVar } from '../../globals';
import { AddProductCartService } from '../../services/add-product-cart.service';
import {CheckoutService} from '../../services/checkout.service';
// import { FORM_DIRECTIVES, , Control, Validators, FormBuilder, Validator, } from '@angular/common';
declare var $:any;

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ValidationService, CustomerDetailsService, AddProductCartService, CheckoutService]
})
export class FooterComponent implements OnInit {
  private baseApiUrl = GlobalVar.BASE_API_URL;

  public userRegister : UserRegister;
  public userForgotPassword : UserForgotPassword;
  public userLogin : UserLogin;
  hiddenAnchor: boolean = false;
  validUserAndPass = true;
  emailRecoverSuccess = false;
  showLogin = true;
  registrationError = false;
 errorMessage= "";
 hideMessage:boolean = true ;
 notifMessage: any = "";
 successMessage: String ="";
 titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private http: Http, 
  private customerDetailsService: CustomerDetailsService, 
  private addProductCartService: AddProductCartService,
  private checkoutService :CheckoutService,
  private router: Router) { 
   
  }

  eraseError()
  {
    this.errorMessage ="";
    this.registrationError =false;
    this.validUserAndPass = true;
  }
  // ------- remove blurness ----------
  removeBlur()
  {
    $('#cart_wrap').removeClass('blur');
    $('#header').removeClass('blur');
    $('.row').removeClass('blur'); 
    $('.sider-layer').css('display', 'none'); 
  }
  // ------------ ends --------------------
  resetForm(param) {
    this.validUserAndPass = true ;
    this.hideMessage = true ;
    this.emailRecoverSuccess = false;
    this.removeBlur();
    param.reset();
  }
 
  loginUser(model: UserLogin, isValid: boolean) {
	  	
    this.validUserAndPass = true;
    if(isValid) {
      $('#loading').show();
      localStorage.removeItem('customerToken');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.baseApiUrl + 'rest/V1/integration/customer/token',
        { 
            "username": model.clientemail,
            "password": model.clientpassword  
          },
          { headers: headers }).map(res => res.json()).subscribe(
            data => { 
         
			  localStorage.setItem('customerToken', "Bearer " + data);	
			  this.convertGuestCartToCustomerCart();	
              //localStorage.removeItem('shopGuestCartId');
              
              $('#loading').hide();
              $('.close-sidr').click();
            
              this.customerDetailsService.getCustomerDetails().subscribe(data => {
                localStorage.setItem('customerId', data.id);
                $('#loading').hide();
                $('#logInModal').modal('show');
                 window.location.href = "#/";
                 $('.minicart-update').click();
                 
                this.removeBlur();          
                 setTimeout(()=> {
                   $('#logInModal').modal('hide');
                 }, 2000);

                 $('.wishlist-update').click();
              });
            },
            err => { 
              this.validUserAndPass = false;
              $('#loading').hide();
         
             },    
        );
    }else
    {
      this.hideMessage = false;
    } 
    
  };


  createNewUser(model: UserRegister, isValid: boolean) {
    if(isValid) {
      $('#loading').show();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
     
      return this.http.post(this.baseApiUrl + 'rest/V1/customers',
        { 
          customer: {
              "email": model.newemail,
              "firstname": model.newfirstname,
              "lastname": model.newlastname
          },
             "password": model.newpassword
          }, 

          { headers: headers }).map(res => res.json()).subscribe(
            data => {    
              this.registrationError =false;
              this.errorMessage = "";
              $('#loading').hide();},
            err => { 
              this.registrationError =true;
              this.errorMessage = err.json().message;
           
              $('#loading').hide();
            },
            () => { 
                //Login customer if no error
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                return this.http.post(this.baseApiUrl + 'rest/V1/integration/customer/token',
                  { 
                      "username": model.newemail,
                      "password": model.newpassword  
                    },
                    { headers: headers }).map(res => res.json()).subscribe(
                      data => { 
                    
                        this.registrationError =false;
                        this.errorMessage = "";
                        localStorage.setItem('customerToken', "Bearer " + data);
						this.convertGuestCartToCustomerCart();
                        $('.close-sidr').click();
                        $('.sider-layer').hide();
                        $('#loading').hide();
                        this.notifMessage = "";
                        this.removeBlur();
                        $('#registrationModal').modal('show');

                        setTimeout(()=> {
                          $('#registrationModal').modal('hide');
                        }, 2000);
                        window.location.href = "#/";
                         this.customerDetailsService.getCustomerDetails().subscribe(data => {
                          localStorage.setItem('customerId', data.id);
                        });

                        this.removeBlur();

                      },
                      err => { 
                        this.registrationError =true;
                        this.errorMessage = err.json().message;
                        $('#loading').hide();
                         });
              });    
     } else
     {
       this.hideMessage = false;
     } 
  };

  forgotPassword(model: UserForgotPassword, isValid: boolean) {
    if(isValid) {
      $('#loading').show();
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put(this.baseApiUrl + 'rest/V1/customers/password',
          { 
            "email": model.email,
            "template": "email_reset",
            "websiteId": 1
          
          },
          { headers: headers }).map(res => res.json()).subscribe(
            data => {          
               this.emailRecoverSuccess = true;
               this.successMessage = "";
               this.successMessage = '<span>Password reset link has been successfuly sent to : ('+model.email+')</span>';
               $('#loading').hide();
            
               $('.sidr').addClass('blur');
               $('#cartModalPass').modal('show');
               setTimeout(function(){
                 $('#cartModalPass').modal('hide');
                 $('.sidr').removeClass('blur');
               }, 6000);
               $('.close-sidr').click();
               this.removeBlur();
             },
            err => {              
              this.emailRecoverSuccess = false;
              let message = ""
              if(err !== null && err !== undefined && err !== "")
              {
                 message = JSON.parse(err._body).message
                 if(message === "Too many password reset requests. Please wait and try again or contact %1.")
                 {
                   message = "Too many password reset requests. Please wait and try again or contact our customer support."
                 }else
                 if(message === "No such entity with %fieldName = %fieldValue, %field2Name = %field2Value")
                 {
                   message = "Sorry, We weren't able to identify you given the information provided. For further help please contact our customer support.";
                 }
                 this.successMessage = '<span>'+message+'</span>';
             
                 $('.sidr').addClass('blur');
                 $('#cartModalPass').modal('show');
                 setTimeout(function(){
                   $('#cartModalPass').modal('hide');
                   $('.sidr').removeClass('blur');
                 }, 6000);
              }
             
              $('#loading').hide();
            },
            () => { 
              $('#loading').hide();
            });
     } else
     {
       this.hideMessage = false;
     } 
  };

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    this.hideMessage = true ;
    $('#registrationModal').modal('hide');
    if(localStorage.getItem('customerToken') === null) {
    this.showLogin = true;
    this.registrationError =false;
    } else {
      this.showLogin = false;
    }
    
      this.userRegister = {
          newfirstname: '',
          newlastname: '',
          newemail: '',
          newpassword: '' 
      };

      this.userForgotPassword = {
          email: '',
          template: '',
          websiteId: ''
          
      };

      this.userLogin = {
          clientemail: '',
          clientpassword: ''
      };

  }
  goToCustomerPage(page) {
   
     if(localStorage.getItem('customerToken') === null) {
       $('#mm').click();
     } else {
       this.router.navigate(['/' + page ]); 
     }
   } 
  login() {
     $('#mm').click();
   }
    loginPanel() {
      $('#mm').click();
    }
   
  convertGuestCartToCustomerCart()
  {
    	//setting customer cart id
		this.addProductCartService.getCartId().subscribe(data => {
		localStorage.setItem('shopCartId', data);
		var cCartId = localStorage.getItem('shopCartId');
		
		
		//getting guest cart products		
		var guestCartItems = [];
		var guestCartId = localStorage.getItem('shopGuestCartId');
			
		if(cCartId && guestCartId){	
			this.checkoutService.getGuestCart(guestCartId).subscribe(guestCartData => {
				guestCartItems = guestCartData;  
				$.each(guestCartItems, (key, cartItem) =>
				{
					let productAttr = { 
					  "cartItem" : 
						{
						  "quote_id": cCartId,
						  "sku" : cartItem.sku,
						  "qty" : cartItem.qty,
						}
					};
					this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(itemAddedData => {                                       
				    	//console.log("item added : "+cartItem.sku);
						$('.minicart-update').click();
				    }, (err) =>
					 {	
					 });  
					
				});
				
			});	
		
		}
		
		}, err => {
			console.log("error getting customer cart");
		});	
  }
  
}
