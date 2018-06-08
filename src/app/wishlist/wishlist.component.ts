

import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { WishlistService } from '../services/wishlist.service';
import { ProductDetailService } from '../services/product-detail.service';
import { AddProductCartService } from '../services/add-product-cart.service';
import 'rxjs/add/operator/map';
declare var $:any;

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [
      NavigationService,
      WishlistService,
      ProductDetailService,
      AddProductCartService
  ]
})
export class WishlistComponent implements OnInit {
  wishlistItems;

  productSku;
  productData;
  productQty = 1;
  productDiscountVal;

  productImage;
  productSize;
  productColor;
  productSizeId;
  productColorId;

  selectedColor = null;
  selectedSize = null;

  colorNotSelected = false;
  sizeNotSelected = false;

  wishlistItemId;
  wishlistHasProducts = false;
  wishItemObject:any ;
  globalProductId;
  _colorFlag;
  cartMessage:boolean = false;
  loggerMessage: any;
  globalTarget;
  cartButtonState: boolean= false;
  avalaible_qty = 0;
  qtyMessage:boolean = false;
  _selection_flag:boolean;
  _product_Sku ="";
  param = "";
  sortSelected = "";
  addingToCart: boolean = false;
  brandNotSelected: boolean= false;
  groupSku: any ;
  liveSkuResult:any ;
  data: any ;
  mainImage :string= "";
  lower_limit_qty:boolean = true;
  _variantProductImages: any;
_sizeMsg = "";
 default_color_display = "";
 _globalArrayForSizes;
 _colorObj:any ;
 _selectedColor;
product_Name ;
individualProductSpecialPrice;
_productImage  ;
_Price  ;
productStock;
tempStock;
_discountFlag:boolean =false;
individualProductDescription;
temp_other_images:any ;
exchangeRateWishList:any = 1;
disable:boolean = true ;
titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";


  constructor(
              private route: ActivatedRoute,
              private http: Http,
              private router: Router,
              private productDetailService: ProductDetailService,
              private addProductCartService: AddProductCartService,
              private wishlistService: WishlistService) { }

  
           

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

         replaceSpaces(string)
         {
             if(string != undefined && string != null)
             {
                 var newString = string.replace(/\s/g, '-');
                 return newString;
             }
            return string;
         }
         // --------- replace ends -------------------------------
         
              ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    $('#loading').show();

    let self = this ;
    // setTimeout(function(){
    //   self.exchangeRateWishList = localStorage.getItem("exchangeRat");
    // }, 1000)
    self.exchangeRateWishList = 1;
    
