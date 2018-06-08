import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { GlobalVar } from '../globals';
import { CategoryListProductService } from '../services/category-list-product.service';
import { SingleProductDetailsService } from '../services/single-product-details.service';
import { AddProductCartService } from '../services/add-product-cart.service';
import { NavigationService } from '../services/navigation.service';
declare var $:any;

import 'rxjs/add/operator/map';
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
  providers: [NavigationService,WishlistService,  CategoryListProductService,AddProductCartService]
})
export class ProductSearchComponent implements OnInit {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  searchedItem:any;
  totalShownItems= 0;
  addedToWishList:boolean = false;
  selectedItem:any;
  categoryId:any;
  categoryLevel =[];
  productInfo = [];
  navigationLinks = [];
  prodNumList = [];
  subcategories;
  productLength = false;
  searchResponse:boolean= true;
  productShow;
  productCount;
  productPath;
  productSizes;
  productBrands;
  productColors;
  productPrices;
  filterOptions;
  productStock;
  maxPriceSelected:any = 0;
  minPriceSelected: any = 0;
  minShow:boolean = false;
  maxShow:boolean = false;
  originalPrice:any = 0;
  originalSpecialPrice:any = 0;
  originalDisc:any = 0;
  inputState: boolean = true;
  wishNotif:any = "";
  productLoad = false;
  loaderImage: string = "";
  productSku;
  uncheckColor:boolean = false;
  productData;
  productQty = 1;
  productDiscountVal;
  addedToCart:boolean =false;
  productImage;
  productSize;
  productColor;
  productSizeId;
  productColorId;
  mytable;
  productInfoAssistant = [];
  selectedColor = null;
  selectedSize = null;
  objectLength = 0;
  colorNotSelected = false;
  sizeNotSelected = false;
  selectedBrands2:string ="";
  selectedAttr;
  selectedBrand;
  selectedPrice;
  selectedOrder;
  sortOrder; 
  wishListResponse:any = "";
  checkedBrands = [];
  colorShow = false;
  brandShow = false;
  priceShow = false;
  sizeShow = false;
  sortShow = false;
  checkedColors:any = [];
  addedToWishListSuccess: boolean =false ;
  private _routeScrollPositions: {[url: string] : number}[] = [];
  private _subscriptions: Subscription[] = [];
  // --------- Added By Amine ------
  selectedCategoryTag:string ="";
  public individualProductSpecialPrice:number = 0;
  public individualProductDescription: any;
  public scrollbarOptions:any ={};
  outOfStockColor:string = "";
  bool: boolean= true;
  colorFlag: string = "";
  sizeFlag: string = "";
  defaultDropDownValue:string ="";
  defaultColorDisplay: boolean = true ;
  restApiPayload: any ;
  public globalSizeObject :any = {};
  tempSize:any = [];
  _globalArrayForSizes: any = [];
  _globalSizeFlag: string = "";
 _productImage:string  = "";
 _variantProductImages: any;
 _Price: any ;
_discountFlag:boolean = false;
 prodNumList_2:any = [];
 helperArray:any =[];
 helperObject:any = {}; 
 productID:any= "";
 helperArr:any = [];
 product_Name = "";
 _sizeMsg = "";
 variantColor: any = [];
 helperColorArray:any = [];
 helperObjectColor:any = {}; 
_exchangeRate: number;
_parsetInt = parseInt;
_color_Size_Size_Arry:any = [];
_color_Size_Color_Arry:any = [];
_colorFlag:string = "";
_colorObj:any ;
_globalColorObject: any ;
tempStock: boolean;
temp_other_images:any ;
lineThrough: boolean =false;
mainImage :string= "";
default_color_display: string = "";
lower_limit_qty:boolean = true;
upper_limit_qty:boolean = false;
qtyMessage:boolean = false;
avalaible_qty = 0;
 _stock_flag: boolean;
_selectedColor = "";
_selection_flag:boolean;
_product_Sku ="";
cartButtonState: boolean= false;
globalTarget;
cartNotif:any = "";
disabled:boolean = true;
param = "";
sortSelected = "";
addingToCart: boolean = false;
brandNotSelected: boolean= false;
cartMessage:boolean = false;
loggerMessage: any;
globalProductId:string = "";
groupSku: any ;
liveSkuResult:any ;
data: any ;
totalPageCount:any = 0;
colorFilterArray;
selectedColorValue= "";
colorShowBool = false ;
maxPrice: any = 0;
minPrice: any = 0;

brandFlag:  boolean = false;
colorsFlag: boolean = false;
priceFlag:  boolean = false;
colorIds:any =[];
rangeValues: number[] = [];
brandFirst:boolean = false;
colorFirst:boolean =false;
priceFirst:boolean = false;
uncheckBrand:boolean = false ;
golbalSearchTerm:any = "";
fullMatch: any= "";
sizeVal:any = 0;
wishListIdsArray:any = [];
wishListProductsIds:any = [];
wishListID:any = "";
titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private singleProductDetailsService:SingleProductDetailsService ,private categoryListProductService: CategoryListProductService,
     private route: ActivatedRoute, private http: Http, private router: Router, 
     private wishlistService: WishlistService, private addProductCartService: AddProductCartService,private navigationService: NavigationService
    ) { }

     injectObejctValues(_productInstance:any)
     {
       this.singleProductDetailsService.setProductInstance(_productInstance,this._exchangeRate);
     }

     applyPriceFilter()
     {
        let min =parseInt($('#min').val()) ;
        let max =parseInt($('#max').val()) ;
        this.filterOptions.count = 24 ;
        this.filterOptions.page = 1;
        this.maxPriceSelected = max;
        this.minPriceSelected = min;
        this.minShow =true;
        
        this.filterOptions.min_price = min/1 ;
        this.filterOptions.max_price =  max/1;
        this.applyFilter('e');
     }
    

     applyBrandFilter()
     {
       this.filterOptions.count = 24 ;
       this.filterOptions.page = 1;
       this.brandFlag = false ;
       if(!this.colorShowBool)
       {
           this.colorsFlag = true;
       }
  
       if(this.checkedBrands.length !=0)
          {
              this.brandShow = true ;
              this.filterOptions['brand'] =this.checkedBrands;         
          }else
          {
              this.checkedBrands =[];
              this.brandNotSelected =true;
              this.brandShow = false ;
              this.filterOptions['brand']="" ;
          }
  
          this.applyFilter('e') ;
     }
     preventEvent(event)
     {
       event.stopPropagation();
     }
     brandCheck(param, event) {
         this.param = param;
         let index, self = this;
         this.brandNotSelected =false;
         if(event.target.checked)
          {
              self.checkedBrands.push(param);          
          }else
          {
              if ((index =  self.checkedBrands.indexOf(param)) !== -1) 
                  {                   
                      self.checkedBrands.splice(index, 1);                      
                  }
  
                  // ------- if uncheck -----
                  if(!this.colorShowBool && !this.brandShow)
                  {
                      this.brandFirst = false ;
                      this.colorFirst = false ;
                  }
      
                  if(this.brandFirst && this.colorShowBool)
                  {
                      this.brandFirst = true ;
                      this.colorFirst = false;
                  }
          }
  
          if(event.checked && !this.colorShowBool)
          {
              // -------- brand checked first ----
              this.brandFirst = true ;
          }
                
     }
  
     removeFractionForPrice(sp, price)
     {  
        let _modifiedPrice= 0, lastDigit;
        // ---- performing operations -------------
        if(sp != false && sp != undefined && sp != null){
          if(price<sp){
              if(price != undefined && price != null)
              {
                lastDigit = price.toString().split('.');     
                if(lastDigit[1] !== '0000' && lastDigit[1] !== undefined)
                {
                    _modifiedPrice = parseInt(lastDigit[0])+1 ;
                }else
                {
                    _modifiedPrice = parseInt(lastDigit[0]);
                }
                 _modifiedPrice = Math.trunc(_modifiedPrice);  
              } 
          }else
          if(sp< price)
          {
              
            lastDigit = sp.toString().split('.');     
            if(lastDigit[1] !== '0000' && lastDigit[1] !== undefined)
            {
                _modifiedPrice = parseInt(lastDigit[0])+1 ;
            }else
            {
                _modifiedPrice = parseInt(lastDigit[0]);
            }
    
               _modifiedPrice = Math.trunc(_modifiedPrice);                 
          }else
            { 
                    if(price != undefined && price != null)
                    {
                      lastDigit = price.toString().split('.');     
                      if(lastDigit[1] !== '0000' && lastDigit[1] !== undefined)
                      {
                          _modifiedPrice = parseInt(lastDigit[0])+1 ;
                      }else
                      {
                          _modifiedPrice = parseInt(lastDigit[0]);
                      }
                       _modifiedPrice = Math.trunc(_modifiedPrice); 
                } 
         }  
        }else { 
                if(price != undefined && price != null)
                {
                  lastDigit = price.toString().split('.');     
                  if(lastDigit[1] !== '0000' && lastDigit[1] !== undefined)
                  {
                      _modifiedPrice = parseInt(lastDigit[0])+1 ;
                  }else
                  {
                      _modifiedPrice = parseInt(lastDigit[0]);
                  }
                   _modifiedPrice = Math.trunc(_modifiedPrice);  
                }       
        }
        return _modifiedPrice; 
     }

      handleProudctName(productName)
     {
         if(productName !== null && productName !== undefined && productName !== "")
         {
            if(productName.length >28)
            {
                return productName.substring(0,28)+'...';
            }else
            {
                return productName;
            }
         }else
         {
             return productName ;
         }
         
     }

     priceCheck(param) {
         $('.check-price').removeClass('checked-b');
         $('#'+param).addClass('checked-b');
         for(let price of this.productPrices) {
             if(price.value != param) {  price.checked = false; } 
         }   
         let priceVal =  this.productPrices.filter(opt => opt.checked).map(opt => opt.value);   
  
          if(priceVal.length > 0 && priceVal == "49") {
              delete this.filterOptions['max_price'];
              delete this.filterOptions['price_range'];
              this.filterOptions['min_price'] = priceVal[0];
              this.selectedPrice = priceVal[0] + " & LESS";
              this.priceShow = true;
              this.filterOptions = this.filterOptions;
              //consoe.log(this.filterOptions)
          } else if(priceVal.length > 0 && priceVal == "50-149") {
              delete this.filterOptions['min_price'];
              delete this.filterOptions['max_price'];
              this.filterOptions['price_range'] = priceVal[0];
              this.selectedPrice = priceVal[0];
              this.priceShow = true;
              this.filterOptions = this.filterOptions;
              //consoe.log(this.filterOptions)
          } else if(priceVal.length > 0 && priceVal == "150-199") {
              delete this.filterOptions['min_price'];
              delete this.filterOptions['max_price'];
              this.filterOptions['price_range'] = priceVal[0];
              this.selectedPrice = priceVal[0];
              this.priceShow = true;
              this.filterOptions = this.filterOptions;
              //consoe.log(this.filterOptions)
          } else if(priceVal.length > 0 && priceVal == "200") {
              delete this.filterOptions['min_price'];
              delete this.filterOptions['price_range'];
              this.filterOptions['max_price'] = priceVal[0];
              this.selectedPrice = priceVal[0] + " & MORE";
              this.priceShow = true;
              this.filterOptions = this.filterOptions;
              //consoe.log(this.filterOptions)
          } else { this.priceShow = false; }   

     }
      capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
     }
  
  
     removeColor(value, id)
     {
  
              let self =this, index;  
              this.uncheckBrand = false ; 
              this.uncheckColor =true ;   
              $.each(self.checkedColors, function(i){
                  if(self.checkedColors[i].id === id) {
                      self.checkedColors.splice(i,1);
                      return false;
                  }
              });
  
           if ((index =  self.colorIds.indexOf(id)) !== -1) 
           {                   
               self.colorIds.splice(index, 1);                      
           }
  
        if(self.checkedColors.length >0)
            {
                this.colorShowBool = true;
                this.brandFlag = true;
                this.filterOptions.color_id = this.colorIds;
            }else{
                  this.selectedColorValue = "";
                  this.colorShowBool = false;  
                  this.filterOptions.color_id = null;
                  this.selectedColorValue = null;
                  this.colorShow = false;
                  this.brandFlag = true;
                //  this.colorsFlag = true;
                  self.checkedColors =[];
                  this.filterOptions.color_id = null;
            }
      $('.colorFilter').find(':checkbox').each(function(){
        
              if($(this).is(":checked"))
                {
                    if($(this).attr("id") == value)
                        {
                            $(this).prop('checked',false);           
                        }
                }
            }); 
  
            this.filterOptions.count = 24;
            this.filterOptions.page = 1;
            if(!this.brandShow && !this.colorShowBool)
            {
                this.brandFirst = false ;
                this.colorFirst = false ;
            }
  
            if(this.colorFirst && this.colorShowBool)
            {
                this.brandFirst = false ;
                this.colorFirst = true;
            }
            
            //consoe.log('brand first -->'+this.brandFirst);
            //consoe.log('color first -->'+this.colorFirst);
            this.applyFilter('e');
     }
     
     applyColorFilter()
     {
      
      //consoe.log('color first -->'+this.colorFirst);
      //consoe.log('brand first -->'+this.brandFirst);
          this.colorsFlag = false ;
          if(!this.brandShow)
          {
              this.brandFlag = true;
          }
        //  this.brandFlag = true;
        
  
      if(this.checkedColors.length != 0)
      {
       this.filterOptions.count = 24 ;
       this.filterOptions.page = 1;
       this.filterOptions.color_id = this.colorIds;
       this.colorShowBool = true ;
      }else
      {
       this.selectedColorValue = "";
       this.colorShowBool = false ;
       this.filterOptions.count = 24 ;
       this.filterOptions.page = 1;
       this.colorIds = [];
       this.checkedColors = [];
       this.filterOptions.color_id =null ;
       this. selectedColorValue = null; 
      }
       this.applyFilter('e');
     }
  
     colorCheck(value, id, event)
     {
  
      let index, self = this, color_id={};
      if(event.checked)
       {
           color_id ={
               id: id,
               value: value
               };
           self.checkedColors.push(color_id);  
           self.colorIds.push(id);        
       }else
       {     
          $.each(self.checkedColors, function(i){
              if(self.checkedColors[i].id === id) {
                  self.checkedColors.splice(i,1);
                  return false;
              }
          });
  
               if ((index =  self.colorIds.indexOf(id)) !== -1) 
               {                   
                   self.colorIds.splice(index, 1);                      
               }
  
               if(self.checkedColors.length == 0)
               {
                   this.colorShowBool =false ;
               }
  
               // ---------- if uncheck ---------
               if(!this.brandShow && !this.colorShowBool)
               {
                   this.brandFirst = false ;
                   this.colorFirst = false ;
               }
     
               if(this.colorFirst && this.colorShowBool)
               {
                   this.brandFirst = false ;
                   this.colorFirst = true;
               }
       }
  
       if(event.checked && !this.brandShow)
       {
           this.colorFirst = true ;
       } 
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

    //------------ encode sku --------------
    encodeProductSku(sku)
    {
        if(sku !== undefined && sku !== null)
        {
            return window.btoa(sku);
        }
        return sku;
    }
     sortCheck(param, label, event) {
  
          this.filterOptions.count = 24 ;
          this.filterOptions.page = 1;
          this.selectedOrder = "";
          let index, self = this;
          this.sortShow =true;
          this.selectedOrder = label;
          this.filterOptions['sort_criteria'] = null;
          this.filterOptions['sort_order'] = null;
  // ---------- uncheck others ----
  if(event.target.checked)
  {
      $('.sorter').find(':checkbox').each(function(){
          
                if($(this).is(":checked"))
                  {
                      if($(this).attr("id") !== param)
                          {   
                               //consoe.log('not equal . . .')
                              $(this).prop('checked',false);           
                          }
                  }
              }); 
         // ---------------- set filter parameters ------
              if(param == 'asc' || param == 'desc') {
                  this.filterOptions['sort_order'] = param;         
             } else {
                 this.filterOptions['sort_criteria'] = param;        
             }
         // ---------------------- uncheck finished -------------------
  }else
  {
         this.filterOptions['sort_criteria'] = null;
         this.filterOptions['sort_order'] = null;
         this.sortShow =false;
         this.selectedOrder = "";
  }
  
     
  // ----------------------------- uncheck event finished here --------------
         this.applyFilter('e');
         //consoe.log('Optiuni filtru' +JSON.stringify(this.filterOptions) )
     }
     
     removeSize() {
        delete this.filterOptions['size'];
        this.filterOptions = this.filterOptions;
        $('.check-size').removeClass('checked-b');
        this.sizeShow = false;
        //consoe.log(this.filterOptions); 
     };
     removeMin(x)
     {
         this.minShow =false; 
         this.minPriceSelected =0 ;
         this.filterOptions.min_price =null ;
         this.filterOptions.max_price = null;
         this.filterOptions.count = 24 ;
         this.filterOptions.page = 1;
         $('#min').val(this.rangeValues[1]);
         $('#min').val(this.rangeValues[0]);
         this.applyFilter('e');
     }
     removePrice() {
        delete this.filterOptions['min_price'];
        delete this.filterOptions['price_range'];
        delete this.filterOptions['max_price'];
        this.filterOptions = this.filterOptions;
        $('.check-price').removeClass('checked-b');
        this.priceShow = false;
        //consoe.log(this.filterOptions);
  
     };
     removeBrand(param) {
        this.filterOptions.count = 24 ; 
        this.filterOptions.page = 1 ; 
        let index, self= this ;
    
        if ((index=  self.checkedBrands.indexOf(param)) !== -1) 
          {                   
              self.checkedBrands.splice(index, 1);                      
          }
          if(self.checkedBrands.length >0)
              {
                  this.brandShow = true;
                  this.colorsFlag = true;
                  this.filterOptions.brand = this.checkedBrands;
              }else{
  
                  this.brandShow = false;
                  self.checkedBrands =[];
                  this.colorsFlag = true;
                  this.filterOptions.brand = null;
              }
        $('.innerFloater').find(':checkbox').each(function(){
                if($(this).is(":checked"))
                  {
                      if($(this).attr("id") == param)
                          {
                              $(this).prop('checked',false);           
                          }
                  }
              }); 
              if(!this.colorShowBool && !this.brandShow)
              {
                  this.brandFirst = false ;
                  this.colorFirst = false ;
              }
      if(this.brandFirst && this.colorShowBool)
              {
                  this.brandFirst = true ;
                  this.colorFirst = false;
              }
              this.uncheckBrand = true ;
              this.uncheckColor =false ; 
              this.applyFilter('e');
     };
  
  
     cleanFilters(time)
     {
        // -------------- brand ------------- -----
        $('.innerFloater').find(':checkbox').each(function()
        {          
            $(this).prop('checked',false);           
        }); 
   // ---------------------- sort -----------
        $('.sorter').find(':checkbox').each(function()
         {         
                  $(this).prop('checked',false);           
         }); 
   // ---------------------------------------
   if(this.filterOptions !== undefined)
   {
       this.filterOptions['sort_order'] = null;
       this.filterOptions['sort_criteria'] = null;
       this.filterOptions['']
       this.filterOptions.brand = null;
       this.filterOptions.min_price =null ;
       this.filterOptions.max_price = null;
       $('#min').val(this.rangeValues[1]);
       $('#min').val(this.rangeValues[0]);
     
      
   }         
         this.brandShow = false;
         this.checkedBrands =[];
         this.sortShow =false;
         this.minShow = false;
         this.minPriceSelected = 0 ;
         this.maxPriceSelected = 0;
         if(time === 'reset')
         {
           this.applyFilter('e');
         }
       
     }
     removeSort() {
      this.filterOptions.count = 24 ; 
      this.filterOptions.page = 1 ;
  
        this.filterOptions['sort_order'] = null;
        this.filterOptions['sort_criteria'] = null;
        this.filterOptions = this.filterOptions;
        this.sortShow =false;
  
        // ---------- uncheck others ----
  
     $('.sorter').find(':checkbox').each(function(){
            if($(this).is(":checked"))
              {           
                   $(this).prop('checked',false);           
              }
          }); 
  
      this.applyFilter('e');
     };

     
    getMeta(url){
        let target=document.getElementById('prod-img-big');
        $('#prod-img-big').css('display', 'none');
        target.setAttribute( 'src', "" );
        $('#divSwapper').removeClass('backGroundImg');
    $('<img src="'+url+'"/>').load(function(){
        if(this.width>this.height)
            {
                target.style.width = 451+'px';
                target.style.height ='auto';
            }else
            if(this.height>this.width)
                {
                    target.style.width = 'auto';
                    target.style.height =500+'px';
                }else
                {
                    target.style.width = 451+'px';
                    target.style.height ='auto';
                }    
                
                setTimeout(function()
              {
                   target.setAttribute( 'src', url ); 
                  $('#prod-img-big').css('display', 'block'); 
                  $('#divSwapper').addClass('backGroundImg');
              }, 1000);
             });
       }
      
    //     prepareWishList(product_id)
    //    {
    //        this.globalProductId = "";
    //        this.globalProductId = product_id;
    //        $('#wishList'+product_id).addClass('wishListActive');
    //        this.addToWishlist();
    //    }
           //------------------ handle selected value from color dropdown ----------------------
          handleSelectedValueFromDropDown(event)
          {this.productColor  =  "";
          this.cartMessage = false;
          this.loggerMessage = "" ;
          let self= this, price =this._Price, special_price, qty, inStock, product_otherimages:string,
           index, colorValue= "", sku ="";
          var largeImage = document.getElementById('prod-img-big');
          let  id = event.target.value, image,color, color_id,color_value ;
          this.productQty = 1;
          this.qtyMessage =false ;
          this.avalaible_qty = 1;
       // ---------if color size variant ---
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
           // ------- avil qty ------
          // ----------- product other images ----
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
       
                  this.productStock=this.tempStock;
                  this._variantProductImages =this.temp_other_images ;
                  this.selectedColor = null ;
                  this.productSku = null;
                  this.cartButtonState = true;
  
                  if(this._colorFlag === 'color_variant')
                  {                 
                     this._Price = this.originalPrice; 
                     this.individualProductSpecialPrice = this.originalSpecialPrice;
                     this.productDiscountVal =this.originalDisc;
                  }
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
  
     // --------------------- price and discount section ----------
      this.productColorId = color_id;
      if(colorValue !== null)
          {
              this.selectedColor  =  parseInt(color_value) ;
      
          }
    
  
       if(special_price != undefined && inStock != undefined)
          {   
              if(special_price !== false && special_price != undefined)
                  {
                      if (price >= special_price) {
                          this._discountFlag = false;
                          this._Price = price;
                          this.lineThrough = false;
                      } else
                          if (special_price >price) {
                              this._discountFlag = true;
                              this.individualProductSpecialPrice = special_price;
                              this.lineThrough = true;
                          }
                         
                          let   str: any= this.productDiscountVal ;
                         if(str == "NaN")
                          {
                              this._discountFlag = false;
                              this.productDiscountVal = 0 ;
                              this.lineThrough = false;
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
          if(this._colorFlag === 'color_variant')
          {
          this._Price = price;
          this.individualProductSpecialPrice = special_price;
          this.productDiscountVal = Math.trunc((1 - (special_price/price)) * 100);        
          this.productDiscountVal = Math.abs(this.productDiscountVal);
          }

          this.sizeVal = 0;
          this.sizeNotSelected = true;
          this.cartButtonState =  true;
        }
 
           // ----------- replace url's space with hyphen ------
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


getTotalCategoriesTotalProduct()
{   
      localStorage['categoriesTotalCount'] = null;
            this.navigationService.getCategoriesTotalProduct('shop').subscribe(data => {
            if(data != null && data !== undefined)
              {
               localStorage['categoriesTotalCount']=JSON.stringify(data) ;
              }
            },err => {
            console.error(err)
           })
  }

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    $('#loadingSearch').show();
   
    this.fullMatch = "";
    this.route.params.forEach(params => { 
       $('#loadingSearch').show();
      
      this.golbalSearchTerm = this.route.snapshot.params['product'];
      this.searchedItem = this.route.snapshot.params['product'];
      if(this.route.snapshot.params['fullMatch'] != undefined)
      {
        this.fullMatch =this.route.snapshot.params['fullMatch'];
      }
 
      $('#loadingSearch').show();
      this.searchResponse = true;
      let splittedValue = [];
      $('#loadingSearch').show();
    this.searchedItem =  this.searchedItem.charAt(0).toUpperCase()+this.searchedItem.slice(1);
    this.singleProductDetailsService.setBrand('');
    this.searchedItem = this.searchedItem.replace(/[- ]+/g, " ").trim();
    this.data = [];
    this.filterOptions = {};
    $('#loadingSearch').show();
   
    // ----- setting global object for search purpose ---
    if(this.golbalSearchTerm != null && this.golbalSearchTerm != undefined)
    {
        this.filterOptions.count = 24 ;
        this.filterOptions.searchTerm =this.golbalSearchTerm;
        this.filterOptions.page =1;
    }else
    {
        this.filterOptions = {};
    }
    $('#loadingSearch').show();
    this.sortOrder = [
     {
             "label": "Price: Low to High",
             "value": "asc"
         },{
             "label": "Price: High to Low",
             "value": "desc"
         }];
    
    //  this.golbalSearchTerm;
    $('#loadingSearch').show();
      // -------- extract ids of items that are in wish list -----
      if(localStorage.getItem('wishListIds') !== null && localStorage.getItem('wishListIds') !== undefined)
      {
          this.wishListIdsArray = localStorage.getItem('wishListIds').split(',');
      } 
  
    this.globalTarget =document.getElementById('prod-img-big')
    this.data = [],this.productInfo = [], this.productLength = false, this.productInfoAssistant =[];
    $('#loadingSearch').show();
    if(this.fullMatch == "fullMatch")
     {
        this.categoryListProductService.getMatchResult(this.filterOptions).subscribe(data => {
            this.productCount = 0;  
           if(data.exchange_rate!= undefined)
               {
                   this._exchangeRate = 1;// Number(data.exchange_rate.AED);
                
                   this.singleProductDetailsService.setExchangeRate( this._exchangeRate);
               }else
                 {
                   this._exchangeRate = 1;
                 }
         this.prodNumList_2 = [],  
         this.helperArray =[], this.helperObject = {}, this.productID= "", 
         this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [],
         this.data=[], this.productBrands = [], this.colorFilterArray,this.totalShownItems = 0;
   
           var self =this;           
           // --------------- checking if the data contains children
           if(   data.result !== "No any record found" && data.result !== "No records found" &&
                 data.result != undefined && data.result.length != 0 
              && data.result != null)
               {
                   this.productCount = data.result.length;
                   this.data = data.result ;
                   // ----------- brand filters array ----
                   if(data.filters !== undefined)
                   {
                       data.filters.brands.forEach(item => {
                           if(item !== null && item !== undefined && item !== 'null' && item !== '')
                           {
                               this.productBrands.push(item);
                           }
                          }); 
                   }   
                   let min, max ;
                   this.maxPrice = data.maxPrice;
                   this.minPrice = data.minPrice;
                   this.totalPageCount = parseInt(data.total_products);
                   this.searchResponse = true;
                 min = Math.trunc(this.minPrice*1);
                 max = Math.trunc(this.maxPrice*1);
                
                 this.minPrice = min;
                 this.maxPrice = max; 
                 if(this.minPrice == this.maxPrice)
                 {
                     min += 1;
                     max += 3;
                 } 
                 this.rangeValues = [min, max];
         
                   // --------- color filters array -----
                   this.colorFilterArray = data.filters.colors;                               
                   // ----------------- get live quantity update-----           
                   Object.keys(data.result).map((key, value) =>
                 {    
                   // ----------- simple product ---------------
                 if(data.result[value].variation_details === undefined)
                 {  
                   self.groupSku.push(data.result[value].sku);
                 }else
                   // ----------- if variant size product -----
                 if(data.result[value].variation_details.length != 0)
                   {
                     
                     if(data.result[value].variation_details.variant_group === "variant_size")
                       {        
                        self.groupSku.push(data.result[value].sku);
                              // ------------- loop variant sizes for fetching them ---
                              Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                              {
                                 Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                 {
                                     // -- appending sku for children products ----
                                     self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                 });
                              });
                       }else
                       // ---------------- no size and no color variants -----
                           if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                               {       
                                   // -------------- sku for simple product ---------
                                   self.groupSku.push(data.result[value].sku);          
                               }else  // ---- if variant color and size-------------
                               if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                                   {              
                                    self.groupSku.push(data.result[value].sku);                               
                                       // ------------------  
                                       Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                        {                                                                
                                             $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                                             {                            
                                               self.groupSku.push(value.sku);                                                        
                                             });
                                       });
                                   }else
                                   // --------------variant color --------------
                                   if(data.result[value].variation_details.variant_group === "variant_color")
                                  {                                          
                                   if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null){    
                                    self.groupSku.push(data.result[value].sku);                                          
                                    Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                    {        
                                      Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                      { 
                                        // ------- sku for children ----------
                                        self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                      });                      
                                   });   
                               }                           
                         }  
                       } 
                     },
                      (err) => {//consoe.error('Error fetching Skus')
                              });
                   // ------------------------- sku for all products ends here ---------------
                
                   // ---------------------- fetch quantities for all skus------
                   if(this.groupSku != undefined && this.groupSku.length != 0)
                   {    
                      // $('#loadingSearch').show();
                       this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                           {
                                 this.liveSkuResult = payload.results;
                               
                                 if(this.liveSkuResult != undefined)
                               {
                                   // ------------ updating object -------------
                                 Object.keys(self.data).map((key, value) =>{    
                                 // ----------- simple product ---------------
                                 if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                     // ---------------- getting sku for the parent product ----
                                        $.each(self.liveSkuResult, (key, val) =>      
                                        {
                                           if(val.sku === self.data[value].sku)
                                           {
                                            self.data[value].qty = "";
                                            self.data[value].qty = val.qty;
                                            self.data[value].isInStock ="";
                                            self.data[value].isInStock =val.stock_status;
                                            self.data[value].price = "";
                                            self.data[value].special_price = "";
                                            self.data[value].price = val.normal_price;
                                            self.data[value].special_price = val.sp_price;
                                           }
                                       })                                
                                 }else
                                   // ----------- if variant size product -----
                                 if(self.data[value].variation_details.length != 0)
                                   {                                      
                                              // ---------------- setting sku for the parent product ----
                                                 $.each(self.liveSkuResult, (key, val) =>               
                                             {
                                                 if(val.sku === self.data[value].sku)
                                                 {
                                                    self.data[value].qty = "";
                                                    self.data[value].qty = val.qty;
                                                    self.data[value].isInStock ="";
                                                    self.data[value].isInStock =val.stock_status;
                                                    self.data[value].price = "";
                                                    self.data[value].special_price = "";
                                                    self.data[value].price = val.normal_price;
                                                    self.data[value].special_price = val.sp_price;
                                                 }
                                             })                  
                                                 
                                              // ------------- loop variant sizes for fetching them ---
                                              Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                              {
                                                 Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                                 {    
                                                     // -- setting sku for children products ----
                                                     $.each(self.liveSkuResult, (key, val) =>                       
                                                     {
                                                         if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                                                         {
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock ="";
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                                                         }
                                                     });
                                                 });
                                              });
                                       } 
                                     },
                                      (err) => {//consoe.error('Error fetching Qtys ===>' + err); 
                                   });                                                     
                                   // ----------- performing operations on object ---------
                                   Object.keys(self.data).map((key, value)=> {
                                   
                                    if(self.data[value].variation_details === undefined)
                                    {                      
                                        if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                                        {
                                           self.data[value].productFlag = "simple_product";
                                           //self.productInfo.push(self.data[value])
                                           self.productInfoAssistant.push(self.data[value]);
                                        }                     
                                    }else
                                      // ----------- if variant size product -----
                                    if(self.data[value].variation_details.length !=0)
                                      {
                                        if(self.data[value].variation_details.variant_group === "variant_size")
                                          {
                                              self.helperArray = [];
                                              let otherArrays = [] ;
                                                 // ------------- loop variant sizes for fetching them ---
                                                 Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                 {
                                                    Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                    {
                                                        // -- appending price and others --
                                                        if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty!= "0.0000")
                                                        {
                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                                                           self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                                                        }
                                                       
                                                    });
                                                 });
                                                                     if(self.helperArray.length != 0)
                                                                     {
                                                                       self.productID = self.data[value].product_id;
                                                                       self.helperObject =   {
                                                                                         'product_ID':self.productID,
                                                                                          '_sizes': self.helperArray
                                                                                        };
                                        
                                                                                        self.helperArr.push(self.helperObject);
                                                                                        self.data[value].sizes =self.helperArray;
                                                                                        self.data[value].productFlag = "size_variant";
                                                                                      // self.productInfo.push (self.data[value]);
                                                                                      self.productInfoAssistant.push(self.data[value]);
                                                                     }                                                       
                                                                       
                                                    }else
                                          // ---------------- no size and no color variants -----
                                              if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                                                  {       
                                                      if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                                                      {
                                                          self.data[value].productFlag = "simple_product";
                                                           //self.productInfo.push(self.data[value])
                                                           self.productInfoAssistant.push(self.data[value]);
                                                      }                                                                 
                                                  }else  // ---- if variant color and size----------
                                                  if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                                                      {
                                                          let colors =[];                 
                                                          self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                                                          // --- get colors -------------
                                                          getVariationColor(self.data[value].variation_details.variations);
                  
                                                          Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                           {                                                   
                                                                 let object = {}, color = "", tempColor = "", sizes = [];                                             
                                                                  // ----size
                                                                $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                                {
                                                                    if(value.qty != "0.0000")
                                                                    {
                                                                       color = value.color.label ;
                                                                       value.size.price = value.price;
                                                                       value.size.special_price = value.special_price;
                                                                       value.size.qty = value.qty;
                                                                       value.size.isInStock = value.isInStock;
                                                                       value.size.id =  value.size.id;
                                                                       value.size.sku = value.sku;   
                                                                       value.size.productId = value.product_id;                                                                                                
                                                                       sizes.push(value.size);
                                                                    }
                                                                        
                                                                });
   
                                                                let  color1 = "", tempColor2 = "";
                                                          // tslint:disable-next-line:max-line-length
                                                          Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                                                          {                                                 
                                                                      // tslint:disable-next-line:no-trailing-whitespace
                                                                      // tslint:disable-next-line:max-line-length
                                                                      color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                                                                                      // tslint:disable-next-line:max-line-length
                                                                                      if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                                                                                          // set flag  
                                                                                          self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                                                                                          // set size
                                                                                          self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                                                                                          // set color 
                                                                                          self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                         // set description from parent product 
                                                                                         self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                                                                                         self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                      }
                                                                  tempColor2 = color1 ;                                                          
                                                             });
                                                             
                                                          });
                                                      }else
                                                      // --------------variant color --------------
                                                      if(self.data[value].variation_details.variant_group === "variant_color")
                                                   {
                                                // ----------- if not variant size then loop and show other images --
                                                let colorArr: any = {} ;
                                                self.helperColorArray = [];
                                                    if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                                                  {     
                                                      Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                      {        
                                                          let color_flag = "", second_flag = "";
                                                         Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                         { 
                                                           if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                             && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                              {
                                                                  colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                  ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                                                                  ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                                                                  , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                                                                  ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                                                                  , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                                                                  , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                                                                  , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                                                                  ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                                                                  ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                                                                  ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                                                                 }
                                                                 self.helperColorArray.push(colorArr);  
                                                              }                               
                                                            // tslint:disable-next-line:max-line-length
                                                            color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                         }); 
                                                         // tslint:disable-next-line:max-line-length 
                                                         Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                        { 
                                                          if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                             
                                                              && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                              && self.helperColorArray.length != 0)
                                                           {
                                                               self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                               self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                               self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;                                                               self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                                                           }
                                                          second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                                                         });  
                                                      });   
                                                  }                                                                
                                            }  
                                          }                                          
                             });                            
                            this.productShow = true;                                        
                            this.productLoad = true; 
                            this.productLength = false;
                         
                            // -------------- display object is empty and the response is not last page --------
                            let total = self.productInfoAssistant.length + this.totalShownItems ;
                          
                               if(self.productInfoAssistant.length == 0 && this.totalPageCount >24)
                               {
                                  this.loadMoreProducts('firstLoad','normalFetch');                                                                                                   
                               }else
                                  if(self.productInfoAssistant.length <24 && this.totalPageCount >24)
                                 {  
                                     if(total < this.totalPageCount)  
                                     {
                                        this.loadMoreProducts('firstLoad','normalFetch'); 
                                     }  else
                                     {
                                       Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                       this.totalShownItems = this.productInfo.length ;
                                       this.productInfoAssistant =[];
                                       $('#loadingSearch').hide();
                                     }                                                                                          
                                 }else
                                   {
                                       Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                       this.totalShownItems = this.productInfo.length ;
                                       this.productInfoAssistant =[];
                                       $('#loadingSearch').hide();
                                   }     
                                      if(this.totalShownItems >= this.totalPageCount) 
                                      {
                                          this.productLength = false;
                                          $('#loadingSearch').hide();
                                      }else{
                                                if(this.totalShownItems !=0)
                                                {
                                                this.productLength = true;
                                                }                                        
                                      }   
                           }
                           }, (err) => {
                               
                               this.productInfoAssistant =[];
                               $('#loadingSearch').hide();
                           })                          
                           }                
            
        }else
           {
               this.productShow = false;
               this.productLength = false;
               this.productLoad = false; 
               this.searchResponse = false;
               this.productInfoAssistant =[];
               $('#loadingSearch').hide();
           }
   
         }, (err)=>{                            
     
          this.productLoad = true;
          this.productInfoAssistant =[];
          this.searchResponse = false;
          $('#loadingSearch').hide();
     });

     }else
    {
        $('#loadingSearch').show();
    this.categoryListProductService.getSearchResult(this.filterOptions).subscribe(data => {
         this.productCount = 0;  
        if(data.exchange_rate!= undefined)
            {
                this._exchangeRate = 1;            
            }else
              {
                this._exchangeRate = 1;
              }
      this.prodNumList_2 = [],  
      this.helperArray =[], this.helperObject = {}, this.productID= "", 
      this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [],
      this.data=[], this.productBrands = [], this.colorFilterArray,this.totalShownItems = 0;

        var self =this;           
        // --------------- checking if the data contains children
        if(   data.result !== "No any record found" && data.result !== "No records found" &&
              data.result != undefined && data.result.length != 0 
           && data.result != null)
            {
                this.productCount = data.result.length;
                this.data = data.result ;
               $('#loadingSearch').show();
                // ----------- brand filters array ----
                if(data.filters !== undefined)
                {
                    data.filters.brands.forEach(item => {
                        if(item !== null && item !== undefined && item !== 'null' && item !== '')
                        {
                            this.productBrands.push(item);
                        }
                       }); 
                }   
                let min, max ;
                this.maxPrice = data.maxPrice;
                this.minPrice = data.minPrice;
                this.totalPageCount = parseInt(data.total_products);
                this.searchResponse = true;
              min = Math.trunc(this.minPrice*1);
              max = Math.trunc(this.maxPrice*1);
             
              this.minPrice = min;
              this.maxPrice = max;
              if(this.minPrice == this.maxPrice)
              {
                  min += 1;
                  max += 3;
              } 
              this.rangeValues = [min, max];
      
                // --------- color filters array -----
                this.colorFilterArray = data.filters.colors;                               
                // ----------------- get live quantity update-----           
                Object.keys(data.result).map((key, value) =>
              {    
                // ----------- simple product ---------------
              if(data.result[value].variation_details === undefined)
              {  
                self.groupSku.push(data.result[value].sku);
              }else
                // ----------- if variant size product -----
              if(data.result[value].variation_details.length != 0)
                {
                  if(data.result[value].variation_details.variant_group === "variant_size")
                    {        
                          self.groupSku.push(data.result[value].sku);
                           // ------------- loop variant sizes for fetching them ---
                           Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                           {
                              Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                              {
                                  // -- appending sku for children products ----
                                  self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                              });
                           });
                    }else
                    // ---------------- no size and no color variants -----
                        if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                            {       
                                // -------------- sku for simple product ---------
                                self.groupSku.push(data.result[value].sku);          
                            }else  // ---- if variant color and size-------------
                            if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                                {                                             
                                    // ------------------
                                    self.groupSku.push(data.result[value].sku);  
                                    Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                     {                                                                
                                          $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                                          {                            
                                            self.groupSku.push(value.sku);                                                        
                                          });
                                    });
                                }else
                                // --------------variant color --------------
                                if(data.result[value].variation_details.variant_group === "variant_color")
                               {            
                                 self.groupSku.push(data.result[value].sku);
                                if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null){                                          
                                 Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                 {        
                                   Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                   { 
                                     // ------- sku for children ----------
                                     self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                   });                      
                                });   
                            }                           
                      }  
                    } 
                  },
                   (err) => {}
                );
                // ------------------------- sku for all products ends here ---------------
             
                // ---------------------- fetch quantities for all skus------
                if(this.groupSku != undefined && this.groupSku.length != 0)
                {    
                   $('#loadingSearch').show();
                    this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                        {
                            $('#loadingSearch').show();
                              this.liveSkuResult = payload.results;
                              if(this.liveSkuResult != undefined)
                            {
                                // ------------ updating object -------------
                              Object.keys(self.data).map((key, value) =>{    
                              // ----------- simple product ---------------
                              if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                  // ---------------- setting sku for the parent product ----
                                     $.each(self.liveSkuResult, (key, val) =>      
                                     {
                                        if(val.sku === self.data[value].sku)
                                        {
                                            self.data[value].qty = "";
                                            self.data[value].qty = val.qty;
                                            self.data[value].isInStock ="";
                                            self.data[value].isInStock =val.stock_status;
                                            self.data[value].price = "";
                                            self.data[value].special_price = "";
                                            self.data[value].price = val.normal_price;
                                            self.data[value].special_price = val.sp_price;

                                        }
                                    })                                
                              }else
                                // ----------- if variant size product -----
                              if(self.data[value].variation_details.length != 0)
                                {                                      
                                           // ---------------- setting sku for the parent product ----
                                              $.each(self.liveSkuResult, (key, val) =>               
                                          {
                                              if(val.sku === self.data[value].sku)
                                              {
                                                self.data[value].qty = "";
                                                self.data[value].qty = val.qty;
                                                self.data[value].isInStock ="";
                                                self.data[value].isInStock =val.stock_status;
                                                self.data[value].price = "";
                                                self.data[value].special_price = "";
                                                self.data[value].price = val.normal_price;
                                                self.data[value].special_price = val.sp_price;

                                              }
                                          })                  
                                              
                                           // ------------- loop variant sizes for fetching them ---
                                           Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                           {
                                              Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                              {    
                                                  // -- appending sku for children products ----
                                                  $.each(self.liveSkuResult, (key, val) =>                       
                                                  {
                                                      if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                                                      {
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock ="";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                                                      }
                                                  });
                                              });
                                           });
                                    } 
                                  },
                                   (err) => {; 
                                });
                              
                                
                                // ----------- performing operations on object ---------
                                Object.keys(self.data).map((key, value)=> {
                                
                                 if(self.data[value].variation_details === undefined)
                                 {                      
                                     if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                                     {
                                        self.data[value].productFlag = "simple_product";
                                        self.productInfoAssistant.push(self.data[value]);
                                     }                     
                                 }else
                                   // ----------- if variant size product -----
                                 if(self.data[value].variation_details.length !=0)
                                   {
                                     if(self.data[value].variation_details.variant_group === "variant_size")
                                       {
                                           self.helperArray = [];
                                           let otherArrays = [] ;
                                              // ------------- loop variant sizes for fetching them ---
                                              Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                              {
                                                 Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                 {
                                                     // -- appending price and others --
                                                     if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty!= "0.0000")
                                                     {
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                                                        self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                                                     }
                                                    
                                                 });
                                              });
                                                                  if(self.helperArray.length != 0)
                                                                  {
                                                                    self.productID = self.data[value].product_id;
                                                                    self.helperObject =   {
                                                                                      'product_ID':self.productID,
                                                                                       '_sizes': self.helperArray
                                                                                     };
                                     
                                                                                     self.helperArr.push(self.helperObject);
                                                                                     self.data[value].sizes =self.helperArray;
                                                                                     self.data[value].productFlag = "size_variant";
                                                                                   // self.productInfo.push (self.data[value]);
                                                                                   self.productInfoAssistant.push(self.data[value]);
                                                                  }                                                       
                                                                    
                                                 }else
                                       // ---------------- no size and no color variants -----
                                           if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                                               {       
                                                   if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                                                   {
                                                       self.data[value].productFlag = "simple_product";
                                                        self.productInfoAssistant.push(self.data[value]);
                                                   }                                                                 
                                               }else  // ---- if variant color and size----------
                                               if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                                                   {
                                                       let colors =[];                 
                                                       self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                                                       // --- get colors -------------
                                                       getVariationColor(self.data[value].variation_details.variations);
               
                                                       Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                        {                                                   
                                                              let object = {}, color = "", tempColor = "", sizes = [];                                             
                                                               // ----size
                                                             $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                             {
                                                                 if(value.qty != "0.0000")
                                                                 {
                                                                    color = value.color.label ;
                                                                    value.size.price = value.price;
                                                                    value.size.special_price = value.special_price;
                                                                    value.size.qty = value.qty;
                                                                    value.size.isInStock = value.isInStock;
                                                                    value.size.id =  value.size.id;
                                                                    value.size.sku = value.sku;  
                                                                    value.size.productId = value.product_id;                                                                                                 
                                                                    sizes.push(value.size);
                                                                 }
                                                                     
                                                             });

                                                             let  color1 = "", tempColor2 = "";
                                                       // tslint:disable-next-line:max-line-length
                                                       Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                                                       {                                                 
                                                                   // tslint:disable-next-line:no-trailing-whitespace
                                                                   // tslint:disable-next-line:max-line-length
                                                                   color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                                                                                   // tslint:disable-next-line:max-line-length
                                                                                   if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                                                                                       // set flag  
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                                                                                       // set size
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                                                                                       // set color 
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                       // set description from parent product 
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                                                                                       self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                   }
                                                               tempColor2 = color1 ;                                                          
                                                          });
                                                          
                                                       });
                                                   }else
                                                   // --------------variant color --------------
                                                   if(self.data[value].variation_details.variant_group === "variant_color")
                                                {
                                             // ----------- if not variant size then loop and show other images --
                                             let colorArr: any = {} ;
                                             self.helperColorArray = [];
                                                 if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                                               {     
                                                   Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                   {        
                                                       let color_flag = "", second_flag = "";
                                                      Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                      { 
                                                        if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                          && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                           {
                                                               colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                               ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                                                               ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                                                               , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                                                               ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                                                               , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                                                               , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                                                               , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                                                               ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                                                               ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                                                               ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                                                              }
                                                              self.helperColorArray.push(colorArr);  
                                                           }                               
                                                         // tslint:disable-next-line:max-line-length
                                                         color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                      }); 
                                                      // tslint:disable-next-line:max-line-length 
                                                      Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                     { 
                                                       if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                          
                                                           && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                           && self.helperColorArray.length != 0)
                                                        {
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;                                                            self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                                                        }
                                                       second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                                                      });  
                                                   });   
                                               }                                                                
                                         }  
                                       }                                          
                          });                            
                         this.productShow = true;                                        
                         this.productLoad = true; 
                         this.productLength = false;
                         // -------------- display object is empty and the response is not last page --------
                         let total = self.productInfoAssistant.length + this.totalShownItems ;
                            if(self.productInfoAssistant.length == 0 && this.totalPageCount >24)
                            {
                               this.loadMoreProducts('firstLoad','normalFetch');                                                                                                   
                            }else
                               if(self.productInfoAssistant.length <24 && this.totalPageCount >24)
                              {   
                             
                                  if(total < this.totalPageCount)  
                                  {
                                     this.loadMoreProducts('firstLoad','normalFetch'); 
                                  }  else
                                  {
                                    Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                    this.totalShownItems = this.productInfo.length ;
                                    this.productInfoAssistant =[];
                                    $('#loadingSearch').hide();
                                  }                                                                                          
                              }else
                                {
                                    Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                    this.totalShownItems = this.productInfo.length ;
                                    this.productInfoAssistant =[];
                                    $('#loadingSearch').hide();
                                }     
                                   if(this.totalShownItems >= this.totalPageCount) 
                                   {
                                       this.productLength = false;
                                       $('#loadingSearch').hide();
                                   }else{
                                       if(this.totalShownItems !=0)
                                       {
                                        this.productLength = true;
                                       }                                        
                                   }
                               
                        }
                        }, (err) => {
                            
                            this.productInfoAssistant =[];
                            $('#loadingSearch').hide();
                         })                          
                        }                
         
     }else
        {
            this.productShow = false;
            this.productLength = false;
            this.productLoad = true; 
            this.searchResponse = false;
            this.productInfoAssistant =[];
            $('#loadingSearch').hide();
        }

      }, (err)=>{                            
      
       this.productLoad = true;
       this.productInfoAssistant =[];
       this.searchResponse = false;
       $('#loadingSearch').hide();
  });
}  
    let self = this ;
   function getVariationColor(json)
  {
    let object = {}, colors = [], sizes = [], _sizeObj  ={}, helper = [], color_indexer= "", color="";
   $.each(json, (key, value) => 
   { 
        sizes = [];
       $.each(value.variations, (k, v)=> {

          if(v.qty !== "0.0000")
          {
              v.size.price = v.price;
              v.size.special_price = v.special_price;
              v.size.qty = v.qty;
              v.size.isInStock = v.isInStock;
              v.size.id = v.size.id;
              v.size.sku = v.sku;
              sizes.push(v.size); 
          }
          
            $.each(colors, (index, value) =>
              {
                  color_indexer = value.label;
              });

          if( (color != v.color.label && v.qty != "0.0000") || (color === v.color.label 
              && v.qty != "0.0000" && color_indexer != v.color.label))
            {
                v.color.product_image = v.product_image;
                v.color.price = v.price;
                v.color.special_price = v.special_price;
                v.color.qty =v.qty;
                v.color.isInStock = v.isInStock;
                v.color.product_otherimages = v.product_otherimages;
                v.color.product_id = v.product_id;
                v.color.id = v.color.id;
                v.color.sku = v.sku;
                colors.push(v.color); 
            }               
             color = v.color.label;
             v.color.size = sizes;
       })         
       object= {colors: colors}
   }); 
   self._globalColorObject = object;
  }
}); //route params
}//ngOnInit

