import { Input,Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import {CheckoutService} from '../../services/checkout.service';
import { FormBuilder, FormsModule, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { SingleProductDetailsService } from '../../services/single-product-details.service';
import { CategoryListProductService } from '../../services/category-list-product.service';
import {GlobalVars} from '../../globals';

import 'rxjs/add/operator/map';
declare var $:any;

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css'],
  providers: [CheckoutService, CategoryListProductService]
})
export class MiniCartComponent implements OnInit, AfterViewInit {
 
updateFlag:any="";
 totalCartItemsMini = 0;
 cartItemsMini;
 cartSubtotalMini= 0;
 customerCartIdMini;
exchangeRate:any = 0 ;
message:any = "";

notValid:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private router: Router,
    private checkoutService: CheckoutService,
    private categoryListProductService: CategoryListProductService,
    private singleProductDetailsService:SingleProductDetailsService
  ) { }


  ngAfterViewInit(): void {
   document.addEventListener('click', function(){
    $('.closeMini').click(function(){
      $('.user-information1').css('display', 'none');
    })
   });
  }

  navigateToCheckOut()
  {
    this.router.navigate(['/cart/checkout']);
  }
  excludeSpecialCharacter(string)
  {
      if(string != undefined && string != null)
      {
          return string.replace(/[^\w\s]/gi," ")
      }
     return string;
  }

  showAlert(name, itemQty, id, qty)
  {
    this.message = "";
    this.message = "Sorry, We don't have as many ("+ name +") as you requested, we have only ("+ itemQty +") in stock";
    $('.user-information1').addClass('blur');
    $('#wishModalCart').modal('show');
    setTimeout(function()
    {
      $('#wishModalCart').modal('hide');
      $('.user-information1').removeClass('blur');
    }, 5000); 
    
    $('#itemMini'+id).val(qty);
  }

  qrtAlert(qty)
  {
    this.message = "";
    this.message = "Item quantity updated to ("+ qty +")";
    $('.user-information1').addClass('blur');
    $('#wishModalCartQty').modal('show');
    setTimeout(function()
    {
      $('#wishModalCartQty').modal('hide');
      $('.user-information1').removeClass('blur');
    }, 3000);    
  }

  ngOnInit() {

     let self = this ;
     this.notValid = false;
  
    self.exchangeRate = 1 ;
    if(localStorage.getItem('customerToken') === null) {
      if(localStorage.getItem('shopGuestCartId') != null) {
        this.checkoutService.getGuestCart(localStorage.getItem('shopGuestCartId')).subscribe(data => {
          //conse.log(data);
          this.cartItemsMini = data;
        
          this.totalCartItemsMini = this.cartItemsMini.length;

          var sumMini = [], customerLoggedInCartId = '0';
          for(let item of this.cartItemsMini) {
            let price = this.removeFraction(item.price);
           
            sumMini.push(price * item.qty);
           
            customerLoggedInCartId = item.quote_id;
          }
          if(customerLoggedInCartId !== '0')
          {
            localStorage.setItem('shopGuestCartId', customerLoggedInCartId);
          }
 
          this.cartSubtotalMini =  sumMini.reduce((a, b) => a + b, 0);
          $('#loading').hide();
        }, err => {
          $('#loading').hide();
           this.totalCartItemsMini = 0;
          });
       }else
       {
        this.cartItemsMini = []; 
        this.totalCartItemsMini = 0;
       }
    } else {
        this.checkoutService.getCustomerCart().subscribe(data => {
        
        this.customerCartIdMini = data.id;
        this.cartItemsMini = data;
        this.totalCartItemsMini = this.cartItemsMini.length;
        var sumMini = [], customerLoggedInCartId = '0';
        for(let item of this.cartItemsMini) {
          let price = this.removeFraction(item.price);
         
          sumMini.push(price*item.qty);
          customerLoggedInCartId = item.quote_id;
        }
        if(customerLoggedInCartId !== '0')
        {
          localStorage.setItem('shopCartId', customerLoggedInCartId);
        }
         this.cartSubtotalMini =  sumMini.reduce((a, b) => a + b, 0);
        $('#loading').hide();
      }, err => {
          this.totalCartItemsMini = 0 ;
          this.cartSubtotalMini = 0 ;
          });
  
    }
  } // end ngOnInit

   //------------ encode sku --------------
   encodeProductSku(sku)
   {
       if(sku !== undefined && sku !== null)
       {
           return window.btoa(sku);
       }
       return sku;
   }
    