        this.wishlistService.checkWishlist().subscribe(data => {
            this.wishlistItems = data;
             $('#loading').hide();
            if ( this.wishlistItems.length > 0 ) 
            {   
              
                this.wishlistHasProducts = true;
            }
          }, err => {
            $('#loading').hide();
          }); // wishlist init
  };
  excludeSpecialCharacter(string)
  {
      if(string != undefined && string != null)
      {
          return string.replace(/[^\w\s]/gi," ")
      }
     return string;
  }
  
  removeItem(id) {
    $('#loading').show();
    this.wishlistService.removeWishlistItem(id).subscribe(data => {
      this.wishlistService.checkWishlist().subscribe(data => {
            this.wishlistItems = data;
            let itemsArray =[];

            if ( this.wishlistItems.length == 0 ) {
                this.wishlistHasProducts = false;
                $('.wishlist-update').click();
            }else{
                $.each(data, (k,v) =>{
                    itemsArray.push(v.product_id);
                });
                localStorage.setItem('wishListIds',itemsArray.toString()); 
              $('.wishlist-update').click();
            }
           
            $('#wishModalRemoved').modal('show');

            setTimeout(function()
                {
                    $('#wishModalRemoved').modal('hide');
                }, 2000);
            $('#loading').hide();
          }, err => {
            $('#loading').hide();
          }
        );
    
    });
  };
  

  changeImg(source) {
    var largeImage = document.getElementById('prod-img-big');
    largeImage.setAttribute( 'src', source );
  }

  selectColor(color) {
    this.selectedColor = color;
    this.colorNotSelected = false;
    $('.label-c').removeClass('selected');
    $('#color-'+color).addClass('selected')

  }
  selectSize(size) {
    this.selectedSize = size;
    this.sizeNotSelected = false;
  }

  goToCheckout() {
    $('#cartModal').modal('hide');
    this.router.navigate(['/cart/checkout']);
  }

  getCorrespondingDetails(sku)
  {   
     $('#loading').show();
       this.http.get('http://ocs-dev.tools.kskdigital.com/restapis?singleView='+this.productSku).map(res=> res.json()).subscribe(data => {
       this.wishItemObject = data.results;
       $('#loading').hide();
       if(this.wishItemObject != undefined)
        {  
          //conse.log('object is ---->'+JSON.stringify(this.wishItemObject))
          //this.wishlistAddToCart(this.wishItemObject);
        }    
    },err => {alert('Error occured . . . .')})
  }

  wishlistAddToCart(productObject)
   {
    $('#product-detail-modal .modal-body').addClass('hide');
    this.globalProductId= "";
    this.globalProductId = productObject.product_id;
    this._colorFlag = "", this.productSku="";
    this.cartMessage = false;
    this.loggerMessage = "" ;
    this.globalTarget.setAttribute('src',"")
    this.cartButtonState = false ;
    this.avalaible_qty = productObject.qty;
    this. productQty = 1;
    this.qtyMessage = false;
    this._selection_flag = false
    this.sizeNotSelected = false ;
    let sizeObject = {}, self = this, index ;
    this.mainImage =""; 
    this.lower_limit_qty = true;
    this.productSku = productObject.sku;
    this.productSizeId = 0;
   this.selectedSize = 0 ;
    this._variantProductImages =[];
    this._colorFlag = productObject.productFlag;
    this._sizeMsg = "", this.default_color_display = "";
    self._globalArrayForSizes = [];
    let bool : boolean, defaultColor:string = "" ;
    
    if(this._colorFlag === 'color_size_variant' && productObject._size_object != undefined)
        {
            self._globalArrayForSizes = productObject._size_object;
        } 
            if(this._colorFlag ==='color_size_variant' || 
                this._colorFlag ==='color_variant' && productObject.sku.length >13)
            {
              this.productSku = this.productSku.slice(0, -4);
            }
        if(this._colorFlag === 'color_size_variant' && productObject._color_object != undefined)
            {
                this._colorObj = productObject._color_object.colors;
                //conse.log('object is-->'+JSON.stringify(this._colorObj))
            }

    if(productObject.sizes !== undefined && productObject.sizes.length != 0 && this._colorFlag !== 'color_size_variant')
        {
         self._globalArrayForSizes = productObject.sizes ;
        }
    if(productObject.color_array !== undefined && this._colorFlag !== 'color_size_variant')
        {
            this._colorObj = productObject.color_array;
        }

        //----------- check the flag and extract the color ----
        if(this._colorFlag === 'color_size_variant' || this._colorFlag === 'color_variant')
            {
                 $.each( this._colorObj, (key, val) => {
                         if(val.product_id === productObject.product_id)
                            {
                                //conse.log('json -->'+ JSON.stringify(val))
                              self.default_color_display = val.value;
                              self.selectedColor = parseInt(val.value) ;
                              self.productColorId =parseInt(val.id);
                              //conse.log('id -->'+self.productColorId)
                            }
                 });
               
                 this._selectedColor = this.default_color_display.toString();
            }
    this.product_Name = productObject.product_name ;
    this.individualProductSpecialPrice = productObject.special_price;
    this._productImage = productObject.product_image ;
    this._Price = productObject.price ;
    this._product_Sku = this.productSku;
    //conse.log('color is -->'+this.default_color_display)
  
     //conse.log('stock -->'+productObject.isInStock+'qty -->'+productObject.qty)
     
       if(productObject.isInStock == '1'){
        this.productStock = true;
      } else {
        this.productStock = false;
      }  
    this.tempStock = this.productStock;
  
  if(this.individualProductSpecialPrice != undefined && this._Price != undefined && this._Price!= false)
    {
        if(productObject.special_price != undefined)
            {               
                        if (productObject.price >= productObject.special_price) {
                            this._discountFlag = false;
                            this._Price = productObject.price;
                        } else
                            if (productObject.special_price >productObject.price) {
                                this._discountFlag = true;
                                this.individualProductSpecialPrice = productObject.special_price;
                                this.productDiscountVal = Math.trunc((1 - (productObject.price /productObject.special_price)) * 100);
                            }
                           
                            let   str: any= this.productDiscountVal ;
                           if(str == "NaN")
                            {
                                this._discountFlag = false;
                                this.productDiscountVal = 0 ;
                            }         
            }   
    }else
    {
        this._discountFlag = false;
        this.productDiscountVal = 0 ;
    }  
   
    let   str: any= this.productDiscountVal ;
   if(str == "NaN")
    {
        this._discountFlag = false;
        this.productDiscountVal = 0 ;
    }
     
        //conse.log('price -->'+this.individualProductSpecialPrice)
        //conse.log('special -->'+this._Price)
        //conse.log('discount -->'+this.productDiscountVal)
    if(productObject.product_otherimages !== undefined && productObject.product_otherimages!= null && productObject.product_otherimages!= false)
        {    
            index = productObject.product_otherimages.indexOf(',');
            if(index == -1)
                {
                    let other =[];
                    other.push(productObject.product_otherimages);
                    this._variantProductImages = other; 
                    this.mainImage  = productObject.product_otherimages;
                }else{
                    this._variantProductImages = productObject.product_otherimages.split(',');
                    this.mainImage  = this._variantProductImages[0];
                }
           
        }else
        {
            this._variantProductImages = [];
        }
        if(this._variantProductImages.length == 6)
            {
                this._variantProductImages[5] ="";
            }
    if(productObject.description === "&nbsp;" || productObject.description === null)
        {
            this.individualProductDescription = "<p> Details Not Available </p>"; 
        }else
        {
            this.individualProductDescription = productObject.description;
        }
       
        this.temp_other_images =  this._variantProductImages;
        //conse.log('selected color in wishlist is -->'+ this.selectedColor)
        //---------------- commented out by Amine 07/09 ------------
   
      this.getMeta(this.mainImage);
   //-------------------------
    $('#product-detail-modal').modal('show');
    $('#product-detail-modal .modal-body').removeClass('hide');
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 301);
    
  } // end wishlist add to cart


  //------------------- drop down functions ----------------
  handleSelectedValueFromDropDownSize(size) {
    let self= this, price =0, special_price, qty, inStock, _size = 0,
    size_id, size_value, sizeValueTobeSent ="", sku ="";
    this.cartMessage = false;
    this.loggerMessage = "" ;
   //------ flushing global variables -------
   this.productSizeId ="";
   this.productSize ="";
   this.qtyMessage = false;
   this. productQty = 1;
   this.avalaible_qty = 1;
   this._selection_flag = true ;
   this.selectedSize = null ;
   this.addingToCart =false;

  //conse.log('selected size-->'+size.target.value + ' obj ->'+JSON.stringify(this._globalArrayForSizes))
  size_value = size.target.value;

  $.each(this._globalArrayForSizes, (key, value) =>
  {
     if(value.value === size.target.value)
      {
          price = value.price;
          special_price = value.special_price;
          qty = value.qty;
          inStock = value.isInStock
          _size = value.label;
          size_id = value.id;
          sizeValueTobeSent = value.value ;
          sku = value.sku;
      };
 })

 this.productSizeId =parseInt(size_id);
 this.productSize =size_value;

//conse.log('price ->'+price + 'sp -->'+special_price + 'stock ->'+inStock + 'qty-->'+qty);
let discount;
if(special_price != undefined && inStock != undefined)
  {   
      if(special_price !== false && special_price != undefined)
          {
              if (price >= special_price) {
                  this._discountFlag = false;
                  this._Price = price;
              } else
                  if (special_price >price) {
                      this._discountFlag = true;
                      this.individualProductSpecialPrice = special_price;
                      this.productDiscountVal = Math.trunc((1 - (price /special_price)) * 100);
                  }
                 
                  let   str: any= this.productDiscountVal ;
                 if(str == "NaN")
                  {
                      this._discountFlag = false;
                      this.productDiscountVal = 0 ;
                  }         
          }
  }
  if(size.target.value != 0)
      {
          this.selectedSize = parseInt(sizeValueTobeSent);
          this.sizeNotSelected = false;
          this.productSku = sku;
          this.cartButtonState = false;
      }else
      if(size.target.value == 0)
          {
              this.selectedSize = 0;
              this.productSizeId = 0 ;
              this.sizeNotSelected = true;
              this.productStock=this.tempStock;
              this._selection_flag = false ;
              this.productSku = "";
              this.cartButtonState = true;
          }

      if(inStock === '1')
          {
              this.productStock = true ;
          }else 
          if(inStock === '0')
              {
              this.productStock = false ;
              this.sizeNotSelected = false;
              this.colorNotSelected = false;
              }
              
            this.avalaible_qty = qty;
}

  //--------------- for color dropdown------------
  handleSelectedValueFromDropDown(event)
  {
      //conse.log('data is -->'+event.target.value);
      this.productColor  =  "";
      this.cartMessage = false;
      this.loggerMessage = "" ;
      let self= this, price =0, special_price, qty, inStock, product_otherimages:string,
       index, colorValue= "", sku ="";
      var largeImage = document.getElementById('prod-img-big');
      let  id = event.target.value, image,color, color_id,color_value ;
      this.productQty = 1;
      this.qtyMessage =false ;
      this.avalaible_qty = 1;

     //conse.log('object is -->'+JSON.stringify(this._colorObj))

     //conse.log('id is -->'+id)
   //---------if color size variant ---
   color_value = id;

   if(this._colorFlag === 'color_size_variant' && this._colorObj != undefined)
      {
          $.each(this._colorObj, (key, value) => {             
                          if(value.value === id)
                              {
                                  image = value.product_image;
                                  color = value.label;
                                  colorValue = value.value;
                                  sku =value.sku;
                                  // price = value.price;
                                  // special_price = value.special_price;
                                  // inStock = value.isInStock
                                  color_id = value.id;
                                  self._globalArrayForSizes = value.size;
                                  product_otherimages = value.product_otherimages
                              }
                      });
      }else{
          $.each(this._colorObj, (key, value) => {                
                          if(value.value === id)
                              {
                                  image = value.product_image;
                                  color = value.label;
                                  price = value.price;
                                  special_price = value.special_price;
                                  inStock = value.inStock
                                  qty = value.qty;
                                  color_id = value.id;
                                  sku = value.sku;
                                  colorValue = value.value;
                                  product_otherimages= value.product_other_images;
                              }
                      });
      }
      //----------- product other images ----
      if(product_otherimages != undefined)
          {
               index = product_otherimages.indexOf(',');
          }
     
      if(this._colorFlag === 'color_variant' || this._colorFlag === 'color_size_variant')
          { 
              if(product_otherimages != null  && product_otherimages != undefined)
                  {
                      if(index == -1)
                          {   
                              let other = [];
                              other.push(product_otherimages);
                              this._variantProductImages = other; 
                          }else
                          {                              
                              this._variantProductImages = product_otherimages.split(',');
                              if( this._variantProductImages.length == 6)
                                  {
                                      this._variantProductImages[5]="";
                                  }
                          }
                     
                  }
          }
      if(id == 0)
          {        
              largeImage.setAttribute( 'src',this._productImage); 
              this.selectedColor = "";
              //conse.log('original -->'+  this.productStock+ 'temp -->'+ this.tempStock)
              this.productStock=this.tempStock;
              this._variantProductImages =this.temp_other_images ;
              this.selectedColor = null ;
              this.productSku = null;
              this.cartButtonState = true;
             // this.colorNotSelected = true; 
          }else
            {
              largeImage.setAttribute( 'src',image); 
              this.selectedColor = parseInt(color_value) ;;
              this.colorNotSelected = false;
              this.productSku = sku;
             
              // $('.label-c').removeClass('selected');
              // $('#color-'+color).addClass('selected')  
            }
   //conse.log('price -> '+price + 'sp --> '+special_price + 'stock -> '+inStock +'qty -->'+qty);
 //--------------------- price and discount section ----------
  this.productColorId = color_id;
  if(colorValue !== null)
      {
          this.selectedColor  =  parseInt(color_value) ;
          //conse.log('id -->'+this.productColorId)
      }


   if(special_price != undefined && inStock != undefined)
      {   
          if(special_price !== false && special_price != undefined)
              {
                  if (price >= special_price) {
                      this._discountFlag = false;
                      this._Price = price;
                  } else
                      if (special_price >price) {
                          this._discountFlag = true;
                          this.individualProductSpecialPrice = special_price;
                          this.productDiscountVal = Math.trunc((1 - (price /special_price)) * 100);
                      }
                     
                      let   str: any= this.productDiscountVal ;
                     if(str == "NaN")
                      {
                          this._discountFlag = false;
                          this.productDiscountVal = 0 ;
                      }         
              }
          if(inStock === '1' || inStock === 1)
              {
                  this.productStock = true ;
              }else
              if(inStock === '0' || inStock === 0)
                  {
                      this.productStock = false ;
                  }else
              {
                  this.productStock = this.tempStock;
              }
      }  
      this.avalaible_qty = qty;
      this.addingToCart =false;
  }

  //------------------- increase/decrease quantity -------------
  decreaseQty() {
    
        this.cartMessage = false;
        this.loggerMessage = "" ;
        if(this.productQty > 0) {
          this.productQty = this.productQty-1;
        } else { this.productQty = 0; }
        //conse.log('qty avail-->'+this.avalaible_qty)
        if(  this._selection_flag == true || this._colorFlag == 'color_variant'|| this._colorFlag === 'simple_product')
            {
                if(this.productQty <= this.avalaible_qty)
                    {
                        this.qtyMessage = false;
                        this.cartButtonState = false ;
                    }else
                     {
                        this.qtyMessage = true;
                        this.cartButtonState = true ;
                     }
            }
       
      };
    
      increaseQty() {
          this.productQty = this.productQty+1;
          this.cartMessage = false;
          this.loggerMessage = "" ;
          //conse.log('qty avail-->'+this.avalaible_qty)
    
          if(  this._selection_flag == true || this._colorFlag === 'color_variant' || this._colorFlag === 'simple_product')
            {
                if(this.productQty > this.avalaible_qty)
                    {
                        this.qtyMessage = true;
                        this.cartButtonState = true ;
                    }else
                     {
                        this.qtyMessage = false;
                        this.cartButtonState = false ;
                     }
            }
      };
  //------------------------ end-------------------------------    
  //--------------------------------------------------drop down function finished ---------------
  getMeta(url){
    
            let target=document.getElementById('prod-img-big');
            target.setAttribute( 'src', "" );
           $('#prod-img-big').hide();
        $('<img src="'+url+'"/>').load(function(){
            if(this.width>this.height)
                {
                    target.style.width = 451+'px';
                    target.style.height ='auto';
    
                    //target.setAttribute("width", "451");
                   // target.setAttribute("height", "auto");
                }else
                if(this.height>this.width)
                    {
                        target.style.width = 'auto';
                        target.style.height =500+'px';
    
                       // target.setAttribute("width", "auto");
                       // target.setAttribute("height", "500");
                    }else
                    {
                        target.style.width = 451+'px';
                        target.style.height ='auto';
    
                       // target.setAttribute("width", "451");
                       // target.setAttribute("height", "auto");
                    }
                    
                    $('#prod-img-big').show();
                     target.setAttribute( 'src', url );
                    //document.getElementById("imgId").setAttribute("width", "500");
        });
    
     }


  wishlistAddToCart1(sku, wishlistId) {

    this.wishlistItemId = wishlistId;
   
     
     // //conse.log('object is -->'+JSON.stringify(this.dummyObject) )
     // this.simulateDetailedInformation(this.wishItemObject);


    $('#product-detail-modal .modal-body').addClass('hide');
    //conse.log(sku);
    //conse.log(wishlistId);

    $('#loading').show();
    this.productSku = sku;
    this.productDetailService.getProductDetails(this.productSku).subscribe(data => {
      //conse.log(data[0])

      this.productData = data[0];
      //conse.log(this.productData);
      this.productDiscountVal = this.productData.price * (this.productData.special_price / 100);
      
      function findItem(x) {
          return arrData.filter(function(elem){
              return elem.label===x;
          })
        };

      if(typeof data[0].configurable_product_options != 'undefined') {
        var dtd = data[0].configurable_product_options;
        var arrData = Object.keys(dtd).map(function (key) { return dtd[key]; });
        
        var productSizeArray = findItem('Size');
        var productCollorArray = findItem('Color');
        //conse.log(productSizeArray[0])
        //conse.log(productCollorArray[0])
        this.productSize = productSizeArray[0].values;
        this.productColor = productCollorArray[0].values;
        this.productSizeId = productSizeArray[0].attribute_id;
        this.productColorId = productCollorArray[0].attribute_id;
        //conse.log(this.productSizeId);
        //conse.log(this.productColorId);
        //conse.log(this.productSize);
        //conse.log(this.productColor);
      };
       
      
      $('#loading').hide();
    }, (err => {
      $('#loading').hide();
     }));

    this.productDetailService.getProductDetailsCore(this.productSku).subscribe(data => {
  
      // custom_attributes
      for (let item of data.custom_attributes) {
        if(item.attribute_code == 'ksk_otherimages') {
          let arr = item.value.split(',');
          this.productImage = arr;
        };
      };
    });

    $('#product-detail-modal').modal('show');
    $('#product-detail-modal .modal-body').removeClass('hide');
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 301);
    
  } // end wishlist add to cart

  addToCart() {
    $('#loading').show();
    // check if customer user
    if(localStorage.getItem('customerToken') !== null) {
        if(localStorage.getItem('shopCartId') === null) {
           this.addProductCartService.getCartId().subscribe(data => {
             $('#loading').hide();
          
            localStorage.setItem('shopCartId', data);
            
            //if simple product
            if(typeof this.productData.configurable_product_options == 'undefined') {
                let productAttr = { 
                  "cartItem" : 
                    {
                      "quote_id": localStorage.getItem('shopCartId'),
                      "sku" : this.productSku,
                      "qty" : this.productQty,
                      "quoteId" : localStorage.getItem('shopGuestCartId') 
                    }
                };
              
                this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
             
                  $('#loading').hide();
                  $('.minicart-update').click();
                  this.removeItem(this.wishlistItemId);
                  $('#product-detail-modal').modal('hide');
                  $('#cartModal').modal('show');
              
                });
            //if configurable product    
          } else if(typeof this.productData.configurable_product_options != 'undefined') {
            
            //check if attributes are selected
                if(this.selectedColor == null) {
                  this.colorNotSelected = true;
                  $('#loading').hide();
                } else if (this.selectedSize == null) {
                  this.sizeNotSelected = true;
                  $('#loading').hide();
                } else {
                  let productAttr = {
                    "cartItem": {
                        "quote_id": localStorage.getItem('shopCartId'),
                        sku: this.productSku,
                        qty: this.productQty,
                        product_option: {
                          extension_attributes: {
                            "configurable_item_options": [
                                {
                                    option_id: this.productColorId, // color id
                                    option_value: this.selectedColor // color value
                                }, {
                                    option_id: this.productSizeId, // size id
                                    option_value: this.selectedSize // size value
                                }
                              ]
                          }
                        }
                    }
                  };
               

                  this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                 
                    $('#loading').hide();
                    $('.minicart-update').click();
                    this.removeItem(this.wishlistItemId);
                    $('#product-detail-modal').modal('hide');
                    $('#cartModal').modal('show');
                  });    
                }
                
            } // end configurable product add
          });
      //if cart id exists  




        } else {
          //if simple product
          if(typeof this.productData.configurable_product_options == 'undefined') {
              let productAttr = { 
                "cartItem" : 
                  {
                    "sku" : this.productSku,
                    "qty" : this.productQty,
                    "quote_id" : localStorage.getItem('shopCartId') 
                  }
              };
              this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
              
                $('#loading').hide();
                $('.minicart-update').click();
                this.removeItem(this.wishlistItemId);
                $('#product-detail-modal').modal('hide');
                $('#cartModal').modal('show');
                //conse.log('cart exists')
              });
          //if configurable product    
          } else if(typeof this.productData.configurable_product_options != 'undefined') {
              //check if attributes are selected
                if(this.selectedColor == null) {
                  $('#loading').hide();
                  this.colorNotSelected = true;
                } else if (this.selectedSize == null) {
                  //conse.log('here?????')
                  $('#loading').hide();
                  this.sizeNotSelected = true;
                } else {
                  let productAttr = {
                    "cartItem": {
                        "quote_id": localStorage.getItem('shopCartId'),
                        sku: this.productSku,
                        qty: this.productQty,
                        product_option: {
                          extension_attributes: {
                            "configurable_item_options": [
                                {
                                    option_id: this.productColorId, // color id
                                    option_value: this.selectedColor // color value
                                }, {
                                    option_id: this.productSizeId, // size id
                                    option_value: this.selectedSize // size value
                                }
                              ]
                          }
                        }
                    }
                  };
                  //conse.log('config?');
                  //conse.log(productAttr);

                  this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                    //conse.log(data);
                    $('#loading').hide();
                    $('.minicart-update').click();
                    this.removeItem(this.wishlistItemId);
                    $('#product-detail-modal').modal('hide');
                    $('#cartModal').modal('show');
                  });    
                };
          } // end configurable product add 
        }
    };

  } // add to cart



  

}