// ------------- get color -----------------
getVariationColor(json)
{
    let object = {}, colors = [], sizes = [], _sizeObj  ={}, helper = [], color_indexer= "", color="";
    $.each(json, (key, value) => 
    { 
         sizes = [];
        $.each(value.variations, (k, v)=> {
           if(v.qty !== "0.0000")
           {
               v.size.price = v.price;
               v.size.special_price = v.special_price;
               v.size.qty = v.qty;
               v.size.isInStock = v.isInStock;
               v.size.id = v.size.id;
               v.size.sku = v.sku;
               sizes.push(v.size); 
           }          
             $.each(colors, (index, value) =>
               {
                   color_indexer = value.label;
               });
 
           if( (color != v.color.label && v.qty != "0.0000") || (color === v.color.label 
               && v.qty != "0.0000" && color_indexer != v.color.label))
             {
                 v.color.product_image = v.product_image;
                 v.color.price = v.price;
                 v.color.special_price = v.special_price;
                 v.color.qty =v.qty;
                 v.color.isInStock = v.isInStock;
                 v.color.product_otherimages = v.product_otherimages;
                 v.color.product_id = v.product_id;
                 v.color.id = v.color.id;
                 v.color.sku = v.sku;
                 colors.push(v.color); 
             }               
              color = v.color.label;
              v.color.size = sizes;
        })         
        object= {colors: colors}
    }); 
    this._globalColorObject = object;
}
  getLiveQuantityUpdateForAllProducts(data)
  {       
   this.groupSku = [], this.liveSkuResult = [];
   let self = this;
   Object.keys(data).map((key, value)=>
  {    
  //------ second loop on variation details ----
  //----------- simple product ---------------
  if(data[value].variation_details === undefined)
  {  
   self.groupSku.push(data[value].sku);
  }else
   //----------- if variant size product -----
  if(data[value].variation_details.length !=0)
   {
     if(data[value].variation_details.variant_group === "variant_size")
       {
           //---------------- getting sku for the parent product ----
           self.groupSku.push(data[value].sku);            
              //------------- loop variant sizes for fetching them ---
              Object.keys(data[value].variation_details.variations).map((variantKey, variantValue)=>
              {
                 Object.keys(data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                 {
                     //-- appending sku for children products ----
                     self.groupSku.push(data[value].variation_details.variations[variantKey].variations[otherKey].sku);
                 });
              });
             // console.log('result is -->'+JSON.stringify(this.productInfo)) 
       }else
       //---------------- no size and no color variants -----
           if(data[value].variation_details.variant_group === "" || data[value].variation_details.variant_group ===null)
               {       
                   //-------------- sku for simple product ---------
                   self.groupSku.push(data[value].sku);          
               }else  // ---- if variant color and size-------------
               if(data[value].variation_details.variant_group === "variant_size,variant_color")
                   {        
                       //--------------- sku for the parent color and size product -----       
                       self.groupSku.push(data[value].sku); 
                       //------------------  
                       Object.keys(data[value].variation_details.variations).map((variantKey, variantValue) =>
                        {                                                                
                             $.each(data[value].variation_details.variations[variantKey].variations, (key, value) => 
                             {               //--------- sku for children -------                       
                               self.groupSku.push(value.sku);                                                        
                             });
                             //-------- one more time ----------------------
                       });
                   }else
                   //--------------variant color --------------
                   if(data[value].variation_details.variant_group === "variant_color")
                  {            
                   if(data[value].variation_details.variations !== undefined && data[value].variation_details.variations!== null)
                    {     
                      //---------------- sku for parent product-------
                      self.groupSku.push(data[value].sku); 
                    Object.keys(data[value].variation_details.variations).map((variantKey, variantValue)=>
                    {        
                       let color_flag = "", second_flag = "";
                      Object.keys(data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                      { 
                        //------- sku for children ----------
                        self.groupSku.push(data[value].variation_details.variations[variantKey].variations[otherKey].sku);
                      });                      
                   });   
               }                           
         }  
       } 
     },
      (err) => {}
   );
  
   //---------------------- fetch quantities for all skus------
   if(this.groupSku != undefined && this.groupSku.length != 0)
   {
       this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(data =>  
           {
               this.liveSkuResult = data.results;
               if(this.liveSkuResult != undefined)
               {
                this.updateProducts();
               }
           }, (err) => { })
   }
  //--------------------- if successfully fetched qtys---
  
  }
  
  
  //------------------------ update data before proccessing object-----
  updateProducts()
  {
      let self =this, liveQtyObject:string ="";
   Object.keys(this.data).map((key, value)=>
   {    
   //------ second loop on variation details ----
   //----------- simple product ---------------
   if(this.data[value].variation_details === undefined || this.data[value].variation_details === "")
   {  
       liveQtyObject = "";
       //---------------- getting sku for the parent product ----
          $.each(self.liveSkuResult, (key, val) =>      
        {
          if(val.sku === self.data[value].sku)
          {
              liveQtyObject = val.qty;
          }
         })
       self.data[value].qty = liveQtyObject;
   }else
     //----------- if variant size product -----
   if(this.data[value].variation_details.length !=0)
     {
                liveQtyObject ="";
                //---------------- getting sku for the parent product ----
                   $.each(self.liveSkuResult, (key, val) =>               
               {
                   if(val.sku === self.data[value].sku)
                   {
                       liveQtyObject = val.qty;
                   }
               })                  
               //------------ setting new qty for the product -----
                self.data[value].qty = liveQtyObject;            
                //------------- loop variant sizes for fetching them ---
                Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                {
                   Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                   {    
                       liveQtyObject= "";
                       //-- appending sku for children products ----
                       $.each(self.liveSkuResult, (key, val) =>                       
                       {
                           if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                           {
                               liveQtyObject = val.qty;
                           }
                       })
                      // alert(liveQtyObject.qty)
                       self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = liveQtyObject;
                   });
                });
               // console.log('result is -->'+JSON.stringify(this.productInfo))     
         } 
       },
        (err) => {}
     );
  }
  loadMoreProducts(loadType, fetchType) {
      this.filterOptions.count = 24; 
      this.filterOptions.page = parseInt(this.filterOptions.page)+1;
      if(this.fullMatch === "fullMatch")
      {
        if(loadType === 'firstLoad')
        {
            $('#loadingSearch').show();
            this.categoryListProductService.getMatchResult(this.filterOptions).subscribe(data => 
            {  
                  //  $('#loadingSearch').show();
                if(data.exchange_rate!= undefined)
                    {
                        this._exchangeRate = 1;// Number(data.exchange_rate.AED);
                    }else
                      {
                        this._exchangeRate = 1;
                      }    
                      this.prodNumList_2 = [],  
                      this.helperArray =[], this.helperObject = {}, this.productID= "", 
                      this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [], this.data =[];       
                      var self =this;               
                         // --------------- checking if the data contains children
                         if(data.result !== "No any record found" && data.result !== "No records found" &&
                             data.result != undefined && data.result.length != 0 
                            && data.result != null)
                             {
                                 this.productCount = data.result.length;
                                 this.data = data.result ;     
                                 this.totalPageCount = parseInt(data.total_products);
                             
                                 this.rangeValues = [this.minPrice,  this.maxPrice];
                                  // ----------------- get live quantity update-----
                                          
                            Object.keys(data.result).map((key, value) =>
                            {    
                              // ----------- simple product ---------------
                            if(data.result[value].variation_details === undefined)
                            {  
                              self.groupSku.push(data.result[value].sku);
                            }else
                              // ----------- if variant size product -----
                            if(data.result[value].variation_details.length != 0)
                              {
                                if(data.result[value].variation_details.variant_group === "variant_size")
                                   {         
                                    self.groupSku.push(data.result[value].sku); 
                                         // ------------- loop variant sizes for fetching them ---
                                         Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>{
                                            Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                            {
                                                // -- appending sku for children products ----
                                                self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                            });
                                         });
                                  }else
                                  // ---------------- no size and no color variants -----
                                      if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                                          {       
                                              // -------------- sku for simple product ---------
                                              self.groupSku.push(data.result[value].sku);          
                                          }else  // ---- if variant color and size-------------
                                          if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                                              { 
                                                self.groupSku.push(data.result[value].sku);
                                                  // ------------------  
                                                  Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                                   {                                                                
                                                        $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                        {                            
                                                          self.groupSku.push(value.sku);                                                        
                                                        });
                                                  });
                                              }else
                                              // --------------variant color --------------
                                              if(data.result[value].variation_details.variant_group === "variant_color")
                                             {            
                                              if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                                               {   
                                                self.groupSku.push(data.result[value].sku);                                                 
                                               Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                               {        
                                                 Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                                 { 
                                                   // ------- sku for children ----------
                                                   self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                                 });                      
                                              });   
                                          }                           
                                    }  
                                  } 
                                },
                                 (err) => {console.error('Error fetching Skus')
                                }
                              );
                              // ------------------------- sku for all products ends here ---------------
          
                              // ---------------------- fetch quantities for all skus------
                              if(this.groupSku != undefined && this.groupSku.length != 0)
                              {    
                                  // $('#loadingSearch').show();
                                  this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                                      {
                                            this.liveSkuResult = payload.results;
                                          
                                            if(this.liveSkuResult != undefined)
                                          {
                                              // ------------ updating object -------------
                                            Object.keys(self.data).map((key, value) =>{    
                                            // ----------- simple product ---------------
                                            if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                                // ---------------- setting sku for the parent product ----
                                                   $.each(self.liveSkuResult, (key, val) =>      
                                                   {
                                                      if(val.sku === self.data[value].sku)
                                                      {
                                                        self.data[value].qty = "";
                                                        self.data[value].qty = val.qty;
                                                        self.data[value].isInStock ="";
                                                        self.data[value].isInStock =val.stock_status;
                                                        self.data[value].price = "";
                                                        self.data[value].special_price = "";
                                                        self.data[value].price = val.normal_price;
                                                        self.data[value].special_price = val.sp_price;
                                                      }
                                                  })                                
                                            }else
                                              // ----------- if variant size product -----
                                            if(self.data[value].variation_details.length != 0)
                                              {                                      
                                                // ---------------- setting sku for the parent product ----
                                                            $.each(self.liveSkuResult, (key, val) =>               
                                                        {
                                                            if(val.sku === self.data[value].sku)
                                                            {
                                                                self.data[value].qty = "";
                                                                self.data[value].qty = val.qty;
                                                                self.data[value].isInStock ="";
                                                                self.data[value].isInStock =val.stock_status;
                                                                self.data[value].price = "";
                                                                self.data[value].special_price = "";
                                                                self.data[value].price = val.normal_price;
                                                                self.data[value].special_price = val.sp_price;
                                                            }
                                                        })                  
                                                            
                                                         // ------------- loop variant sizes for fetching them ---
                                                         Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                         {
                                                            Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                                            {    
                                                                // -- appending sku for children products ----
                                                                $.each(self.liveSkuResult, (key, val) =>                       
                                                                {
                                                                    if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                                                                    {
                                                                      
                                                              self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                                                              self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                                                              self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock ="";
                                                              self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                                                              self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                                                              self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                                                              self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                                                              self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                                                                      
                                                                    }
                                                                });
                                                            });
                                                         });
                                                        // console.log('result is -->'+JSON.stringify(this.productInfo))     
                                                  } 
                                                },
                                                 (err) => {console.error('Error fetching Qtys ===>' + err); 
                                              });
                                            
                                              
                                              // ----------- performing operations on object ---------
                                              Object.keys(self.data).map((key, value)=> {
                                              
                                               if(self.data[value].variation_details === undefined)
                                               {                      
                                                   if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                                                   {
                                                      self.data[value].productFlag = "simple_product";
                                                     // self.productInfo.push(self.data[value]);
                                                     let total = self.productInfoAssistant.length +this.totalShownItems;
                                                     if(total < this.totalPageCount)
                                                     { 
                                                      self.productInfoAssistant.push(self.data[value]);
                                                     }
                                                   }                     
                                               }else
                                                 // ----------- if variant size product -----
                                               if(self.data[value].variation_details.length !=0)
                                                 {
                                                   if(self.data[value].variation_details.variant_group === "variant_size")
                                                     {
                                                         self.helperArray = [];
                                                         let otherArrays = [] ;
                                                            // ------------- loop variant sizes for fetching them ---
                                                            Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                            {
                                                               Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                               {
                                                                   // -- appending price and others --
                                                                   if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                                   {                                                                 
                                                                   self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                                                                   self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                                                                   self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                                                                   self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                                                                   self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                   self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                   self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                                                                   self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                                                                 }
                                                               });
                                                            });
                                                                   if(self.helperArray.length != 0) 
                                                                                  {                                                                            
                                                                                      self.productID = self.data[value].product_id;
                                                                                      self.helperObject =   {
                                                                                                        'product_ID':self.productID,
                                                                                                         '_sizes': self.helperArray
                                                                                                       };
                                                       
                                                                                                       self.helperArr.push(self.helperObject);
                                                                                                       self.data[value].sizes =self.helperArray;
                                                                                                       self.data[value].productFlag = "size_variant";
                                                                                                      // self.productInfo.push (self.data[value]);
                                                                                                      let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                                                      if(total < this.totalPageCount)
                                                                                                      { 
                                                                                                        self.productInfoAssistant.push (self.data[value]);
                                                                                                      }
                                                                                                    
            
                                                                                  }
                                                                                  
                                                        }else
                                                     // ---------------- no size and no color variants -----
                                                         if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                                                             {       
                                                                 if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                                                                 {
                                                                     self.data[value].productFlag = "simple_product";
                                                                   // self.productInfo.push(self.data[value])
                                                                   let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                   if(total < this.totalPageCount)
                                                                   { 
                                                                    self.productInfoAssistant.push (self.data[value]); 
                                                                   }                                                                   
                                                                 }                                                                 
                                                             }else  // ---- if variant color and size----------
                                                             if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                                                                 {
                                                                     let colors =[];                 
                                                                     self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                                                                     // --- get colors -------------
                                                                     this.getVariationColor(self.data[value].variation_details.variations);
                             
                                                                     Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                                      {                                                   
                                                                            let object = {}, color = "", tempColor = "", sizes = [];                                             
                                                                             // ----size
                                                                           $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                                           {         
                                                                               if(value.qty != "0.0000")
                                                                               {
                                                                                color = value.color.label ;
                                                                                value.size.price = value.price;
                                                                                value.size.special_price = value.special_price;
                                                                                value.size.qty = value.qty;
                                                                                value.size.isInStock = value.isInStock;
                                                                                value.size.id =  value.size.id;
                                                                                value.size.sku = value.sku;   
                                                                                value.size.productId = value.product_id;                                                                                                
                                                                                sizes.push(value.size);
                                                                               }
                                                                                     
                                                                           });
          
                                                                           let  color1 = "", tempColor2 = "";
                                                                     // tslint:disable-next-line:max-line-length
                                                                     Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                                                                     {                                                 
                                                                                 // tslint:disable-next-line:no-trailing-whitespace
                                                                                 // tslint:disable-next-line:max-line-length
                                                                                 color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                                                                                                 // tslint:disable-next-line:max-line-length
                                                                                                 if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                                                                                                     // set flag  
                                                                                                     self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                                                                                                     // set size
                                                                                                     self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                                                                                                     // set color 
                                                                                                     self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                                     // set description from parent product 
                                                                                                     self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;

                                                                                                     if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                                                                                     || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                                                                                     {
                                                                                                          // ------------ sync child's price & special price with parent's ---------
                                                                                                            self.data[value].variation_details.variations[variantKey].variations[variant].price = self.data[value].price;
                                                                                                            self.data[value].variation_details.variations[variantKey].variations[variant].special_price = self.data[value].special_price;
                                                                                                     }
                                                                                                     let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                                                     if(total < this.totalPageCount)
                                                                                                     {
                                                                                                      self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                                     }
                                                                                                 }
                                                                             tempColor2 = color1 ;                                                          
                                                                        });
                                                                        
                                                                     });
                                                                 }else
                                                                 // --------------variant color --------------
                                                                 if(self.data[value].variation_details.variant_group === "variant_color")
                                                              {
                                                           // ----------- if not variant size then loop and show other images --
                                                           let colorArr: any = {} ;
                                                           self.helperColorArray = [];
                                                               if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                                                             {     
                                                                 Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                                 {        
                                                                     let color_flag = "", second_flag = "";
                                                                    Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                                    { 
                                                                      if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                      && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                                         {
                                                                             colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                             ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                                                                             ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                                                                             , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                                                                             ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                                                                             , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                                                                             , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                                                                             , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                                                                             ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                                                                             ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                                                                             ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                                                                            }
                                                                            self.helperColorArray.push(colorArr);  
                                                                         }                               
                                                                       // tslint:disable-next-line:max-line-length
                                                                       color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                                    }); 
                                                                    // tslint:disable-next-line:max-line-length 
                                                                    Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                                   { 
                                                                     if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                                         && self.helperColorArray.length != 0
                                                                         &&  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty !== "0.0000")
                                                                      {
                                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;
                                                                         let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                         if(total < this.totalPageCount)
                                                                         {
                                                                            self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);                                                                            
                                                                         }
                                                                     }
                                                                     second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                                                                    });  
                                                                 });   
                                                             }                                                                
                                                       }  
                                                     }                                            
                                        });
                                     
                                       this.productShow = true;                                        
                                       this.productLoad = true;
                                     //  this.totalShownItems += self.productInfoAssistant.length;
                                      // console.log('in sim -->'+this.totalShownItems +' --'+this.totalPageCount)
                                      let total = self.productInfoAssistant.length +this.totalShownItems;
                                      let pageLimit = this.filterOptions.page*this.filterOptions.count ;
                                       if(self.productInfoAssistant.length == 0 && pageLimit<= this.totalPageCount)
                                       {
                                           if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                           || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                           {
                                               this.loadMoreProducts('firstLoad', 'sortFilter')
                                           }else{
                                               this.loadMoreProducts('firstLoad','normalFetch');
                                           }
                                                                                                                             
                                       }else
                                          if(self.productInfoAssistant.length <24 && pageLimit<= this.totalPageCount)
                                         {   
                                             if( total < this.totalPageCount && self.productInfoAssistant.length < this.totalPageCount)  
                                             {
                                                if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                                || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                                {
                                                    this.loadMoreProducts('firstLoad', 'sortFilter')
                                                }else{
                                                    this.loadMoreProducts('firstLoad','normalFetch');
                                                }
                                             }else
                                             {
                                                Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                                this.totalShownItems = this.productInfo.length ;
                                                this.productInfoAssistant =[];
                                               $('#loadingSearch').hide();
                                             }                                                                                             
                                         }else
                                           {
                                               Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                               this.totalShownItems = this.productInfo.length ;
                                               this.productInfoAssistant =[];
                                            $('#loadingSearch').hide();
                                           }                                            
                                           if(this.totalShownItems >= this.totalPageCount) 
                                           {
                                               this.productLength = false;
                                               $('#loadingSearch').hide();
                                           
                                           }else{
                                               if(this.totalShownItems !=0)
                                               {
                                                this.productLength = true;
                                               }                                            
                                           }
                                           if(this.totalShownItems == 0)
                                           {
                                               this.productShow =false;
                                           }
                                        }
                                      }, (err) => {                                        
                                          $('#loadingSearch').hide();
                                          self.productInfoAssistant = [];
                                     })                          
                                      }                                                   
                      }else
                  {
                    this.productLength = false;
                    this.productLoad = true; 
                    this.productShow = true;
                    Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                    if(this.productInfo.length == 0)
                    {
                        this.productShow = false;
                    }
                    self.productInfoAssistant = [];                 
                    $('#loadingSearch').hide();
                 }
              }, (err) => {           
               this.productLoad = true;
               this.productShow = false;
               this.productLength = false;
               this.productInfoAssistant = [];
               $('#loadingSearch').hide();
            });             
        }else
        {
            $('#loadingSearch').show(); 
          this.categoryListProductService.getMatchResult(this.filterOptions).subscribe(data => 
        {      
            
        if(data.exchange_rate!= undefined)
            {
                this._exchangeRate = 1;// Number(data.exchange_rate.AED);
            }else
              {
                this._exchangeRate = 1;
              }
  
              this.prodNumList_2 = [],  
              this.helperArray =[], this.helperObject = {}, this.productID= "", 
              this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [], this.data =[];     
              var self =this;               
                 // --------------- checking if the data contains children
                 if(data.result !== "No any record found" && data.result !== "No records found" &&
                     data.result != undefined && data.result.length != 0 
                    && data.result != null)
                     {
                         this.productCount = data.result.length;
                         this.data = data.result ;
                       
                         this.totalPageCount = parseInt(data.total_products);
     
                         this.rangeValues = [this.minPrice, this.maxPrice];
  
                          // ----------------- get live quantity update-----           
                    Object.keys(data.result).map((key, value) =>
                    {    
                      // ----------- simple product ---------------
                    if(data.result[value].variation_details === undefined)
                    {  
                      self.groupSku.push(data.result[value].sku);
                    }else
                      // ----------- if variant size product -----
                    if(data.result[value].variation_details.length != 0)
                      {
                        if(data.result[value].variation_details.variant_group === "variant_size")
                           {         
                            self.groupSku.push(data.result[value].sku);                      
                                 // ------------- loop variant sizes for fetching them ---
                                 Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>{
                                    Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                    {
                                        // -- appending sku for children products ----
                                        self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                    });
                                 });
                          }else
                          // ---------------- no size and no color variants -----
                              if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                                  {       
                                      // -------------- sku for simple product ---------
                                      self.groupSku.push(data.result[value].sku);          
                                  }else  // ---- if variant color and size-------------
                                  if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                                      {        
                                        self.groupSku.push(data.result[value].sku);
                                          // ------------------  
                                          Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                           {                                                                
                                                $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                {                            
                                                  self.groupSku.push(value.sku);                                                        
                                                });
                                          });
                                      }else
                                      // --------------variant color --------------
                                      if(data.result[value].variation_details.variant_group === "variant_color")
                                     {            
                                      if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                                       {     
                                        self.groupSku.push(data.result[value].sku);
                                         Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                       {        
                                         Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                         { 
                                           // ------- sku for children ----------
                                           self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                         });                      
                                      });   
                                  }                           
                            }  
                          } 
                        },
                         (err) => {}
                      );
                      // ------------------------- sku for all products ends here ---------------
  
                      // ---------------------- fetch quantities for all skus------
                      if(this.groupSku != undefined && this.groupSku.length != 0)
                      {    
                        //  $('#loadingSearch').show();
                     
                          this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                              {
                                    this.liveSkuResult = payload.results;
                                  
                                    if(this.liveSkuResult != undefined)
                                  {
                                      // ------------ updating object -------------
                                    Object.keys(self.data).map((key, value) =>{    
                                    // ----------- simple product ---------------
                                    if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                        // ---------------- setting sku for the parent product ----
                                           $.each(self.liveSkuResult, (key, val) =>      
                                           {
                                              if(val.sku === self.data[value].sku)
                                              {
                                                self.data[value].qty = "";
                                                self.data[value].qty = val.qty;
                                                self.data[value].isInStock ="";
                                                self.data[value].isInStock =val.stock_status;
                                                self.data[value].price = "";
                                                self.data[value].special_price = "";
                                                self.data[value].price = val.normal_price;
                                                self.data[value].special_price = val.sp_price;
                                              }
                                          })                                
                                    }else
                                      // ----------- if variant size product -----
                                    if(self.data[value].variation_details.length != 0)
                                      {                                      
                                                 // ---------------- setting sku for the parent product ----
                                                    $.each(self.liveSkuResult, (key, val) =>               
                                                {
                                                    if(val.sku === self.data[value].sku)
                                                    {
                                                   
                                                      self.data[value].qty = "";
                                                      self.data[value].qty = val.qty;
                                                      self.data[value].isInStock ="";
                                                      self.data[value].isInStock =val.stock_status;
                                                      self.data[value].price = "";
                                                      self.data[value].special_price = "";
                                                      self.data[value].price = val.normal_price;
                                                      self.data[value].special_price = val.sp_price;
                                                    }
                                                })                  
                                                    
                                                 // ------------- loop variant sizes for fetching them ---
                                                 Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                 {
                                                    Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                                    {    
                                                        // -- appending sku for children products ----
                                                        $.each(self.liveSkuResult, (key, val) =>                       
                                                        {
                                                            if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                                                            {
                                                             
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock ="";
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                                                            }
                                                        });
                                                    });
                                                 });
                                                // console.log('result is -->'+JSON.stringify(this.productInfo))     
                                          } 
                                        },
                                         (err) => {
                                      });
                                    
                                      
                                      // ----------- performing operations on object ---------
                                      Object.keys(self.data).map((key, value)=> {
                                      
                                       if(self.data[value].variation_details === undefined)
                                       {                      
                                           if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                                           {
                                              self.data[value].productFlag = "simple_product";
                                            //  self.productInfo.push(self.data[value]);
                                            let total = self.productInfoAssistant.length +this.totalShownItems ;
                                            if(total < this.totalPageCount)
                                            {                                          
                                              self.productInfoAssistant.push(self.data[value]);
                                            }
                                           }                     
                                       }else
                                         // ----------- if variant size product -----
                                       if(self.data[value].variation_details.length !=0)
                                         {
                                           if(self.data[value].variation_details.variant_group === "variant_size")
                                             {
                                                 self.helperArray = [];
                                                 let otherArrays = [] ;
                                                    // ------------- loop variant sizes for fetching them ---
                                                    Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                    {
                                                       Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                       {
                                                           // -- appending price and others --
                                                           if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                           {
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                                                            self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                                                           }
                                                          
                                                       });
                                                    });
                                                           if(self.helperArray.length!= 0) 
                                                                          {                                                                            
                                                                              self.productID = self.data[value].product_id;
                                                                              self.helperObject =   {
                                                                                                'product_ID':self.productID,
                                                                                                 '_sizes': self.helperArray
                                                                                               };
                                               
                                                                                               self.helperArr.push(self.helperObject);
                                                                                               self.data[value].sizes =self.helperArray;
                                                                                               self.data[value].productFlag = "size_variant";
                                                                                               //self.productInfo.push (self.data[value]);
                                                                                               let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                                               if(total < this.totalPageCount)
                                                                                               {
                                                                                                self.productInfoAssistant.push(self.data[value]);
                                                                                               } 
                                                                          }
                                                                          
                                                       }else
                                             // ---------------- no size and no color variants -----
                                                 if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                                                     {       
                                                         if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                                                         {
                                                             self.data[value].productFlag = "simple_product";
                                                            // self.productInfo.push(self.data[value]);
                                                            let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                            if(total < this.totalPageCount)
                                                            {
                                                             self.productInfoAssistant.push(self.data[value]);
                                                            }
                                                             
                                                         }                                                                 
                                                     }else  // ---- if variant color and size----------
                                                     if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                                                         {
                                                             let colors =[];                 
                                                             self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                                                             // --- get colors -------------
                                                             this.getVariationColor(self.data[value].variation_details.variations);
                     
                                                             Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                              {                                                   
                                                                    let object = {}, color = "", tempColor = "", sizes = [];                                             
                                                                     // ----size
                                                                   $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                                   {
                                                                       if( value.qty != "0.0000")
                                                                       {
                                                                        color = value.color.label ;
                                                                        value.size.price = value.price;
                                                                        value.size.special_price = value.special_price;
                                                                        value.size.qty = value.qty;
                                                                        value.size.isInStock = value.isInStock;
                                                                        value.size.id =  value.size.id;
                                                                        value.size.sku = value.sku; 
                                                                        value.size.productId = value.product_id;                                                                                                  
                                                                        sizes.push(value.size);
                                                                       }                                                                          
                                                                   });
  
                                                                   let  color1 = "", tempColor2 = "";
                                                             // tslint:disable-next-line:max-line-length
                                                             Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                                                             {                                                 
                                                                         // tslint:disable-next-line:no-trailing-whitespace
                                                                         // tslint:disable-next-line:max-line-length
                                                                         color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                                                                                         // tslint:disable-next-line:max-line-length
                                                                                         if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                                                                                             // set flag  
                                                                                             self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                                                                                             // set size
                                                                                             self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                                                                                             // set color 
                                                                                             self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                            // set description from parent product 
                                                                                             self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                                                                                             if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                                                                             || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                                                                             {
                                                                                                self.data[value].variation_details.variations[variantKey].variations[variant].price = self.data[value].price;
                                                                                                self.data[value].variation_details.variations[variantKey].variations[variant].special_price = self.data[value].special_price;
                                                                                             }
                                                                                            let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                                            if(total < this.totalPageCount)
                                                                                            {
                                                                                             self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                            }
                                                                                         }
                                                                     tempColor2 = color1 ;                                                          
                                                                });
                                                                
                                                             });
                                                         }else
                                                         // --------------variant color --------------
                                                         if(self.data[value].variation_details.variant_group === "variant_color")
                                                      {
                                                   // ----------- if not variant size then loop and show other images --
                                                   let colorArr: any = {} ;
                                                   self.helperColorArray = [];
                                                       if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                                                     {     
                                                         Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                         {        
                                                             let color_flag = "", second_flag = "";
                                                            Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                            { 
                                                              if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                 && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                                 {
                                                                     colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                     ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                                                                     ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                                                                     , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                                                                     ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                                                                     , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                                                                     , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                                                                     , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                                                                     ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                                                                     ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                                                                     ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                                                                    }
                                                                    self.helperColorArray.push(colorArr);  
                                                                 }                               
                                                               // tslint:disable-next-line:max-line-length
                                                               color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                            }); 
                                                            // tslint:disable-next-line:max-line-length 
                                                            Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                           { 
                                                             if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                                 && self.helperColorArray.length != 0
                                                                 &&  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty !== "0.0000")
                                                              {
                                                                  self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                                  self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                                  self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;
                                                                let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                if(total < this.totalPageCount)
                                                                {
                                                                  self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                                                                }
                                                             }
                                                             second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                                                            });  
                                                         });   
                                                     }                                                                
                                               }  
                                             }                                            
                                });         
                               this.productShow = true;                                        
                               this.productLoad = true;                              
                              let total = self.productInfoAssistant.length +this.totalShownItems ;
                              let pageLimit = this.filterOptions.page*this.filterOptions.count ;

                               if(self.productInfoAssistant.length == 0 && pageLimit<= this.totalPageCount)
                               {
                                            if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                            || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                            {
                                            this.loadMoreProducts('firstLoad','sortFilter');                                            
                                            }else
                                            {
                                            this.loadMoreProducts('firstLoad','normalFetch');
                                            }                                                                                                   
                               }else
                                  if(self.productInfoAssistant.length <24 && pageLimit<= this.totalPageCount)
                                 {   
                                     if(total < this.totalPageCount && self.productInfoAssistant.length < this.totalPageCount)  
                                     {
                                            if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                            || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                            {
                                            this.loadMoreProducts('firstLoad','sortFilter');                                            
                                            }else
                                            {
                                            this.loadMoreProducts('firstLoad','normalFetch');
                                            }
                                     }else
                                     {
                                        Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                        this.totalShownItems = this.productInfo.length ;
                                        this.productInfoAssistant =[];
                                       $('#loadingSearch').hide();
                                     }                                                                                             
                                 }else
                                   {
                                       Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                       this.totalShownItems = this.productInfo.length ;
                                       this.productInfoAssistant =[];
                                    $('#loadingSearch').hide();
                                   }   
                                   
                                   if(this.totalShownItems >= this.totalPageCount) 
                                   {
                                       this.productLength = false;
                                       $('#loadingSearch').hide();
                                   
                                   }else{
                                       if(this.totalShownItems !=0)
                                       {
                                        this.productLength = true;
                                       }                                            
                                   }                           
                                   if(this.totalShownItems == 0)
                                   {
                                       this.productShow =false;
                                   }
                              }
                            }, (err) => 
                                {                                
                                  $('#loadingSearch').hide();
                                  
                                  self.productInfoAssistant = []; 
                                });  
                                }                
          }else
          {
            this.productLength = false;
            this.productLoad = true; 
            this.productShow = true;
            Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
            if(this.productInfo.length == 0)
            {
                this.productShow = false;
            }
            self.productInfoAssistant = [];                 
            $('#loadingSearch').hide();
         }
      }, (err) => { 
     
       this.productLoad = true;
       this.productShow = false;
       this.productLength = false;
       $('#loadingSearch').hide();
            });
        }
}
      else
{
      if(loadType === 'firstLoad')
      {
            $('#loadingSearch').show();
          this.categoryListProductService.getSearchResult(this.filterOptions).subscribe(data => 
              {  
                //  $('#loadingSearch').show();
              if(data.exchange_rate!= undefined)
                  {
                      this._exchangeRate = 1;// Number(data.exchange_rate.AED);
                  }else
                    {
                      this._exchangeRate = 1;
                    }
                   
                    this.prodNumList_2 = [],  
                    this.helperArray =[], this.helperObject = {}, this.productID= "", 
                    this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [], this.data =[];  
                    
                    var self =this;               
                       // --------------- checking if the data contains children
                       if(data.result !== "No any record found" && data.result !== "No records found" &&
                           data.result != undefined && data.result.length != 0 
                          && data.result != null)
                           {
                               this.productCount = data.result.length;
                               this.data = data.result ;

                              this.totalPageCount = parseInt(data.total_products);
                             
                              this.rangeValues = [this.minPrice, this.maxPrice];
                                // ----------------- get live quantity update----- 
                                $('#loadingSearch').show();          
                          Object.keys(data.result).map((key, value) =>
                          {    
                            // ----------- simple product ---------------
                          if(data.result[value].variation_details === undefined)
                          {  
                            self.groupSku.push(data.result[value].sku);
                          }else
                            // ----------- if variant size product -----
                          if(data.result[value].variation_details.length != 0)
                            {
                              if(data.result[value].variation_details.variant_group === "variant_size")
                                 {       
                                    self.groupSku.push(data.result[value].sku);   
                                       // ------------- loop variant sizes for fetching them ---
                                       Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>{
                                          Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                          {
                                              // -- appending sku for children products ----
                                              self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                          });
                                       });
                                }else
                                // ---------------- no size and no color variants -----
                                    if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                                        {       
                                            // -------------- sku for simple product ---------
                                            self.groupSku.push(data.result[value].sku);          
                                        }else  // ---- if variant color and size-------------
                                        if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                                            { 
                                                self.groupSku.push(data.result[value].sku);
                                                // ------------------  
                                                Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                                 {                                                                
                                                      $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                      {                            
                                                        self.groupSku.push(value.sku);                                                        
                                                      });
                                                });
                                            }else
                                            // --------------variant color --------------
                                            if(data.result[value].variation_details.variant_group === "variant_color")
                                           {            
                                            if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                                             {   
                                                self.groupSku.push(data.result[value].sku);                                                 
                                             Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                             {        
                                               Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                               { 
                                                 // ------- sku for children ----------
                                                 self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                               });                      
                                            });   
                                        }                           
                                  }  
                                } 
                              },
                               (err) => {
                              }
                            );
                            // ------------------------- sku for all products ends here ---------------
         $('#loadingSearch').show();
                            // ---------------------- fetch quantities for all skus------
                            if(this.groupSku != undefined && this.groupSku.length != 0)
                            {    
                                
                                this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                                    {
                                          this.liveSkuResult = payload.results;
                                        
                                          if(this.liveSkuResult != undefined)
                                        {
                                            // ------------ updating object -------------
                                          Object.keys(self.data).map((key, value) =>{    
                                          // ----------- simple product ---------------
                                          if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                              // ---------------- getting sku for the parent product ----
                                                 $.each(self.liveSkuResult, (key, val) =>      
                                                 {
                                                    if(val.sku === self.data[value].sku)
                                                    {
                                                        self.data[value].qty = "";
                                                        self.data[value].qty = val.qty;
                                                        self.data[value].isInStock ="";
                                                        self.data[value].isInStock =val.stock_status;
                                                        self.data[value].price = "";
                                                        self.data[value].special_price = "";
                                                        self.data[value].price = val.normal_price;
                                                        self.data[value].special_price = val.sp_price;
                                                    }
                                                })                                
                                          }else
                                            // ----------- if variant size product -----
                                          if(self.data[value].variation_details.length != 0)
                                            {                                      
                                                       // ---------------- getting sku for the parent product ----
                                                          $.each(self.liveSkuResult, (key, val) =>               
                                                      {
                                                          if(val.sku === self.data[value].sku)
                                                          {
                                                            self.data[value].qty = "";
                                                            self.data[value].qty = val.qty;
                                                            self.data[value].isInStock ="";
                                                            self.data[value].isInStock =val.stock_status;
                                                            self.data[value].price = "";
                                                            self.data[value].special_price = "";
                                                            self.data[value].price = val.normal_price;
                                                            self.data[value].special_price = val.sp_price;
                                                          }
                                                      })                  
                                                          
                                                       // ------------- loop variant sizes for fetching them ---
                                                       Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                       {
                                                          Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                                          {    
                                                              // -- appending sku for children products ----
                                                              $.each(self.liveSkuResult, (key, val) =>                       
                                                              {
                                                                  if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                                                                  {
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock ="";
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                                                                  }
                                                              });
                                                          });
                                                       });
                                                      // console.log('result is -->'+JSON.stringify(this.productInfo))     
                                                } 
                                              },
                                               (err) => {
                                            });
                                          
                                            
                                            // ----------- performing operations on object ---------
                                            Object.keys(self.data).map((key, value)=> {
                                            
                                             if(self.data[value].variation_details === undefined)
                                             {                      
                                                 if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                                                 {
                                                    self.data[value].productFlag = "simple_product";
                                                   // self.productInfo.push(self.data[value]);
                                                   let total = self.productInfoAssistant.length +this.totalShownItems;
                                                   if(total < this.totalPageCount)
                                                   { 
                                                    self.productInfoAssistant.push(self.data[value]);
                                                   }
                                                 }                     
                                             }else
                                               // ----------- if variant size product -----
                                             if(self.data[value].variation_details.length !=0)
                                               {
                                                 if(self.data[value].variation_details.variant_group === "variant_size")
                                                   {
                                                       self.helperArray = [];
                                                       let otherArrays = [] ;
                                                          // ------------- loop variant sizes for fetching them ---
                                                          Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                          {
                                                             Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                             {
                                                                 // -- appending price and others --
                                                                 if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                                 {                                                                 
                                                                 self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                                                                 self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                                                                 self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                                                                 self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                                                                 self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                 self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                 self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                                                                 self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                                                               }
                                                             });
                                                          });
                                                                 if(self.helperArray.length != 0) 
                                                                                {                                                                            
                                                                                    self.productID = self.data[value].product_id;
                                                                                    self.helperObject =   {
                                                                                                      'product_ID':self.productID,
                                                                                                       '_sizes': self.helperArray
                                                                                                     };
                                                     
                                                                                                     self.helperArr.push(self.helperObject);
                                                                                                     self.data[value].sizes =self.helperArray;
                                                                                                     self.data[value].productFlag = "size_variant";
                                                                                                    // self.productInfo.push (self.data[value]);
                                                                                                    let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                                                    if(total < this.totalPageCount)
                                                                                                    { 
                                                                                                      self.productInfoAssistant.push (self.data[value]);
                                                                                                    }
                                                                                                  
          
                                                                                }
                                                                                
                                                      }else
                                                   // ---------------- no size and no color variants -----
                                                       if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                                                           {       
                                                               if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                                                               {
                                                                   self.data[value].productFlag = "simple_product";
                                                                 // self.productInfo.push(self.data[value])
                                                                 let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                 if(total < this.totalPageCount)
                                                                 { 
                                                                  self.productInfoAssistant.push (self.data[value]); 
                                                                 }                                                                   
                                                               }                                                                 
                                                           }else  // ---- if variant color and size----------
                                                           if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                                                               {
                                                                   let colors =[];                 
                                                                   self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                                                                   // --- get colors -------------
                                                                   this.getVariationColor(self.data[value].variation_details.variations);
                           
                                                                   Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                                    {                                                   
                                                                          let object = {}, color = "", tempColor = "", sizes = [];                                             
                                                                           // ----size
                                                                         $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                                         {         
                                                                             if(value.qty != "0.0000")
                                                                             {
                                                                              color = value.color.label ;
                                                                              value.size.price = value.price;
                                                                              value.size.special_price = value.special_price;
                                                                              value.size.qty = value.qty;
                                                                              value.size.isInStock = value.isInStock;
                                                                              value.size.id =  value.size.id;
                                                                              value.size.sku = value.sku; 
                                                                              value.size.productId = value.product_id;                                                                                                  
                                                                              sizes.push(value.size);
                                                                             }
                                                                                   
                                                                         });
        
                                                                         let  color1 = "", tempColor2 = "";
                                                                   // tslint:disable-next-line:max-line-length
                                                                   Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                                                                   {                                                 
                                                                               // tslint:disable-next-line:no-trailing-whitespace
                                                                               // tslint:disable-next-line:max-line-length
                                                                               color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                                                                                               // tslint:disable-next-line:max-line-length
                                                                                               if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                                                                                                   // set flag  
                                                                                                   self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                                                                                                   // set size
                                                                                                   self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                                                                                                   // set color 
                                                                                                   self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                                     // set description from parent product 
                                                                                                   self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                                                                                                   if(fetchType === 'sortFilter')
                                                                                                   {
                                                                                                       // ------------ sync child's price & special price with parent's ---------
                                                                                                    self.data[value].variation_details.variations[variantKey].variations[variant].price = self.data[value].price;
                                                                                                    self.data[value].variation_details.variations[variantKey].variations[variant].special_price = self.data[value].special_price;
                                                                                                   }
                                                                                                   let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                                                   if(total < this.totalPageCount)
                                                                                                   {
                                                                                                    self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                                   }
                                                                                               }
                                                                           tempColor2 = color1 ;                                                          
                                                                      });
                                                                      
                                                                   });
                                                               }else
                                                               // --------------variant color --------------
                                                               if(self.data[value].variation_details.variant_group === "variant_color")
                                                            {
                                                         // ----------- if not variant size then loop and show other images --
                                                         let colorArr: any = {} ;
                                                         self.helperColorArray = [];
                                                             if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                                                           {     
                                                               Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                               {        
                                                                   let color_flag = "", second_flag = "";
                                                                  Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                                  { 
                                                                    if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                    && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                                       {
                                                                           colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                           ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                                                                           ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                                                                           , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                                                                           ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                                                                           , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                                                                           , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                                                                           , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                                                                           ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                                                                           ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                                                                           ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                                                                          }
                                                                          self.helperColorArray.push(colorArr);  
                                                                       }                               
                                                                     // tslint:disable-next-line:max-line-length
                                                                     color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                                  }); 
                                                                  // tslint:disable-next-line:max-line-length 
                                                                  Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                                 { 
                                                                   if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                                       && self.helperColorArray.length != 0
                                                                       &&  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty !== "0.0000")
                                                                    {
                                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;
                                                                        if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                                                        || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                                                        {
                                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].price = self.data[value].price;
                                                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = self.data[value].special_price;
                                                                        }
                                                                       let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                       if(total < this.totalPageCount)
                                                                       {
                                                                          self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);                                                                            
                                                                       }
                                                                   }
                                                                   second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                                                                  });  
                                                               });   
                                                           }                                                                
                                                     }  
                                                   }                                            
                                      });
                                   
                                     this.productShow = true;                                        
                                     this.productLoad = true;
                                  
                                    let total = self.productInfoAssistant.length +this.totalShownItems;
                                    let pageLimit = this.filterOptions.page*this.filterOptions.count ;
                                    
                                     if(self.productInfoAssistant.length == 0 && pageLimit<= this.totalPageCount)
                                     {
                                         if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                         || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                         {
                                            this.loadMoreProducts('firstLoad','sortFilter');
                                         }else
                                         {
                                            this.loadMoreProducts('firstLoad','normalFetch');
                                         }
                                                                                                                                           
                                     }else
                                        if(self.productInfoAssistant.length <24 && pageLimit<= this.totalPageCount)
                                       {   
                                           if( total < this.totalPageCount && self.productInfoAssistant.length < this.totalPageCount)  
                                           {
                                                    if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                                    || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                                    {
                                                    this.loadMoreProducts('firstLoad','sortFilter');
                                                    }else
                                                    {
                                                    this.loadMoreProducts('firstLoad','normalFetch');
                                                    }
                                           }else
                                           {
                                              Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                              this.totalShownItems = this.productInfo.length ;
                                              this.productInfoAssistant =[];
                                             $('#loadingSearch').hide();
                                           }                                                                                             
                                       }else
                                         {
                                             Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                             this.totalShownItems = this.productInfo.length ;
                                             this.productInfoAssistant =[];
                                          $('#loadingSearch').hide();
                                         }   
                                         
                                         if(this.totalShownItems >= this.totalPageCount) 
                                         {
                                             this.productLength = false;
                                             $('#loadingSearch').hide();
                                         
                                         }else{
                                             if(this.totalShownItems !=0)
                                             {
                                              this.productLength = true;
                                             }                                            
                                         }
                                         if(this.totalShownItems == 0)
                                         {
                                             this.productShow =false;
                                         }
                                      }
                                    }, (err) => {
                                        
                                        $('#loadingSearch').hide();
                                        self.productInfoAssistant = [];
                                      })                          
                                    }
                                                  
                    }else
                {
                    this.productLength = false;
                    this.productLoad = true; 
                    this.productShow = true;
                    Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                    if(this.productInfo.length == 0)
                    {
                        this.productShow = false;
                    }
                    self.productInfoAssistant = [];                 
                    $('#loadingSearch').hide();
               }
            }, (err) => { 
           
             this.productLoad = true;
             this.productShow = false;
             this.productLength = false;
             this.productInfoAssistant = [];
             $('#loadingSearch').hide();
          });             
      }else
      {
          $('#loadingSearch').show();
       
     this.categoryListProductService.getSearchResult(this.filterOptions).subscribe(data => 
      {      
          
      if(data.exchange_rate!= undefined)
          {
              this._exchangeRate = 1;// Number(data.exchange_rate.AED);
          }else
            {
              this._exchangeRate = 1;
            }

            this.prodNumList_2 = [],  
            this.helperArray =[], this.helperObject = {}, this.productID= "", 
            this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [], this.data =[];     
            var self =this;               
               // --------------- checking if the data contains children
               if(data.result !== "No any record found" && data.result !== "No records found" &&
                   data.result != undefined && data.result.length != 0 
                  && data.result != null)
                   {
                       this.productCount = data.result.length;
                       this.data = data.result ;                   
                       this.totalPageCount = parseInt(data.total_products);             
                       this.rangeValues = [this.minPrice, this.maxPrice];

                        // ----------------- get live quantity update-----           
                  Object.keys(data.result).map((key, value) =>
                  {    
                    // ----------- simple product ---------------
                  if(data.result[value].variation_details === undefined)
                  {  
                    self.groupSku.push(data.result[value].sku);
                  }else
                    // ----------- if variant size product -----
                  if(data.result[value].variation_details.length != 0)
                    {
                      if(data.result[value].variation_details.variant_group === "variant_size")
                         {      
                            self.groupSku.push(data.result[value].sku);                         
                               // ------------- loop variant sizes for fetching them ---
                               Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>{
                                  Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                  {
                                      // -- appending sku for children products ----
                                      self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                  });
                               });
                        }else
                        // ---------------- no size and no color variants -----
                            if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                                {       
                                    // -------------- sku for simple product ---------
                                    self.groupSku.push(data.result[value].sku);          
                                }else  // ---- if variant color and size-------------
                                if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                                    {        
                                        self.groupSku.push(data.result[value].sku);
                                        // ------------------  
                                        Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                         {                                                                
                                              $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                                              {                            
                                                self.groupSku.push(value.sku);                                                        
                                              });
                                        });
                                    }else
                                    // --------------variant color --------------
                                    if(data.result[value].variation_details.variant_group === "variant_color")
                                   {            
                                    if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                                     {     
                                        self.groupSku.push(data.result[value].sku);
                                       Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                     {        
                                       Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                       { 
                                         // ------- sku for children ----------
                                         self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                       });                      
                                    });   
                                }                           
                          }  
                        } 
                      },
                       (err) => {}
                    );
                    // ------------------------- sku for all products ends here ---------------

                    // ---------------------- fetch quantities for all skus------
                    if(this.groupSku != undefined && this.groupSku.length != 0)
                    {    
                      //  $('#loadingSearch').show();
                   
                        this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                            {
                                  this.liveSkuResult = payload.results;
                                
                                  if(this.liveSkuResult != undefined)
                                {
                                    // ------------ updating object -------------
                                  Object.keys(self.data).map((key, value) =>{    
                                  // ----------- simple product ---------------
                                  if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                      // ---------------- getting sku for the parent product ----
                                         $.each(self.liveSkuResult, (key, val) =>      
                                         {
                                            if(val.sku === self.data[value].sku)
                                            {
                                                self.data[value].qty = "";
                                                self.data[value].qty = val.qty;
                                                self.data[value].isInStock ="";
                                                self.data[value].isInStock =val.stock_status;
                                                self.data[value].price = "";
                                                self.data[value].special_price = "";
                                                self.data[value].price = val.normal_price;
                                                self.data[value].special_price = val.sp_price;
                                            }
                                        })                                
                                  }else
                                    // ----------- if variant size product -----
                                  if(self.data[value].variation_details.length != 0)
                                    {                                      
                                               // ---------------- getting sku for the parent product ----
                                                  $.each(self.liveSkuResult, (key, val) =>               
                                              {
                                                  if(val.sku === self.data[value].sku)
                                                  {
                                                    self.data[value].qty = "";
                                                    self.data[value].qty = val.qty;
                                                    self.data[value].isInStock ="";
                                                    self.data[value].isInStock =val.stock_status;
                                                    self.data[value].price = "";
                                                    self.data[value].special_price = "";
                                                    self.data[value].price = val.normal_price;
                                                    self.data[value].special_price = val.sp_price;
                                                  }
                                              })                  
                                                  
                                               // ------------- loop variant sizes for fetching them ---
                                               Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                               {
                                                  Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                                  {    
                                                      // -- appending sku for children products ----
                                                      $.each(self.liveSkuResult, (key, val) =>                       
                                                      {
                                                          if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                                                          {
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock ="";
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                                                          }
                                                      });
                                                  });
                                               });
                                        } 
                                      },
                                       (err) => {
                                    });
                                  
                                    
                                    // ----------- performing operations on object ---------
                                    Object.keys(self.data).map((key, value)=> {
                                    
                                     if(self.data[value].variation_details === undefined)
                                     {                      
                                         if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                                         {
                                            self.data[value].productFlag = "simple_product";
                                          //  self.productInfo.push(self.data[value]);
                                          let total = self.productInfoAssistant.length +this.totalShownItems ;
                                          if(total < this.totalPageCount)
                                          {                                          
                                            self.productInfoAssistant.push(self.data[value]);
                                          }
                                         }                     
                                     }else
                                       // ----------- if variant size product -----
                                     if(self.data[value].variation_details.length !=0)
                                       {
                                         if(self.data[value].variation_details.variant_group === "variant_size")
                                           {
                                               self.helperArray = [];
                                               let otherArrays = [] ;
                                                  // ------------- loop variant sizes for fetching them ---
                                                  Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                  {
                                                     Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                     {
                                                         // -- appending price and others --
                                                         if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                         {
                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                          self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                                                          self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                                                         }
                                                        
                                                     });
                                                  });
                                                         if(self.helperArray.length!= 0) 
                                                                        {                                                                            
                                                                            self.productID = self.data[value].product_id;
                                                                            self.helperObject =   {
                                                                                              'product_ID':self.productID,
                                                                                               '_sizes': self.helperArray
                                                                                             };
                                             
                                                                                             self.helperArr.push(self.helperObject);
                                                                                             self.data[value].sizes =self.helperArray;
                                                                                             self.data[value].productFlag = "size_variant";
                                                                                             //self.productInfo.push (self.data[value]);
                                                                                             let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                                             if(total < this.totalPageCount)
                                                                                             {
                                                                                              self.productInfoAssistant.push(self.data[value]);
                                                                                             } 
                                                                        }
                                                                        
                                                     }else
                                           // ---------------- no size and no color variants -----
                                               if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                                                   {       
                                                       if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                                                       {
                                                           self.data[value].productFlag = "simple_product";
                                                          // self.productInfo.push(self.data[value]);
                                                          let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                          if(total < this.totalPageCount)
                                                          {
                                                           self.productInfoAssistant.push(self.data[value]);
                                                          }
                                                           
                                                       }                                                                 
                                                   }else  // ---- if variant color and size----------
                                                   if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                                                       {
                                                           let colors =[];                 
                                                           self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                                                           // --- get colors -------------
                                                           this.getVariationColor(self.data[value].variation_details.variations);
                   
                                                           Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                            {                                                   
                                                                  let object = {}, color = "", tempColor = "", sizes = [];                                             
                                                                   // ----size
                                                                 $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                                 {
                                                                     if( value.qty != "0.0000")
                                                                     {
                                                                      color = value.color.label ;
                                                                      value.size.price = value.price;
                                                                      value.size.special_price = value.special_price;
                                                                      value.size.qty = value.qty;
                                                                      value.size.isInStock = value.isInStock;
                                                                      value.size.id =  value.size.id;
                                                                      value.size.sku = value.sku;   
                                                                      value.size.productId = value.product_id;                                                                                                
                                                                      sizes.push(value.size);
                                                                     }                                                                          
                                                                 });

                                                                 let  color1 = "", tempColor2 = "";
                                                           // tslint:disable-next-line:max-line-length
                                                           Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                                                           {                                                 
                                                                       // tslint:disable-next-line:no-trailing-whitespace
                                                                       // tslint:disable-next-line:max-line-length
                                                                       color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                                                                                       // tslint:disable-next-line:max-line-length
                                                                                       if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                                                                                           // set flag  
                                                                                           self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                                                                                           // set size
                                                                                           self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                                                                                           // set color 
                                                                                           self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                          // set description from parent product 
                                                                                          self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                                                                                          if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                                                                          || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                                                                          {
                                                                                             self.data[value].variation_details.variations[variantKey].variations[variant].price = self.data[value].price;
                                                                                             self.data[value].variation_details.variations[variantKey].variations[variant].special_price = self.data[value].special_price;
                                                                                          }
                                                                                          let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                                                          if(total < this.totalPageCount)
                                                                                          {
                                                                                           self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                          }
                                                                                       }
                                                                   tempColor2 = color1 ;                                                          
                                                              });
                                                              
                                                           });
                                                       }else
                                                       // --------------variant color --------------
                                                       if(self.data[value].variation_details.variant_group === "variant_color")
                                                    {
                                                 // ----------- if not variant size then loop and show other images --
                                                 let colorArr: any = {} ;
                                                 self.helperColorArray = [];
                                                     if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                                                   {     
                                                       Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                       {        
                                                           let color_flag = "", second_flag = "";
                                                          Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                          { 
                                                            if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                               && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                               {
                                                                   colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                   ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                                                                   ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                                                                   , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                                                                   ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                                                                   , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                                                                   , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                                                                   , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                                                                   ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                                                                   ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                                                                   ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                                                                  }
                                                                  self.helperColorArray.push(colorArr);  
                                                               }                               
                                                             // tslint:disable-next-line:max-line-length
                                                             color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                          }); 
                                                          // tslint:disable-next-line:max-line-length 
                                                          Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                         { 
                                                           if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                               && self.helperColorArray.length != 0
                                                               &&  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty !== "0.0000")
                                                            {
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                                self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;
                                                              let total = self.productInfoAssistant.length +this.totalShownItems ;
                                                              if(total < this.totalPageCount)
                                                              {
                                                                self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                                                              }
                                                           }
                                                           second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                                                          });  
                                                       });   
                                                   }                                                                
                                             }  
                                           }                                            
                              });         
                             this.productShow = true;                                        
                             this.productLoad = true;                              
                            let total = self.productInfoAssistant.length +this.totalShownItems ;
                            let pageLimit = this.filterOptions.page*this.filterOptions.count ;
                            
                             if(self.productInfoAssistant.length == 0 && pageLimit<= this.totalPageCount)
                             {
                                if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                {
                                 this.loadMoreProducts('firstLoad','sortFilter');                                            
                                }else
                                {
                                 this.loadMoreProducts('firstLoad','normalFetch');
                                }                                                                                                 
                             }else
                                if(self.productInfoAssistant.length <24 && pageLimit<= this.totalPageCount)
                               {   
                                   if(total < this.totalPageCount && self.productInfoAssistant.length < this.totalPageCount)  
                                   {
                                            if(fetchType === 'sortFilter' || (this.filterOptions.sort_criteria !== null && this.filterOptions.sort_criteria !== undefined) 
                                            || (this.filterOptions.sort_order !== null && this.filterOptions.sort_order !== undefined))
                                            {
                                            this.loadMoreProducts('firstLoad','sortFilter');                                            
                                            }else
                                            {
                                            this.loadMoreProducts('firstLoad','normalFetch');
                                            }
                                   }else
                                   {
                                      Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                      this.totalShownItems = this.productInfo.length ;
                                      this.productInfoAssistant =[];
                                     $('#loadingSearch').hide();
                                   }                                                                                             
                               }else
                                 {
                                     Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                     this.totalShownItems = this.productInfo.length ;
                                     this.productInfoAssistant =[];
                                  $('#loadingSearch').hide();
                                 }   
                                 
                                 if(this.totalShownItems >= this.totalPageCount) 
                                 {
                                     this.productLength = false;
                                     $('#loadingSearch').hide();
                                 
                                 }else{
                                     if(this.totalShownItems !=0)
                                     {
                                      this.productLength = true;
                                     }                                            
                                 }   
                                 if(this.totalShownItems == 0)
                                 {
                                     this.productShow =false;
                                 }                        
                              
                            }
                          }, (err) => 
                              {                                
                                $('#loadingSearch').hide();
                             
                                self.productInfoAssistant = []; 
                              });  
                              }                
        }else
        {
            this.productLength = false;
            this.productLoad = true; 
            this.productShow = true;
            Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
            if(this.productInfo.length == 0)
            {
                this.productShow = false;
            }
            self.productInfoAssistant = [];                 
            $('#loadingSearch').hide();
       }
    }, (err) => { 
    
     this.productLoad = true;
     this.productShow = false;
     this.productLength = false;
     $('#loadingSearch').hide();
          });
      }

    }
}

