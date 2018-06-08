import {DoCheck, AfterViewChecked, Component, OnInit, OnDestroy,AfterViewInit, HostListener, ChangeDetectionStrategy, Inject, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router,NavigationStart, NavigationEnd } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { CategoryListProductService } from '../services/category-list-product.service';
import { WishlistService } from '../services/wishlist.service';
import { ProductAttributesService } from '../services/product-attributes.service';
import { ProductDetailService } from '../services/product-detail.service';
import { AddProductCartService } from '../services/add-product-cart.service';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import { SingleProductDetailsService } from '../services/single-product-details.service';
import {CookieService} from 'angular2-cookie/core';
import {SlideAbleDirective, BoundingRectClass, IEventSlideAble} from 'ng2-slideable-directive/slideable.directive';
import {Ng2StyledDirective, IStyledConfig, ISkinable} from 'ng2-styled-directive/ng2-styled.directive';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
declare var $:any;
import 'rxjs/add/operator/first';
import { Title }     from '@angular/platform-browser';
@Component({
  selector: 'app-category-list',

  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [    
      NavigationService,
      CategoryListProductService,
      WishlistService,
      ProductAttributesService,
      ProductDetailService,
      AddProductCartService,
      CookieService
      ],
})
export class CategoryListComponent implements OnInit, OnDestroy, AfterViewInit , AfterViewChecked{
  
  
 totalShownItems= 0;
  addedToWishList:boolean = false;
  searchedItem: any;
  selectedItem:any;
  categoryId:any;
  categoryLevel =[];
  productInfo = [];
  navigationLinks = [];
  prodNumList = [];
  subcategories;
  productLength = false;
  productShow;
  productCount;
  productPath;
  productSizes;
  productBrands;
  productColors;
  productPrices;
  filterOptions:any= {};
  productStock;
  showStricked :boolean = false ;
  maxPriceSelected:any = 0;
  minPriceSelected: any = 0;
  minShow:boolean = false;
  maxShow:boolean = false;
  strikedPrice: boolean = false;
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
  originalPrice:any = 0;
  originalSpecialPrice:any = 0;
  originalDisc:any = 0;
  inWishList:boolean = false;
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
inputState: boolean = true;
brandFlag:  boolean = false;
colorsFlag: boolean = false;
priceFlag:  boolean = false;
colorIds:any =[];
rangeValues: number[] = [];
brandFirst:boolean = false;
colorFirst:boolean =false;
priceFirst:boolean = false;
uncheckBrand:boolean = false ;
elementRef: ElementRef;
sizeVal:any = 0;
currentdate = new Date(); 
wishListIdsArray:any = [];
wishListID:any = 0;
wishListProductsIds:any = [];
colorTouched:boolean= false;
dummyColorCheck:any = [];
generalAvailableQty:any = 0;
initialMinPrice: any = 0;
initialMaxPrice: any = 0;
titleName: string = "";
rootPathName:String = "";
totalProductsCounts:any=[];
percentage:any = 5 ;
selectedSubCategoryTag:string ="";
  datetime = "Log Timing ==> : " +this.currentdate.getDate() + "/"
               + (this.currentdate.getMonth()+1)  + "/" 
               + this.currentdate.getFullYear() + " @ "  
               + this.currentdate.getHours() + ":"  
               + this.currentdate.getMinutes() + ":" 
               + this.currentdate.getSeconds();

  constructor(private route: ActivatedRoute,
              private http: Http,
              private router: Router,
              private navigationService: NavigationService,
              private categoryListProductService: CategoryListProductService,
              private wishlistService: WishlistService,
              private productAttributesService: ProductAttributesService,
              private productDetailService: ProductDetailService,
              private addProductCartService: AddProductCartService,
              private singleProductDetailsService: SingleProductDetailsService,
              private location: Location,
              @Inject(ElementRef) elementRef: ElementRef,
              private titleService : Title
              ) { this.elementRef = elementRef;
               
                this.rootPathName =  route.url['value'][0].path;
            }

              @HostListener('document:click', ['$event'])
              clickout(event : MouseEvent) {
                event.stopPropagation();
              }
              preventEvent(event)
              {
                event.stopPropagation();
              }
                  