replaceSpaces(string)
{
    if(string != undefined && string != null)
    {
		var newString = string.replace(/\s/g, '-');
		return newString;
    }
   return string;
}
  getLastDigit(_number)
  {
      return _number%10;
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
    removeFromCartMini(prodId) {
    $('#loading').show();
    if(localStorage.getItem('customerToken') === null) {
      var cartId = localStorage.getItem('shopGuestCartId');
      this.checkoutService.deleteGuestCartItem(cartId, prodId).subscribe(data => {
        this.checkoutService.getGuestCart(localStorage.getItem('shopGuestCartId')).subscribe(data => {
          //conse.log(data);
          this.cartItemsMini = data;
          this.totalCartItemsMini = this.cartItemsMini.length;
         
          var sumMini = [], customerLoggedInCartId = '0';
          for(let item of this.cartItemsMini) {
            let price = this.removeFraction(item.price);
           
            sumMini.push(price*item.qty);
            customerLoggedInCartId = item.quote_id;
          }
          if(customerLoggedInCartId !== '0')
          {
            localStorage.setItem('shopGuestCartId', customerLoggedInCartId);
          }
          this.cartSubtotalMini =  sumMini.reduce((a, b) => a + b, 0);
          $('#loading').hide();
        }, (err) => {
          $('#loading').hide();
        });
      });
    } else {
      //remove if user loged in
      var cartId = localStorage.getItem('shopCartId');
      this.checkoutService.deleteCustomerCartItem(prodId).subscribe(data => {
        //conse.log(data);

       this.checkoutService.getCustomerCart().subscribe(data => {
        //conse.log(data);
        this.cartItemsMini = data;
        this.totalCartItemsMini = this.cartItemsMini.length;

        var sumMini = [], customerLoggedInCartId = '0';
        for(let item of this.cartItemsMini) {
          let price = this.removeFraction(item.price);
         
          sumMini.push(price*item.qty);
          customerLoggedInCartId = item.quote_id;
        }
        if(customerLoggedInCartId !== '0')
        {
          localStorage.setItem('shopCartId', customerLoggedInCartId);
        }

        this.cartSubtotalMini =  sumMini.reduce((a, b) => a + b, 0);
        $('#loading').hide();
      });
      }, (err) => {
        $('#loading').hide();
        this.totalCartItemsMini = 0 ;
        this.cartSubtotalMini = 0 ;

      });
    };
  }; // end remove form cart

  updateMinicart() 
  {
    this.ngOnInit();
  }
  cartBagNumber() {
    $('.user1').click();
  }

  checkProductsAvailableQty(sku)
  {
     this.categoryListProductService.getLiveQuantitiesForAllProducts(sku).subscribe(payload =>  
      {
             payload.results;
      }, errr => {
        console.error(errr);
      });
  }
  updateItemCart(itemId, itemSku, entityId, productName, itemQty) {

    this.notValid = false;
   
    if(localStorage.getItem('customerToken') === null) {
      let cartId = localStorage.getItem('shopGuestCartId');
      let itemQty = $('#itemMini'+itemSku).val();
      if( isNaN(parseInt(itemQty)) ||  parseInt(itemQty) <1 )
      {
        $('.user-information1').addClass('blur');
         this.message = "Please enter a valid quantity !";
        $('#wishModalCart').modal('show');
        setTimeout(function()
        {
          $('#wishModalCart').modal('hide');       
          $('.user-information1').removeClass('blur');
        },2000);
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

        this.categoryListProductService.supplierQuantityUpdate(entityId).subscribe(payload =>  
          {
              //this.generalAvailableQty                            
               if(payload.data !== undefined && payload.data !== null)
               {
                   if(parseInt(itemQty) <= Math.trunc(parseInt(payload.data[0].quantity)))
                   {
                      this.checkoutService.updateGuestCart(cartItem).subscribe(data => {
                      this.checkoutService.getGuestCart(localStorage.getItem('shopGuestCartId')).subscribe(data => {
                      
                       this.cartItemsMini = data;
                       $('#loading').hide();
                       $('.minicart-update').click();
                       this.qrtAlert(parseInt(itemQty));                   
                     }, err => {  $('#loading').hide();   });
                   }, err => {  $('#loading').hide();   });
                  }else
                  {
                    $('#loading').hide();
                     this.showAlert(productName, parseInt(payload.data[0].quantity), itemId, itemQty);
                   }
              }else
              {
                $('#loading').hide();
                this.message = "";
                this.message = "Error occured please try again ."
                $('#wishModalCart').modal('show');
                setTimeout(function()
                {
                  $('#wishModalCart').modal('hide');
                }, 2000);    
              }
        }, err => { console.log(err)})
      
      } 
    } else {
      // ------------- if user is loged in ------------
      let cartId = localStorage.getItem('shopCartId');
      let itemQty = $('#itemMini'+itemSku).val();

      if( isNaN(parseInt(itemQty)) ||  parseInt(itemQty) <1 )
      {
        $('.user-information1').addClass('blur');
         this.message = "Please enter a valid quantity !";
        $('#wishModalCart').modal('show');
        setTimeout(function()
        {
          $('#wishModalCart').modal('hide');       
          $('.user-information1').removeClass('blur');
        },2000);
      }else
      {
        $('#loading').show();  
        let cartItem = {
          "cartItem": {
            "item_id": itemId, 
            "quote_id": cartId,
            "qty": itemQty,
          }
        };

        this.categoryListProductService.supplierQuantityUpdate(entityId).subscribe(payload =>  
          {
              //this.generalAvailableQty                            
               if(payload.data !== undefined && payload.data !== null)
               {
                   if(parseInt(itemQty) <= Math.trunc(parseInt(payload.data[0].quantity)))
                   {
                   this.checkoutService.updateCustomerCart(cartItem).subscribe(data => {
                   this.checkoutService.getCustomerCart().subscribe(data => {
                  this.cartItemsMini = data;
                  $('.minicart-update').click();
                  $('#loading').hide();
                  this.qrtAlert(parseInt(itemQty));  
                },err => {
                  $('#loading').hide();
                  this.totalCartItemsMini = 0 ;
                  this.cartSubtotalMini = 0 ;
                });
              }, err => {$('#loading').hide();});
            }else
            {
              $('#loading').hide();
              this.showAlert(productName, parseInt(payload.data[0].quantity), itemId, itemQty);
            }
        }else
           {
            $('#loading').hide();
            this.message = "";
            this.message = "Error occured please try again ."
            $('#wishModalCart').modal('show');
            setTimeout(function()
            {
              $('#wishModalCart').modal('hide');
            }, 2000);  
           }
         }, err => { console.log(err)})
      }
    };
  };
  hideMini()
  {
    //$('#mini').css('display','none');
  }

 
}