updateWishList(id)
{
    $('#loadingSearch').show();
  if(localStorage.getItem('customerToken') !== null) {
      this.wishlistService.checkWishlist().subscribe(data => {
        if(data != undefined && data != null )
        {
          let object =data.filter(elem => elem.product_id === id)[0]; 
          if(object !== undefined && object !== null)
          {
            this.wishListID = object.wishlist_item_id;
            this.removeItemFromWishList( this.wishListID);
          }
          $('#loadingSearch').hide();
        }
      },(err) => { 
              console.log(err)
              $('#loadingSearch').hide();
          }
      );
   }
}

removeItemFromWishList(id) {
   this.wishlistService.removeWishlistItem(id).subscribe(data => {
     this.wishlistService.checkWishlist().subscribe(data => {       
             $('.wishlist-update').click(); 
             $('#loadingSearch').hide();              
             this.wishNotif = "Product Removed From Wishlist."
             $('#wishModal').modal('show');
             setTimeout(()=>{                
                $('#wishModal').modal('hide');
                this.wishNotif = "";
            }, 2000);
         }, err => {
         console.error(err)
         $('#loadingSearch').hide();
         }
       );
   });
 };

 prepareWishList(product_id)
{ 
    let availableWishListItems;
    this.globalProductId = "";
    this.globalProductId = product_id;
    if(localStorage.getItem('wishListIds') !== null && localStorage.getItem('wishListIds') !== undefined)
    {
       availableWishListItems = localStorage.getItem('wishListIds').split(',');
    }else
    {
       availableWishListItems = [];
    }
    if(availableWishListItems.includes(product_id))
    {
       this.updateWishList(product_id);
      $('#wishList'+product_id).removeClass('wishListActive');
    }else
    {
       if(localStorage.getItem('customerToken') !== null) {
           $('#wishList'+product_id).addClass('wishListActive');
       }
           this.addToWishlist();     
    }    
}