              hideInfo() {
                  let self =this;
                this.addedToCart =true;
                setTimeout(function(){
                    self.addedToCart =false;
                }, 3000);
              }
              getLastDigit(_number)
              {
                  return _number%10;
              }
              checkState()
              {
                  console.log('state is ready . . .')
                  return true;
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

              // ---------------- after view initi life cycle ---------
              ngAfterViewInit(): void { 
                  
               
                let self = this;
                if(localStorage.getItem('scrollerPosition') != null)
                {                
                    let pagePosition = localStorage.getItem('scrollerPosition');
                    $('html, body').animate({
                        scrollTop: pagePosition,
                        scrollLeft: 300
                        }, 1000);
                }          
                document.addEventListener('scroll', function()
                 {
                   if($('.load-more-button').offset()!== undefined)
                   {
                       let hT = $('.load-more-button').offset().top,
                       hH = $('.load-more-button').outerHeight(),
                       wH = $(window).height(),
                       wS = $(this).scrollTop();
                       if (wS > (hT+hH-wH)){                   
                          //  self.loadMoreProducts('secondLoad');
                  
                       } 
                   }  
                 });  
              
          
          if(localStorage.getItem('scrollerPosition') != null && localStorage.getItem('scrollerPosition') != undefined)
          {
                  window.scrollTo(0, parseInt(localStorage.getItem('scrollerPosition'))|| 0);
          }
                    
     }

     ngAfterViewChecked(): void {
   
        // -------------------
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
handleChange(e)
 {
 
 }  
    applyPriceFilter()
    {
       let min =parseInt($('#min').val()) ;
       let max =parseInt($('#max').val()) ;
       this.maxPriceSelected = max;
       this.minPriceSelected = min;
       this.minShow =true;
       this.filterOptions.count = 24 ;
       this.filterOptions.page = 1;
       this.filterOptions.min_price = min ;
       this.filterOptions.max_price =  max;
       
        if(!this.brandShow && !this.colorShowBool)
        {
            this.priceFirst = true;
        }
      this.applyFilter('e');
    }

    removeMin(x)
    {
        this.minShow =false; 
        this.filterOptions.count = 24 ;
        this.filterOptions.page = 1;
        this.minPriceSelected =0 ;
        this.filterOptions.min_price =null ;
        this.filterOptions.max_price = null;
        this.priceFirst = false;
        $('#min').val(this.rangeValues[1]);
        $('#min').val(this.rangeValues[0]);
        this.applyFilter('e');
    }

  
    getMeta(url){
        let target=document.getElementById('prod-img-big'), self = this;
      //  let div = document.getElementById('divSwapper');
        $('#prod-img-big').css('display', 'none');
        target.setAttribute( 'src', "" );
        $('#divSwapper').removeClass('backGroundImg');
    $('<img src="'+url+'"/>').load(function(){
      
        if(this.width>this.height)
            {
              
                target.style.width = 451+'px';
                target.style.height ='auto';  
                if(self.selectedItem === "sunglasses-and-eyewear")
                {
                  // $('.swapperImage').css('margin-top', '140px');
                }
                   
            }else
            if(this.height>this.width)
                {
                    target.style.width = 'auto';
                    target.style.height =500+'px';
                    //$('.swapperImage').css('margin-top', '0px !important');
                   
                }else
                {
                    target.style.width = 451+'px';
                    target.style.height ='auto';
                   // $('.swapperImage').css('margin-top', '0px !important');
                }    
                
               
                setTimeout(function()
                    {
                        target.setAttribute( 'src', url ); 
                        $('#prod-img-big').css('display', 'block'); 
                        $('#divSwapper').addClass('backGroundImg');
                    }, 1000);
                 });
 }

 updateWishList(id)
 {
     $('#loadingCategory').show();
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
           $('#loadingCategory').hide();
         }
       },(err) => { 
               console.log(err)
               $('#loadingCategory').hide();
           }
       );
    }
 }

 removeItemFromWishList(id) {
    this.wishlistService.removeWishlistItem(id).subscribe(data => {
      this.wishlistService.checkWishlist().subscribe(data => {       
              $('.wishlist-update').click(); 
              $('#loadingCategory').hide();              
              this.wishNotif = "Product Removed From Wishlist."
              $('#wishModal').modal('show');
              setTimeout(()=>{                
                 $('#wishModal').modal('hide');
                 this.wishNotif = "";
             }, 2000);
          }, err => {
          console.error(err)
          $('#loadingCategory').hide();
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
     // ------------------ handle selected value from color dropdown ----------------------
    handleSelectedValueFromDropDown(event)
    {    
        this.productColor  =  "";
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

        // if(this.individualProductSpecialPrice == null || this.individualProductSpecialPrice=== undefined)
        // {
        //     this.individualProductSpecialPrice = 100000000;
        // }
          this.sizeVal = 0;
         this.sizeNotSelected = true;
         this.cartButtonState =  true;
    }
   sizeCheck(param) {
       $('#loadingCategory').show();
       $('.check-size').removeClass('checked-b');
       $('#'+param).addClass('checked-b');
       for(let size of this.productSizes) {
           if(size.label != param) {  size.checked = false; } 
       }   
      let sizeVal =  this.productSizes.filter(opt => opt.checked).map(opt => opt.label); 

      if(sizeVal.length > 0) {
           this.filterOptions['size'] = sizeVal[0];
           this.selectedSize = sizeVal[0];
           this.sizeShow = true;
           this.filterOptions = this.filterOptions;
   
        } else {
            this.sizeShow = false;
        } 

      this.filterProd(this.filterOptions);  
   }

   applyBrandFilter()
   {

     this.filterOptions.count = 24 ;
     this.filterOptions.page = 1;
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

        if(!this.brandShow)
        {
            this.brandFirst = false;
        }    
       this.applyFilter('e') ;
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
        }
        if(!this.colorShowBool && !this.minShow)
        {
            this.brandFirst = true;
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
     
        } else if(priceVal.length > 0 && priceVal == "50-149") {
            delete this.filterOptions['min_price'];
            delete this.filterOptions['max_price'];
            this.filterOptions['price_range'] = priceVal[0];
            this.selectedPrice = priceVal[0];
            this.priceShow = true;
            this.filterOptions = this.filterOptions;
      
        } else if(priceVal.length > 0 && priceVal == "150-199") {
            delete this.filterOptions['min_price'];
            delete this.filterOptions['max_price'];
            this.filterOptions['price_range'] = priceVal[0];
            this.selectedPrice = priceVal[0];
            this.priceShow = true;
            this.filterOptions = this.filterOptions;
        
        } else if(priceVal.length > 0 && priceVal == "200") {
            delete this.filterOptions['min_price'];
            delete this.filterOptions['price_range'];
            this.filterOptions['max_price'] = priceVal[0];
            this.selectedPrice = priceVal[0] + " & MORE";
            this.priceShow = true;
            this.filterOptions = this.filterOptions;
        
        } else { this.priceShow = false; }   

        this.filterProd(this.filterOptions);  
   }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
   }


   removeColor(value, id)
   {
            let self =this, index;  
            this.filterOptions.count = 24 ;
            this.filterOptions.page = 1;
            this.uncheckBrand = false ; 
            this.uncheckColor =true ;   
            $.each(self.dummyColorCheck, function(i){
                if(self.dummyColorCheck[i].id === id) {
                    self.dummyColorCheck.splice(i,1);
                    return false;
                }
            });

         if ((index =  self.colorIds.indexOf(id)) !== -1) 
         {                   
             self.colorIds.splice(index, 1);                      
         }

      if(self.dummyColorCheck.length >0)
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
                self.dummyColorCheck= [];
                this.colorIds = [];
                this.filterOptions.color_id = null;
                this.colorTouched = false;
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
          if(!this.colorShowBool)
          {
            this.colorFirst = false;
          }
         this.applyFilter('e');
   }
   
   applyColorFilter()
   {
    this.checkedColors = this.dummyColorCheck; 
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
     this.dummyColorCheck= [];
     this.filterOptions.color_id =null ;
     this. selectedColorValue = null; 
     this.colorTouched = false;
    }
  
    if(!this.colorShowBool)
    {
        this.colorFirst = false;
    }
    this.applyFilter('e');
   }

   colorCheck(value, id, event)
   {
    let index, self = this, color_id={};
    if(event.target.checked)
     {
         color_id ={
             id: id,
             value: value
             };
         self.dummyColorCheck.push(color_id);  
         self.colorIds.push(id);        
     }else
     {      
        $.each(self.dummyColorCheck, function(i){
             if( self.dummyColorCheck[i].id === id) {
                self.dummyColorCheck.splice(i,1);
                return false;
            }
        });
             if ((index =  self.colorIds.indexOf(id)) !== -1) 
             {                   
                 self.colorIds.splice(index, 1);                      
             }         
     }
            // ------ if color checked first but no brand/price ----
            if(!this.brandShow && !this.minShow)
            {
                this.colorFirst = true;
            }
            this.colorTouched = true;
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
   
   }
   
   removeSize() {
      delete this.filterOptions['size'];
      this.filterOptions = this.filterOptions;
      $('.check-size').removeClass('checked-b');
      this.sizeShow = false;
   

      this.filterProd(this.filterOptions);
   };
   removePrice() {
      delete this.filterOptions['min_price'];
      delete this.filterOptions['price_range'];
      delete this.filterOptions['max_price'];
      this.filterOptions = this.filterOptions;
      $('.check-price').removeClass('checked-b');
      this.priceShow = false;
      this.priceFirst = false;
      this.filterProd(this.filterOptions);
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

            if(!this.brandShow)
            {
                this.brandFirst=  false;
            }
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

        // ----------------- color ---------------
        $('.colorFilter').find(':checkbox').each(function()
        {         
                 $(this).prop('checked',false);           
        }); 
        // ----------------------------------------
        if(this.filterOptions !== undefined)
        {
            this.filterOptions['sort_order'] = null;
            this.filterOptions['sort_criteria'] = null;

            this.filterOptions[''];
            this.filterOptions.brand = null;
            this.filterOptions.min_price =null ;
            this.filterOptions.max_price = null;
            this.filterOptions.color_id = null ;
            this.colorTouched = false;
            $('#min').val(this.rangeValues[1]);
            $('#min').val(this.rangeValues[0]); 
        }       
             // ----- reset filters flags ---
              this.colorFirst = false;
              this.brandFirst= false;
              this.priceFirst = false;
              // -----------------------------  
              this.brandShow = false;
              this.checkedBrands =[];
              this.checkedColors = [];
              this.dummyColorCheck = [];
              this.sortShow =false;
              this.minShow = false;
              this.minPriceSelected = 0 ;
              this.maxPriceSelected = 0;
              this.colorShowBool = false;
              this.colorIds = [];            
              if(time === 'reset')
              {
                this.applyFilter('e');
              }
            
   }
   removeSort() {

    this.filterOptions.count = 0 ; 
    this.filterOptions.page = 0 ;

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

   // get filtered category products
   filterProd(param) {
    
      // $('.loader').show();
       // let numberOfProducts = 8;
        this.categoryListProductService.getFilteredProducts(param).subscribe(data => {
   
            this.productInfo = [];
            // for( var i in data ) {
            //     //this.productInfo[i] = data[i];
            //     this.prodNumList[i] = data[i];
            // }
            // this.productInfo = this.prodNumList.slice(0, this.filterOptions.count);
            if(data.result == "No any record found") {
                this.productShow = false;
                this.productLength = false;
            } else {
                this.productShow = true;
                this.productInfo = data.result;
            }
            

            $('#loadingCategory').hide();
        }, err => {
         
            $('#loadingCategory').hide();
        });    

   };

   filterAttr() {
       
   } // end filterAttr
// get brands

 getBrandById(categoryID)
{
    this.productAttributesService.getProductBrands(categoryID).subscribe(data => {
        if(data != undefined && data.results != undefined )
            {
                this.productBrands = data.results;
            }else
              {
                this.productBrands = [];
              }
   });  

}

getAccount()
{
    let tableData = "";
    for(let j=0; j<5; j++)
        {
            tableData += '<td>'+'innerValue'+j+'</td>';
        }

        return tableData;
}
toggleDiv()
{
    
            if($("#brandToggle").val() == "close")
            {
                $("#brandToggle").val("open");
                $('.userTag').css('display', 'none');
            }
            else
            {
                $("#brandToggle").val("close");
                $('.userTag').css('display', 'block');
            }
     
    
}

collapseParent(parentId)
{
    $('#eventsParent'+parentId).addClass('collapsed');
    $('.subParent'+parentId).removeClass('collapse in');
    $('.subParent'+parentId).addClass('collapse');
}
createTable(){
    
  let row ="";
  // this.mytable = "<table id= basicTable><tbody>";

   for (let i = 0; i < 5; i++)
      {
        row += '<tr>'+this.getAccount()+'</tr>';           
      }

      this.mytable = '<table id=\"basicTable\" ><tbody>'+row+'</tbody><table>';	       
}

injectObejctValues(_productInstance:any)
{
  let productListingInstance = {};
  if(this.titleName === "")
  {
      this.titleName = this.singleProductDetailsService.getTitleName();
  }
  productListingInstance = {
       'productInfo': this.productInfo,
       'page': this.filterOptions.page,
       'brands': this.productBrands,
       'minPrice':this.minPrice,
       'maxPrice':this.maxPrice,
       'totalCount':  this.totalPageCount,
       'colors': this.colorFilterArray,
       'title': this.titleName
  };

  localStorage['scrollerPosition'] = $(window).scrollTop();
  this.singleProductDetailsService.setProductInstance(_productInstance,1);
  this.singleProductDetailsService.setProductListing(productListingInstance);
}

handleProudctName(productName)
{
    if(productName) 
    if(productName.length >28)
    {
        return productName.substring(0,28)+'...';
    }else
    {
        return productName;
    }
}

removeFractionForPrice(sp, price)
{
    let _modifiedPrice= 0, lastDigit;
    // ---- performing operations -------------
    if(sp != false && sp != undefined && sp != null){
      if(price*3.67<sp*3.67){
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
      if(sp*3.67< price*3.67)
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

// --------    if value not set ----------------
getTotalCategoriesTotalProductBackUp(elem)
{
    $('#loadingCategory').show();
    this.navigationService.getCategoriesTotalProduct(elem).subscribe(data => {
    if(data != null && data !== undefined)
      {
           localStorage['categoriesTotalCount']=JSON.stringify(data) ;
           let array = [];
           array = JSON.parse(localStorage.getItem('categoriesTotalCount'));    
           this.totalProductsCounts = array;
          let _object =array.filter( (element) => element.category_id === this.categoryId.toString())[0];
          if(_object !== undefined)
          {
            this.totalPageCount =parseInt(_object.total_products); 
          }else
          {
            this.totalPageCount = 0;
          }
      }
    },err => {
    console.error(err)
   })
}


// -------- if value not set ----------------
getTotalCategoriesTotalProductBackUpSale(elem)
{
    $('#loadingCategory').show();
    this.navigationService.getCategoriesTotalProduct(elem).subscribe(data => {
    if(data != null && data !== undefined)
      {
           localStorage['categoriesSaleTotalCount']=JSON.stringify(data) ;
           let array = [];
           array = JSON.parse(localStorage.getItem('categoriesSaleTotalCount'));  
           this.totalProductsCounts = array;  
          let _object =array.filter( (element) => element.category_id === this.categoryId.toString())[0];
          if(_object !== undefined)
          {
            this.totalPageCount =parseInt(_object.total_products); 
          }else
          {
            this.totalPageCount = 0;
          }
      }
    },err => {
    console.error(err)
   })
}

// -------- shop count -------------
getTotalCategoriesTotalProduct()
{
    $('#loadingCategory').show();
           let array = [];

           if(localStorage.getItem('categoriesTotalCount') !== null && localStorage.getItem('categoriesTotalCount') !== undefined && localStorage.getItem('categoriesTotalCount') !== "")
           {
            array = JSON.parse(localStorage.getItem('categoriesTotalCount')); 
            this.totalProductsCounts = array;
            let _object =array.filter( (element) => element.category_id === this.categoryId.toString())[0];
            if(_object !== undefined)
            {
              this.totalPageCount =parseInt(_object.total_products); 
            }else
            {
              this.totalPageCount = 0;
            }
           }else
           {
              this.getTotalCategoriesTotalProductBackUp('shop');
           }
}

// ----------------- sale count ---------
getTotalCategoriesSaleTotalProduct()
{
    $('#loadingCategory').show();
           let array = [];
           if(localStorage.getItem('categoriesSaleTotalCount') !== "" && localStorage.getItem('categoriesSaleTotalCount') !== null && localStorage.getItem('categoriesSaleTotalCount') !== undefined)
           {
            array = JSON.parse(localStorage.getItem('categoriesSaleTotalCount')); 
            this.totalProductsCounts = array;
            let _object =array.filter( (element) => element.category_id === this.categoryId.toString())[0];
            if(_object !== undefined)
            {
              this.totalPageCount =parseInt(_object.total_products); 
            }else
            {
              this.totalPageCount = 0;
            }
           }else
           {
               this.getTotalCategoriesTotalProductBackUpSale('sale');
           }
}
  ngOnInit() {
    $('#loadingCategory').show();
    this.addedToCart =false;
    this.addedToWishList = false;
    this.addedToWishListSuccess = false;
    this.wishListResponse = "";
    let urlPath="";
    let wishListItem = [];
    this.colorTouched = false;
    // ----- reset filter flags ---
    this.colorFirst = false;
    this.brandFirst= false;
    this.priceFirst = false;
    this.colorShowBool = false;

    this._subscriptions.push(
        // -------save or restore scroll position on route change
        this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
          
          if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
            this.singleProductDetailsService.setProductListing({});
            this._routeScrollPositions[prevRouteEvent.urlAfterRedirects || prevRouteEvent.url] = window.pageYOffset;
          }
          if (currRouteEvent instanceof NavigationEnd) {
              let obj = [];
            this.singleProductDetailsService.setProductListing({});
            localStorage['scrollerPosition'] = null ;
            window.scrollTo(0, this._routeScrollPositions[currRouteEvent.urlAfterRedirects || currRouteEvent.url] || 0);
          }
        })
      );

  // -------------- set scroll to previous position ---
  this.location.subscribe(event => {
    //  ---------back or forward, wait for router navigation end
  
    let routerNavigationEnd = this.router.events.first(event => event instanceof NavigationEnd)
    .subscribe((navigationEndEvent: NavigationEnd) => {
      // ------- url path without parameters
      let urlPath = (navigationEndEvent.urlAfterRedirects || navigationEndEvent.url).split(';',1)[0];
      this.singleProductDetailsService.setProductListing({});
      setTimeout(() => {
        window.scrollTo(0, this._routeScrollPositions[urlPath] || 0);
      }, 0);
    });
});
    $('#tags').text('');
     localStorage['firstLoad'] = true;
    this.globalProductId = "";
    this.globalTarget =document.getElementById('prod-img-big');
    this.loaderImage = "./assets/img/ajax-loader.gif";
     this.defaultDropDownValue = "Select Color";
     this.cleanFilters('reload');
    this.sortOrder = [
  {
        "label": "Price: Low to High",
        "value": "asc"
    },{
        "label": "Price: High to Low",
        "value": "desc"
    }];

    this.productPrices = [
        {
            "label": "49 & less",
            "value": "49"
        },
        {
            "label": "50 - 149",
            "value": "50-149"
        },
        {
            "label": "150 - 199",
            "value": "150-199"
        },
        {
            "label": "200 & more",
            "value": "200"
        }
    ];

    this.selectedAttr = {};
    this.groupSku = [];
    this.liveSkuResult =[];
    this.cleanFilters('reload');

    this._subscriptions.push(
        // save scroll position on route change
      
        this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
          if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
            // url path without parameters
              urlPath = (prevRouteEvent.urlAfterRedirects || prevRouteEvent.url ).split(';',1)[0];
             this._routeScrollPositions[urlPath] = window.pageYOffset;

          }
        })
      );
      // restore scroll position on back or forward

    
       // --------- on route change ----------------
    this.route.params.forEach(params => {
        
        $('#loadingCategory').show();
        if(localStorage.getItem('routeChanged') !== null && localStorage.getItem('routeChanged') !== undefined)
        {
            if(localStorage.getItem('routeChanged') === 'true')
            {
                window.scrollTo(0,0);

                this.singleProductDetailsService.setProductListing({});
            }
        }

        $('.close-sidr').click();
        this.searchedItem = this.route.snapshot.params['category'];
        
    
        // empty breadcrumbs array
        this.categoryLevel = [];
    
        // add elements to breadcrumbs array
        if(this.route.snapshot.params['category'] != undefined) {
            this.categoryLevel.push(this.route.snapshot.params['category'])
        } 
        if(this.route.snapshot.params['subcategory'] != undefined) {
            this.categoryLevel.push(this.route.snapshot.params['subcategory'])
        } 
        if(this.route.snapshot.params['subcategory2'] != undefined) {
            this.categoryLevel.push(this.route.snapshot.params['subcategory2'])
        } 
       this.selectedItem = this.categoryLevel.slice(-1).pop();
     
        //  ----------- first level category ----------------

        var arrayData = [];
        var out = [];
      
        if(localStorage.getItem('menuCategories') !== undefined && localStorage.getItem('menuCategories') !== null && localStorage.getItem('menuCategories') !== '')
        {
            arrayData = JSON.parse(localStorage.getItem('menuCategories'));
            for(var i=0; i<arrayData.length; i++) {
                var outObj = {}
                for(var prop in arrayData[i]) {
                    var val = arrayData[i][prop];
                    if(prop === 'name') {
                        val = val.toLowerCase();  
                    }
                    outObj[prop] = val;
                }
                out.push(outObj);  
            };
            outObj =[]
            out.push(outObj);     
            var elementIndex = out.findIndex(x => x.name== this.excludeSpecialCharacter(this.route.snapshot.params['category']));       
    
           if(typeof this.route.snapshot.params['subcategory'] == 'undefined' && typeof this.route.snapshot.params['subcategory2'] == 'undefined' ) {
                this.categoryId = out[elementIndex]['id'];    
                this.selectedAttr.cat_id = this.categoryId;
                this.productPath = "";
                this.productPath = this.route.snapshot.params['category'].replace(/[^\w\s]/gi," ");      
           } else if(typeof this.route.snapshot.params['subcategory2'] == 'undefined') {
               // ----- second level category
                var arraySubcat = out[elementIndex].children_data;
                var outSubcat = [];
                for(var i=0; i<arraySubcat.length; i++) {
                    var outSubcatObj = {}
                    for(var propSubcat in arraySubcat[i]) {
                        var valSubcat = arraySubcat[i][propSubcat];
                        if(propSubcat === 'name') {
                            valSubcat = valSubcat.toLowerCase();  
                        }
                        outSubcatObj[propSubcat] = valSubcat;
                    }
                    outSubcat.push(outSubcatObj);
                }
    
               var elementIndexSubcat = outSubcat.findIndex(x => x.name==this.excludeSpecialCharacter(this.route.snapshot.params['subcategory']));
                this.categoryId = outSubcat[elementIndexSubcat]['id'];
                this.selectedAttr.cat_id = this.categoryId;
               
                this.productPath = "";
                this.productPath = this.route.snapshot.params['category'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory'].replace(/\s+/g, '-');
    
           } else if(typeof this.route.snapshot.params['subcategory2'] !== 'undefined') {
                  
    
               var arraySubcat = out[elementIndex].children_data;
                var outSubcat = [];
                for(var i=0; i<arraySubcat.length; i++) {
                    var outSubcatObj = {}
                    for(var propSubcat in arraySubcat[i]) {
                        var valSubcat = arraySubcat[i][propSubcat];
                        if(propSubcat === 'name') {
                            valSubcat = valSubcat.toLowerCase();  
                        }
                        outSubcatObj[propSubcat] = valSubcat;
                    }
                    outSubcat.push(outSubcatObj);
                }
               var elementIndexSubcat = outSubcat.findIndex(x => x.name== this.excludeSpecialCharacter(this.route.snapshot.params['subcategory']));
              
               this.productPath = "";
               this.productPath = this.route.snapshot.params['category'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory2'].replace(/\s+/g, '-');
               // ------------Added By Amine -----------
               this.selectedCategoryTag = this.route.snapshot.params['subcategory'].replace(/\s+/g, '-');
               this.selectedCategoryTag =  this.selectedCategoryTag.charAt(0).toUpperCase()+this.selectedCategoryTag.slice(1);

               this.selectedSubCategoryTag = this.route.snapshot.params['subcategory2'].replace(/\s+/g, '-');
               this.selectedSubCategoryTag =  this.selectedSubCategoryTag.charAt(0).toUpperCase()+this.selectedSubCategoryTag.slice(1);
              var arraySubcat2;
              if(outSubcat[elementIndexSubcat] != undefined)
              {
                  arraySubcat2 = outSubcat[elementIndexSubcat].children_data;
              }else
              
              {
                arraySubcat2 =[];
              }
                var outSubcat2 = [];
                for(var i=0; i<arraySubcat2.length; i++) {
                    var outSubcatObj2 = {}
                    for(var propSubcat2 in arraySubcat2[i]) {
                        var valSubcat2 = arraySubcat2[i][propSubcat2];
                        if(propSubcat2 === 'name') {
                            valSubcat2 = valSubcat2.toLowerCase();  
                        }
                        outSubcatObj2[propSubcat2] = valSubcat2;
                    }
                    outSubcat2.push(outSubcatObj2);
                }
                var elementIndexSubcat2 = outSubcat2.findIndex(x => x.name==this.excludeSpecialCharacter(this.route.snapshot.params['subcategory2']));
               
                this.categoryId = outSubcat2[elementIndexSubcat2]['id'];     
                this.selectedAttr.cat_id = this.categoryId;
           };
    
           if (this.rootPathName !== 'sale')
           {
               this.getTotalCategoriesTotalProduct();
           }else
             if(this.rootPathName === 'sale')
             {
                this.getTotalCategoriesSaleTotalProduct();
             }
        }else
        {
            $('#loadingCategory').show();
            this.navigationService.getMenuCategories().subscribe(data => {
                localStorage.setItem('menuCategories', JSON.stringify(data.children_data))
               arrayData = data.children_data;


               for(var i=0; i<arrayData.length; i++) {
                var outObj = {}
                for(var prop in arrayData[i]) {
                    var val = arrayData[i][prop];
                    if(prop === 'name') {
                        val = val.toLowerCase();  
                    }
                    outObj[prop] = val;
                }
                out.push(outObj);  
            };
            outObj =[]
            out.push(outObj);     
            var elementIndex = out.findIndex(x => x.name== this.excludeSpecialCharacter(this.route.snapshot.params['category']));       
      
    
           if(typeof this.route.snapshot.params['subcategory'] == 'undefined' && typeof this.route.snapshot.params['subcategory2'] == 'undefined' ) {
                this.categoryId = out[elementIndex]['id'];    
                this.selectedAttr.cat_id = this.categoryId;
                this.productPath = "";
                this.productPath = this.route.snapshot.params['category'].replace(/[^\w\s]/gi," ");      
           } else if(typeof this.route.snapshot.params['subcategory2'] == 'undefined') {
               // ----- second level category
                var arraySubcat = out[elementIndex].children_data;
                var outSubcat = [];
                for(var i=0; i<arraySubcat.length; i++) {
                    var outSubcatObj = {}
                    for(var propSubcat in arraySubcat[i]) {
                        var valSubcat = arraySubcat[i][propSubcat];
                        if(propSubcat === 'name') {
                            valSubcat = valSubcat.toLowerCase();  
                        }
                        outSubcatObj[propSubcat] = valSubcat;
                    }
                    outSubcat.push(outSubcatObj);
                }
    
               var elementIndexSubcat = outSubcat.findIndex(x => x.name==this.excludeSpecialCharacter(this.route.snapshot.params['subcategory']));
                this.categoryId = outSubcat[elementIndexSubcat]['id'];
                this.selectedAttr.cat_id = this.categoryId;
               
                this.productPath = "";
                this.productPath = this.route.snapshot.params['category'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory'].replace(/\s+/g, '-');
    
           } else if(typeof this.route.snapshot.params['subcategory2'] !== 'undefined') {
                  
    
               var arraySubcat = out[elementIndex].children_data;
                var outSubcat = [];
                for(var i=0; i<arraySubcat.length; i++) {
                    var outSubcatObj = {}
                    for(var propSubcat in arraySubcat[i]) {
                        var valSubcat = arraySubcat[i][propSubcat];
                        if(propSubcat === 'name') {
                            valSubcat = valSubcat.toLowerCase();  
                        }
                        outSubcatObj[propSubcat] = valSubcat;
                    }
                    outSubcat.push(outSubcatObj);
                }
               var elementIndexSubcat = outSubcat.findIndex(x => x.name== this.excludeSpecialCharacter(this.route.snapshot.params['subcategory']));
              
               this.productPath = "";
               this.productPath = this.route.snapshot.params['category'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory2'].replace(/\s+/g, '-');
               // ------------Added By Amine -----------
               this.selectedCategoryTag = this.route.snapshot.params['subcategory'].replace(/\s+/g, '-');
               this.selectedCategoryTag =  this.selectedCategoryTag.charAt(0).toUpperCase()+this.selectedCategoryTag.slice(1);
    
              var arraySubcat2;
              if(outSubcat[elementIndexSubcat] != undefined)
              {
                  arraySubcat2 = outSubcat[elementIndexSubcat].children_data;
              }else
              
              {
                arraySubcat2 =[];
              }
                var outSubcat2 = [];
                for(var i=0; i<arraySubcat2.length; i++) {
                    var outSubcatObj2 = {}
                    for(var propSubcat2 in arraySubcat2[i]) {
                        var valSubcat2 = arraySubcat2[i][propSubcat2];
                        if(propSubcat2 === 'name') {
                            valSubcat2 = valSubcat2.toLowerCase();  
                        }
                        outSubcatObj2[propSubcat2] = valSubcat2;
                    }
                    outSubcat2.push(outSubcatObj2);
                }
                var elementIndexSubcat2 = outSubcat2.findIndex(x => x.name==this.excludeSpecialCharacter(this.route.snapshot.params['subcategory2']));
               
                this.categoryId = outSubcat2[elementIndexSubcat2]['id'];     
                this.selectedAttr.cat_id = this.categoryId;
              };
    
              if (this.rootPathName !== 'sale')
              {
                  this.getTotalCategoriesTotalProduct();
              }else
                if(this.rootPathName === 'sale')
                {
                   this.getTotalCategoriesSaleTotalProduct();
                }
            }); 
        }   
       // -------- get total count for corresponding category -----
      
       if(localStorage.getItem('wishListIds') !== null && localStorage.getItem('wishListIds') !== undefined)
       {
           this.wishListIdsArray = localStorage.getItem('wishListIds').split(',');
       }  
        this.filterOptions = { "cat_id": this.categoryId, "count": 24, "page": 1 };
        let brand = this.singleProductDetailsService.getBrand();
        if(localStorage.getItem('wishListIds') !== null && localStorage.getItem('wishListIds') !== undefined)
        {
            this.wishListIdsArray = localStorage.getItem('wishListIds').split(',');
        } 
       if(brand !== "" && brand != null && brand !== undefined)
        {
          this.checkedBrands = [];
         
            this.brandShow =true ;
            this.checkedBrands.push(brand);
            this.filterOptions = { "cat_id": this.categoryId, "count": 24, "brand":brand, "page":1};
           
             $('.innerFloater').find(':checkbox').each(function()
              {
                 $(this).prop('checked',true); 
              }); 
              
                $('#tags').text('');
                this.singleProductDetailsService.setBrand('');

        }
       
        if(brand == "")
            {
                this.cleanFilters('reload');
            }
        let pageCount = this.singleProductDetailsService.getProductListingPage();
        if(this.singleProductDetailsService.getProductListing().length != 0)
        {
            this.productShow = true;    
            this.productLoad = true; 
            this.totalPageCount = this.singleProductDetailsService.getCount();
            this.maxPrice =this.singleProductDetailsService.getMaxPrice() ;
            this.minPrice =this.singleProductDetailsService.getMinPrice();
            this.rangeValues = [];
            this.productBrands = this.singleProductDetailsService.getBrandsArray();
            this.rangeValues=[this.minPrice,this.maxPrice];
           
            this.productInfo =[];
            this.productInfo = this.singleProductDetailsService.getProductListing();
            this.colorFilterArray = this.singleProductDetailsService.getColorsArray();
            if(this.productInfo.length < this.totalPageCount)
            {
                this.productLength = true;
            }else
            {
                this.productLength = false;
            }
            this.filterOptions.page=this.singleProductDetailsService.getProductListingPage();
            if(this.singleProductDetailsService.getTitleName() !== undefined && this.singleProductDetailsService.getTitleName() !== null)
            {
                this.titleService.setTitle(this.singleProductDetailsService.getTitleName());
            }
                   // ---- if sale route -------
                   if(this.rootPathName === 'sale')
                   {
                       this.filterOptions.sale_flag = 'sale';
                   }else
                   {
                       if(this.filterOptions.hasOwnProperty('sale_flag'))
                       {
                           delete this.filterOptions.sale_flag;
                       }
                   };

            $('#loadingCategory').hide();
        }else
        {
               // ---- if sale route ---------------
               if(this.rootPathName === 'sale')
               {
                   this.filterOptions.sale_flag = 'sale';
               }else
               {
                   if(this.filterOptions.hasOwnProperty('sale_flag'))
                   {
                       delete this.filterOptions.sale_flag;
                   }
               };
               // ----------------------ends ---------
               console.log('inside')
        this.data = [],this.productInfo = [], this.productLength =false, this.productInfoAssistant = [];
        this.categoryListProductService.getCategoryProductList(this.filterOptions).subscribe(data => {
            this.productInfo = [], this.productCount = 0;  
            console.log('result', data)     
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
          this.helperArr = [], this.groupSku = [],  this.liveSkuResult = [],
          this.data=[], this.productBrands = [], this.colorFilterArray,this.totalShownItems = 0;
          let val;
            var self =this;      
           
            // --------------- checking if the data contains children
            if(data)
                {
                    this.productCount = data.length;
                    this.data = data ;
                    if(data.categoryMeta !== undefined && data.categoryMeta !== null)
                    {
                        // ----------- dynamically setting the html title -----

                        if(data.categoryMeta[0] !== undefined && data.categoryMeta[0] !== null && data.categoryMeta[0] !== "")                        
                        {
                            this.titleName = data.categoryMeta[0].meta_title;
                            this.titleService.setTitle(data.categoryMeta[0].meta_title);
                        }
                        
                    }
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
                    this.maxPrice = Math.trunc(data.maxPrice);
                    this.minPrice = Math.trunc(data.minPrice); 
                    this.initialMinPrice =  this.minPrice;
                    this.initialMaxPrice =  this.maxPrice;
                    this.rangeValues= [this.minPrice, this.maxPrice];
                    this.percentage = 5;
                    this.productShow = true ;
                    this.productLoad = true;
                    data.map(( _value, index )=> {
                        console.log(_value);
                        this.productInfo.push(_value);
                        $('#loadingCategory').hide();
                    })
                    // --------- color filters array -----
                  //  this.colorFilterArray = data.filters.colors;                               
                    // ----------------- get live quantity update-----           
                //     Object.keys(data.result).map((key, value) =>
                //   {    
                //     // ----------- simple product ---------------
                //   if(data.result[value].variation_details === undefined)
                //   {  
                //     self.groupSku.push(data.result[value].sku);
                //   }else
                //     // ----------- if variant size product -----
                //   if(data.result[value].variation_details.length != 0)
                //     {
                //       if(data.result[value].variation_details.variant_group === "variant_size")
                //         {        
                //                // ------------- loop variant sizes for fetching them ---
                //                self.groupSku.push(data.result[value].sku);
                //                Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                //                {
                //                   Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                //                   {
                //                       // -- appending sku for children products ----
                //                       self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                //                   });
                //                });
                //         }else
                //         // ---------------- no size and no color variants -----
                //             if(data.result[value].variation_details.variant_group === "" || data.result[value].variation_details.variant_group === null)
                //                 {       
                //                     // -------------- sku for simple product ---------
                //                     self.groupSku.push(data.result[value].sku);          
                //                 }else  // ---- if variant color and size-------------
                //                 if(data.result[value].variation_details.variant_group === "variant_size,variant_color")
                //                     {                                             
                //                         // ------------------  
                //                         self.groupSku.push(data.result[value].sku); 
                //                         Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                //                          {                                                                
                //                               $.each(data.result[value].variation_details.variations[variantKey].variations, (key, value) => 
                //                               {                            
                //                                 self.groupSku.push(value.sku);                                                        
                //                               });
                //                         });
                //                     }else
                //                     // --------------variant color --------------
                //                     if(data.result[value].variation_details.variant_group === "variant_color")
                //                    {     
                //                     self.groupSku.push(data.result[value].sku);        
                //                     if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                //                      {                                          
                //                      Object.keys(data.result[value].variation_details.variations).map((variantKey, variantValue) =>
                //                      {        
                //                        Object.keys(data.result[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                //                        { 
                //                          // ------- sku for children ----------
                //                          self.groupSku.push(data.result[value].variation_details.variations[variantKey].variations[otherKey].sku);
                //                        });                      
                //                     });   
                //                 }                           
                //           }  
                //         } 
                //       },
                //        (err) => {console.error('Error fetching Skus')}
                //     );
                    // ------------------------- sku for all products ends here ---------------
                   // $('#loadingCategory').show();
                    // ---------------------- fetch quantities for all skus------
                    // if(this.groupSku != undefined && this.groupSku.length != 0)
                    // {    
                        // this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                        //     {
                        //           this.liveSkuResult = payload.results;
                                
                        //           if(this.liveSkuResult != undefined)
                        //         {
                        //             // ------------ updating main response object -------------
                        //           Object.keys(self.data).map((key, value) =>{    
                        //           // ----------- simple product ---------------
                        //           if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                        //               // ------ updating stuffs for simple products ----
                        //               val = self.liveSkuResult.filter((obj) => obj.sku === self.data[value].sku)[0];
                                        
                        //                     if(val !== undefined && val !== null)
                        //                     {                                           
                        //                         // ------ updating qty, isInstock, price and special price from qty update --
                        //                         self.data[value].qty = "";
                        //                         self.data[value].qty = val.qty;
                        //                         self.data[value].isInStock  = "";
                        //                         self.data[value].isInStock = val.stock_status;
                        //                         self.data[value].price = "";
                        //                         self.data[value].special_price = "";
                        //                         self.data[value].price = val.normal_price;
                        //                         self.data[value].special_price = val.sp_price;
                        //                     }
                        //           }else
                        //             // ----------- if variant size product -----
                        //           if(self.data[value].variation_details.length != 0)
                        //             {             
                        //                       // ----- update parent product for configurable ones -----
                        //                          val = self.liveSkuResult.filter((obj) => obj.sku === self.data[value].sku)[0];                                             
                        //                           if(val !== undefined && val !== null)
                        //                           {                                         
                        //                               // ------ updating qty, isInstock, price and special price from qty update --
                        //                               self.data[value].qty = "";
                        //                               self.data[value].qty = val.qty;
                        //                               self.data[value].isInStock  = "";
                        //                               self.data[value].isInStock = val.stock_status;
                        //                               self.data[value].price = "";
                        //                               self.data[value].special_price = "";
                        //                               self.data[value].price = val.normal_price;
                        //                               self.data[value].special_price = val.sp_price;
                        //                           }               
                                                  
                        //                        // ------------- loop variant products(children) and update them ---
                        //                        Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                        //                        {
                        //                           Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                        //                           {    
                        //                             val = self.liveSkuResult.filter((obj) => obj.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)[0]; 
                        //                               // --updating qty, instock, price and special price for children products ----
                                                    
                        //                                   if(val!== undefined && val !== null)
                        //                                   {
                        //                                     self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = "";
                        //                                     self.data[value].variation_details.variations[variantKey].variations[otherKey].qty = val.qty;
                        //                                     self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = "";
                        //                                     self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock = val.stock_status;
                        //                                     self.data[value].variation_details.variations[variantKey].variations[otherKey].price = "";
                        //                                     self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = "";
                        //                                     self.data[value].variation_details.variations[variantKey].variations[otherKey].price = val.normal_price;
                        //                                     self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price = val.sp_price;
                        //                                   }
                        //                           });
                        //                        });
                        //                 } 
                        //               },
                        //                (err) => {console.error('Error fetching Qtys ===>' + err); 
                        //             });
                        //             // ----------- performing operations on the updated object ---------
                        //             let price = 0, special_price = 0, discount = 0;
                        //             Object.keys(self.data).map((key, value)=> {
                                    
                        //              if(self.data[value].variation_details === undefined)
                        //              {                      
                        //                  if(self.data[value].qty !== "0.0000" && self.data[value].qty !== undefined)
                        //                  {
                        //                     self.data[value].productFlag = "simple_product";
                        //                     self.productInfoAssistant.push(self.data[value]);
                        //                  }                     
                        //              }else
                        //                // ----------- if variant size product -----
                        //              if(self.data[value].variation_details.length !=0)
                        //                {
                        //                  if(self.data[value].variation_details.variant_group === "variant_size")
                        //                    {
                        //                        self.helperArray = [];
                        //                        let otherArrays = [] ;
                        //                           // ------------- loop variant sizes for fetching them ---
                        //                           Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                        //                           {
                        //                              Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                        //                              {
                        //                                  // -- appending price and others --

                        //                                  // ----- if it's sale -------
                        //                                  if(this.rootPathName === 'sale')
                        //                                  {
                        //                                        price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                        //                                        special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                        //                                        discount  = this.calculatePercentage(price, special_price);

                        //                                        if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                        //                                           && discount >= parseInt(this.percentage))
                        //                                        {
                        //                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                        //                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                        //                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                        //                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                        //                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                        //                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                        //                                           self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                        //                                           self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                        //                                        }
                        //                                  }else
                        //                                  // ---------- ends --------------
                        //                                  {

                        //                                     if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty!= "0.0000")
                        //                                     {
                        //                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.sku = self.data[value].variation_details.variations[variantKey].variations[otherKey].sku;
                        //                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id =self.data[value].variation_details.variations[variantKey].variations[otherKey].size.id; 
                        //                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.isInStock = self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock;
                        //                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.qty = self.data[value].variation_details.variations[variantKey].variations[otherKey].qty;
                        //                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                        //                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                        //                                        self.data[value].variation_details.variations[variantKey].variations[otherKey].size.productId = self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id;
                        //                                        self.helperArray.push(self.data[value].variation_details.variations[variantKey].variations[otherKey].size);
                        //                                     }
                        //                                  }
                                                        
                        //                              });
                        //                           });
                        //                                               if(self.helperArray.length != 0)
                        //                                               {
                                                                       
                        //                                                 self.helperObject =   {
                        //                                                                   'product_ID':self.data[value].product_id,
                        //                                                                    '_sizes': self.helperArray
                        //                                                                  };
                                         
                        //                                                                  self.helperArr.push(self.helperObject);
                        //                                                                  self.data[value].sizes =self.helperArray;
                        //                                                                  self.data[value].productFlag = "size_variant";
                                                                                      
                        //                                                                  self.productInfoAssistant.push(self.data[value]);
                        //                                               }                                                       
                                                                        
                        //                              }else
                        //                    // ---------------- no size and no color variants -----
                        //                        if(self.data[value].variation_details.variant_group === "" || self.data[value].variation_details.variant_group ===null)
                        //                            {       
                        //                                if(self.data[value].qty !== "0.0000" &&  self.data[value].qty !== undefined)
                        //                                {
                        //                                     self.data[value].productFlag = "simple_product";
                        //                                     self.productInfoAssistant.push(self.data[value]);
                        //                                }                                                                 
                        //                            }else  // ---- if variant color and size----------
                        //                            if(self.data[value].variation_details.variant_group === "variant_size,variant_color")
                        //                                {
                        //                                    let colors =[];                
                        //                                    self._color_Size_Size_Arry = [] , self._color_Size_Color_Arry = [], self._globalColorObject= {};
                        //                                    // --- get colors -------------
                                                         
                        //                                    getVariationColor(self.data[value].variation_details.variations);
                                                          
                        //                                    Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                        //                                     {                                                   
                        //                                           let object = {}, color = "", tempColor = "", sizes = [];                                             
                        //                                            // ----size
                        //                                          $.each(self.data[value].variation_details.variations[variantKey].variations, (key, value) => 
                        //                                          {
                        //                                              if(value.qty != "0.0000")
                        //                                              {
                        //                                                 color = value.color.label ;
                        //                                                 value.size.price = value.price;
                        //                                                 value.size.special_price = value.special_price;
                        //                                                 value.size.qty = value.qty;
                        //                                                 value.size.isInStock = value.isInStock;
                        //                                                 value.size.id =  value.size.id;
                        //                                                 value.size.sku = value.sku;  
                        //                                                 value.size.productId = value.product_id;                                                                                               
                        //                                                 sizes.push(value.size);
                        //                                              }
                                                                         
                        //                                          });

                        //                                          let  color1 = "", tempColor2 = "";
                        //                                    // tslint:disable-next-line:max-line-length
                        //                                    Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((variant, variantValue) =>
                        //                                    {                                                 
                        //                                                // tslint:disable-next-line:no-trailing-whitespace
                        //                                                // tslint:disable-next-line:max-line-length
                        //                                                color1 =self.data[value].variation_details.variations[variantKey].variations[variant].color.label;                                              
                        //                                                                // tslint:disable-next-line:max-line-length

                        //                                                                // ------- sale --------------
                        //                                                                if(this.rootPathName === 'sale')
                        //                                                                {
                        //                                                                  price = self.data[value].variation_details.variations[variantKey].variations[variant].price;
                        //                                                                  special_price = self.data[value].variation_details.variations[variantKey].variations[variant].special_price;
                        //                                                                  discount = this.calculatePercentage(price, special_price);
                        //                                                                  if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000"
                        //                                                                      && discount >= parseInt(this.percentage)
                        //                                                                     ) {
                        //                                                                     // set flag  
                        //                                                                     self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                        //                                                                     // set size
                        //                                                                     self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                        //                                                                     // set color 
                        //                                                                     self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                           
                        //                                                                     // ---------- set description from parent product ---------------------
                        //                                                                     self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                        //                                                                    self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                        //                                                                 }
                        //                                                                }else{
                        //                                                                 if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000") {
                        //                                                                     // set flag  
                        //                                                                     self.data[value].variation_details.variations[variantKey].variations[variant].productFlag = "color_size_variant";
                        //                                                                     // set size
                        //                                                                     self.data[value].variation_details.variations[variantKey].variations[variant]._size_object =sizes;
                        //                                                                     // set color 
                        //                                                                     self.data[value].variation_details.variations[variantKey].variations[variant]._color_object =self._globalColorObject;
                                                                                           
                        //                                                                     // ---------- set description from parent product ---------------------
                        //                                                                     self.data[value].variation_details.variations[variantKey].variations[variant].description = self.data[value].description;
                        //                                                                    self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                        //                                                                 }
                        //                                                                }
                                                                                      
                        //                                            tempColor2 = color1 ;                                                          
                        //                                       });
                                                              
                        //                                    });

                                                    
                        //                                }else
                        //                                // --------------variant color --------------
                        //                                if(self.data[value].variation_details.variant_group === "variant_color")
                        //                             {
                        //                          // ----------- if not variant size then loop and show other images --
                        //                          let colorArr: any = {} ;
                        //                          self.helperColorArray = [];
                        //                              if( self.data[value].variation_details.variations !== undefined && self.data[value].variation_details.variations!== null)
                        //                            {     
                        //                                Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue)=>
                        //                                {        
                        //                                    let color_flag = "", second_flag = "";
                        //                                   Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                        //                                   { 
                        //                                     if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                        //                                       && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000")
                        //                                        {
                        //                                            colorArr= { 'label':self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                        //                                            ,'value': self.data[value].variation_details.variations[variantKey].variations[otherKey].color.value
                        //                                            ,'product_image': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_image
                        //                                            , 'price': self.data[value].variation_details.variations[variantKey].variations[otherKey].price
                        //                                            ,'special_price':self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price
                        //                                            , 'inStock': self.data[value].variation_details.variations[variantKey].variations[otherKey].isInStock
                        //                                            , 'qty':  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty
                        //                                            , 'product_other_images': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_otherimages
                        //                                            ,'product_id': self.data[value].variation_details.variations[variantKey].variations[otherKey].product_id
                        //                                            ,'id':  self.data[value].variation_details.variations[variantKey].variations[otherKey].color.id
                        //                                            ,'sku': self.data[value].variation_details.variations[variantKey].variations[otherKey].sku
                        //                                           }
                        //                                           self.helperColorArray.push(colorArr);  
                        //                                        }                               
                        //                                      // tslint:disable-next-line:max-line-length
                        //                                      color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                        //                                   }); 
                        //                                   // tslint:disable-next-line:max-line-length 
                        //                                   Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                        //                                  { 

                        //                                       // -------- sale -------------
                        //                                       if(this.rootPathName === 'sale')
                        //                                       {
                        //                                         price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                        //                                         special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                        //                                         discount = this.calculatePercentage(price, special_price);

                        //                                         if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                                    
                        //                                              && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                        //                                              && self.helperColorArray.length != 0 && discount >= parseInt(this.percentage))
                        //                                           {
      
                        //                                               self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                        //                                               self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;
                        //                                               self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;                                                                             
                                                                     
                        //                                               self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                        //                                           }
                        //                                       }else
                        //                                       {

                                                           
                        //                                    if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                              
                        //                                        && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                        //                                        && self.helperColorArray.length != 0)
                        //                                     {

                        //                                         self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                        //                                         self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;
                        //                                         self.data[value].variation_details.variations[variantKey].variations[otherKey].description = self.data[value].description;                                                                             
                                                              
                        //                                         self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                        //                                     }
                        //                                     }
                        //                                    second_flag= self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;
                        //                                   });  
                        //                                });   
                        //                            }                                                                
                        //                      }  
                        //                    }                                          
                        //       });                            
                        //      this.productShow = true;                                        
                        //      this.productLoad = true; 
                        //      this.productLength = false;
                           
                        //      // -------------- display object is empty and the response is not last page --------
                        //     let total = self.productInfoAssistant.length + this.totalShownItems ;
                        //   //  console.log(JSON.stringify(self.productInfoAssistant))
                        //     // ----when the first hit comes out with no any product but the response conatains more products to be shown ---
                        //         if(self.productInfoAssistant.length == 0 && this.totalPageCount >24)
                        //         {
                        //            this.loadMoreProducts('firstLoad','normalFetch');                                                                                                   
                        //         }else
                        //            // ------ if the object to hold the products contains some products but less than 24 and the response has more than 24
                        //            if(self.productInfoAssistant.length <24 && this.totalPageCount >24)
                        //           {   
                        //               if(total < this.totalPageCount)  
                        //               {
                        //                  this.loadMoreProducts('firstLoad','normalFetch'); 
                        //               }  else
                        //               {
                                        
                        //                 Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                        //                 this.totalShownItems = this.productInfo.length ;
                        //                 this.productInfoAssistant =[];
                        //                 setTimeout(function(){
                        //                       $('.product-listing').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                     
                        //                 }, 2000)                                                           
                        //                 $('#loadingCategory').hide();
                        //               }                                                                                          
                        //           }else
                        //             {
                        //                 Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                        //                 this.totalShownItems = this.productInfo.length ;
                        //                 this.productInfoAssistant =[];
                        //                 setTimeout(function(){
                                           
                        //                       $('.product-listing').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                     
                        //                 }, 2000)                                                           
                        //                 $('#loadingCategory').hide();                                        
                        //                }     
                        //                if(this.totalShownItems >= this.totalPageCount) 
                        //                {
                        //                    this.productLength = false;
                        //                    $('#loadingCategory').hide();
                        //                }else{
                        //                    if(this.totalShownItems !=0)
                        //                    {
                        //                     this.productLength = true;
                        //                    }                                        
                        //                }
                                     
                        //     }
                        //     }, (err) => {
                                
                        //         this.productInfoAssistant =[];
                        //         $('#loadingCategory').hide();
                        //         })                          
                            //}  
                    // --------- ends --------------------              
             
         }else
            {
                this.productShow = false;
                this.productLength = false;
                this.productLoad = true; 
                this.productInfoAssistant =[];
                $('#loadingCategory').hide();
            }
            $('.category-inner').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');       
            
          }, (err)=>{                            
          
           this.productLoad = true;
           this.productInfoAssistant =[];
           $('#loadingCategory').hide();
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


    //   this.navigationService.getMenuCategories().subscribe(data => {      }); 
      
         // -------------- original code ------------------------------
     
               for(let i=0, l= arrayData.length; i<l; i++ ) {
                   this.navigationLinks.push(arrayData[i]);
                } 
                  this.subcategories = this.navigationLinks[elementIndex];
           
 
    }); // check if params changed
    if(localStorage.getItem('scrollerPosition') != null && localStorage.getItem('scrollerPosition') != undefined)
    {
      
       // $(window).scrollTo(localStorage.getItem('scrollerPosition'))
    }

   
  } // ngOnInit

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
}
  // ------------- get color -----------------
   getVariationColor(json)
  {    
    let object = {}, colors = [], sizes = [], _sizeObj  ={}, helper = [], color_indexer= "", color = "";
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

  // ------------------- load more ------------------------
  loadMoreProducts(loadType, fetchType) {
      
        this.filterOptions.count = 24; 
        this.filterOptions.page = parseInt(this.filterOptions.page)+1;
        let val;
        if(loadType === 'firstLoad')
        {
            $('#loadingCategory').show();
            this.categoryListProductService.getCategoryProductList(this.filterOptions).subscribe(data => 
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
                         if( data.result !== "No any record found" && data.result !== "No records found" &&
                             data.result != undefined && data.result.length != 0 
                            && data.result != null)
                             {
                                 this.productCount = data.result.length;
                                 this.data = data.result ;       
                                
                                 this.rangeValues = [this.minPrice, this.maxPrice];
                                  // ----------------- get live quantity update-----           
                            Object.keys(data.result).map((key, value) =>
                            {    
                              // ----------- simple products ---------------
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
                                              if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                                               {                                                    
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
                                  // $('#loadingCategory').show();
                                  this.categoryListProductService.getLiveQuantitiesForAllProducts(this.groupSku).subscribe(payload =>  
                                      {
                                            this.liveSkuResult = payload.results;
                                          
                                            if(this.liveSkuResult != undefined)
                                          {
                                              // ------------ updating main object -------------
                                            Object.keys(self.data).map((key, value) =>{    
                                            // ----------- simple product ---------------
                                            if(self.data[value].variation_details === undefined || self.data[value].variation_details === ''){                                     
                                                // ---------------- updating simple product ----
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
                                                                // -- children products ----
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
                                            
                                              let price =0, special_price = 0, discount = 0 ;
                                              // ----------- performing operations on the updated object ---------
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

                                                                   if(this.rootPathName === 'sale')
                                                                   {
                                                                     price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                     special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price; 
                                                                     discount = this.calculatePercentage(price, special_price);

                                                                     if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000" && discount >= parseInt(this.percentage))
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
                                                                   }else{
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

                                                                                                // ------------ if color filter is applied, filter out the non mathced primary colors -----
                                                                                   if(this.filterOptions.color_id !== null && this.filterOptions.color_id !== undefined && this.filterOptions.color_id !== "")
                                                                                   {
                                                                                        // --- sale -----------
                                                                                        if(this.rootPathName === 'sale')
                                                                                        {
                                                                                            price =  self.data[value].variation_details.variations[variantKey].variations[variant].price;
                                                                                            special_price =  self.data[value].variation_details.variations[variantKey].variations[variant].special_price;
                                                                                            discount = this.calculatePercentage(price, special_price);
                                                                                           
                                                                                            if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000"
                                                                                            && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[variant].primary_color.value && discount >= parseInt(this.percentage)) {
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
                                                                                        self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                           }
                                                                                        }else{
                                                                                            if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000"
                                                                                                && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[variant].primary_color.value) {
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
                                                                                            self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                        }
                                                                                    }
                                                                                   }else
                                                                                  {

                                                                                       // ----- sale --------
                                                                                       if(this.rootPathName === 'sale')
                                                                                       {
                                                                                                price =  self.data[value].variation_details.variations[variantKey].variations[variant].price;
                                                                                                special_price =  self.data[value].variation_details.variations[variantKey].variations[variant].special_price;
                                                                                                discount = this.calculatePercentage(price, special_price);

                                                                                                if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000"
                                                                                                     && discount >= parseInt(this.percentage)
                                                                                                   ) {
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
             
                                                                                                    self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                                   }

                                                                                       }else{
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

                                                                                       self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                      }
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

                                                                        // --------- sale ------------
                                                                        if(this.rootPathName === 'sale')
                                                                        {
                                                                            price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                            special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                            discount = this.calculatePercentage(price, special_price);

                                                                            if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                                && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000" && discount >= parseInt(this.percentage))
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
                                                                        }else{
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
                                                                        } 
                                                                                                     
                                                                       // tslint:disable-next-line:max-line-length
                                                                       color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                                    }); 
                                                                    // tslint:disable-next-line:max-line-length 
                                                                    Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                                   { 
                                                                     
                                                                     // ---------- when color filter is applied filter out the non matched primary colors -------
                                                                        if(this.filterOptions.color_id !== null && this.filterOptions.color_id !== undefined && this.filterOptions.color_id !== "")
                                                                        {

                                                                            // --------sale -----------
                                                                            if(this.rootPathName === 'sale')
                                                                            {
                                                                                price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                                special_price =self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                                discount = this.calculatePercentage(price, special_price);
                                                                                if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                                    && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                                                    && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[otherKey].primary_color.value
                                                                                    && discount >= parseInt(this.percentage))
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
                                                                                
                                                                            }else
                                                                            {

                                                                        if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                            && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                                            && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[otherKey].primary_color.value)
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
                                                                        }
                                                                        }else
                                                                        {

                                                                            // ------- sale ---------------
                                                                            if(this.rootPathName === 'sale')
                                                                            {
                                                                                 price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                                 special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                                 discount = this.calculatePercentage(price,special_price);

                                                                                 if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                                    && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000" && discount >= parseInt(this.percentage))
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
                                                                            }else{
                                                                          if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
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
                                          if(self.productInfoAssistant.length <24  && pageLimit<= this.totalPageCount)
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
                                               $('#loadingCategory').hide();
                                             }                                                                                             
                                         }else
                                           {
                                               Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                               this.totalShownItems = this.productInfo.length ;
                                               this.productInfoAssistant =[];
                                            $('#loadingCategory').hide();
                                           }   
                                           
                                        
                                           if(this.totalShownItems >= this.totalPageCount ) 
                                           {
                                               this.productLength = false;
                                               $('#loadingCategory').hide();
                                           
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
                                          
                                          $('#loadingCategory').hide();
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
                    $('#loadingCategory').hide();
                 }
              }, (err) => { 
       
               this.productLoad = true;
               this.productShow = false;
               this.productLength = false;
               this.productInfoAssistant = [];
               $('#loadingCategory').hide();
            });             
        }else
        {
            $('#loadingCategory').show();
         
        this.categoryListProductService.getCategoryProductList(this.filterOptions).subscribe(data => 
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
                                        self.groupSku.push(data.result[value].sku);       
                                      if(data.result[value].variation_details.variations !== undefined && data.result[value].variation_details.variations !== null)
                                       {     
                                       
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
                        //  $('#loadingCategory').show();
                     
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
                                       });                           
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
                                           });                                                               
                                                 // ------------- loop variant sizes for fetching them ---
                                                 Object.keys(self.data[value].variation_details.variations).map((variantKey, variantValue) =>
                                                 {
                                                    Object.keys(self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue) =>
                                                    {    
                                                        // -- setting sku for children products ----
                                                       // val = self.liveSkuResult.filter((obj) => obj.sku === self.data[value].variation_details.variations[variantKey].variations[otherKey].sku)[0];
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

                                      let price =0, special_price = 0, discount = 0 ;
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
                                                           if(this.rootPathName === 'sale')
                                                           {
                                                             
                                                            price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                            special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                            discount = this.calculatePercentage(price, special_price);

                                                            if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000" && discount >= parseInt(this.percentage))
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
                                                           }else{
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

                                                                                         // ------------ if color filter is applied, filter out the non matched primary colors -----
                                                                                   if(this.filterOptions.color_id !== null && this.filterOptions.color_id !== undefined && this.filterOptions.color_id !== "")
                                                                                   {

                                                                                    // --------- sale -------------
                                                                                    if(this.rootPathName === 'sale')
                                                                                    {
                                                                                        price = self.data[value].variation_details.variations[variantKey].variations[variant].price;
                                                                                        special_price = self.data[value].variation_details.variations[variantKey].variations[variant].special_price;
                                                                                        discount = this.calculatePercentage(price , special_price);

                                                                                                    if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000"
                                                                                                    && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[variant].primary_color.value
                                                                                                    && discount >= parseInt(this.percentage)) {
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
                                                                                                self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                            }
                                                                                     }else{
                                                                                            if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000"
                                                                                                && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[variant].primary_color.value) {
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
                                                                                            self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                        }
                                                                                    }
                                                                                   }else
                                                                                  {

                                                                                    // ---------- sale ---------------
                                                                                    if(this.rootPathName === 'sale')
                                                                                    {
                                                                                        price =  self.data[value].variation_details.variations[variantKey].variations[variant].price;
                                                                                        special_price =  self.data[value].variation_details.variations[variantKey].variations[variant].special_price;
                                                                                        discount = this.calculatePercentage(price, special_price);

                                                                                        if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000" && discount >= parseInt(this.percentage)) {
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
                                                                                          
                                                                                            
                                                                                            self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                           }

                                                                                    }else{
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
                                                                                     
                                                                                       
                                                                                       self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                      }
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

                                                                // --------- sale ---------
                                                                if(this.rootPathName === 'sale')
                                                                {
                                                                    price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                    special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                    discount = this.calculatePercentage(price, special_price);

                                                                    if(color_flag !=self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                        && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000" && discount >= parseInt(this.percentage))
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

                                                                }else{
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
                                                                }                             
                                                               // tslint:disable-next-line:max-line-length
                                                               color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                            }); 
                                                            // tslint:disable-next-line:max-line-length 
                                                            Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                           {                                                           
                                                              // ---------- when color filter is applied filter out the non matched primary colors -------
                                                              if(this.filterOptions.color_id !== null && this.filterOptions.color_id !== undefined && this.filterOptions.color_id !== "")
                                                              {

                                                                // ------------sale ------------
                                                                if(this.rootPathName === 'sale')
                                                                {
                                                                    price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                    special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                    discount = this.calculatePercentage(price, special_price);

                                                                    if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                        && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                                        && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[otherKey].primary_color.value && discount >= parseInt(this.percentage))
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
                                                                }else{

                                                              if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                  && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                                  && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[otherKey].primary_color.value)
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
                                                                }
                                                              }else
                                                              {

                                                                  // ----------------- sale ------------
                                                                  if(this.rootPathName == 'sale')
                                                                  {
                                                                     price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price ;
                                                                     special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                     discount = this.calculatePercentage(price, special_price);

                                                                     if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                        && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000" && discount >= parseInt(this.percentage))
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

                                                                  }else{
                                                                if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
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
                         
                               if(self.productInfoAssistant.length == 0 && pageLimit <= this.totalPageCount)
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
                                  if(self.productInfoAssistant.length <24 && pageLimit <= this.totalPageCount)
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
                                       $('#loadingCategory').hide();
                                     }                                                                                             
                                 }else
                                   {
                                       Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                       this.totalShownItems = this.productInfo.length ;
                                       this.productInfoAssistant =[];
                                    $('#loadingCategory').hide();
                                   }   
                                   
                                   if(this.totalShownItems >= this.totalPageCount) 
                                   {
                                       this.productLength = false;
                                       $('#loadingCategory').hide();
                                   
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
                                  $('#loadingCategory').hide();
                         
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
            $('#loadingCategory').hide();
         }
      }, (err) => { 
    
       this.productLoad = true;
       this.productShow = false;
       this.productLength = false;
       $('#loadingCategory').hide();
            });
        }     
}

  addToWishlist() {
      $('#loadingCategory').show();
       let self =this;
        //this.wishListProductsIds.push(id);
        if(localStorage.getItem('customerToken') === null) {
            $('.sider-layer').css('display', 'block');
            $('#cart_wrap').addClass('blur');
            $('#header').addClass('blur');
            $('.row').addClass('blur'); 
            $('#mm').click();
            $('#loadingCategory').hide();
        }else
        {
        localStorage['wishListProductIds'] =  this.wishListProductsIds;
          this.wishlistService.addToWishlist(this.globalProductId).subscribe(data => {
            $('#loadingCategory').hide();
            this.wishNotif = "Product Added To Wishlist."
             $('#wishModal').modal('show');
             setTimeout(()=>{
                $('#wishModal').modal('hide');
            }, 2000);

            $('#product-detail-modal').modal('hide');
            

            $('.wishlist-update').click();
     
        }, err => {
            $('#loadingCategory').hide();
           
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
            sku = value.sku;
            this.globalProductId = "";
            this.globalProductId = value.productId;
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
  
    this.mainImage = ""; 
    this.lower_limit_qty = true;
    this.productSizeId = 0;
    this.selectedSize = 0 ;
    this._variantProductImages = [];
    this._colorFlag = _productFlag;
    this._sizeMsg = "", this.default_color_display = "";
    self._globalArrayForSizes = [];
    let bool : boolean, defaultColor = "" ;
    this.sizeVal = 0;
      
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
    $('#prod-img-big').css('display', 'none');
    
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
        $('#loadingCategory').show();
    if(localStorage.getItem('customerToken') === null) {
       
      if(localStorage.getItem('shopGuestCartId') === null) {
          this.addProductCartService.getCartGuestId().subscribe(data => {
            localStorage.setItem('shopGuestCartId', data);
           $('#loadingCategory').hide();

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
                        $('#loadingCategory').hide();                        
                         if(payload.data !== undefined && payload.data !== null)
                         {

                            // ---------- if qty is 0 -----
                            if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                            {
                                if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                {
                                                           this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                                           this.addingToCart = false;
                                                           this.cartMessage = false;
                                                           this.loggerMessage = "" ;
                                                     $('#loadingCategory').hide();
                                                     $('.minicart-update').click();
                                                     $('#cartModal').modal('show');
                                                      this.cartNotif = "Product Added To Cart."
                                                      setTimeout(function() {
                                                       $('#cartModal').modal('hide');
                                                       this.cartNotif = ""
                                                      }, (2000));
                                                     $('#product-detail-modal').modal('hide');
                                                
                                                   
                                                   }, (err) => {
                                                       $('#loadingCategory').hide();
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
                            }else
                                {
                                    this.notifyUserOutOfStock();                                  
                                }                         
                            }else
                            {
                                this.showAddToCartError(this.product_Name);
                            }  
            }, errr => {
            
                $('#loadingCategory').hide();
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
                      $('#loadingCategory').hide();
                      this.colorNotSelected = true;
                      return ;
                    }
                }else
                if( this._colorFlag === 'size_variant')
                    {
                        if(this.selectedSize == null || this.selectedSize == 0) {
                          $('#loadingCategory').hide();
                          this.sizeNotSelected = true;
                          return ;
                        }
                    }else
                      {
                          // --------------- if color and size variant -----------
                        if(this.selectedColor == null || this.selectedColor == 0) {                             
                            this.colorNotSelected = true;
                            $('#loadingCategory').hide();
                            return ;
                          }
                        if(this.selectedSize == null || this.selectedSize == 0) {                              
                            this.sizeNotSelected = true;
                            $('#loadingCategory').hide();
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
                                $('#loadingCategory').hide();
                                //this.generalAvailableQty 
                                if(payload.data !== undefined && payload.data !== null)
                                {

                                    // ---------if qty is 0 ----------
                                    if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                    {

                                        if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                        {                             
                                    this.addProductCartService.addItemToCart(productAttr).subscribe(data => {         
                                    this.addingToCart = false;
                                    this.cartMessage = false;
                                    this.loggerMessage = "" ;
                                    $('#loadingCategory').hide();
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
                                    $('#loadingCategory').hide();
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
                              $('#loadingCategory').hide();
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
                    $('#loadingCategory').hide();
                    //this.generalAvailableQty 
                    if(payload.data !== undefined && payload.data !== null)
                    {
                        // -------if qty = 0------------
                        if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                        {
                            if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                            { 
                                this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                    $('#loadingCategory').hide();
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
        $('#loadingCategory').hide();
        console.error(err)});

        // if configurable product    
        } else if(this._colorFlag !== undefined  && 
            this._colorFlag === 'color_variant' || this._colorFlag === "size_variant" ||
             this._colorFlag === "color_size_variant") {
             
            // check if attributes are selected
            if( this._colorFlag === 'color_variant')
                {                  
                    if(this.selectedColor === null || this.selectedColor == 0) {
               
                      $('#loadingCategory').hide();
                      this.colorNotSelected = true;
                      
                    }
                }else
                if( this._colorFlag === 'size_variant')
                    {
      
                        if(this.selectedSize == null || this.selectedSize == 0 ) {
                      
                          $('#loadingCategory').hide();
                          this.sizeNotSelected = true;
                          return ;
                        }
                    }else
                      {
                          // --------------- if color and size variant -----------
                        if(this.selectedColor == null || this.selectedColor == 0) {                             
                            this.colorNotSelected = true;
                            $('#loadingCategory').hide();
                            return ;
                          }
                        if(this.selectedSize == null  || this.selectedSize == 0) {                              
                            this.sizeNotSelected = true;
                            $('#loadingCategory').hide();
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
                            $('#loadingCategory').hide();
                            if(payload.data !== undefined && payload.data !== null)
                            {
                                if(Math.trunc(parseInt(payload.data[0].quantity)) >0)
                                {
                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    { 
                                        this.addProductCartService.addItemToCart(productAttr).subscribe(data => {                
                                            $('#loadingCategory').hide();
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
                                            $('#loadingCategory').hide();
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
                    $('#loadingCategory').hide();
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
      
             $('#loadingCategory').hide();
            localStorage.setItem('shopCartId', data);
          }, err => {
       
                  this.cartMessage = true ;
                  this.loggerMessage = err;
                
                  $('#loadingCategory').hide();
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
                        $('#loadingCategory').hide();
                        if(payload.data !== undefined && payload.data !== null)
                        {
                            if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                            {
                                if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                { 
                                    this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {                                   
                                             $('#loadingCategory').hide();
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
                                               $('#loadingCategory').hide();
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
                $('#loadingCategory').hide();
                console.error(err)});
            // if configurable product    
          } else if(this._colorFlag !== undefined  && 
            this._colorFlag === 'color_variant' || this._colorFlag === "size_variant" ||
             this._colorFlag === "color_size_variant") {
            
            // check if attributes are selected
            if( this._colorFlag === 'color_variant')
                {
                    
                    if(this.selectedColor === null ) {
                    
                      $('#loadingCategory').hide();
                      this.colorNotSelected = true;
                      return ;
                    }
                }else
                if( this._colorFlag === 'size_variant')
                    {
                
                        if(this.selectedSize == null ) {
                    
                          $('#loadingCategory').hide();
                          this.sizeNotSelected = true;
                          return ;
                        }
                    }else
                      {
                          // --------------- if color and size variant -----------
                        if(this.selectedColor == null ) {                             
                            this.colorNotSelected = true;
                            $('#loadingCategory').hide();
                            return ;
                          }
                        if(this.selectedSize == null ) {                              
                            this.sizeNotSelected = true;
                            $('#loadingCategory').hide();
                            return ;
                      }  
                      
                  }
                  
                    $('#loadingCategory').show();
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
                                    $('#loadingCategory').hide();
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
                                                    $('#loadingCategory').hide();
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
                                                    $('#loadingCategory').hide();
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
                            $('#loadingCategory').hide();
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
                    $('#loadingCategory').hide();
                    if(payload.data !== undefined && payload.data !== null)
                    {
                        if( Math.trunc(parseInt(payload.data[0].quantity)) >0)
                        {

                            if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                            { 
                                this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {       
                                    $('#loadingCategory').hide();
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
                                    $('#loadingCategory').hide();
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
            $('#loadingCategory').hide();
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
                    
                        $('#loadingCategory').hide();
                        this.colorNotSelected = true;
                        return ;
                      }
                  }else
                  if( this._colorFlag === 'size_variant')
                      {
                   
                          if(this.selectedSize == null ) {
                       
                            $('#loadingCategory').hide();
                            this.sizeNotSelected = true;
                            return ;
                          }
                      }else
                        {
                            // --------------- if color and size variant -----------
                          if(this.selectedColor == null ) {                             
                              this.colorNotSelected = true;
                              $('#loadingCategory').hide();
                              return ;
                            }
                          if(this.selectedSize == null ) {                              
                              this.sizeNotSelected = true;
                              $('#loadingCategory').hide();
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
                                    $('#loadingCategory').hide();
                                    if(payload.data !== undefined && payload.data !== null)
                                    {
                                        if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                        {

                                            if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                            { 
                                                this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                                    this.addingToCart = false;
                                                    this.cartMessage = false;
                                                    this.loggerMessage = "" ;
                                                    $('#loadingCategory').hide();
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
                                                      $('#loadingCategory').hide();
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
                             
                        }, err => { $('#loadingCategory').hide();})   
                          };
                          } // end configurable product add 
                }        
    };
    $('#loadingCategory').show();
    }
    
    // $('#login').modal('hide');
  
  } // add to cart

// ------------ notif user about available qtys ---------
notifyUserAboutQty(itemName, qty)
{
    $('#cartModalRed').modal('show');
    this.cartNotif = "Sorry, We don't have as many ("+ itemName+
    ") as you requested, we have only ("+qty+") in stock";
    setTimeout(function() {
    $('#cartModalRed').modal('hide');
    this.cartNotif = ""
    }, (4000));  
    this.addingToCart = false;
    this.cartMessage = false;
    this.loggerMessage = "" ;
    $('#loadingCategory').hide();
}

  // ------------ show erro ----------
  showAddToCartError(itemName)
  {
    $('#cartModal').modal('show');
    this.cartNotif = "Oooops, error occured while adding "+itemName+
    "to cart, please try again .";
    setTimeout(function() {
    $('#cartModal').modal('hide');
    this.cartNotif = ""
    }, (2000)); 

    this.addingToCart = false;
    this.cartMessage = false;
    this.loggerMessage = "" ;
    $('#loadingCategory').hide();
  }

  notifyUserOutOfStock()
  {
        this.productStock = false;
        this.cartButtonState = true;
      $('#cartModalRed').modal('show');
      this.cartNotif = "Sorry, this product is out of stock.";
      setTimeout(function() {
      $('#cartModalRed').modal('hide');
      this.cartNotif = ""
      }, (4000));  
      this.addingToCart = false;
      this.cartMessage = false;
      this.loggerMessage = "" ;
      $('#loadingCategory').hide();
  }
  
// ------------- notification ends --------------------

  // --------------------------filter products--------------------
   applyFilter(event)
   {
    this.productLength = false;
    this.filterOptions.count = 24 ;
    this.filterOptions.page = 1;

    $('#loadingCategory').show();
    this.categoryListProductService.getCategoryProductList(this.filterOptions).subscribe(data => {
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
        if( data.result !== "No any record found"  
        && data.result !== "No records found" && data.result != undefined && data.result.length != 0 
        &&  data.result != null)
            {
                this.productCount = data.result.length;
                this.totalPageCount = parseInt(data.total_products);
                this.data = data.result ;
                this.productCount = data.result.length;
                let min, max ;
             // ----- if brand checked update color only ---
                 if(this.brandFirst)
                 {
                    // --------- color filters array -----
                     if(!this.colorTouched)
                     {
                        this.colorFilterArray = data.filters.colors;  
                     }
                     // ---------- range --------         
                        this.maxPrice = Math.trunc(data.maxPrice);
                        this.minPrice = Math.trunc(data.minPrice);
                        if(this.maxPrice ===  this.minPrice) 
                        { 
                            this.maxPrice += 4;
                            this.minPrice +=1;
                        }                 
                     this.rangeValues= [this.minPrice, this.maxPrice];
                 }else
                 if(this.colorFirst)
                 {
                     // ----------- brand filters array ----
                     this.productBrands = data.filters.brands;
                     this.maxPrice =  this.maxPrice;
                     this.minPrice =  this.minPrice; 
                     this.rangeValues= [this.minPrice, this.maxPrice];
                 }else
                   if(this.priceFirst)
                   {
                        // ---------- maintain price ---

                        this.rangeValues= [this.minPrice, this.maxPrice];
                        this.colorFilterArray = data.filters.colors; 
                     // ----------- brand filters array ----
                        this.productBrands = data.filters.brands;
                   }else
                   {
                        this.productBrands = data.filters.brands;
                        this.colorFilterArray = data.filters.colors;
                        this.maxPrice = Math.trunc(data.maxPrice);
                        this.minPrice = Math.trunc(data.minPrice); 
                        this.rangeValues= [this.minPrice, this.maxPrice];
                   }
            
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
                   // $('#loadingCategory').show();
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
                                let price =0 , special_price = 0, discount  = 0;

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
                                                       // --------- sale -------------
                                                       if(this.rootPathName === 'sale')
                                                       {
                                                        price =  self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                        special_price =  self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                        discount = this.calculatePercentage(price, special_price);

                                                        if(self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000" && discount >= parseInt(this.percentage))
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
                                                       }else{
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

                                                                                   // ------------ if color filter is applied, filter out the non mathced primary colors -----
                                                                                   if(this.filterOptions.color_id !== null && this.filterOptions.color_id !== undefined && this.filterOptions.color_id !== "")
                                                                                   {
                                                                                       // ------------------- sale --------------
                                                                                       if(this.rootPathName === 'sale')
                                                                                       {
                                                                                        price =  self.data[value].variation_details.variations[variantKey].variations[variant].price;

                                                                                        special_price =  self.data[value].variation_details.variations[variantKey].variations[variant].special_price;
                                                                                        discount = this.calculatePercentage(price, special_price);

                                                                                                if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000"
                                                                                                && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[variant].primary_color.value 
                                                                                                && discount >= parseInt(this.percentage)
                                                                                               ) {
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
                                                                                            self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                        }
                                                                                       }else{
                                                                                            if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000"
                                                                                                && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[variant].primary_color.value) {
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
                                                                                            self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                        }
                                                                                      }
                                                                                   }else
                                                                                  {

                                                                                    // -------- sale -----------------
                                                                                    if(this.rootPathName === 'sale')
                                                                                    {
                                                                                        price =  self.data[value].variation_details.variations[variantKey].variations[variant].price;
                                                                                        special_price =  self.data[value].variation_details.variations[variantKey].variations[variant].special_price;
                                                                                        discount = this.calculatePercentage(price, special_price);

                                                                                        if (tempColor2 !== color1 && self.data[value].variation_details.variations[variantKey].variations[variant].qty !== "0.0000" && discount >= parseInt(this.percentage)) {
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
     
                                                                                            self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                           }
                                                                                    }else{
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

                                                                                       self.productInfoAssistant.push(self.data[value].variation_details.variations[variantKey].variations[variant]);
                                                                                      }
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

                                                        // ---------- when color filter is applied filter out the non matched primary colors -------
                                                        if(this.filterOptions.color_id !== null && this.filterOptions.color_id !== undefined && this.filterOptions.color_id !== "")
                                                        {

                                                            // ----------- sale --------------
                                                            if(this.rootPathName === 'sale')
                                                            {
                                                                price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                discount = this.calculatePercentage(price , special_price);

                                                                if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                    && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                                    && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[otherKey].primary_color.value && discount >= parseInt(this.percentage))
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
                                                            }else{
                                                            if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000"
                                                                && this.filterOptions.color_id == self.data[value].variation_details.variations[variantKey].variations[otherKey].primary_color.value)
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
                                                            } 
                                                        }else
                                                        {

                                                            // --------- sale -------------
                                                            if(this.rootPathName === 'sale')
                                                            {
                                                                price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                                special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                                discount = this.calculatePercentage(price , special_price);

                                                                if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
                                                                    && self.data[value].variation_details.variations[variantKey].variations[otherKey].qty != "0.0000" && discount >= parseInt(this.percentage))
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
                                                            }else{
                                                            if(color_flag !== self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label
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
                                                            }
                                                        }
                                                                                    
                                                         // tslint:disable-next-line:max-line-length
                                                         color_flag = self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label;                                          
                                                      }); 
                                                      // tslint:disable-next-line:max-line-length 
                                                      Object.keys( self.data[value].variation_details.variations[variantKey].variations).map((otherKey, otherValue)=>
                                                     { 

                                                        // -------------- sale -----------
                                                        if(this.rootPathName === 'sale')
                                                        {

                                                            price = self.data[value].variation_details.variations[variantKey].variations[otherKey].price;
                                                            special_price = self.data[value].variation_details.variations[variantKey].variations[otherKey].special_price;
                                                            discount = this.calculatePercentage(price, special_price);

                                                            if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                                
                                                                   &&  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty !== "0.0000" && discount >= parseInt(this.percentage))
                                                                {
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                                    self.data[value].variation_details.variations[variantKey].variations[otherKey].description =   self.data[value].description;                                                           self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);
                                                               }
                                                        }else{
                                                       if(second_flag != self.data[value].variation_details.variations[variantKey].variations[otherKey].color.label 
                                                        
                                                           &&  self.data[value].variation_details.variations[variantKey].variations[otherKey].qty !== "0.0000")
                                                        {
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].productFlag = "color_variant";                                                                                                                        
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].color_array =   self.helperColorArray;                                                                              
                                                            self.data[value].variation_details.variations[variantKey].variations[otherKey].description =   self.data[value].description;                                                           self.productInfoAssistant.push( self.data[value].variation_details.variations[variantKey].variations[otherKey]);
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
                                 $('#loadingCategory').hide();
                               }                                                                                             
                           }else
                             {
                                 Array.prototype.push.apply(this.productInfo, this.productInfoAssistant);
                                 this.totalShownItems = this.productInfo.length ;
                                 this.productInfoAssistant =[];

                                 $('#loadingCategory').hide();
                             }   
                             
                             if(this.totalShownItems == this.totalPageCount) 
                             {
                                 this.productLength = false;
                                 $('#loadingCategory').hide();                          
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
                            $('#loadingCategory').hide();
                            })                          
                        }                  
          }else
        {
            this.productShow = false;
            this.productLength = false;
            this.productLoad = true; 
            this.rangeValues= [this.minPrice, this.maxPrice];
            this.productInfoAssistant =[];
            $('#loadingCategory').hide();
        }    
      }, (err)=>{                            
     
        this.productInfoAssistant =[];
       this.productLoad = true;
       $('#loadingCategory').hide();
  });
}

  // -------------- check the side panel chidren data if empty then redirects to the corresponding category ---
  normalizeCategoryName(name)
  {
      if(name !== undefined && name !== null)
      {
        return  name.replace(/[^A-Z0-9]/ig, "-")
      }else
            {
                return name;
            }
  }
  checkChildrenDataAndRedirect(panelChildrenData, parentCategory, panelNode)
  {
   if(panelChildrenData.length == 0)
   {     
        this.router.navigate(['/'+this.rootPathName+'/'+parentCategory.toLowerCase()+'/'+this.normalizeCategoryName(panelNode).toLowerCase()])
   }
  }
  // ----------- get left side menus counts-------
  getParentCount(parentId)
  {
      if(parentId !== undefined && parentId !== null && parentId !== 'undefined')
      {
            let _instance =  this.totalProductsCounts.filter(elem => elem.category_id == parentId)[0], count ;
            if(_instance !== undefined && _instance !== null)
            {
                count = _instance.total_products;
            }else
            {
                count = 'N/A';
            }
            return count;
      }
  }
  // --------- get first level category count ------
  getFirstLevelCategoryId()
  {
      if(this.subcategories !== undefined && this.subcategories !== null)
      {
         return this.subcategories.id;
      }
  }

  // ---------------- calculate percentage ------------------
    calculatePercentage(price, special_price)
    {
        let discount = 0;
        if(price && special_price)
        {
             discount = Math.abs(Math.trunc((1 - (special_price/price)) * 100));
        }
        return discount;
    }
}