addToWishlist() {
    $('#loadingSearch').show();
    let self =this;

     if(localStorage.getItem('customerToken') === null) {
         $('.sider-layer').css('display', 'block');
         $('#cart_wrap').addClass('blur');
         $('#header').addClass('blur');
         $('.row').addClass('blur'); 
         $('#mm').click();
         $('#loadingSearch').hide();
     }else
     {
     localStorage['wishListProductIds'] =  this.wishListProductsIds;
       this.wishlistService.addToWishlist(this.globalProductId).subscribe(data => {
         $('#loadingSearch').hide();
         this.wishNotif = "Product Added To Wishlist."
          $('#wishModal').modal('show');
          setTimeout(()=>{
             $('#wishModal').modal('hide');
         }, 2000);

         $('#product-detail-modal').modal('hide');
         

         $('.wishlist-update').click();
  
     }, err => {
         $('#loadingSearch').hide();
        
         this.wishNotif = err;
         $('#wishModal').modal('show');
         setTimeout(()=>{
            $('#wishModal').modal('hide');
        }, 2000);
         $('#product-detail-modal').modal('hide');  
     });
 }
}

changeImg(source) {
    var largeImage = document.getElementById('prod-img-big');
    this.getMeta(source);
  }

selectColor(color) {
  this.selectedColor = color;
  this.colorNotSelected = false;
  $('.label-c').removeClass('selected');
  $('#color-' + color).addClass('selected')

}

updateView()
{
  $('.sizeSelectOption').val('0'); 
}
handleSelectedValueFromDropDownSize(size) {
    let self = this, price =this._Price, special_price, qty, inStock, _size = 0,
    size_id, size_value, sizeValueTobeSent ="", sku ="";
    this.cartMessage = false;
    this.loggerMessage = "" ;
   // ------ flushing global variables -------
   this.productSizeId = "";
   this.productSize = "";
   this.qtyMessage = false;
   this. productQty = 1;
   this.avalaible_qty = 1;
   this._selection_flag = true ;
   this.selectedSize = null ;
   this.addingToCart = false;


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
          this.globalProductId = value.productId;
          sku = value.sku;
      };
 })

 this.productSizeId = parseInt(size_id);
 this.productSize = size_value;
 this._Price = price;

let discount;
if(special_price != undefined && inStock != undefined)
  {   
      if(special_price !== false && special_price != undefined)
          {
              if (price >= special_price) {
                  this._discountFlag = false;
                  this._Price = price;
                  this.lineThrough = false;
              } else
                  if (special_price > price) {
                      this._discountFlag = true;
                      this.individualProductSpecialPrice = special_price;
                      this.lineThrough = true;
                  }
                 
                  let   str: any = this.productDiscountVal ;
                 if(str == "NaN")
                  {
                      this._discountFlag = false;
                      this.productDiscountVal = 0 ;
                      this.lineThrough = false;
                  }         
          }
  }

  this.avalaible_qty = qty;
  this.individualProductSpecialPrice = special_price;
  this._Price = price;
  this.productDiscountVal = Math.trunc((1 - (special_price/price)) * 100);              
  this.productDiscountVal = Math.abs(this.productDiscountVal);

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
              this.productStock = this.tempStock;
              this._selection_flag = false ;
              this.productSku = "";
              this.cartButtonState = true;
                  
          this._Price = this.originalPrice; 
          this.individualProductSpecialPrice = this.originalSpecialPrice;
          this.productDiscountVal =this.originalDisc;
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
}
decreaseQty() {

  this.cartMessage = false;
  this.loggerMessage = "" ;
  if(this.productQty > 0) {
    this.productQty = this.productQty - 1;
  } else { this.productQty = 0; }
 
  if(this.productQty == 0)
  {
      this.cartButtonState = true;
  }else
  if(  this._selection_flag == true || this._colorFlag == 'color_variant' || this._colorFlag === 'simple_product')
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
    this.productQty = this.productQty + 1;
    this.cartMessage = false;
    this.loggerMessage = "" ;
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

goToCheckout() {
  $('#cartModal').modal('hide');
  this.router.navigate(['/cart/checkout']);
}
goToWishlist() {
 // $('#wishModal').modal('hide');
  this.router.navigate(['/wishlist']);
}

check (val)
{
  if (val === 'NO SIZE' || val === 'NO SIZE NEEDED') 
      {
          return true ;
      } else{
          return false ;
      }
}


wishlistAddToCartQuick(name, sku, productSpecialPrice:number, productDescription:any, 
  productId:any,otherImages:any, productImage:string, productPrice:any,
   _sizes: any, _productFlag:string, _color_Object:any, avalaibility:string, 
   _size_object: any, _color_object: any, qty:any)
{
  $('#product-detail-modal .modal-body').addClass('hide');
  this.globalProductId = "";
  this.globalProductId = productId;
  this._colorFlag = "", this.productSku = "";
  this.cartMessage = false;
  this.loggerMessage = "" ;
  this._selection_flag = false;
  this.avalaible_qty = qty ;
  this. productQty = 1;
  this.qtyMessage = false;
  this.addingToCart = false;
  let sizeObject = {}, self = this, index ;
  this.globalTarget.setAttribute('src',"")
  this.productSku = sku;
  this.sizeVal = 0;
  this.mainImage = ""; 
  this.lower_limit_qty = true;
  this.productSizeId = 0;
  this.selectedSize = 0 ;
  this._variantProductImages = [];
  this._colorFlag = _productFlag;
  this._sizeMsg = "", this.default_color_display = "";
  self._globalArrayForSizes = [];
  let bool : boolean, defaultColor = "" ;

    
             this.sizeNotSelected = true ;
          if(this._colorFlag === 'color_size_variant' && _size_object != undefined)
              {
                  self._globalArrayForSizes = _size_object;
              }
      
              if(this._colorFlag === 'color_size_variant' && _color_object != undefined)
                  {
                      this._colorObj = _color_object.colors;
                  
                  }
      
          if(_sizes !== undefined && _sizes.length != 0 && this._colorFlag !== 'color_size_variant')
              {
               self._globalArrayForSizes = _sizes ;
              }
          if(_color_Object !== undefined && this._colorFlag !== 'color_size_variant')
              {
                  this._colorObj = _color_Object;
              }
      
             // ----------- check the flag and extract the color ----
      if(this._colorFlag === 'color_size_variant' || this._colorFlag === 'color_variant')
          {
               $.each( this._colorObj, (key, val) => {
                       if(val.product_id === productId)
                          {
                         
                            self.default_color_display = val.value;
                            self.selectedColor = parseInt(val.value) ;
                            self.productColorId = parseInt(val.id);
                     
                          }
               });
          }
           // ------------ truncate product code -----------------
                  if(this._colorFlag === 'color_size_variant' || 
                  
                    this._colorFlag === 'color_variant' && sku.length > 13)
                  {
                       sku = sku.slice(0, -4);
                  }
          this.product_Name = name ;
          this.individualProductSpecialPrice = productSpecialPrice;
          this._productImage = productImage ;
          this._Price = productPrice ;
          this._product_Sku = sku;
      
          this._selectedColor = this.default_color_display.toString();

          if(this._colorFlag !== 'simple_product')
          {
              this.productStock = true;

          //    if(avalaibility == '1'){
          //        this.productStock = true;
          //      } else {
          //        this.productStock = false;
          //      }  
          }else
            if(this._colorFlag === 'simple_product')
            {
             if(qty !== '0.0000'){
                 this.productStock = true;
               } else {
                 this.productStock = false;
               } 
            }

          this.tempStock = this.productStock;          
        if(this.individualProductSpecialPrice != undefined && this._Price != undefined && this._Price != false)
          {
              if(productSpecialPrice != undefined)
                  {               
                              if (productPrice >= productSpecialPrice) {
                                  this._discountFlag = false;
                                  this._Price = productPrice;
                                  this.lineThrough = false;
                              } else
                                  if (productSpecialPrice > productPrice) {
                                      this._discountFlag = true;
                                      this.individualProductSpecialPrice = productSpecialPrice;
                                      this.lineThrough = true;
                                  }                                
                                  let   str: any = this.productDiscountVal ;
                                 if(str == "NaN")
                                  {
                                      this._discountFlag = false;
                                      this.productDiscountVal = 0 ;
                                      this.lineThrough = false;
                                  }         
                  }   
          }else
          {
              this._discountFlag = false;
              this.productDiscountVal = 0 ;
              this.lineThrough = false;
          }    
          let   str: any = this.productDiscountVal ;
         if(str == "NaN")
          {
              this._discountFlag = false;
              this.productDiscountVal = 0 ;
              this.lineThrough = false;
          }
             
          if(otherImages !== undefined && otherImages != null && otherImages != false)
              {    
                  index = otherImages.indexOf(',');
                  if(index == -1)
                      {
                          let other =[];
                          other.push(otherImages);
                          this._variantProductImages = other; 
                          this.mainImage  = otherImages;
                      }else{
                          this._variantProductImages = otherImages.split(',');
                          this.mainImage  = this._variantProductImages[0];
                      }                  
              }else
              {
                  this._variantProductImages = [];
              }
              if(this._variantProductImages.length == 6)
                  {
                      this._variantProductImages[5] = "";
                  }
          if(productDescription === "&nbsp;" || productDescription === null)
              {
                  this.individualProductDescription = "<p> Details Not Available </p>"; 
              }else
              {
                  this.individualProductDescription = productDescription;
              }
             
              this.temp_other_images =  this._variantProductImages;
              // ---------------- commented out by Amine 07/09 ------------
        


           // -------------------- if simple product then add to cart ----
  if(this._colorFlag === "simple_product" || this._colorFlag === "" || this._colorFlag === "color_variant")
      {
         this.addToCart();
      }else
      {               
                      this.cartButtonState = true;
                      this.getMeta(this.mainImage);          
                      $('#product-detail-modal').modal('show');
                      $('#product-detail-modal .modal-body').removeClass('hide');
                      setTimeout(function() {
                        window.dispatchEvent(new Event('resize'));
                      }, 301);
      }
      this._Price = productPrice;
      this.individualProductSpecialPrice = productSpecialPrice;
    
      this.productDiscountVal = Math.trunc((1 - (productSpecialPrice/productPrice)) * 100);        
      this.productDiscountVal = Math.abs(this.productDiscountVal);

      this.originalPrice=this._Price; 
      this.originalSpecialPrice =  this.individualProductSpecialPrice;
      this.originalDisc = this.productDiscountVal;
     
} // ---------------- end of quick add to cart ---------------



wishlistAddToCart(name, sku, productSpecialPrice:number, productDescription:any, 
  productId:any,otherImages:any, productImage:string, productPrice:any,
   _sizes: any, _productFlag:string, _color_Object:any, 
   avalaibility:string, _size_object: any, _color_object: any, qty: any)
 {
  $('#product-detail-modal .modal-body').addClass('hide');
  this.globalProductId = "";
  this.globalProductId = productId;
  this._colorFlag = "", this.productSku = "";
  this.cartMessage = false;
  this.loggerMessage = "" ;
  this.globalTarget.setAttribute('src',"")
  this.cartButtonState = false ;
  this.avalaible_qty = qty;
  this. productQty = 1;
  this.qtyMessage = false;
  this._selection_flag = false
  this.sizeNotSelected = false ;
  let sizeObject = {}, self = this, index ;
  this.sizeVal = 0;
  this.mainImage = ""; 
  this.lower_limit_qty = true;
  this.productSku = sku;
  this.productSizeId = 0;
 this.selectedSize = 0 ;
  this._variantProductImages = [];
  this._colorFlag = _productFlag;
  this._sizeMsg = "", this.default_color_display = "";
  self._globalArrayForSizes = [];
  let bool : boolean, defaultColor = "" ;
  
  if(this._colorFlag === 'color_size_variant' && _size_object != undefined)
      {
          self._globalArrayForSizes = _size_object;
      } 
          if(this._colorFlag === 'color_size_variant' || 
              this._colorFlag === 'color_variant' && sku.length > 13)
          {
               sku = sku.slice(0, -4);
          }
      if(this._colorFlag === 'color_size_variant' && _color_object != undefined)
          {
              this._colorObj = _color_object.colors;
          
          }

  if(_sizes !== undefined && _sizes.length != 0 && this._colorFlag !== 'color_size_variant')
      {
       self._globalArrayForSizes = _sizes ;
      }
  if(_color_Object !== undefined && this._colorFlag !== 'color_size_variant')
      {
          this._colorObj = _color_Object;
      }

      // ----------- check the flag and extract the color ----
      if(this._colorFlag === 'color_size_variant' || this._colorFlag === 'color_variant')
          {
               $.each( this._colorObj, (key, val) => {
                       if(val.product_id === productId)
                          {
                         
                            self.default_color_display = val.value;
                            self.selectedColor = parseInt(val.value) ;
                            self.productColorId = parseInt(val.id);
                     
                          }
               });            
               this._selectedColor = this.default_color_display.toString();
          }
  this.product_Name = name ;
  this.individualProductSpecialPrice = productSpecialPrice;
  this._productImage = productImage ;
  this._Price = productPrice ;
  this._product_Sku = sku;
 
   if(this._colorFlag !== 'simple_product')
   {
      this.productStock = true;
   }else
     if(this._colorFlag === 'simple_product')
     {
      if(qty !== '0.0000'){
          this.productStock = true;
        } else {
          this.productStock = false;
        } 
     }
    
  this.tempStock = this.productStock;
if(this.individualProductSpecialPrice != undefined && this._Price != undefined && this._Price != false)
  {
      if(productSpecialPrice != undefined)
          {               
                      if (productPrice >= productSpecialPrice) {
                          this._discountFlag = false;
                          this._Price = productPrice;
                          this.lineThrough = false;
                      } else
                          if (productSpecialPrice > productPrice) {
                              this._discountFlag = true;
                              this.individualProductSpecialPrice = productSpecialPrice;
                              this.lineThrough = true;
                          }
                         
                          let   str: any = this.productDiscountVal ;
                         if(str == "NaN")
                          {
                              this._discountFlag = false;
                              this.productDiscountVal = 0 ;
                              this.lineThrough = false;
                          }         
          }   
  }else
  {
      this._discountFlag = false;
      this.productDiscountVal = 0 ;
      this.lineThrough = false;
  }  
 
  let   str: any = this.productDiscountVal ;
 if(str == "NaN")
  {
      this._discountFlag = false;
      this.productDiscountVal = 0 ;
      this.lineThrough = false;
  }
   
  if(otherImages !== undefined && otherImages != null && otherImages != false)
      {    
          index = otherImages.indexOf(',');
          if(index == -1)
              {
                  let other =[];
                  other.push(otherImages);
                  this._variantProductImages = other; 
                  this.mainImage  = otherImages;
              }else{
                  this._variantProductImages = otherImages.split(',');
                  this.mainImage  = this._variantProductImages[0];
              }
         
      }else
      {
          this._variantProductImages = [];
      }
     
  if(productDescription === "&nbsp;" || productDescription === null)
      {
          this.individualProductDescription = "<p> Details Not Available </p>"; 
      }else
      {
          this.individualProductDescription = productDescription;
      } 
       this.temp_other_images =  this._variantProductImages;

       this._Price = productPrice;
       this.individualProductSpecialPrice = productSpecialPrice;
     
       this.productDiscountVal = Math.trunc((1 - (productSpecialPrice/productPrice)) * 100);        
       this.productDiscountVal = Math.abs(this.productDiscountVal);
       
       this.originalPrice=this._Price; 
       this.originalSpecialPrice =  this.individualProductSpecialPrice;
       this.originalDisc = this.productDiscountVal;
      // ---------------- commented out by Amine 07/09 ------------
 
    this.getMeta(this.mainImage);
 // -------------------------
  $('#product-detail-modal').modal('show');
  $('#product-detail-modal .modal-body').removeClass('hide');
  setTimeout(function() {
    window.dispatchEvent(new Event('resize'));
  }, 301);
  
} // end wishlist add to cart

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
    
addToCart() {
    if( this._selection_flag == false)
    {
        this.sizeNotSelected = true ;
        this.addingToCart = false;
    }else
    {
        this.addingToCart = true;
    }
    this.cartMessage = false;
    this.loggerMessage = "" ;

    if(this._colorFlag === 'simple_product' || this._colorFlag === 'color_variant')
        {
            this.sizeNotSelected = false ;
            this.addingToCart = true;
        }
if(!this.sizeNotSelected)
{
    $('#loadingSearch').show();
if(localStorage.getItem('customerToken') === null) {
   
  if(localStorage.getItem('shopGuestCartId') === null) {
      this.addProductCartService.getCartGuestId().subscribe(data => {
        localStorage.setItem('shopGuestCartId', data);
       $('#loadingSearch').hide();

        // if simple product
        if( this._colorFlag !== undefined && this._colorFlag === 'simple_product') {
            let productAttr = { 
              "cartItem" : 
                {
                  "sku" : this.productSku,
                  "qty" : this.productQty,
                  "quoteId" : localStorage.getItem('shopGuestCartId') 
                }
            };

            // ------- Check for quantity -----------------
            this.categoryListProductService.supplierQuantityUpdate(this.globalProductId).subscribe(payload =>  
                {
                    //this.generalAvailableQty  
                    $('#loading').hide();                          
                     if(payload.data !== undefined && payload.data !== null)
                     {
                         if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                         {

                            if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                            {
                                                       this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                                       this.addingToCart = false;
                                                       this.cartMessage = false;
                                                       this.loggerMessage = "" ;
                                                 $('#loadingSearch').hide();
                                                 $('.minicart-update').click();
                                                 $('#cartModal').modal('show');
                                                  this.cartNotif = "Product Added To Cart."
                                                  setTimeout(function() {
                                                   $('#cartModal').modal('hide');
                                                   this.cartNotif = ""
                                                  }, (2000));
                                                 $('#product-detail-modal').modal('hide');
                                            
                                               
                                               }, (err) => {
                                                   $('#loadingSearch').hide();
                                                   this.cartMessage = true;
                                                   this.loggerMessage = err ;
                                                   this.addingToCart = false;
                                                   this.wishListResponse = err;
                                                   this.addedToWishList =true ;
                               
                                                   $('#cartModal').modal('show');
                                                   this.cartNotif = err;
                                                   setTimeout(function() {
                                                    $('#cartModal').modal('hide');
                                                    this.cartNotif = ""
                                                   }, (2000));
                                               
                                               });
                            }else
                            {
                                this.notifyUserAboutQty(this.product_Name, Math.trunc(parseInt(payload.data[0].quantity)));
                            } 
                         }else{
                            this.notifyUserOutOfStock();
                         }
                         
                         }else
                        {
                            this.showAddToCartError(this.product_Name);
                        }  
        }, errr => {
            $('#loading').hide();
            console.error(errr);
        });
        // if configurable product    
      } else if(this._colorFlag !== undefined  && 
        this._colorFlag === 'color_variant' || this._colorFlag === "size_variant"
         || this._colorFlag === "color_size_variant") {
        
        // check if attributes are selected 
        if( this._colorFlag === 'color_variant')
            {
                
                if(this.selectedColor === null || this.selectedColor == 0) {
                  $('#loadingSearch').hide();
                  this.colorNotSelected = true;
                  return ;
                }
            }else
            if( this._colorFlag === 'size_variant')
                {
                    if(this.selectedSize == null || this.selectedSize == 0) {
                      $('#loadingSearch').hide();
                      this.sizeNotSelected = true;
                      return ;
                    }
                }else
                  {
                      // --------------- if color and size variant -----------
                    if(this.selectedColor == null || this.selectedColor == 0) {                             
                        this.colorNotSelected = true;
                        $('#loadingSearch').hide();
                        return ;
                      }
                    if(this.selectedSize == null || this.selectedSize == 0) {                              
                        this.sizeNotSelected = true;
                        $('#loadingSearch').hide();
                        return ;
                  }  
                  
              }
              if(!this.sizeNotSelected || this.colorNotSelected)
                {
                    let productAttr = {
                        "cartItem": {
                            "quoteId": localStorage.getItem('shopGuestCartId'),
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
                   
                      // --------- check for qty --------------
                      this.categoryListProductService.supplierQuantityUpdate(this.globalProductId).subscribe(payload =>  
                        {
                            //this.generalAvailableQty 
                            $('#loading').hide();
                            if(payload.data !== undefined && payload.data !== null)
                            {
                                if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                                {

                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    {                             
                            this.addProductCartService.addItemToCart(productAttr).subscribe(data => {         
                            this.addingToCart = false;
                            this.cartMessage = false;
                            this.loggerMessage = "" ;
                            $('#loadingSearch').hide();
                            $('.minicart-update').click();
    
                            $('#cartModal').modal('show');
                            this.cartNotif = "Product Added To Cart."
                            setTimeout(function() {
                             $('#cartModal').modal('hide');
                             this.cartNotif = ""
                            }, (2000));
    
                            $('#product-detail-modal').modal('hide');
                          },
                           (err) => {
                            $('#loadingSearch').hide();
                            this.cartMessage = true;
                            this.loggerMessage = err ;
                            this.addingToCart = false;
                            this.addedToCart =false;
    
                            $('#cartModal').modal('show');
                            this.cartNotif = err;
                            setTimeout(function() {
                             $('#cartModal').modal('hide');
                             this.cartNotif = ""
                            }, (2000));}); 
                                }else
                                {
                                    this.notifyUserAboutQty(this.product_Name, Math.trunc(parseInt(payload.data[0].quantity)));
                                } 
                                }else
                                {
                                    this.notifyUserOutOfStock();
                                }                            
                    }else
                      {
                       this.showAddToCartError(this.product_Name);
                       }  
                      }, err => { 
                        $('#loading').hide();  
                        console.error(err)});
                    }
             }

       // end configurable product add
      });
  // if cart id exists  
  } else {
    // if simple product
    if(this._colorFlag !== undefined  && this._colorFlag === 'simple_product') {
     
        let productAttr = { 
          "cartItem" : 
            {
              "sku" : this.productSku,
              "qty" : this.productQty,
              "quoteId" : localStorage.getItem('shopGuestCartId') 
            }
        };

        // ------------ check for qty -------------
        this.categoryListProductService.supplierQuantityUpdate(this.globalProductId).subscribe(payload =>  
            {
                //this.generalAvailableQty 
                $('#loading').hide();
                if(payload.data !== undefined && payload.data !== null)
                {
                    if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                    {

                        if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                        { 
                            this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                $('#loadingSearch').hide();
                                this.addingToCart = false;
                                this.cartMessage = false;
                                this.loggerMessage = "" ;
                               
                                $('.minicart-update').click();
                  
                                $('#cartModal').modal('show');
                                this.cartNotif = "Product Added To Cart."
                                setTimeout(function() {
                                 $('#cartModal').modal('hide');
                                 this.cartNotif = ""
                                }, (2000));
                  
                                $('#product-detail-modal').modal('hide');
                              }, (err) =>
                          {
                              this.addingToCart = false;
                              this.cartMessage = true;
                              this.loggerMessage = err ;
                              this.addedToCart =false;
                             $('#cartModal').modal('show');
                                              this.cartNotif = err;
                                              setTimeout(function() {
                                               $('#cartModal').modal('hide');
                                               this.cartNotif = ""
                                              }, (2000));
                          });
    
                         }else
                         {
                             this.notifyUserAboutQty(this.product_Name, Math.trunc(parseInt(payload.data[0].quantity)));
                         } 
                        }else
                        {
                            this.notifyUserOutOfStock();
                        }                 
                     }else
                    {
                      this.showAddToCartError(this.product_Name);
                    }  
  }, err => {
    $('#loading').hide();  
    console.error(err)});

    // if configurable product    
    } else if(this._colorFlag !== undefined  && 
        this._colorFlag === 'color_variant' || this._colorFlag === "size_variant" ||
         this._colorFlag === "color_size_variant") {
         
        // check if attributes are selected
        if( this._colorFlag === 'color_variant')
            {                  
                if(this.selectedColor === null || this.selectedColor == 0) {
           
                  $('#loadingSearch').hide();
                  this.colorNotSelected = true;
                  
                }
            }else
            if( this._colorFlag === 'size_variant')
                {
  
                    if(this.selectedSize == null || this.selectedSize == 0 ) {
                  
                      $('#loadingSearch').hide();
                      this.sizeNotSelected = true;
                      return ;
                    }
                }else
                  {
                      // --------------- if color and size variant -----------
                    if(this.selectedColor == null || this.selectedColor == 0) {                             
                        this.colorNotSelected = true;
                        $('#loadingSearch').hide();
                        return ;
                      }
                    if(this.selectedSize == null  || this.selectedSize == 0) {                              
                        this.sizeNotSelected = true;
                        $('#loadingSearch').hide();
                        return ;
                  }  
                  
              }

          if( !this.colorNotSelected || !this.sizeNotSelected )
            {
                let productAttr = {
                    "cartItem": {
                        "quoteId": localStorage.getItem('shopGuestCartId'),
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
                 
                  this.categoryListProductService.supplierQuantityUpdate(this.globalProductId).subscribe(payload =>  
                    {
                        $('#loading').hide();
                        if(payload.data !== undefined && payload.data !== null)
                        {
                            if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                            {

                                if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                { 
                                    this.addProductCartService.addItemToCart(productAttr).subscribe(data => {                
                                        $('#loadingSearch').hide();
                                        this.addingToCart = false;
                                        this.cartMessage = false;
                                        this.loggerMessage = "" ;
                                       
                                        $('#cartModal').modal('show');
                                        this.cartNotif = "Product Added To Cart."
                                        setTimeout(function() {
                                         $('#cartModal').modal('hide');
                                         this.cartNotif = ""
                                        }, (2000));
                
                                        $('.minicart-update').click();
                                        $('#product-detail-modal').modal('hide');
                                       // $('.hide').click();
                                      
                                      }, (err) => {
                                        $('#loadingSearch').hide();
                                        this.cartMessage = true;
                                        this.loggerMessage = err ;
                                        this.addingToCart = false;
                                        this.addedToCart =false;
                                        this.wishListResponse = err;
                                        this.addedToWishList =true ;
                
                                         $('#cartModal').modal('show');
                                        this.cartNotif = err;
                                        setTimeout(function() {
                                         $('#cartModal').modal('hide');
                                         this.cartNotif = ""
                                        }, (2000));                  
                                    });
                                 }else
                                 {
                                     this.notifyUserAboutQty(this.product_Name, Math.trunc(parseInt(payload.data[0].quantity)));
                                 } 
                            }else
                            {
                                this.notifyUserOutOfStock();
                            }
                           
                            }else
                            {
                              this.showAddToCartError(this.product_Name);
                            }  
            }, err => {
                $('#loading').hide();
                console.error(err)
                 });   
              };
            }
           
     // end configurable product add  
  } // end if cart id exists



// check if customer user  
} else if(localStorage.getItem('customerToken') !== null) {
   
    if(localStorage.getItem('shopCartId') === null) {
      
       this.addProductCartService.getCartId().subscribe(data => {
  
         $('#loadingSearch').hide();
        localStorage.setItem('shopCartId', data);
      }, err => {
   
              this.cartMessage = true ;
              this.loggerMessage = err;
            
              $('#loadingSearch').hide();
      }, () => {
        // if simple product
      
        if(this._colorFlag !== undefined  || this._colorFlag === 'simple_product') {

            let productAttr = { 
              "cartItem" : 
                {
                  "quote_id": localStorage.getItem('shopCartId'),
                  "sku" : this.productSku,
                  "qty" : this.productQty,
                 // "quoteId" : localStorage.getItem('shopGuestCartId') 
                }
            };
       
            this.categoryListProductService.supplierQuantityUpdate(this.globalProductId).subscribe(payload =>  
                {
                    $('#loading').hide();
                    if(payload.data !== undefined && payload.data !== null)
                    {
                        if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                        {

                            if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                            { 
                                this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {                                   
                                         $('#loadingSearch').hide();
                                         this.addingToCart = false;
                                         this.cartMessage = false;
                                         this.loggerMessage = "" ;
                                        
                                         $('.minicart-update').click();
                       
                                         $('#cartModal').modal('show');
                                         this.cartNotif = "Product Added To Cart."
                                         setTimeout(function() {
                                          $('#cartModal').modal('hide');
                                          this.cartNotif = ""
                                         }, (2000));
                       
                                         $('#product-detail-modal').modal('hide');
                                       //  $('.hide').click();
                                     
                                       }, (err) => {
                                           this.cartMessage = true;
                                           this.loggerMessage = err ;
                                           this.addingToCart = false;
                                           this.addedToCart =false;
                                           this.wishListResponse = err;
                                           this.addedToWishList =true ;
                       
                                            $('#cartModal').modal('show');
                                               this.cartNotif = err;
                                               setTimeout(function() {
                                                $('#cartModal').modal('hide');
                                                this.cartNotif = ""
                                               }, (2000));
                                           $('#loadingSearch').hide();
                                       });
                             }else
                             {
                                 this.notifyUserAboutQty(this.product_Name, Math.trunc(parseInt(payload.data[0].quantity)));
                             } 
                        }else
                        {
                            this.notifyUserOutOfStock();
                        }                     
                        }else
                         {
                           this.showAddToCartError(this.product_Name);
                         }  
        }, err => {
            $('#loading').hide();
            console.error(err)});
        // if configurable product    
      } else if(this._colorFlag !== undefined  && 
        this._colorFlag === 'color_variant' || this._colorFlag === "size_variant" ||
         this._colorFlag === "color_size_variant") {
        
        // check if attributes are selected
        if( this._colorFlag === 'color_variant')
            {
                
                if(this.selectedColor === null ) {
                
                  $('#loadingSearch').hide();
                  this.colorNotSelected = true;
                  return ;
                }
            }else
            if( this._colorFlag === 'size_variant')
                {
            
                    if(this.selectedSize == null ) {
                
                      $('#loadingSearch').hide();
                      this.sizeNotSelected = true;
                      return ;
                    }
                }else
                  {
                      // --------------- if color and size variant -----------
                    if(this.selectedColor == null ) {                             
                        this.colorNotSelected = true;
                        $('#loadingSearch').hide();
                        return ;
                      }
                    if(this.selectedSize == null ) {                              
                        this.sizeNotSelected = true;
                        $('#loadingSearch').hide();
                        return ;
                  }  
                  
              }
              
                $('#loadingSearch').show();
                if(!this.sizeNotSelected || !this.colorNotSelected)
                    {
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
                      
                          // ------- checking for qty --------
                          this.categoryListProductService.supplierQuantityUpdate(this.globalProductId).subscribe(payload =>  
                            {
                                $('#loading').hide();
                                if(payload.data !== undefined && payload.data !== null)
                                {
                                    if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                                    {
                                        if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                        { 
                                            this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {                          
                                                this.addingToCart = false;
                                                this.cartMessage = false;
                                                this.loggerMessage = "" ;
                                                $('#loadingSearch').hide();
                                                $('.minicart-update').click();
                
                                                $('#cartModal').modal('show');
                                                this.cartNotif = "Product Added To Cart."
                                                setTimeout(function() {
                                                 $('#cartModal').modal('hide');
                                                 this.cartNotif = ""
                                                }, (2000));
                
                                                $('#product-detail-modal').modal('hide');
                                               // $('.hide').click();
                                              
                                              }, (err) => {
                                                $('#loadingSearch').hide();
                                                this.cartMessage = true;
                                                this.loggerMessage = err ;
                                                this.addingToCart = false;
                                            
                                                this.addedToCart =false;
                                                this.wishListResponse = err;
                                                 $('#cartModal').modal('show');
                                        this.cartNotif = err;
                                        setTimeout(function() {
                                         $('#cartModal').modal('hide');
                                         this.cartNotif = ""
                                        }, (2000));}); 
                                        }else
                                        {
                                            this.notifyUserAboutQty(this.product_Name, Math.trunc(parseInt(payload.data[0].quantity)));
                                        } 
                                    }else
                                    {
                                        this.notifyUserOutOfStock();
                                    }                                 
                                   }else
                                   {
                                     this.showAddToCartError(this.product_Name);
                                   }  
                   
                    }, err => {
                        $('#loading').hide();
                        console.error(err)});   
                        }              
                    // end configurable product add
                    } 
      });
  // if cart id exists  
    } else {
      // if simple product

      $('.lading').show();
      if(this._colorFlag !== undefined  && this._colorFlag === 'simple_product') {
          let productAttr = { 
            "cartItem" : 
              {
                "sku" : this.productSku,
                "qty" : this.productQty,
                "quote_id" : localStorage.getItem('shopCartId') 
              }
          };

          // ------------- checking for qty ---------
          this.categoryListProductService.supplierQuantityUpdate(this.globalProductId).subscribe(payload =>  
            {
                $('#loading').hide();
                if(payload.data !== undefined && payload.data !== null)
                {
                    if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                    {

                        if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                        { 
                            this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {       
                                $('#loadingSearch').hide();
                                this.addingToCart = false;
                                this.cartMessage = false;
                                this.loggerMessage = "" ;
                              
                                $('.minicart-update').click();
                
                                $('#cartModal').modal('show');
                                this.cartNotif = "Product Added To Cart."
                                setTimeout(function() {
                                 $('#cartModal').modal('hide');
                                 this.cartNotif = ""
                                }, (2000));
                
                                $('#product-detail-modal').modal('hide');
                              }, (err) => {
                                $('#loadingSearch').hide();
                                this.cartMessage = true;
                                this.loggerMessage = err ;
                                this.addingToCart = false;
                                this.wishListResponse = err;
                                $('#cartModal').modal('show');
                                this.cartNotif =err;
                                setTimeout(function() {
                                 $('#cartModal').modal('hide');
                                 this.cartNotif = ""
                                }, (2000));
                            });
                          }else
                            {
                                this.notifyUserAboutQty(this.product_Name, Math.trunc(parseInt(payload.data[0].quantity)));
                            } 
                        }else
                        {
                            this.notifyUserOutOfStock();
                        }                 
                      }else
                       {
                         this.showAddToCartError(this.product_Name);
                       }               
    }, err => {
        $('#loading').hide();
        console.error(err)});
      // if configurable product    
      } else if(this._colorFlag !== undefined  && 
        this._colorFlag === 'color_variant' || this._colorFlag === "size_variant" ||
         this._colorFlag === "color_size_variant")
        {
          // check if attributes are selected
    
          // ---------- if color variant -------------
            if( this._colorFlag === 'color_variant')
              {
                  
                  if(this.selectedColor === null ) {
                
                    $('#loadingSearch').hide();
                    this.colorNotSelected = true;
                    return ;
                  }
              }else
              if( this._colorFlag === 'size_variant')
                  {
               
                      if(this.selectedSize == null ) {
                   
                        $('#loadingSearch').hide();
                        this.sizeNotSelected = true;
                        return ;
                      }
                  }else
                    {
                        // --------------- if color and size variant -----------
                      if(this.selectedColor == null ) {                             
                          this.colorNotSelected = true;
                          $('#loadingSearch').hide();
                          return ;
                        }
                      if(this.selectedSize == null ) {                              
                          this.sizeNotSelected = true;
                          $('#loadingSearch').hide();
                          return ;
                    }  
                    
                }

                if(! this.sizeNotSelected || !this.colorNotSelected)
                    {
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
                     
                        // ------------ checking for qty ------------
                        this.categoryListProductService.supplierQuantityUpdate(this.globalProductId).subscribe(payload =>  
                            {
                                $('#loading').hide();
                                if(payload.data !== undefined && payload.data !== null)
                                {
                                    if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                                    {

                                        if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                        { 
                                            this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                                this.addingToCart = false;
                                                this.cartMessage = false;
                                                this.loggerMessage = "" ;
                                                $('#loadingSearch').hide();
                                                $('.minicart-update').click();
                                                $('#product-detail-modal').modal('hide');
                                                $('#cartModal').modal('show');
                                                this.cartNotif = "Product Added To Cart."
                                                setTimeout(function() {
                                                 $('#cartModal').modal('hide');
                                                 this.cartNotif = ""
                                                }, (2000));
                                              //  this.addedToCart =true;
                                              }, (err) => {
                                                  $('#loadingSearch').hide();
                                                  this.addingToCart = false;
                                                  this.cartMessage = true;
                                                  this.loggerMessage = err ;
                                                  this.addedToCart =false;
                                                  this.wishListResponse = err;
                                                  $('#cartModal').modal('show');
                                                  this.cartNotif = err;
                                                  setTimeout(function() {
                                                   $('#cartModal').modal('hide');
                                                   this.cartNotif = ""
                                                  }, (2000));
                                              }); 
                                         }else
                                         {
                                             this.notifyUserAboutQty(this.product_Name, Math.trunc(parseInt(payload.data[0].quantity)));
                                         } 
                                        }else
                                        {
                                            this.notifyUserOutOfStock();
                                        }                                  
                                    }else
                                    {
                                     this.showAddToCartError(this.product_Name);
                                    }  
                         
                    }, err => {  $('#loading').hide();})   
                      };
                      } // end configurable product add 
            }        
};
$('#loadingSearch').show();
}

} // add to cart


// --------------------------filter products--------------------
 applyFilter(event)
 {
  this.productLength = false;
  $('#loadingSearch').show();
  
  this.filterOptions.count = 24 ;
  this.filterOptions.page = 1;

  if(this.fullMatch === "fullMatch")
  {
    this.categoryListProductService.getMatchResult(this.filterOptions).subscribe(data => {
        this.productInfo = [], this.productCount = 0, this.rangeValues =[]; 
        this.totalShownItems = 0;     
        if(data.exchange_rate!= undefined)
            {
                this._exchangeRate = 1;// Number(data.exchange_rate.AED);
              
                this.singleProductDetailsService.setExchangeRate( this._exchangeRate);
            }else
              {
                this._exchangeRate = 1;
              }
              localStorage['exchangeRat'] = 1 ;
      this.prodNumList_2 = [],  
      this.helperArray =[], this.helperObject = {}, this.productID= "", 
      this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [], this.data=[];  
  
        var self =this, length = 0;           
        // --------------- checking if the data contains children
        if( data.result !== "No any record found" && data.result !== "No records found"
           && data.result != undefined && data.result.length != 0 
        &&  data.result != null)
            {
                this.productCount = data.result.length;
                this.totalPageCount = parseInt(data.total_products);
                this.data = data.result ;
                this.productCount = data.result.length;
                this.rangeValues= [ this.minPrice,  this.maxPrice];
              
                 length = this.checkedBrands.length ;
               
                // ----------------- get live quantity update-----           
                Object.keys(data.result).map((key, value) =>
              {    
                // ----------- simple product ---------------
              if(data.result[value].variation_details === undefined)
              {  
                self.groupSku.push(data.result[value].sku);
              }else
                // ----------- if variant size product -----
              if(data.result[value].variation_details.length != 0)
                {
                  if(data.result[value].variation_details.variant_group === "variant_size")
                    {           
                        self.groupSku.push(data.result[value].sku);                      
                           // ------------- loop variant sizes for fetching them ---
                           Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                           {
                              Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                              {
                                  // -- appending sku for children products ----
                                  self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                              });
                           });
                    }else
                    // ---------------- no size and no color variants -----
                        if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                            {       
                                // -------------- sku for simple product ---------
                                self.groupSku.push(data.result[value].sku);          
                            }else  // ---- if variant color and size-------------
                            if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                                {        
                                    self.groupSku.push(data.result[value].sku);                                 
                                    // ------------------  
                                    Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                     {                                                                
                                          $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                                          {                            
                                            self.groupSku.push(value.sku);                                                        
                                          });
                                    });
                                }else
                                // --------------variant color --------------
                                if(data.result[value].variation_details.variant_group === "variant_color")
                               {    
                                    self.groupSku.push(data.result[value].sku);        
                                if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                                 {   
                                    self.groupSku.push(data.result[value].sku);                                   
                                 Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                 {        
                                   Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                   { 
                                     // ------- sku for children ----------
                                     self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                   });                      
                                });   
                            }                           
                      }  
                    } 
                  },
                   (err) => {}
                );
                // ------------------------- sku for all products ends here ---------------
  
                // ---------------------- fetch quantities for all skus------
                if(this.groupSku != undefined && this.groupSku.length != 0)
                {    
                   // $('#loadingSearch').show();
                    this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                        {
                              this.liveSkuResult = payload.results;
                            
                              if(this.liveSkuResult != undefined)
                            {
                                // ------------ updating object -------------
                              Object.keys(self.data).map((key, value) =>{    
                              // ----------- simple product ---------------
                              if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                  // ---------------- getting sku for the parent product ----
                                     $.each(self.liveSkuResult, (key, val) =>      
                                     {
                                        if(val.sku === self.data[value].sku)
                                        {
                                            self.data[value].qty = "";
                                            self.data[value].qty = val.qty;
                                            self.data[value].isInStock ="";
                                            self.data[value].isInStock =val.stock_status;
                                            self.data[value].price = "";
                                            self.data[value].special_price = "";
                                            self.data[value].price = val.normal_price;
                                            self.data[value].special_price = val.sp_price;
                                        }
                                    })                                
                              }else
                                // ----------- if variant size product -----
                              if(self.data[value].variation_details.length != 0)
                                {                                      
                                           // ---------------- getting sku for the parent product ----
                                              $.each(self.liveSkuResult, (key, val) =>               
                                          {
                                              if(val.sku === self.data[value].sku)
                                              {
                                                self.data[value].qty = "";
                                                self.data[value].qty = val.qty;
                                                self.data[value].isInStock ="";
                                                self.data[value].isInStock =val.stock_status;
                                                self.data[value].price = "";
                                                self.data[value].special_price = "";
                                                self.data[value].price = val.normal_price;
                                                self.data[value].special_price = val.sp_price;
                                              }
                                          })                  
                                              
                                           // ------------- loop variant sizes for fetching them ---
                                           Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                           {
                                              Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                              {    
                                                  // -- appending sku for children products ----
                                                  $.each(self.liveSkuResult, (key, val) =>                       
                                                  {
                                                      if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                                                      {
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock ="";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                                                      }
                                                  });
                                              });
                                           });
                                    } 
                                  },
                                   (err) => {//consoe.error('Error fetching Qtys ===>' + err); 
                                });
                                // ----------- performing operations on object ---------
                                Object.keys(self.data).map((key, value)=> {
                                
                                 if(self.data[value].variation_details === undefined)
                                 {                      
                                     if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                                     {
                                        self.data[value].productFlag = "simple_product";
                                        self.productInfoAssistant.push(self.data[value])
                                     }                     
                                 }else
                                   // ----------- if variant size product -----
                                 if(self.data[value].variation_details.length !=0)
                                   {
                                     if(self.data[value].variation_details.variant_group === "variant_size")
                                       {
                                           self.helperArray = [];
                                           let otherArrays = [] ;
                                              // ------------- loop variant sizes for fetching them ---
                                              Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                              {
                                                 Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                 {
                                                     // -- appending price and others --
                                                     if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                     {
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                                                        self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                                                     }
                                                   
                                                 });
                                              });
                                                     if(self.helperArray.length != 0) 
                                                                    {
                                                                     
                                                                        self.productID = self.data[value].product_id;
                                                                        self.helperObject =   {
                                                                                          'product_ID':self.productID,
                                                                                           '_sizes': self.helperArray
                                                                                         };
                                         
                                                                                         self.helperArr.push(self.helperObject);
                                                                                         self.data[value].sizes =self.helperArray;
                                                                                         self.data[value].productFlag = "size_variant";
                                                                     // self.productInfo.push (self.data[value]);
                                                                      self.productInfoAssistant.push(self.data[value])
                                                                    }
                                                                    
                                                 }else
                                       // ---------------- no size and no color variants -----
                                           if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                                               {       
                                                   if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                                                   {
                                                       self.data[value].productFlag = "simple_product";
                                                       //self.productInfo.push(self.data[value])
                                                       self.productInfoAssistant.push(self.data[value])
                                                   }                                                                 
                                               }else  // ---- if variant color and size----------
                                               if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                                                   {
                                                       let colors =[];                 
                                                       self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                                                       // --- get colors -------------
                                                       this.getVariationColor(self.data[value].variation_details.variations);
               
                                                       Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                        {                                                   
                                                              let object = {}, color = "", tempColor = "", sizes = [];                                             
                                                               // ----size
                                                             $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                             {
                                                                 if(value.qty != "0.0000")
                                                                 {
                                                                    color = value.color.label ;
                                                                    value.size.price = value.price;
                                                                    value.size.special_price = value.special_price;
                                                                    value.size.qty = value.qty;
                                                                    value.size.isInStock = value.isInStock;
                                                                    value.size.id =  value.size.id;
                                                                    value.size.sku = value.sku;  
                                                                    value.size.productId = value.product_id;                                                                                                 
                                                                    sizes.push(value.size);
                                                                 }                            
                                                             });
  
                                                             let  color1 = "", tempColor2 = "";
                                                       // tslint:disable-next-line:max-line-length
                                                       Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                                                       {                                                 
                                                                   // tslint:disable-next-line:no-trailing-whitespace
                                                                   // tslint:disable-next-line:max-line-length
                                                                   color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                                                                                   // tslint:disable-next-line:max-line-length
                                                                                   if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                                                                                       // set flag  
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                                                                                       // set size
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                                                                                       // set color 
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                       // set description from parent product 
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                                                                                       // ------------ sync child's price & special price with parent's ---------
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].price = self.data[value].price;
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].special_price = self.data[value].special_price;
                                                                                       self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                   }
                                                               tempColor2 = color1 ;                                                          
                                                          });
                                                          
                                                       });
                                                   }else
                                                   // --------------variant color --------------
                                                   if(self.data[value].variation_details.variant_group === "variant_color")
                                                {
                                             // ----------- if not variant size then loop and show other images --
                                             let colorArr: any = {} ;
                                             self.helperColorArray = [];
                                                 if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                                               {     
                                                   Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                   {        
                                                       let color_flag = "", second_flag = "";
                                                      Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                      { 
                                                        if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                           && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                        )
                                                           {
                                                               colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                               ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                                                               ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                                                               , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                                                               ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                                                               , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                                                               , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                                                               , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                                                               ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                                                               ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                                                               ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                                                              }
                                                              self.helperColorArray.push(colorArr);  
                                                           }                               
                                                         // tslint:disable-next-line:max-line-length
                                                         color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                      }); 
                                                      // tslint:disable-next-line:max-line-length 
                                                      Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                     { 
                                                       if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                        
                                                           &&  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty !== "0.0000")
                                                        {
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;
                                                           self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                                                       }
                                                       second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                                                      });  
                                                   });   
                                               }                                                                
                                         }  
                                       } 
                            
                          });
                         
                         this.productShow = true;                                        
                         this.productLoad = true;
                         let total =  this.totalShownItems + self.productInfoAssistant.length;
                        
                         if(self.productInfoAssistant.length == 0 && this.totalPageCount >24)
                         {
                            this.loadMoreProducts('firstLoad','sortFilter');                                                                                                   
                         }else
                            if(self.productInfoAssistant.length <24 && this.totalPageCount >24)
                           {   
                               if(total< this.totalPageCount && self.productInfoAssistant.length < this.totalPageCount)  
                               {
                                  this.loadMoreProducts('firstLoad','sortFilter'); 
                               }else
                               {
                                  Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                  this.totalShownItems = this.productInfo.length ;
                                  this.productInfoAssistant =[];
                                 $('#loadingSearch').hide();
                               }                                                                                             
                           }else
                             {
                                 Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                 this.totalShownItems = this.productInfo.length ;
                                 this.productInfoAssistant =[];
                              $('#loadingSearch').hide();
                             }   
                             
                             if(this.totalShownItems >= this.totalPageCount) 
                             {
                                 this.productLength = false;
                                 $('#loadingSearch').hide();
                             
                             }else{
                                        if(this.totalShownItems !=0 && this.totalPageCount >24)
                                        {
                                          this.productLength = true;
                                        }else
                                        {
                                        this.productLength = false;
                                        }                                           
                             }                   
                       
                        }
                        }, (err) => {
                            
                            this.productInfoAssistant =[];
                            $('#loadingSearch').hide();
                    
                        
                        })                          
                        }                  
          }else
        {
            this.productShow = false;
            this.productLength = false;
            this.productLoad = true; 
            this.productInfoAssistant =[];
            this.rangeValues= [ this.minPrice,  this.maxPrice];
            $('#loadingSearch').hide();
        }
  
      }, (err)=>{                            
        //consoe.log('oops error occured -->'+err)
        this.productInfoAssistant =[];
       this.productLoad = true;
       $('#loadingSearch').hide();
  });
  }else{

    this.categoryListProductService.getSearchResult(this.filterOptions).subscribe(data => {
        this.productInfo = [], this.productCount = 0, this.rangeValues =[]; 
        this.totalShownItems = 0;     
        if(data.exchange_rate!= undefined)
            {
                this._exchangeRate = 1;// Number(data.exchange_rate.AED);
              
                this.singleProductDetailsService.setExchangeRate( this._exchangeRate);
            }else
              {
                this._exchangeRate = 1;
              }
      this.prodNumList_2 = [],  
      this.helperArray =[], this.helperObject = {}, this.productID= "", 
      this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [], this.data=[];  
  
        var self =this, length = 0;           
        // --------------- checking if the data contains children
        if( data.result !== "No any record found" && data.result !== "No records found" &&
            data.result != undefined && data.result.length != 0 
        &&  data.result != null)
            {
                this.productCount = data.result.length;
                this.totalPageCount = parseInt(data.total_products);
                this.data = data.result ;
                this.productCount = data.result.length;
                this.rangeValues = [this.minPrice, this.maxPrice];
                //this.productBrands = data.filters.brands;         
                 length = this.checkedBrands.length ;
            
                // ----------------- get live quantity update-----           
                Object.keys(data.result).map((key, value) =>
              {    
                // ----------- simple product ---------------
              if(data.result[value].variation_details === undefined)
              {  
                self.groupSku.push(data.result[value].sku);
              }else
                // ----------- if variant size product -----
              if(data.result[value].variation_details.length != 0)
                {
                  if(data.result[value].variation_details.variant_group === "variant_size")
                    {           
                        self.groupSku.push(data.result[value].sku);                      
                           // ------------- loop variant sizes for fetching them ---
                           Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                           {
                              Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                              {
                                  // -- appending sku for children products ----
                                  self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                              });
                           });
                    }else
                    // ---------------- no size and no color variants -----
                        if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                            {       
                                // -------------- sku for simple product ---------
                                self.groupSku.push(data.result[value].sku);          
                            }else  // ---- if variant color and size-------------
                            if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                                {                                         
                                    // ------------------  
                                    self.groupSku.push(data.result[value].sku);
                                    Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                     {                                                                
                                          $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                                          {                            
                                            self.groupSku.push(value.sku);                                                        
                                          });
                                    });
                                }else
                                // --------------variant color --------------
                                if(data.result[value].variation_details.variant_group === "variant_color")
                               {            
                                if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                                 {           
                                    self.groupSku.push(data.result[value].sku);                            
                                 Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                                 {        
                                   Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                   { 
                                     // ------- sku for children ----------
                                     self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                                   });                      
                                });   
                            }                           
                      }  
                    } 
                  },
                   (err) => {
                       ////consoe.error('Error fetching Skus')
                
                }
                );
                // ------------------------- sku for all products ends here ---------------
  
                // ---------------------- fetch quantities for all skus------
                if(this.groupSku != undefined && this.groupSku.length != 0)
                {    
                   // $('#loadingSearch').show();
                    this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                        {
                              this.liveSkuResult = payload.results;
                            
                              if(this.liveSkuResult != undefined)
                            {
                                // ------------ updating object -------------
                              Object.keys(self.data).map((key, value) =>{    
                              // ----------- simple product ---------------
                              if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                  // ---------------- getting sku for the parent product ----
                                     $.each(self.liveSkuResult, (key, val) =>      
                                     {
                                        if(val.sku === self.data[value].sku)
                                        {
                                            self.data[value].qty = "";
                                            self.data[value].qty = val.qty;
                                            self.data[value].isInStock ="";
                                            self.data[value].isInStock =val.stock_status;
                                            self.data[value].price = "";
                                            self.data[value].special_price = "";
                                            self.data[value].price = val.normal_price;
                                            self.data[value].special_price = val.sp_price;
                                        }
                                    })                                
                              }else
                                // ----------- if variant size product -----
                              if(self.data[value].variation_details.length != 0)
                                {                                      
                                           // ---------------- getting sku for the parent product ----
                                              $.each(self.liveSkuResult, (key, val) =>               
                                          {
                                              if(val.sku === self.data[value].sku)
                                              {
                                                self.data[value].qty = "";
                                                self.data[value].qty = val.qty;
                                                self.data[value].isInStock ="";
                                                self.data[value].isInStock =val.stock_status;
                                                self.data[value].price = "";
                                                self.data[value].special_price = "";
                                                self.data[value].price = val.normal_price;
                                                self.data[value].special_price = val.sp_price;
                                              }
                                          })                  
                                              
                                           // ------------- loop variant sizes for fetching them ---
                                           Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                           {
                                              Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                              {    
                                                  // -- appending sku for children products ----
                                                  $.each(self.liveSkuResult, (key, val) =>                       
                                                  {
                                                      if(val.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)
                                                      {
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock ="";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                                                      }
                                                  });
                                              });
                                           });
                                         
                                    } 
                                  },
                                   (err) => {//consoe.error('Error fetching Qtys ===>' + err); 
                                });
                                // ----------- performing operations on object ---------
                                Object.keys(self.data).map((key, value)=> {
                                
                                 if(self.data[value].variation_details === undefined)
                                 {                      
                                     if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                                     {
                                        self.data[value].productFlag = "simple_product";
                                      //  self.productInfo.push(self.data[value])
                                        self.productInfoAssistant.push(self.data[value])
                                     }                     
                                 }else
                                   // ----------- if variant size product -----
                                 if(self.data[value].variation_details.length !=0)
                                   {
                                     if(self.data[value].variation_details.variant_group === "variant_size")
                                       {
                                           self.helperArray = [];
                                           let otherArrays = [] ;
                                              // ------------- loop variant sizes for fetching them ---
                                              Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                              {
                                                 Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                 {
                                                     // -- appending price and others --
                                                     if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                                                     {
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                                                        self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                                                     }
                                                   
                                                 });
                                              });
                                                     if(self.helperArray.length != 0) 
                                                                    {
                                                                     
                                                                        self.productID = self.data[value].product_id;
                                                                        self.helperObject =   {
                                                                                          'product_ID':self.productID,
                                                                                           '_sizes': self.helperArray
                                                                                         };
                                         
                                                                                         self.helperArr.push(self.helperObject);
                                                                                         self.data[value].sizes =self.helperArray;
                                                                                         self.data[value].productFlag = "size_variant";
                                                                     // self.productInfo.push (self.data[value]);
                                                                      self.productInfoAssistant.push(self.data[value])
                                                                    }
                                                                    
                                                 }else
                                       // ---------------- no size and no color variants -----
                                           if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                                               {       
                                                   if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                                                   {
                                                       self.data[value].productFlag = "simple_product";
                                                       //self.productInfo.push(self.data[value])
                                                       self.productInfoAssistant.push(self.data[value])
                                                   }                                                                 
                                               }else  // ---- if variant color and size----------
                                               if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                                                   {
                                                       let colors =[];                 
                                                       self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                                                       // --- get colors -------------
                                                       this.getVariationColor(self.data[value].variation_details.variations);
               
                                                       Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                        {                                                   
                                                              let object = {}, color = "", tempColor = "", sizes = [];                                             
                                                               // ----size
                                                             $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                                                             {
                                                                 if(value.qty != "0.0000")
                                                                 {
                                                                    color = value.color.label ;
                                                                    value.size.price = value.price;
                                                                    value.size.special_price = value.special_price;
                                                                    value.size.qty = value.qty;
                                                                    value.size.isInStock = value.isInStock;
                                                                    value.size.id =  value.size.id;
                                                                    value.size.sku = value.sku;   
                                                                    value.size.productId = value.product_id;                                                                                                
                                                                    sizes.push(value.size);
                                                                 }                            
                                                             });
  
                                                             let  color1 = "", tempColor2 = "";
                                                       // tslint:disable-next-line:max-line-length
                                                       Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                                                       {                                                 
                                                                   // tslint:disable-next-line:no-trailing-whitespace
                                                                   // tslint:disable-next-line:max-line-length
                                                                   color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                                                                                   // tslint:disable-next-line:max-line-length
                                                                                   if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                                                                                       // set flag  
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                                                                                       // set size
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                                                                                       // set color 
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                      // set description from parent product 
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                                                                                       // ------------ sync child's price & special price with parent's ---------
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].price = self.data[value].price;
                                                                                       self.data[value].variation_details.variations[variantKey].variations[variant].special_price = self.data[value].special_price;
                                                                                       self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                   }
                                                               tempColor2 = color1 ;                                                          
                                                          });
                                                          
                                                       });
                                                   }else
                                                   // --------------variant color --------------
                                                   if(self.data[value].variation_details.variant_group === "variant_color")
                                                {
                                             // ----------- if not variant size then loop and show other images --
                                             let colorArr: any = {} ;
                                             self.helperColorArray = [];
                                                 if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                                               {     
                                                   Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                                                   {        
                                                       let color_flag = "", second_flag = "";
                                                      Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                      { 
                                                        if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                           && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"                                                        )
                                                           {
                                                               colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                               ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                                                               ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                                                               , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                                                               ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                                                               , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                                                               , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                                                               , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                                                               ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                                                               ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                                                               ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                                                              }
                                                              self.helperColorArray.push(colorArr);  
                                                           }                               
                                                         // tslint:disable-next-line:max-line-length
                                                         color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                      }); 
                                                      // tslint:disable-next-line:max-line-length 
                                                      Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                     { 
                                                       if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                        
                                                           &&  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty !== "0.0000")
                                                        {
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;
                                                           self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                                                       }
                                                       second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                                                      });  
                                                   });   
                                               }                                                                
                                         }  
                                       } 
                            
                          });
                         
                         this.productShow = true;                                        
                         this.productLoad = true;
                         let total =  this.totalShownItems + self.productInfoAssistant.length;
  
                         if(self.productInfoAssistant.length == 0 && this.totalPageCount >24)
                         {
                            this.loadMoreProducts('firstLoad','sortFilter');                                                                                                   
                         }else
                            if(self.productInfoAssistant.length <24 && this.totalPageCount >24)
                           {   
                               if(total< this.totalPageCount && self.productInfoAssistant.length < this.totalPageCount)  
                               {
                                  this.loadMoreProducts('firstLoad','sortFilter'); 
                               }else
                               {
                                  Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                  this.totalShownItems = this.productInfo.length ;
                                  this.productInfoAssistant =[];
                                 $('#loadingSearch').hide();
                               }                                                                                             
                           }else
                             {
                                 Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                 this.totalShownItems = this.productInfo.length ;
                                 this.productInfoAssistant =[];
                              $('#loadingSearch').hide();
                             }   
                             
                             if(this.totalShownItems >= this.totalPageCount) 
                             {
                                 this.productLength = false;
                                 $('#loadingSearch').hide();
                             
                             }else{
                                        if(this.totalShownItems !=0 && this.totalPageCount >24)
                                        {
                                        this.productLength = true;
                                        }else
                                        {
                                        this.productLength = false;
                                        }                                            
                             }                   
                        }
                        }, (err) => {
                            
                            this.productInfoAssistant =[];
                            $('#loadingSearch').hide();
                            })                          
                        }                  
          }else
        {
            this.productShow = false;
            this.productLength = false;
            this.productLoad = true; 
            this.productInfoAssistant =[];
            this.rangeValues= [ this.minPrice,  this.maxPrice];
            $('#loadingSearch').hide();
        }
  
      }, (err)=>{                            
        //consoe.log('oops error occured -->'+err)
        this.productInfoAssistant =[];
       this.productLoad = true;
       $('#loadingSearch').hide();
  });
  }
 
}

// ------------ notif user about available qtys ---------
notifyUserAboutQty(itemName, qty)
{
    $('#cartModalSearch').modal('show');
    this.cartNotif = "Sorry, We don't have as many ("+ itemName+
    ") as you requested, we have only ("+qty+")in stock";
    setTimeout(function() {
    $('#cartModalSearch').modal('hide');
    this.cartNotif = ""
    }, (4000));
    
    this.addingToCart = false;
    this.cartMessage = false;
    this.loggerMessage = "" ;
    $('#loadingSearch').hide();
}

  // ------------ show erro ----------
  showAddToCartError(itemName)
  {
    $('#cartModalSearch').modal('show');
    this.cartNotif = "Oooops, error occured while adding "+itemName+
    "to cart, please try again .";
    setTimeout(function() {
    $('#cartModalSearch').modal('hide');
    this.cartNotif = ""
    }, (2000)); 

    this.addingToCart = false;
    this.cartMessage = false;
    this.loggerMessage = "" ;
    $('#loadingSearch').hide();
  }

  notifyUserOutOfStock()
  {
        this.productStock = false;
        this.cartButtonState = true;
      $('#cartModalSearch').modal('show');
      this.cartNotif = "Sorry, this product is out of stock.";
      setTimeout(function() {
      $('#cartModalSearch').modal('hide');
      this.cartNotif = ""
      }, (4000));  
      this.addingToCart = false;
      this.cartMessage = false;
      this.loggerMessage = "" ;
      $('#loading').hide();
  }
// ------------- notification ends --------------------
}



