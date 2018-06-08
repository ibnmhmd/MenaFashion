import { Renderer2, Inject , Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { NavigationService } from '../services/navigation.service';
import { ProductDetailService } from '../services/product-detail.service';
import { ProductAttributesService } from '../services/product-attributes.service';
import { AddProductCartService } from '../services/add-product-cart.service';
import { WishlistService } from '../services/wishlist.service';
import { Meta } from '@angular/platform-browser';
import { CategoryListProductService } from '../services/category-list-product.service';
import {CheckoutService} from '../services/checkout.service';
import { SingleProductDetailsService } from '../services/single-product-details.service';
import 'rxjs/add/operator/map';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [CheckoutService, CategoryListProductService, NavigationService, ProductDetailService, AddProductCartService, WishlistService, ProductAttributesService]
})
export class ProductDetailComponent implements OnInit {
  categoryLevel =[];
  
  productSku;
  productData;
  productQty:any = 1;
  productDiscountVal;
  productStock;
  productShow = false;

  productMetaTitle;
  productMetaDescription;
  productMetaImg;
  productMetaUrl;
  inputState: boolean = true;
  productSize;
  productColor;
  productSizeId;
  productColorId;
  
  selectedColor = null;
  selectedSize = null;

  colorNotSelected = false;
  sizeNotSelected = false;

  hasSizeChart = false;
  sizeChartValue;
  sizeChartLabel;
  productName;
  productInstance:any = {} ;
  productImageDetailed:any = "";
  variantImages: any;
  productDescription: any;
  productFlag:any;
  productID:any;
  exchangeRate: number;
  productPrice: any;
  productSpecialPrice: number;
  _discountFlag: boolean;
  tempStock: boolean;
  temp_other_images:any ;
  isActive:boolean;
  lower_limit_qty:boolean = true;
  upper_limit_qty:boolean = false;
  qtyMessage:boolean = false;
  avalaible_qty = 0;
  _selection_flag:boolean ;
  _product_Sku ="";
  default_color_display;
  defaultSelectedColor;
  dummySku="";
  cartButtonState: boolean= false;
  cartMessage:boolean = false;
  loggerMessage: any;
  addingToCart: boolean = false;
  dummyObject: any ;
  showPage:boolean = true;
  notWishList: boolean = true ;
  originalPrice:any = "";
  originalSpecialPrice:any = "";
  originalDisc:any = "";
  wishlistItemId:any = "";
  defaultSelectedSize:any = 0;
 cartFlag:any = "";
 wishNotif:any="";
 wishlistNotificationFlag: any = "";
 itemConfiguration :any = [];
 itemQty = 0 ;
 itemId:any;
rootPathName:String= "";
sale_flag: String = "";
 titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private route: ActivatedRoute,
              private http: Http,
              private router: Router,
              private navigationService: NavigationService,
              private productDetailService: ProductDetailService,
              private addProductCartService: AddProductCartService,
              private wishlistService: WishlistService,
              private productAttributesService: ProductAttributesService,
              private Meta: Meta,
              private singleProductDetailsService: SingleProductDetailsService,
              private categoryListProductService: CategoryListProductService,
              private titleService : Title,
			  private sanitizer: DomSanitizer,
			  private _renderer2: Renderer2, 
			  @Inject(DomSanitizer) private _document,
			  private elementRef:ElementRef,
              private checkoutService :CheckoutService) {


              //  console.log(route.snapshot.url[0].path); // array of states

  } // constructor

  // ----------- check if the passed object is empty ------
   isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
  getMeta(url){  

    this.cartMessage = false;
    this.loggerMessage = "";
    let target=document.getElementById('prod-img-big');
    $('#prod-img-big').css('display', 'none');
    $('#divSwapperDetail').removeClass('backGroundImg');
    target.setAttribute( 'src', "" );

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
              $('#divSwapperDetail').addClass('backGroundImg');
        }, 1000);
    });
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


 excludeSpecialCharacter(string)
 {
     if(string != undefined && string != null)
     {
         return string.replace(/[^\w\s]/gi," ")
     }
    return string;
 }
 removeItem(id) {
  this.wishlistService.removeWishlistItem(id).subscribe(data => {
    this.wishlistService.checkWishlist().subscribe(data => {       
            $('.wishlist-update').click();       
        }, err => {
        console.error(err)
        }
      );

  });
};

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    $('#loading').show();
    window.scrollTo(0, 0)
     this.isActive = true;
     this.cartMessage = false;
     this.loggerMessage = "";
     this.qtyMessage = false;
     this. productQty = 1;
     this._selection_flag = false
     this.dummyObject;
     this.notWishList = true;
     this.sale_flag = '';
   //-------------- breadcrumbs starts here -------------
   //$('#loading').show();
   this.route.params.forEach(params => {
        //empty breadcrumbs array
        this.categoryLevel = [];
    
        //add elements to breadcrumbs array
        if(this.route.snapshot.params['product'] !== undefined && this.route.snapshot.params['product'] !== 'wishList')
        {


          if(this.route.snapshot.params['category'] != undefined) {
            this.categoryLevel.push(this.excludeSpecialCharacter(this.route.snapshot.params['category']))
        } 
        if(this.route.snapshot.params['subcategory'] != undefined) {
            this.categoryLevel.push(this.excludeSpecialCharacter(this.route.snapshot.params['subcategory']))
        } 
        if(this.route.snapshot.params['subcategory2'] != undefined) {
            this.categoryLevel.push(this.excludeSpecialCharacter(this.route.snapshot.params['subcategory2']))
        } 

            if(this.categoryLevel.length == 0 && this.route.snapshot.params['product'] === 'men' || this.route.snapshot.params['product'] === 'women')
            {
                this.sale_flag = 'sale';
                this.categoryLevel.push('sale');
                this.categoryLevel.push(this.route.snapshot.params['product']);
            }
        }
        let skuAndType = [];
        skuAndType =  this.route.snapshot.params['sku'].split('?');
        this.productSku =skuAndType[0];
        this.rootPathName = skuAndType[1];
        let  wishFlag = this.route.snapshot.params['product'];
        this.wishlistNotificationFlag = wishFlag;
        this.productSku =  this.productSku.toString().toUpperCase();
        this.wishlistItemId = this.route.snapshot.params['subcategory'];
       if(this.route.snapshot.params['cartEdit'] !== undefined)
       {
          this.itemConfiguration = this.route.snapshot.params['cartEdit'].split('-');
          this.cartFlag =this.itemConfiguration[0] ;
          this.itemId =parseInt(this.itemConfiguration[1]); 
          this.itemQty = this.itemConfiguration[2] ;
          this.productQty = this.itemQty ;
          this.singleProductDetailsService.setProductInstance([],0);
       }else
       {
        this.cartFlag = 'notCart';
       }
  
       if(this.cartFlag === 'cartFlag')
       {
          this.selectedColor = this.defaultSelectedColor;
          this.selectedSize = this.defaultSelectedSize ; 
          this.sizeNotSelected = false;
          this.colorNotSelected = false;
          this.cartButtonState = true;            
       }
// --------------------- ends here ------------------------
    if(wishFlag === "wishList")
      {
        this.productInstance =[];
        this.notWishList = false;
      }else
      {
        this.notWishList = true;
        this.productInstance= this.singleProductDetailsService.getProductInstance();
      }
    

    if(!this.isEmpty(this.productInstance) && this.productInstance != undefined &&
     this.productInstance.length!= 0 && this.productInstance != null && this.cartFlag !== "cartEdit")
      {  
         this.showPage =true ;
       
         if(this.productInstance.meta_title !== "" && this.productInstance.meta_title !== undefined && this.productInstance.meta_title !== null)
         {
          this.titleService.setTitle(this.productInstance.meta_title);
         }
          
         this.simulateDetailedInformation(this.productInstance);
      }else
        {
          this.showPage =false ;        
          this.productDetailService.getDetailForInstanceOfTheProduct(this.productSku).subscribe(data =>   
        {
            this.dummyObject = data.results;
            let sku = [], obj = {}, objSku;
            if(data.results.meta_title !== "" && data.results.meta_title !== null && data.results.meta_title !== undefined && data.results.meta_title !== "")
            {
              this.titleService.setTitle(data.results.meta_title);
            }
           
           if(this.dummyObject != undefined)
            {              
               sku.push(this.dummyObject.sku);

               if(this.dummyObject.productFlag === "size_variant")
               {
                Object.keys(this.dummyObject.variation_details.variations.variations).map((key,value) =>
                {
                 sku.push(this.dummyObject.variation_details.variations.variations[value].sku);               
                });

               this.categoryListProductService.getLiveQuantitiesForAllProducts(sku).subscribe(payload => 
                {
                  let livePayLoad = payload.results, response ;
                  // -------slice an entry from the live update object and use its contents ----
                   response = livePayLoad.filter(object => object.sku === this.dummyObject.sku)[0];
                  // ---- set/update contents ----
                  this.dummyObject.isInStock ="";
                  this.dummyObject.qty = "";
                  this.dummyObject.price = "";
                  this.dummyObject.special_price = "";

                  this.dummyObject.isInStock = response.stock_status;
                  this.dummyObject.qty = response.qty;
                  this.dummyObject.price =response.normal_price;
                  this.dummyObject.special_price = response.sp_price;
              
                  // ----- update the object -----
                  Object.keys(this.dummyObject.variation_details.variations.variations).map((key,value) =>
                  {
                     objSku = this.dummyObject.variation_details.variations.variations[value].sku;
                    response = livePayLoad.filter(object => object.sku === objSku)[0];
                     // ----- setting new values for children ----
                     this.dummyObject.variation_details.variations.variations[value].isInStock = "";
                     this.dummyObject.variation_details.variations.variations[value].qty = "";
                     this.dummyObject.variation_details.variations.variations[value].price = "";
                     this.dummyObject.variation_details.variations.variations[value].special_price = "";
                     this.dummyObject.variation_details.variations.variations[value].isInStock = response.stock_status;
                     this.dummyObject.variation_details.variations.variations[value].qty = response.qty;
                     this.dummyObject.variation_details.variations.variations[value].price=response.normal_price;
                     this.dummyObject.variation_details.variations.variations[value].special_price = response.sp_price;          
                  });

                  // ----------- update sizes -----------------
                  Object.keys(this.dummyObject.sizes).map((key,value) =>
                  {
                     objSku = this.dummyObject.sizes[value].sku;
                     response = livePayLoad.filter(object => object.sku === objSku)[0];
                  
                     // ----- setting new values for children ----
                     this.dummyObject.sizes[value].isInStock = "";
                     this.dummyObject.sizes[value].qty = "";
                     this.dummyObject.sizes[value].price = "";
                     this.dummyObject.sizes[value].special_price = "";
                     this.dummyObject.sizes[value].isInStock = response.stock_status;
                     this.dummyObject.sizes[value].qty = response.qty;
                     this.dummyObject.sizes[value].price=response.normal_price;
                     this.dummyObject.sizes[value].special_price = response.sp_price;  
                     
                     // ---------- set the selected size ------
                      if(this.dummyObject.sizes[value].sku === this.productSku && this.cartFlag === 'cartEdit')
                      {
                        this.defaultSelectedSize = this.dummyObject.sizes[value].value;
                      }
                  });
                  this.simulateDetailedInformation(this.dummyObject);
                },err => { console.log(err)});             
               }else 
                // --------- if the response is a color variant ---------
               if(this.dummyObject.productFlag === "color_variant")
               {
                  Object.keys(this.dummyObject.color_array).map((key,value) =>
                  {
                    sku.push(this.dummyObject.color_array[value].sku);               
                  });
                  // ------- get live values -------------------
               this.categoryListProductService.getLiveQuantitiesForAllProducts(sku).subscribe(payload => 
                {
                  let livePayLoad = payload.results, response ;
                  // -------slice an entry from the live update object and use its contents ----
                   response = livePayLoad.filter(object => object.sku === this.dummyObject.sku)[0];
                  // ---- set/update contents ----
                  this.dummyObject.isInStock ="";
                  this.dummyObject.qty = "";
                  this.dummyObject.price = "";
                  this.dummyObject.special_price = "";

                  this.dummyObject.isInStock = response.stock_status;
                  this.dummyObject.qty = response.qty;
                  this.dummyObject.price =response.normal_price;
                  this.dummyObject.special_price = response.sp_price;
              
                  // ----- update the object -----
                  Object.keys(this.dummyObject.color_array).map((key,value) =>
                  {
                     objSku = this.dummyObject.color_array[value].sku;
                    response = livePayLoad.filter(object => object.sku === objSku)[0];
                     // ----- setting new values for children ----
                     this.dummyObject.color_array[value].isInStock = "";
                     this.dummyObject.color_array[value].qty = "";
                     this.dummyObject.color_array[value].price = "";
                     this.dummyObject.color_array[value].special_price = "";
                     this.dummyObject.color_array[value].isInStock = response.stock_status;
                     this.dummyObject.color_array[value].qty = response.qty;
                     this.dummyObject.color_array[value].price=response.normal_price;
                     this.dummyObject.color_array[value].special_price = response.sp_price;
                     
                     // -----set default selected color ----
                     if(objSku === this.productSku && this.cartFlag === 'cartEdit')
                     {
                      this.defaultSelectedColor = this.dummyObject.color_array[value].value;
                     }
                  });              
                  this.simulateDetailedInformation(this.dummyObject);
                },err => { console.log(err)});
               }else
                  if(this.dummyObject.productFlag === "color_size_variant")
                  {

                     // ------get sku for size obj ------------
                    Object.keys(this.dummyObject._size_object).map((key,value) =>
                    {
                      sku.push(this.dummyObject._size_object[value].sku);               
                    });

                        // ------get sku for color obj ------------
                        Object.keys(this.dummyObject._color_object.colors).map((key,value) =>
                        {
                           sku.push(this.dummyObject._color_object.colors[value].sku);  
                           
                           // ------ colors sizes ---
                           Object.keys(this.dummyObject._color_object.colors[value].size).map((key,val) =>
                           {
                              sku.push(this.dummyObject._color_object.colors[value].size[val].sku);                         
                           });
                        });
                    // ------- get live values -------------------
                 this.categoryListProductService.getLiveQuantitiesForAllProducts(sku).subscribe(payload => 
                  {
                    let livePayLoad = payload.results, response ;
                    // -------slice an entry from the live update object and use its contents ----
                     response = livePayLoad.filter(object => object.sku === this.dummyObject.sku)[0];
                    // ---- set/update contents for parent product ----
                    this.dummyObject.isInStock ="";
                    this.dummyObject.qty = "";
                    this.dummyObject.price = "";
                    this.dummyObject.special_price = "";
  
                    this.dummyObject.isInStock = response.stock_status;
                    this.dummyObject.qty = response.qty;
                    this.dummyObject.price =response.normal_price;
                    this.dummyObject.special_price = response.sp_price;
                
                    // ----- update the object -----
                    Object.keys(this.dummyObject._size_object).map((key,value) =>
                    {
                       objSku= this.dummyObject._size_object[value].sku;
                       response = livePayLoad.filter(object => object.sku === objSku)[0];
                     
                       // ----- setting new values for children ----
                       this.dummyObject._size_object[value].isInStock = "";
                       this.dummyObject._size_object[value].qty = "";
                       this.dummyObject._size_object[value].price = "";
                       this.dummyObject._size_object[value].special_price = "";
                       this.dummyObject._size_object[value].isInStock = response.stock_status;
                       this.dummyObject._size_object[value].qty = response.qty;
                       this.dummyObject._size_object[value].price=response.normal_price;
                       this.dummyObject._size_object[value].special_price = response.sp_price;   
                       
                       if(objSku === this.productSku && this.cartFlag === 'cartEdit')
                       {
                        this.defaultSelectedSize = this.dummyObject._size_object[value].value;
                       }
                    });
                    
                    // -------- update size object ----------
                    Object.keys(this.dummyObject._color_object.colors).map((key,value) =>
                    {
                       objSku =  this.dummyObject._color_object.colors[value].sku;  
                       response = livePayLoad.filter(object => object.sku === objSku)[0];

                        // ----- setting new values for children ----
                        this.dummyObject._color_object.colors[value].isInStock = "";
                        this.dummyObject._color_object.colors[value].qty = "";
                        this.dummyObject._color_object.colors[value].price = "";
                        this.dummyObject._color_object.colors[value].special_price = "";
                        this.dummyObject._color_object.colors[value].isInStock = response.stock_status;
                        this.dummyObject._color_object.colors[value].qty = response.qty;
                        this.dummyObject._color_object.colors[value].price=response.normal_price;
                        this.dummyObject._color_object.colors[value].special_price = response.sp_price;  

                         // -----set default selected color ----
                     if(objSku === this.productSku && this.cartFlag === 'cartEdit')
                     {
                      this.defaultSelectedColor = this.dummyObject._color_object.colors[value].value;
                     }
                       // ------ colors sizes ---
                       Object.keys(this.dummyObject._color_object.colors[value].size).map((key,val) =>
                       {
                          objSku = this.dummyObject._color_object.colors[value].size[val].sku;  
                          response = livePayLoad.filter(object => object.sku === objSku)[0];
                           // ----- setting new values for children ----
                        this.dummyObject._color_object.colors[value].size[val].isInStock = "";
                        this.dummyObject._color_object.colors[value].size[val].qty = "";
                        this.dummyObject._color_object.colors[value].size[val].price = "";
                        this.dummyObject._color_object.colors[value].size[val].special_price = "";
                        this.dummyObject._color_object.colors[value].size[val].isInStock = response.stock_status;
                        this.dummyObject._color_object.colors[value].size[val].qty = response.qty;
                        this.dummyObject._color_object.colors[value].size[val].price=response.normal_price;
                        this.dummyObject._color_object.colors[value].size[val].special_price = response.sp_price; 
                        
                            // -----set default selected size ----
                     if(objSku === this.productSku && this.cartFlag === 'cartEdit')
                     {
                      this.defaultSelectedSize = this.dummyObject._color_object.colors[value].size[val].value;
                      this.defaultSelectedColor = this.dummyObject._color_object.colors[value].value;
                     }
                       });
                    });

                    this.simulateDetailedInformation(this.dummyObject);
                  },err => { console.log(err)});
                }else
                  // ------ simple product -----
                 {
                  this.categoryListProductService.getLiveQuantitiesForAllProducts(sku).subscribe(payload => 
                    {
                      let livePayLoad = payload.results, response ;
                      // -------slice an entry from the live update object and use its contents ----
                       response = livePayLoad.filter(object => object.sku === this.dummyObject.sku)[0];
                      // ---- set/update contents ----
                      this.dummyObject.isInStock ="";
                      this.dummyObject.qty = "";
                      this.dummyObject.price = "";
                      this.dummyObject.special_price = "";
    
                      this.dummyObject.isInStock = response.stock_status;
                      this.dummyObject.qty = response.qty;
                      this.dummyObject.price =response.normal_price;
                      this.dummyObject.special_price = response.sp_price;

                      this.simulateDetailedInformation(this.dummyObject);
                    }, err => console.log(err));

                  
                 }
              
              this.showPage =true ;
            }else
              {
              
              }       
        }, err => {
              $('#loading').hide();
    
        })
     }
    }); 
   // $('#loading').show();
   //---------------- product object -----------------
  

     //Add meta data
     this.productMetaUrl = window.location.href;
     this.productMetaTitle = this.productName;
     this.productMetaDescription = this.productDescription;
     this.productMetaImg = this.productImageDetailed;
     this.Meta.addTag({ name: 'title', content: this.productMetaTitle });
     this.Meta.addTag({ name: 'description', content: this.productMetaDescription });
     this.Meta.addTag({ property: 'og:url', content: this.productMetaUrl });
     this.Meta.addTag({ property: 'og:title', content: this.productMetaTitle });
     this.Meta.addTag({ property: 'og:description', content: this.productMetaDescription });
     this.Meta.addTag({ property: 'og:image', content: this.productMetaImg });
     //End meta data
  }; //ng init

  handleSelectedValueFromDropDown(event)
  {
    var largeImage = document.getElementById('prod-img-big');
   
    if(event.target.value == 0)
     {         
         largeImage.setAttribute( 'src',this.productImageDetailed);   
     }else
       {
         largeImage.setAttribute( 'src',event.target.value); 
       }

       let self= this, price =this.productPrice, special_price, qty, inStock, product_otherimages:string,
       index, colorValue= "", sku ="";       var largeImage = document.getElementById('prod-img-big');
       let  id = event.target.value, image, color ,color_id,color_value ;
       this.productQty = 1;
       this.qtyMessage =false ;
       this.avalaible_qty = 1;
    
    //---------if color size variant ---
    if(this.productFlag === 'color_size_variant' && this.productColor != undefined)
       {
           $.each(this.productColor, (key, value) => {             
                           if(value.value === id)
                               {
                                   image = value.product_image;
                                   color = value.label;
                                   sku = value.sku
                                   color_id = value.id;
                                   inStock = value.isInStock
                                   self.productSize = value.size;
                                   product_otherimages = value.product_otherimages
                               }
                       });
 
             // ---- filter out all out of stocks when reloading the page ---
             if(this.productSize != undefined && this.productSize.length != 0 && this.productSize != null)
             {
               let assistantSizeArray = [], obj ={} ;            
               $.each(this.productSize, (key, value) => {
                 if(value.qty !== "0.0000")
                 {
                   obj = value ; 
                   assistantSizeArray.push(obj);              
                 }             
               })
              this.productSize = [];
              this.productSize = assistantSizeArray;       
             }
          this.selectedSize = 0 ;
       }else{
           $.each(this.productColor, (key, value) => {                
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
                                if(value.product_otherimages != undefined)
                                {
                                  product_otherimages =value.product_otherimages
                                }else{
                                  product_otherimages= value.product_other_images;
                                }
                               }
                       });
       }
 
       //----------- product other images ----
       if(product_otherimages != undefined)
           {
                index = product_otherimages.indexOf(',');
           }
      
       if(this.productFlag === 'color_variant' || this.productFlag === 'color_size_variant')
           { 

               if(product_otherimages != null  && product_otherimages != undefined)
                   {
                       if(index == -1)
                           {   
                               let other = [];
                               other.push(product_otherimages);
                               this.variantImages = other; 
                           }else
                           {                              
                               this.variantImages = product_otherimages.split(',');
                               if( this.variantImages.length == 6)
                                   {
                                       this.variantImages[5]="";
                                   }
                           }                   
                   }
           }
       if(id == 0)
           {        
               largeImage.setAttribute( 'src',this.productImageDetailed); 
               this.selectedColor = "";
               this.productStock=this.tempStock;
               this.variantImages =this.temp_other_images ;
               this.selectedColor = null ;
               this.productSku = null;
               this.cartButtonState = true;

               if(this.productFlag === 'color_variant')
               {                 
                  this.productPrice = this.originalPrice; 
                  this.productSpecialPrice = this.originalSpecialPrice;
                  this.productDiscountVal =this.originalDisc;
               }
              // this.colorNotSelected = true; 
           }else
             {
               largeImage.setAttribute( 'src',image); 
               this.selectedColor = parseInt(color_value) ;;
               this.colorNotSelected = false;
               this.productSku = sku;
               this.cartButtonState = false;
               this.selectedSize = null;
               // $('.label-c').removeClass('selected');
               // $('#color-'+color).addClass('selected')  
             }
  //--------------------- price and discount section ----------
  
    if(special_price != undefined && inStock != undefined)
       {   
           if(special_price !== false && special_price != undefined)
               {
                   if (price >= special_price) {
                       this._discountFlag = false;
                       this.productPrice = price;
                   } else
                       if (special_price >price) {
                           this._discountFlag = true;
                           this.productSpecialPrice = special_price;
                       }
                      
                       let   str: any= this.productDiscountVal ;
                      if(str == "NaN")
                       {
                           this._discountFlag = false;
                           this.productDiscountVal = 0 ;
                       }         
               }
           if(inStock === '1' || inStock == 1)
               {
                   this.productStock = true ;
               } if(inStock === '0' || inStock === 0)
               {
                   this.productStock = false ;
               }else
           {
               this.productStock = this.tempStock;
           }
       }  
       this.avalaible_qty = qty;
      
       this.cartMessage = false;
       this.loggerMessage = "";
       this.addingToCart = false;
       if(this.productFlag === 'color_variant')
       {
       this.productPrice = price;
       this.productSpecialPrice = special_price;
       this.productDiscountVal = Math.trunc((1 - (special_price/price)) * 100);       
       this.productDiscountVal = Math.abs(this.productDiscountVal);
       }    
       this.defaultSelectedSize = 0;
       this.sizeNotSelected = true;
       this.cartButtonState =  true;
  }
 // -------------------------
 simulateDetailedInformation(productInstance)
 {
   $('#loading').show();
  let vImages:any, $self =this ;

  this.productName = productInstance.product_name ;
  this.productImageDetailed = "";
  this.avalaible_qty = productInstance.qty;
  vImages = productInstance.product_otherimages ;
  this.productSku= productInstance.sku;
  console.log(this.avalaible_qty)
  let index; 
  // ---------------- parent image and variants-----------
  if(vImages !== undefined && vImages != false)  
    {
      index = vImages.indexOf(',')
      if(index != -1)
        {
          this.variantImages = vImages.split(',');
          this.productImageDetailed = this.variantImages[0];
        }else
        {
          let arr = [];              
          arr.push(vImages);
          this.productImageDetailed = vImages;
          this.variantImages = arr;          
        }      
    }else
    {
      this.variantImages = [];
    }
    // ------------------ description ------------------  
    if(productInstance.description == null || productInstance.description == undefined ||productInstance.description =='&nbsp;')
      {
        this.productDescription = '<ul><li> No Desription available for this product</li></ul>';
      }else
      {
        this.productDescription = productInstance.description;
      }
      this.temp_other_images =  this.variantImages;
     // --------- availability in stock -------------

    
   

    this.productFlag= productInstance.productFlag;

    if(this.productFlag !== 'simple_product')
    {
      this.productStock = true;
    }else
      if(this.productFlag === 'simple_product')
      {
       if(productInstance.qty !== '0.0000'){
           this.productStock = true;
         } else {
           this.productStock = false;
         } 
      }
   
     this.tempStock = this.productStock;
    if(this.productFlag ==='color_size_variant' || 
     
     this.productFlag ==='color_variant' && productInstance.sku.length > 13)
  {    
  
        this.dummySku = productInstance.sku.slice(0, -4);
  }else{
    this.dummySku = productInstance.sku;
  }

    // --------- size and color obj---------------
    if(this.productFlag === 'color_size_variant' && productInstance._size_object != undefined)
      {       
          this.productSize = productInstance._size_object;
      }      
        // ----------------------
        if(productInstance.sizes !== undefined && productInstance.sizes.length != 0 
          && this.productFlag !== 'color_size_variant')
          {
           this.productSize =productInstance.sizes ;
          }
                
          // -----------------------------
          if(this.productFlag === 'color_size_variant' && productInstance. _color_object != undefined)
            {
                this.productColor = productInstance. _color_object.colors;
            }
            // ---------------------------------------
          if(productInstance.color_array !== undefined && productInstance.color_array != null
             && this.productFlag !== 'color_size_variant')
          {
              this.productColor = productInstance.color_array;
          }
   
    this.productID = productInstance.product_id;
      // ----------- check the flag and extract the color ----
      if(this.productFlag === 'color_size_variant' || this.productFlag === 'color_variant')
        {
             
             $.each( this.productColor, (key, val) => {
                     if(val.product_id === $self.productID)
                        {
                          $self.default_color_display = val.value;
                          $self.selectedColor = parseInt(val.value) ;
                          $self.productColorId =parseInt(val.id);
                        }
             });
             if(this.default_color_display !== undefined && this.default_color_display !== null)
             {
              this.defaultSelectedColor = this.default_color_display.toString();
             }
            
        }
    this.getMeta(this.productImageDetailed);
   
    this.productPrice = productInstance.price;
    this.originalPrice =  this.productPrice;
    this.productSpecialPrice =productInstance.special_price;
    this.originalSpecialPrice =  this.productSpecialPrice;

     // ----------------- discount and prices ---
            if(this.productPrice!= false)
              {
                  if(this.productSpecialPrice != undefined)
                      {               
                                  if (this.productPrice >= this.productSpecialPrice) {
                                      this._discountFlag = false;
                                      this.productPrice = this.productPrice;                               
                                  } else
                                      if (this.productSpecialPrice >this.productPrice) {
                                          this._discountFlag = true;
                                          this.productSpecialPrice = this.productSpecialPrice;
                                      }
                                        
                      }   

              }else
              {
                  this._discountFlag = false;
                  this.productPrice = 0;
                  this.productDiscountVal = 0 ;
              }  
           
              // ---- filter out all out of stocks when reloading the page ---
              if(this.productSize != undefined && this.productSize.length != 0 && this.productSize != null)
              {
                let assistantSizeArray = [], obj ={} ;
               
                $.each(this.productSize, (key, value) => {
                  if(value.qty !== "0.0000")
                  {
                    obj = value ; 
                    assistantSizeArray.push(obj);              
                  }             
                })
               this.productSize = [];
               this.productSize = assistantSizeArray;       
              }

              if(this.productColor != undefined && this.productColor!= null && this.productColor.length != 0)
              {
                let assistantColorArray = [], obj ={} ;
                $.each(this.productColor, (key, value) => {
                  if(value.qty !== "0.0000")
                  {
                    obj = value ; 
                    assistantColorArray.push(obj);              
                  }             
                })
               this.productColor = [];
               this.productColor = assistantColorArray;  
              }
              // ----------- filtration ends ----------------
              this.productDiscountVal = Math.trunc((1 - (this.productSpecialPrice/this.productPrice )) * 100);              
              this.productDiscountVal = Math.abs(this.productDiscountVal);
              this.originalDisc =  this.productDiscountVal;

             $('#loading').hide();
         
			 // google structured data objects
			let s = this._renderer2.createElement('script');
			s.type = 'application/ld+json';
			let constJson = {
					"@context": "https://schema.org",
					"@type": "Product",
					  "name": this.productName,
					  //"name": "some great product",
					  "image": [
						this.productMetaImg
					   ],
					  /*"brand": {
						"@type": "Thing",
						"name": "ACME"
					  },*/
					  "aggregateRating": {
						"@type": "AggregateRating",
						"ratingValue": "4.4",
						"ratingCount": "89"
					  },
					  "offers": {
						"@type": "AggregateOffer",
						"lowPrice": this.productPrice,
						"highPrice": this.productPrice,
						"priceCurrency": "AED"
					  }
				};	
			s.innerHTML = JSON.stringify(constJson, null, 2);
			this.elementRef.nativeElement.appendChild(s);	
             // ----------- appending span element for prerendering -----------
             $('#productDetailLoader').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                                           
 }
  showSizeChart() {
    this.productAttributesService.getProductSizeChart().subscribe(data => {

      for(let sizeChartVal of data.options) {
        if(sizeChartVal.value == this.sizeChartValue.value) {
          this.sizeChartLabel = sizeChartVal.label;
        }
      }
      if(this.sizeChartLabel == "Tops") {
          
      } else if(this.sizeChartLabel == "Bottoms") {
        
      }

    })
  }


  // changeImg(source) {
  //   var largeImage = document.getElementById('prod-img-big');
  //   largeImage.setAttribute( 'src', source );
  // }

  changeImg(source) {
    var largeImage = document.getElementById('prod-img-big');
    this.getMeta(source);
  }

  selectColor(color) {
    this.selectedColor = color;
    this.colorNotSelected = false;
    $('.label-c').removeClass('selected');
    $('#color-'+color).addClass('selected')

  }

  //----------- size handling ---------------
  handleSelectedValueFromDropDownSize(size)
  {
    let self= this, price =this.productPrice, special_price, qty, inStock, _size = 0,size_id, size_value, sizeValueTobeSent ="", sku ="";
   
   //------ flushing global variables -------
   this.productSizeId ="";
  
   this.qtyMessage = false;
   this. productQty = 1;
   this.avalaible_qty = 1;
   this._selection_flag = true ;
   this.selectedSize = null ;

    $.each(this.productSize, (key, value) =>
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
          this.productID = value.productId;
        };  
   });
  
   this.productSizeId =parseInt(size_id);
   //this.productSize =size_value;
 let discount;
 if(special_price != undefined && inStock != undefined)
    {   
        if(special_price !== false && special_price != undefined)
            {
                if (price >= special_price) {
                    this._discountFlag = false;
                    this.productPrice = price;
                } else
                    if (special_price >price) {
                        this._discountFlag = true;
                        this.productSpecialPrice = special_price;
                    }
                   
                    let   str: any= this.productDiscountVal ;
                   if(str == "NaN")
                    {
                        this._discountFlag = false;
                        this.productDiscountVal = 0 ;
                    }         
            }
    }
    this.productPrice = price;
    this.productSpecialPrice = special_price;
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
            this.productStock=this.tempStock;
            this._selection_flag = false ;
            this.productSku = "";
            this.cartButtonState = true;

             this.productPrice = this.originalPrice;
             this.productDiscountVal = this.originalDisc;
             this.productSpecialPrice = this.originalSpecialPrice;
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
        this.cartMessage = false;
        this.loggerMessage = "";
        this.addingToCart = false;

  }
  selectSize(size) {
    this.selectedSize = size;
    this.sizeNotSelected = false;
   
  }

  decreaseQty() {
    
    this.cartMessage = false;
    this.loggerMessage = "" ;
    if(this.productQty > 0) {
      this.productQty = parseInt(this.productQty)-1;
    } else { this.productQty = 0; }

    if(this.productQty == 0)
    {
        this.cartButtonState = true;
    }else
    if(  this._selection_flag == true || this.productFlag == 'color_variant'|| 
      this.productFlag === 'simple_product' || this.cartFlag === 'cartEdit')
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
        this.cartMessage = false;
        this.loggerMessage = "" ;
        this.productQty =parseInt(this.productQty)+1;
       
        if(this._selection_flag == true || this.productFlag === 'color_variant'
         || this.productFlag === 'simple_product' || this.cartFlag === 'cartEdit')
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
   this.cartMessage = false;
   this.loggerMessage = "";
    if( this._selection_flag == false)
        {
            this.sizeNotSelected = true ;
        }

    if(this.productFlag === 'simple_product' || this.productFlag === 'color_variant')
      {
        this.sizeNotSelected = false;
      }

      if(this.cartFlag === 'cartEdit')
      {
        this.sizeNotSelected = false;
      }
    if(this.sizeNotSelected === false || this.sizeNotSelected === null)
    {
        $('#loading').show();
        this.addingToCart =true;
        if(localStorage.getItem('customerToken') === null) {
          if(localStorage.getItem('shopGuestCartId') === null) {
              this.addProductCartService.getCartGuestId().subscribe(data => {
                localStorage.setItem('shopGuestCartId', data);
               $('#loading').hide();
    
                // -------- if simple product
          
              
                if( this.productFlag !== undefined && this.productFlag === 'simple_product') {
                    let productAttr = { 
                      "cartItem" : 
                        {
                          "sku" : this.productSku,
                          "qty" : this.productQty,
                          "quoteId" : localStorage.getItem('shopGuestCartId') 
                        }
                    };   
                    
                    if(this.cartFlag !== 'cartEdit')
                    {  
                       // ------- Check for quantity -----------------
                     this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                      {
                      //  this.generalAvailableQty 
                      $('#loading').hide();                           
                       if(payload.data !== undefined && payload.data !== null)
                       {
                         if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                         {
                          if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                          { 
                           this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                             
                               this.addingToCart =false;
                               this.cartMessage = false;
                               this.loggerMessage = "";
                               $('#loading').hide();
                               $('.minicart-update').click();
                               $('#cartModal').modal('show');
                               if(this.wishlistNotificationFlag === "wishList")
                               {
                                 this.removeItem(this.wishlistItemId);
                               }                             
                               this.notWishList = true;
                               setTimeout(() => {
                                 $('#cartModal').modal('hide');
                               }, 2000);
                         
                             }, (err) =>
                           {
                             this.cartMessage = true;
                             this.loggerMessage = err;
                             this.addingToCart =false;
                             $('#loading').hide();
                          
                           });
                          
                          }else
                          {
                              this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                          } 
                         }else{
                           this.notifyUserOutOfStock();
                         }                         
                        }else
                          {
                              this.showAddToCartError(this.productName);
                          }  
                    },err => {
                      $('#loading').hide();
                       console.log(err)
                    });                    
                  }else
                  {
                    
                    if(localStorage.getItem('customerToken') === null) {
                       let cartId = localStorage.getItem('shopGuestCartId');
                       this.checkoutService.deleteGuestCartItem(cartId, this.itemId).subscribe(data => {
                       
                        // -------------- if deleted -------------
                         // ------- Check for quantity -----------------
                     this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                      {
                      //  this.generalAvailableQty 
                      $('#loading').hide();                           
                       if(payload.data !== undefined && payload.data !== null)
                       {
                         if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                         {
                          if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                          { 
                           this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                             
                               this.addingToCart =false;
                               this.cartMessage = false;
                               this.loggerMessage = "";
                               $('#loading').hide();
                               $('.minicart-update').click();
                               this.updateItemId();
                               $('#cartModal').modal('show');
                               if(this.wishlistNotificationFlag === "wishList")
                               {
                                 this.removeItem(this.wishlistItemId);
                               }                             
                               this.notWishList = true;
                               setTimeout(() => {
                                 $('#cartModal').modal('hide');
                               }, 2000);
                         
                             }, (err) =>
                           {
                             this.cartMessage = true;
                             this.loggerMessage = err;
                             this.addingToCart =false;
                             $('#loading').hide();
                          
                           });
                          
                          }else
                          {
                              this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                          } 
                         }else{
                           this.notifyUserOutOfStock();
                         }                         
                        }else
                          {
                              this.showAddToCartError(this.productName);
                          }  
                    },err => {
                      $('#loading').hide();
                       console.log(err)
                    }); 
                      }, err => {
                        $('#loading').hide();
                        console.error(err)});
                    } else {
                      // -------- remove if user loged in
                      let  cartId = localStorage.getItem('shopCartId');
                      this.checkoutService.deleteCustomerCartItem(this.itemId).subscribe(data => {

                           // -------------- if deleted -------------
                         // ------- Check for quantity -----------------
                     this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                      {
                      //  this.generalAvailableQty 
                      $('#loading').hide();                           
                       if(payload.data !== undefined && payload.data !== null)
                       {
                         if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                         {
                          if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                          { 
                           this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                             
                               this.addingToCart =false;
                               this.cartMessage = false;
                               this.loggerMessage = "";
                               $('#loading').hide();
                               $('.minicart-update').click();
                               this.updateItemId();
                               $('#cartModal').modal('show');
                               if(this.wishlistNotificationFlag === "wishList")
                               {
                                 this.removeItem(this.wishlistItemId);
                               }                             
                               this.notWishList = true;
                               setTimeout(() => {
                                 $('#cartModal').modal('hide');
                               }, 2000);
                         
                             }, (err) =>
                           {
                             this.cartMessage = true;
                             this.loggerMessage = err;
                             this.addingToCart =false;
                             $('#loading').hide();
                          
                           });
                          
                          }else
                          {
                              this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                          } 
                         }else{
                           this.notifyUserOutOfStock();
                         }                         
                        }else
                          {
                              this.showAddToCartError(this.productName);
                          }  
                          },err => {
                            $('#loading').hide();
                            console.log(err)
                          }); 
                          }, err => {
                            $('#loading').hide();
                            console.error(err)});
                  };
                  }
                       
                // -------------- if configurable product --------------    
              } else if(this.productFlag !== undefined  && 
                this.productFlag === 'color_variant' || this.productFlag === "size_variant"
                 || this.productFlag === "color_size_variant") {
                // ---- check if attributes are selected 
                if(this.cartFlag !== 'cartEdit')
                {
                  if(this.productFlag === 'color_variant')
                  {                     
                      if(this.selectedColor == null || this.selectedColor == 0) {
                       
                        $('#loading').hide();
                        this.colorNotSelected = true;
                        return ;
                      }
                  }else
                  if( this.productFlag === 'size_variant')
                      {                     
                          if(this.selectedSize == null || this.selectedSize == 0) {
                        
                            $('#loading').hide();
                            this.sizeNotSelected = true;
                            return ;
                          }
                      }else
                        {
                            //--------------- if color and size variant -----------
                          if(this.selectedColor == null || this.selectedColor ==0) {                             
                              this.colorNotSelected = true;
                              $('#loading').hide();
                              return ;
                            }
                          if(this.selectedSize == null || this.selectedSize == 0) {                              
                              this.sizeNotSelected = true;
                              $('#loading').hide();
                              return ;
                        }  
                        
                    }

                    // --------------- add to cart --------------
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
                          this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                            {
                                $('#loading').hide();                            
                                 if(payload.data !== undefined && payload.data !== null)
                                 {
                                  if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                  {
                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    { 
                                     this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                       
                                           this.addingToCart =false;
                                           this.cartMessage = false;
                                           this.loggerMessage = "";
                                           $('#loading').hide();
                                           $('.minicart-update').click();
                                           $('#cartModal').modal('show');
                                           if(this.wishlistNotificationFlag === "wishList")
                                           {
                                             this.removeItem(this.wishlistItemId);
                                           }  
                                           this.notWishList = true;
                                           setTimeout(() => {
                                             $('#cartModal').modal('hide');
                                           }, 2000);
                                         }, (err) =>
                                         {
                                           this.cartMessage = true;
                                           this.addingToCart =false;
                                           this.loggerMessage = err;
                                           $('#loading').hide();
                                 
                                         }); 
                                     }else
                                   {
                                       this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                   } 
                                  }else
                                  {
                                    this.notifyUserOutOfStock();
                                  }                                       
                                 }else
                                   {
                                       this.showAddToCartError(this.productName);
                                   }  
                             },err => {
                              $('#loading').hide();
                               console.log(err)
                             });                           
                        }
                     }else
                     {

                      if(localStorage.getItem('customerToken') === null) {
                        let cartId = localStorage.getItem('shopGuestCartId');
                         this.checkoutService.deleteGuestCartItem(cartId, this.itemId).subscribe(data => {
                          // ------------------- when removed ------------
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
                          this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                            {
                                $('#loading').hide();                            
                                 if(payload.data !== undefined && payload.data !== null)
                                 {
                                  if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                  {
                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    { 
                                     this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                       
                                           this.addingToCart =false;
                                           this.cartMessage = false;
                                           this.loggerMessage = "";
                                           $('#loading').hide();
                                           $('.minicart-update').click();
                                            this.updateItemId();
                                           $('#cartModal').modal('show');
                                           if(this.wishlistNotificationFlag === "wishList")
                                           {
                                             this.removeItem(this.wishlistItemId);
                                           }  
                                           this.notWishList = true;
                                           setTimeout(() => {
                                             $('#cartModal').modal('hide');
                                           }, 2000);
                                         }, (err) =>
                                         {
                                           this.cartMessage = true;
                                           this.addingToCart =false;
                                           this.loggerMessage = err;
                                           $('#loading').hide();
                                 
                                         }); 
                                     }else
                                   {
                                       this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                   } 
                                  }else
                                  {
                                    this.notifyUserOutOfStock();
                                  }                                       
                                 }else
                                   {
                                       this.showAddToCartError(this.productName);
                                   }  
                             },err => {
                              $('#loading').hide();
                               console.log(err)
                             });
                        }, err => {
                          $('#loading').hide();
                          console.error(err)});
                      } else {
                        // -------- remove if user loged in
                        let  cartId = localStorage.getItem('shopCartId');
                        this.checkoutService.deleteCustomerCartItem(this.itemId).subscribe(data => {
                          
                             // ------------------- when removed ------------
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
                          this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                            {
                                $('#loading').hide();                            
                                 if(payload.data !== undefined && payload.data !== null)
                                 {
                                  if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                  {
                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    { 
                                     this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                       
                                           this.addingToCart =false;
                                           this.cartMessage = false;
                                           this.loggerMessage = "";
                                           $('#loading').hide();
                                           $('.minicart-update').click();
                                           this.updateItemId();
                                           $('#cartModal').modal('show');
                                           if(this.wishlistNotificationFlag === "wishList")
                                           {
                                             this.removeItem(this.wishlistItemId);
                                           }  
                                           this.notWishList = true;
                                           setTimeout(() => {
                                             $('#cartModal').modal('hide');
                                           }, 2000);
                                         }, (err) =>
                                         {
                                           this.cartMessage = true;
                                           this.addingToCart =false;
                                           this.loggerMessage = err;
                                           $('#loading').hide();
                                 
                                         }); 
                                     }else
                                   {
                                       this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                   } 
                                  }else
                                  {
                                    this.notifyUserOutOfStock();
                                  }                                       
                                 }else
                                   {
                                       this.showAddToCartError(this.productName);
                                   }  
                             },err => {
                              $('#loading').hide();
                               console.log(err)
                             });
                            }, err => {
                              $('#loading').hide();
                              console.error(err)});
                    };
                     }             
                     
              }
    
               // end configurable product add
              });
          // ------------------- if cart id exists ------------------- 
          } else {
            //  ------------------- if simple product --------------
            if(this.productFlag !== undefined  && this.productFlag === 'simple_product') {

              let productAttr = { 
                "cartItem" : 
                  {
                    "sku" : this.productSku,
                    "qty" : this.productQty,
                    "quoteId" : localStorage.getItem('shopGuestCartId') 
                  }
              };
              if(this.cartFlag !== 'cartEdit')
              {
                this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                  {                        
                       if(payload.data !== undefined && payload.data !== null)
                       {
                        if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                        {

                          if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                          {                            
                           this.addProductCartService.addItemToCart(productAttr).subscribe(data => {                             
                                this.addingToCart =false;
                                this.cartMessage = false;
                                this.loggerMessage = "";
                                $('#loading').hide();
                                $('.minicart-update').click();
                                $('#cartModal').modal('show');
                                if(this.wishlistNotificationFlag === "wishList")
                                {
                                  this.removeItem(this.wishlistItemId);
                                }  
                                this.notWishList = true;
                                setTimeout(() => {
                                  $('#cartModal').modal('hide');
                                }, 2000);
                              
                              }, (err) =>
                              {
                                this.cartMessage = true;
                                this.addingToCart =false;
                                this.loggerMessage = err;
                                $('#loading').hide();
                             
                              });
                          }else
                         {
                             this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                         } 
                        }else
                        {
                          this.notifyUserOutOfStock();
                        }                         
                        }else
                         {
                             this.showAddToCartError(this.productName);
                         }  
                   },err => {
                     console.log(err)
                   }); 
              }else{

                if(localStorage.getItem('customerToken') === null) {
                  let cartId = localStorage.getItem('shopGuestCartId');
                   this.checkoutService.deleteGuestCartItem(cartId, this.itemId).subscribe(data => {
                    this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                      {                        
                           if(payload.data !== undefined && payload.data !== null)
                           {
                            if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                            {
    
                              if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                              {                            
                               this.addProductCartService.addItemToCart(productAttr).subscribe(data => {                             
                                    this.addingToCart =false;
                                    this.cartMessage = false;
                                    this.loggerMessage = "";
                                    $('#loading').hide();
                                    $('.minicart-update').click();
                                    this.updateItemId();
                                    $('#cartModal').modal('show');
                                    if(this.wishlistNotificationFlag === "wishList")
                                    {
                                      this.removeItem(this.wishlistItemId);
                                    }  
                                    this.notWishList = true;
                                    setTimeout(() => {
                                      $('#cartModal').modal('hide');
                                    }, 2000);
                                  
                                  }, (err) =>
                                  {
                                    this.cartMessage = true;
                                    this.addingToCart =false;
                                    this.loggerMessage = err;
                                    $('#loading').hide();
                                 
                                  });
                              }else
                             {
                                 this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                             } 
                            }else
                            {
                              this.notifyUserOutOfStock();
                            }                         
                            }else
                             {
                                 this.showAddToCartError(this.productName);
                             }  
                       },err => {
                         console.log(err)
                       }); 

                  }, err => {
                    $('#loading').hide();
                    console.error(err)});
                } else {
                  // -------- remove if user loged in
                  let  cartId = localStorage.getItem('shopCartId');
                  this.checkoutService.deleteCustomerCartItem(this.itemId).subscribe(data => {
                    
                    this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                      {                        
                           if(payload.data !== undefined && payload.data !== null)
                           {
                            if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                            {
    
                              if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                              {                            
                               this.addProductCartService.addItemToCart(productAttr).subscribe(data => {                             
                                    this.addingToCart =false;
                                    this.cartMessage = false;
                                    this.loggerMessage = "";
                                    $('#loading').hide();
                                    $('.minicart-update').click();
                                    this.updateItemId();
                                    $('#cartModal').modal('show');
                                    if(this.wishlistNotificationFlag === "wishList")
                                    {
                                      this.removeItem(this.wishlistItemId);
                                    }  
                                    this.notWishList = true;
                                    setTimeout(() => {
                                      $('#cartModal').modal('hide');
                                    }, 2000);
                                  
                                  }, (err) =>
                                  {
                                    this.cartMessage = true;
                                    this.addingToCart =false;
                                    this.loggerMessage = err;
                                    $('#loading').hide();
                                 
                                  });
                              }else
                             {
                                 this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                             } 
                            }else
                            {
                              this.notifyUserOutOfStock();
                            }                         
                            }else
                             {
                                 this.showAddToCartError(this.productName);
                             }  
                       },err => {
                         console.log(err)
                       }); 
                      }, err => {
                        $('#loading').hide();
                        console.error(err)});
                 };
              }
             
                             
            // if configurable product    
            } else if(this.productFlag !== undefined  && 
                this.productFlag === 'color_variant' || this.productFlag === "size_variant" ||
                 this.productFlag === "color_size_variant") {
      
                // --------------- check if attributes are selected --------------
                if(this.cartFlag !== 'cartEdit')
                {
                  if( this.productFlag === 'color_variant')
                  {                  
                      if(this.selectedColor === null || this.selectedColor == 0) {
                       
                        $('#loading').hide();
                        this.colorNotSelected = true;
                        
                      }
                  }else
                  if( this.productFlag === 'size_variant')
                      {
                       
                          if(this.selectedSize == null|| this.selectedSize == 0 ) {
                       
                            $('#loading').hide();
                            this.sizeNotSelected = true;
                            return ;
                          }
                      }else
                        {
                            // --------------- if color and size variant -----------
                          if(this.selectedColor == null || this.selectedColor == 0) {                             
                              this.colorNotSelected = true;
                              $('#loading').hide();
                              return ;
                            }
                          if(this.selectedSize == null  || this.selectedSize == 0) {                              
                              this.sizeNotSelected = true;
                              $('#loading').hide();
                              return ;
                        }  
                        
                    }

                    // ------------- add to cart --------------
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
                          this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                            {  
                                $('#loading').hide();                       
                                 if(payload.data !== undefined && payload.data !== null)
                                 {
                                   if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                   {

                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    { 
                                     this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                       
                                           this.addingToCart =false;
                                           this.cartMessage = false;
                                           this.loggerMessage = "";
                                           $('#loading').hide();
                                           $('.minicart-update').click();
                                           $('#cartModal').modal('show');
                                           if(this.wishlistNotificationFlag === "wishList")
                                           {
                                             this.removeItem(this.wishlistItemId);
                                           }  
                                           this.notWishList = true;
                                           setTimeout(() => {
                                             $('#cartModal').modal('hide');
                                           }, 2000);
                                         }, (err) =>
                                         {
                                           this.cartMessage = true;
                                           this.loggerMessage = err;
                                           this.addingToCart =false;
                                           $('#loading').hide();
                                      
                                         });  
                                     }else
                                   {
                                       this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                   } 
                                   }else
                                   {
                                    this.notifyUserOutOfStock();
                                   }
                                     
                                 }else
                                   {
                                       this.showAddToCartError(this.productName);
                                   }  
                             },err => {
                              $('#loading').hide();
                               console.log(err)
                             });                      
                         };
                         // ------------ add ends ------------------
                       }else{  
                              if(localStorage.getItem('customerToken') === null) {
                             let cartId = localStorage.getItem('shopGuestCartId');
                             this.checkoutService.deleteGuestCartItem(cartId, this.itemId).subscribe(data => {
                           // ----------- if successfuly removed ------------
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
                          this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                            {  
                                $('#loading').hide();                       
                                 if(payload.data !== undefined && payload.data !== null)
                                 {
                                   if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                   {

                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    { 
                                     this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                       
                                           this.addingToCart =false;
                                           this.cartMessage = false;
                                           this.loggerMessage = "";
                                           $('#loading').hide();
                                           $('.minicart-update').click();
                                           this.updateItemId();
                                           $('#cartModal').modal('show');
                                           if(this.wishlistNotificationFlag === "wishList")
                                           {
                                             this.removeItem(this.wishlistItemId);
                                           }  
                                           this.notWishList = true;
                                           setTimeout(() => {
                                             $('#cartModal').modal('hide');
                                           }, 2000);
                                         }, (err) =>
                                         {
                                           this.cartMessage = true;
                                           this.loggerMessage = err;
                                           this.addingToCart =false;
                                           $('#loading').hide();
                                      
                                         });  
                                     }else
                                   {
                                       this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                   } 
                                   }else
                                   {
                                    this.notifyUserOutOfStock();
                                   }
                                     
                                 }else
                                   {
                                       this.showAddToCartError(this.productName);
                                   }  
                             },err => {
                              $('#loading').hide();
                               console.log(err)
                             }); 
                             // ------------------- ends -----------------------
                          }, err => {
                            $('#loading').hide();
                            console.error(err)});
                        } else {
                          // -------- remove if user loged in
                          let  cartId = localStorage.getItem('shopCartId');
                          this.checkoutService.deleteCustomerCartItem(this.itemId).subscribe(data => {
                            // ----------- if successfuly removed ------------

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
                            this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                              {  
                                  $('#loading').hide();                       
                                   if(payload.data !== undefined && payload.data !== null)
                                   {
                                     if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                     {
  
                                      if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                      { 
                                       this.addProductCartService.addItemToCart(productAttr).subscribe(data => {
                                         
                                             this.addingToCart =false;
                                             this.cartMessage = false;
                                             this.loggerMessage = "";
                                             $('#loading').hide();
                                             $('.minicart-update').click();
                                             this.updateItemId();
                                             $('#cartModal').modal('show');
                                             if(this.wishlistNotificationFlag === "wishList")
                                             {
                                               this.removeItem(this.wishlistItemId);
                                             }  
                                             this.notWishList = true;
                                             setTimeout(() => {
                                               $('#cartModal').modal('hide');
                                             }, 2000);
                                           }, (err) =>
                                           {
                                             this.cartMessage = true;
                                             this.loggerMessage = err;
                                             this.addingToCart =false;
                                             $('#loading').hide();
                                        
                                           });  
                                       }else
                                     {
                                         this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                     } 
                                     }else
                                     {
                                      this.notifyUserOutOfStock();
                                     }
                                       
                                   }else
                                     {
                                         this.showAddToCartError(this.productName);
                                     }  
                               },err => {
                                $('#loading').hide();
                                 console.log(err)
                               }); 
                               // ------------------- ends -----------------------
                              }, err => {
                                $('#loading').hide();
                                console.error(err)});
                           };
                       }
                    }
                   
             // --------------- end configurable product add  
          } // -------- end if cart id exists
        // check if customer user  
        } else if(localStorage.getItem('customerToken') !== null) {
          
            if(localStorage.getItem('shopCartId') === null) {
                $('#loading').show();
               this.addProductCartService.getCartId().subscribe(data => {
  
                 $('#loading').hide();
                localStorage.setItem('shopCartId', data);
              }, err => {
                 
                      $('#loading').hide();
              }, () => {
                // if simple product
                $('#loading').show();
                if(this.productFlag !== undefined  || this.productFlag === 'simple_product') {
              
                    let productAttr = { 
                      "cartItem" : 
                        {
                          "quote_id": localStorage.getItem('shopCartId'),
                          "sku" : this.productSku,
                          "qty" : this.productQty,
                         // "quoteId" : localStorage.getItem('shopGuestCartId') 
                        }
                    };
                 
                    if(this.cartFlag !== 'cartEdit')
                    {
                      this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                        {  
                            $('#loading').hide();                       
                             if(payload.data !== undefined && payload.data !== null)
                             {
                              if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                              {
  
                                if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                {  
                                 this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                   
                                           this.addingToCart =false;
                                           this.cartMessage = false;
                                           this.loggerMessage = "";
                                           $('#loading').hide();
                                           $('.minicart-update').click();
                                          $('#cartModal').modal('show');
                                          if(this.wishlistNotificationFlag === "wishList")
                                          {
                                            this.removeItem(this.wishlistItemId);
                                          }  
                                          this.notWishList = true;
                                          setTimeout(() => {
                                           $('#cartModal').modal('hide');
                                         }, 2000);
                                        
                                         }, (err) =>
                                         {
                                           $('#loading').hide();
                                           this.cartMessage = false;
                                           this.loggerMessage = err;
                                           this.addingToCart =false;
                                       
                                         });
                               }else
                               {
                                   this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                               } 
                              }else
                              {
                                this.notifyUserOutOfStock();
                              }                              
                               }else
                               {
                                   this.showAddToCartError(this.productName);
                               }  
                         },err => {
                          $('#loading').hide();
                           console.log(err)
                         });
                    }else{

                      if(localStorage.getItem('customerToken') === null) {
                        let cartId = localStorage.getItem('shopGuestCartId');
                         this.checkoutService.deleteGuestCartItem(cartId, this.itemId).subscribe(data => {
                         
                          this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                            {  
                                $('#loading').hide();                       
                                 if(payload.data !== undefined && payload.data !== null)
                                 {
                                  if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                  {
      
                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    {  
                                     this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                       
                                               this.addingToCart =false;
                                               this.cartMessage = false;
                                               this.loggerMessage = "";
                                               $('#loading').hide();
                                               $('.minicart-update').click();
                                               this.updateItemId();
                                              $('#cartModal').modal('show');
                                              if(this.wishlistNotificationFlag === "wishList")
                                              {
                                                this.removeItem(this.wishlistItemId);
                                              }  
                                              this.notWishList = true;
                                              setTimeout(() => {
                                               $('#cartModal').modal('hide');
                                             }, 2000);
                                            
                                             }, (err) =>
                                             {
                                               $('#loading').hide();
                                               this.cartMessage = false;
                                               this.loggerMessage = err;
                                               this.addingToCart =false;
                                           
                                             });
                                   }else
                                   {
                                       this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                   } 
                                  }else
                                  {
                                    this.notifyUserOutOfStock();
                                  }                              
                                   }else
                                   {
                                       this.showAddToCartError(this.productName);
                                   }  
                             },err => {
                              $('#loading').hide();
                               console.log(err)
                             });
                        }, err => {
                          $('#loading').hide();
                          console.error(err)});
                      } else {
                        // -------- remove if user loged in
                        let  cartId = localStorage.getItem('shopCartId');
                        this.checkoutService.deleteCustomerCartItem(this.itemId).subscribe(data => {
                         
                          this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                            {  
                                $('#loading').hide();                       
                                 if(payload.data !== undefined && payload.data !== null)
                                 {
                                  if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                  {
      
                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    {  
                                     this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                       
                                               this.addingToCart =false;
                                               this.cartMessage = false;
                                               this.loggerMessage = "";
                                               $('#loading').hide();
                                               $('.minicart-update').click();
                                               this.updateItemId();
                                              $('#cartModal').modal('show');
                                              if(this.wishlistNotificationFlag === "wishList")
                                              {
                                                this.removeItem(this.wishlistItemId);
                                              }  
                                              this.notWishList = true;
                                              setTimeout(() => {
                                               $('#cartModal').modal('hide');
                                             }, 2000);
                                            
                                             }, (err) =>
                                             {
                                               $('#loading').hide();
                                               this.cartMessage = false;
                                               this.loggerMessage = err;
                                               this.addingToCart =false;
                                           
                                             });
                                   }else
                                   {
                                       this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                   } 
                                  }else
                                  {
                                    this.notifyUserOutOfStock();
                                  }                              
                                   }else
                                   {
                                       this.showAddToCartError(this.productName);
                                   }  
                             },err => {
                              $('#loading').hide();
                               console.log(err)
                             });
                            }, err => {
                              $('#loading').hide();
                              console.error(err)});
                    };
                    }
                            
                   
                // --------------- if configurable product  ----------------  
              } else if(this.productFlag !== undefined  && 
                this.productFlag === 'color_variant' || this.productFlag === "size_variant" ||
                 this.productFlag === "color_size_variant") {

                // ---------- check if attributes are selected and not editing ----------
                if(this.cartFlag !== 'cartEdit')
                {
                  if( this.productFlag === 'color_variant')
                  {
                      
                      if(this.selectedColor === null ) {
                     
                        $('#loading').hide();
                        this.colorNotSelected = true;
                        return ;
                      }
                  }else
                  if( this.productFlag === 'size_variant')
                      {
                      
                          if(this.selectedSize == null ) {
                          
                            $('#loading').hide();
                            this.sizeNotSelected = true;
                            return ;
                          }
                      }else
                        {
                            // --------------- if color and size variant -----------
                          if(this.selectedColor == null ) {                             
                              this.colorNotSelected = true;
                              $('#loading').hide();
                              return ;
                            }
                          if(this.selectedSize == null ) {                              
                              this.sizeNotSelected = true;
                              $('#loading').hide();
                              return ;
                        }   
                        }

                        // --------- add to cart -----------
                        $('#loading').show();
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
                                  this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                                    {
                                        $('#loading').hide();                          
                                         if(payload.data !== undefined && payload.data !== null)
                                         {
                                          if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                          {

                                            if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                            { 

                                             this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                               
                                                     this.addingToCart =false;
                                                     this.cartMessage = false;
                                                     this.loggerMessage = "";
                                                     $('#loading').hide();
                                                     $('.minicart-update').click();
                                                     $('#cartModal').modal('show');
                                                     if(this.wishlistNotificationFlag === "wishList")
                                                     {
                                                       this.removeItem(this.wishlistItemId);
                                                     }  
                                                     this.notWishList = true;
                                                     setTimeout(() => {
                                                       $('#cartModal').modal('hide');
                                                     }, 2000);
                                                   }, (err) =>
                                                   {
                                                     $('#loading').hide();
                                                     this.addingToCart =false;
                                                     this.cartMessage = false;
                                                     this.loggerMessage = err;
                                                
                                                   });   
                                           }else
                                           {
                                               this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                           } 
                                          }else
                                          {
                                            this.notifyUserOutOfStock();
                                          }
                                             
                                           }else
                                           {
                                               this.showAddToCartError(this.productName);
                                           }  
                                     },err => {
                                      $('#loading').hide();
                                       console.log(err)
                                     });                                   
                                }  
                            }else
                            {
                              if(localStorage.getItem('customerToken') === null) {
                                let cartId = localStorage.getItem('shopGuestCartId');
                                 this.checkoutService.deleteGuestCartItem(cartId, this.itemId).subscribe(data => {
                                  // ------------ upon success deletion ---------------
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
                                  this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                                    {
                                        $('#loading').hide();                          
                                         if(payload.data !== undefined && payload.data !== null)
                                         {
                                          if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                          {

                                            if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                            { 

                                             this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                               
                                                     this.addingToCart =false;
                                                     this.cartMessage = false;
                                                     this.loggerMessage = "";
                                                     $('#loading').hide();
                                                     $('.minicart-update').click();
                                                     this.updateItemId();
                                                     $('#cartModal').modal('show');
                                                     if(this.wishlistNotificationFlag === "wishList")
                                                     {
                                                       this.removeItem(this.wishlistItemId);
                                                     }  
                                                     this.notWishList = true;
                                                     setTimeout(() => {
                                                       $('#cartModal').modal('hide');
                                                     }, 2000);
                                                   }, (err) =>
                                                   {
                                                     $('#loading').hide();
                                                     this.addingToCart =false;
                                                     this.cartMessage = false;
                                                     this.loggerMessage = err;
                                                
                                                   });   
                                           }else
                                           {
                                               this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                           } 
                                          }else
                                          {
                                            this.notifyUserOutOfStock();
                                          }
                                             
                                           }else
                                           {
                                               this.showAddToCartError(this.productName);
                                           }  
                                     },err => {
                                      $('#loading').hide();
                                       console.log(err)
                                     }); 
                                }, err => {
                                  $('#loading').hide();
                                  console.error(err)});
                              } else {
                                // -------- remove if user loged in
                                let  cartId = localStorage.getItem('shopCartId');
                                this.checkoutService.deleteCustomerCartItem(this.itemId).subscribe(data => {
                                  // ------------ upon success deletion ---------------
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
                                  this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                                    {
                                        $('#loading').hide();                          
                                         if(payload.data !== undefined && payload.data !== null)
                                         {
                                          if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                          {

                                            if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                            { 

                                             this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                               
                                                     this.addingToCart =false;
                                                     this.cartMessage = false;
                                                     this.loggerMessage = "";
                                                     $('#loading').hide();
                                                     $('.minicart-update').click();
                                                     this.updateItemId();
                                                     $('#cartModal').modal('show');
                                                     if(this.wishlistNotificationFlag === "wishList")
                                                     {
                                                       this.removeItem(this.wishlistItemId);
                                                     }  
                                                     this.notWishList = true;
                                                     setTimeout(() => {
                                                       $('#cartModal').modal('hide');
                                                     }, 2000);
                                                   }, (err) =>
                                                   {
                                                     $('#loading').hide();
                                                     this.addingToCart =false;
                                                     this.cartMessage = false;
                                                     this.loggerMessage = err;
                                                
                                                   });   
                                           }else
                                           {
                                               this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                           } 
                                          }else
                                          {
                                            this.notifyUserOutOfStock();
                                          }
                                             
                                           }else
                                           {
                                               this.showAddToCartError(this.productName);
                                           }  
                                     },err => {
                                      $('#loading').hide();
                                       console.log(err)
                                     }); 

                                     // ----------------- ends --------------------------

                                    }, err => {
                                      $('#loading').hide();
                                      console.error(err)});
                                  };
                            }
                                   
                            // end configurable product add
                    } 
              });
          // if cart id exists  
            } else {
               // ------------------- if simple product
          
              $('.lading').show();
              if(this.productFlag !== undefined  && this.productFlag === 'simple_product') {
                  let productAttr = { 
                    "cartItem" : 
                      {
                        "sku" : this.productSku,
                        "qty" : this.productQty,
                        "quote_id" : localStorage.getItem('shopCartId') 
                      }
                  };
                  if(this.cartFlag !== 'cartEdit')
                  {
                    this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                      {
                        
                          $('#loading').hide();                          
                           if(payload.data !== undefined && payload.data !== null)
                           {
                            if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                            {
                              if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                              {
                               this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {                             
                                      this.addingToCart =false;
                                      this.cartMessage = false;
                                      this.loggerMessage = "";
                                      $('#loading').hide();
                                      $('.minicart-update').click();
                                     $('#cartModal').modal('show');
                                     if(this.wishlistNotificationFlag === "wishList")
                                     {
                                       this.removeItem(this.wishlistItemId);
                                     }  
                                     this.notWishList = true;
                                     setTimeout(() => {
                                      $('#cartModal').modal('hide');
                                    }, 2000);
                                   
                                    }, (err) =>
                                    {
                                      $('#loading').hide();
                                      this.cartMessage = true;
                                      this.loggerMessage = err;
                                      this.addingToCart =false;
                                  
                                    });
                             }else
                             {
                                 this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                             } 
                              }else
                              {
                                this.notifyUserOutOfStock();
                              }                          
                             }else
                             {
                                 this.showAddToCartError(this.productName);
                             }  
                       },err => {
                        $('#loading').hide();
                         console.log(err)
                       });
                  }else{

                    if(localStorage.getItem('customerToken') === null) {
                      let cartId = localStorage.getItem('shopGuestCartId');
                       this.checkoutService.deleteGuestCartItem(cartId, this.itemId).subscribe(data => {
                       
                        this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                          {
                            
                              $('#loading').hide();                          
                               if(payload.data !== undefined && payload.data !== null)
                               {
                                if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                {
                                  if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                  {
                                   this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {                             
                                          this.addingToCart =false;
                                          this.cartMessage = false;
                                          this.loggerMessage = "";
                                          $('#loading').hide();
                                          $('.minicart-update').click();
                                          this.updateItemId();
                                         $('#cartModal').modal('show');
                                         if(this.wishlistNotificationFlag === "wishList")
                                         {
                                           this.removeItem(this.wishlistItemId);
                                         }  
                                         this.notWishList = true;
                                         setTimeout(() => {
                                          $('#cartModal').modal('hide');
                                        }, 2000);
                                       
                                        }, (err) =>
                                        {
                                          $('#loading').hide();
                                          this.cartMessage = true;
                                          this.loggerMessage = err;
                                          this.addingToCart =false;
                                      
                                        });
                                 }else
                                 {
                                     this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                 } 
                                  }else
                                  {
                                    this.notifyUserOutOfStock();
                                  }                          
                                 }else
                                 {
                                     this.showAddToCartError(this.productName);
                                 }  
                           },err => {
                            $('#loading').hide();
                             console.log(err)
                           });
                      }, err => {
                        $('#loading').hide();
                        console.error(err)});
                    } else {
                      // -------- remove if user loged in
                      let  cartId = localStorage.getItem('shopCartId');
                      this.checkoutService.deleteCustomerCartItem(this.itemId).subscribe(data => {
                          
                        this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                          {
                            
                              $('#loading').hide();                          
                               if(payload.data !== undefined && payload.data !== null)
                               {
                                if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                {
                                  if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                  {
                                   this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {                             
                                          this.addingToCart =false;
                                          this.cartMessage = false;
                                          this.loggerMessage = "";
                                          $('#loading').hide();
                                          $('.minicart-update').click();
                                          this.updateItemId();
                                         $('#cartModal').modal('show');
                                         if(this.wishlistNotificationFlag === "wishList")
                                         {
                                           this.removeItem(this.wishlistItemId);
                                         }  
                                         this.notWishList = true;
                                         setTimeout(() => {
                                          $('#cartModal').modal('hide');
                                        }, 2000);
                                       
                                        }, (err) =>
                                        {
                                          $('#loading').hide();
                                          this.cartMessage = true;
                                          this.loggerMessage = err;
                                          this.addingToCart =false;
                                      
                                        });
                                 }else
                                 {
                                     this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                 } 
                                  }else
                                  {
                                    this.notifyUserOutOfStock();
                                  }                          
                                 }else
                                 {
                                     this.showAddToCartError(this.productName);
                                 }  
                           },err => {
                            $('#loading').hide();
                             console.log(err)
                           });
                          }, err => {
                            $('#loading').hide();
                            console.error(err)});
                  };
                  }
                        

               
              // if configurable product    
              } else if(this.productFlag !== undefined  && 
                this.productFlag === 'color_variant' || this.productFlag === "size_variant" ||
                 this.productFlag === "color_size_variant")
                {      
                  // check if attributes are selected
                  if(this.cartFlag !== 'cartEdit')
                  {
                    // ---------- if color variant -------------
                    if( this.productFlag === 'color_variant')
                    {                     
                        if(this.selectedColor === null ) {
                        
                          $('#loading').hide();
                          this.colorNotSelected = true;
                          return ;
                        }
                    }else
                    if( this.productFlag === 'size_variant')
                        {              
                            if(this.selectedSize == null ) {
                         
                              $('#loading').hide();
                              this.sizeNotSelected = true;
                              return ;
                            }
                        }else
                          {
                              // --------------- if color and size variant -----------
                            if(this.selectedColor == null ) {                             
                                this.colorNotSelected = true;
                                $('#loading').hide();
                                return ;
                              }
                            if(this.selectedSize == null ) {                              
                                this.sizeNotSelected = true;
                                $('#loading').hide();
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
                          this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                            {
                                $('#loading').hide();                          
                                 if(payload.data !== undefined && payload.data !== null)
                                 {
                                  if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                  {

                                    if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                    {
                                   
                                     this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {
                                       
                                             this.addingToCart =false;
                                             this.cartMessage = false;
                                             this.loggerMessage = "";
                                             $('#loading').hide();
                                             $('.minicart-update').click();
                                             $('#cartModal').modal('show');
                                            if(this.wishlistNotificationFlag === "wishList")
                                            {
                                              this.removeItem(this.wishlistItemId);
                                            }  
                                            this.notWishList = true;
                                            setTimeout(() => {
                                             $('#cartModal').modal('hide');
                                           }, 2000);
                                           }, (err) =>
                                           {
                                             $('#loading').hide();
                                             this.cartMessage = true;
                                             this.loggerMessage = err;
                                             this.addingToCart =false;
                                         
                                           });    
                                    }else
                                    {
                                        this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                    } 
                                  }else
                                  {
                                    this.notifyUserOutOfStock();
                                  }
                                     
                                   }else
                                   {
                                       this.showAddToCartError(this.productName);
                                   }  
                             },err => {
                              $('#loading').hide();
                               console.log(err)
                             });      
                          };
                  }else
                  {
                     // ------ remove the item from cart and re-add it ----
                     if(localStorage.getItem('customerToken') === null) {
                      let cartId = localStorage.getItem('shopGuestCartId');
                       this.checkoutService.deleteGuestCartItem(cartId, this.itemId).subscribe(data => {
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
                            this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                              {
                                  $('#loading').hide();                          
                                   if(payload.data !== undefined && payload.data !== null)
                                   {
                                    if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                    {

                                      if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                      {
                            
                                            this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {                                      
                                               this.addingToCart =false;
                                               this.cartMessage = false;
                                               this.loggerMessage = "";
                                               $('#loading').hide();
                                               $('.minicart-update').click();
                                               this.updateItemId();                                         
                                               $('#cartModal').modal('show');
                                              if(this.wishlistNotificationFlag === "wishList")
                                              {
                                                this.removeItem(this.wishlistItemId);
                                              }  
                                              this.notWishList = true;
                                              setTimeout(() => {
                                               $('#cartModal').modal('hide');
                                             }, 2000);
                                             }, (err) =>
                                             {
                                               $('#loading').hide();
                                               this.cartMessage = true;
                                               this.loggerMessage = err;
                                               this.addingToCart =false;
                                           
                                             });    
                                     }else
                                     {
                                         this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                     } 
                                    }else
                                    {
                                      this.notifyUserOutOfStock();
                                    }
                                       
                                     }else
                                     {
                                         this.showAddToCartError(this.productName);
                                     }  
                               },err => {
                                $('#loading').hide();
                                 console.log(err)
                               });      
        
                      }, err => {
                        $('#loading').hide();
                        console.error(err)});
                    } else {
                      // -------- remove if user loged in
                      let  cartId = localStorage.getItem('shopCartId');
                      this.checkoutService.deleteCustomerCartItem(this.itemId).subscribe(data => {
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
                            this.categoryListProductService.supplierQuantityUpdate(this.productID).subscribe(payload =>  
                              {
                                  $('#loading').hide();                          
                                   if(payload.data !== undefined && payload.data !== null)
                                   {
                                    if(Math.trunc(parseInt(payload.data[0].quantity)) > 0)
                                    {

                                      if( this.productQty <= Math.trunc(parseInt(payload.data[0].quantity)))
                                      {
                                     
                                       this.addProductCartService.addItemToCustomerCart(productAttr).subscribe(data => {                                       
                                               this.addingToCart =false;
                                               this.cartMessage = false;
                                               this.loggerMessage = "";
                                               $('#loading').hide();
                                               $('.minicart-update').click();
                                               this.updateItemId();
                                               $('#cartModal').modal('show');
                                              if(this.wishlistNotificationFlag === "wishList")
                                              {
                                                this.removeItem(this.wishlistItemId);
                                              }  
                                              this.notWishList = true;
                                              setTimeout(() => {
                                               $('#cartModal').modal('hide');
                                             }, 2000);
                                             }, (err) =>
                                             {
                                               $('#loading').hide();
                                               this.cartMessage = true;
                                               this.loggerMessage = err;
                                               this.addingToCart =false;                                         
                                             });    
                                     }else
                                     {
                                         this.notifyUserAboutQty(this.productName, Math.trunc(parseInt(payload.data[0].quantity)));
                                     } 
                                    }else
                                    {
                                      this.notifyUserOutOfStock();
                                    }
                                       
                                     }else
                                     {
                                         this.showAddToCartError(this.productName);
                                     }  
                               },err => {
                                $('#loading').hide();
                                 console.log(err)
                               });      
                          }, err => {
                            $('#loading').hide();
                            console.error(err)});
                  }; // end remove form cart
                  }
                       
                              } // end configurable product add 
                    }

        };
      
    }
    // check if guest user
  
  } // add to cart

  goToWishlist() {
   // $('#wishModal').modal('hide');
    this.router.navigate(['/wishlist']);
  }
  setGlobalFlag()
  {
    localStorage['routeChanged'] = 'false';
  }

  // ------------ notify user about available qtys ---------
  notifyUserAboutQty(itemName, qty)
  {
      $('#wishModalDetail').modal('show');
      this.wishNotif = "Sorry, We don't have as many ("+ itemName+
      ") as you requested, we have only ("+qty+") in stock";
      setTimeout(function() {
      $('#wishModalDetail').modal('hide');
      this.wishNotif = ""
      }, (2000));
      
      this.addingToCart = false;
      this.cartMessage = false;
      this.loggerMessage = "" ;
      $('#loading').hide();
  }
  

    // ------------ show erro ----------
    showAddToCartError(itemName)
    {
      $('#wishModalDetail').modal('show');
      this.wishNotif = "Oooops, error occured while adding ("+itemName+
      ") to cart, please try again .";
      setTimeout(function() {
      $('#wishModalDetail').modal('hide');
      this.wishNotif = ""
      }, (2000)); 
  
      this.addingToCart = false;
      this.cartMessage = false;
      this.loggerMessage = "" ;
      $('#loading').hide();
    }

    notifyUserOutOfStock()
    {
        this.productStock = false;
        this.cartButtonState = true;
        $('#wishModalDetail').modal('show');
        this.wishNotif = "Sorry, this product is out of stock.";
        setTimeout(function() {
        $('#wishModalDetail').modal('hide');
        this.wishNotif = ""
        }, (4000));  
        this.addingToCart = false;
        this.cartMessage = false;
        this.loggerMessage = "" ;
        $('#loading').hide();
    }
  // ------------- notification ends --------------------

  addToWishlist(id) {
       $('#loading').show();
      if(localStorage.getItem('customerToken') === null) {
          $('.sider-layer').css('display', 'block');
          $('#cart_wrap').addClass('blur');
          $('#header').addClass('blur');
          $('.row').addClass('blur'); 
          $('#mm').click();
          $('#loading').hide();
      } else {
          this.wishlistService.addToWishlist(id).subscribe(data => {
        
             $('#loading').hide();
             $('.wishlist-update').click();
             $('#wishModal').modal('show');

             setTimeout(()=> {
              $('#wishModal').modal('hide');
             }, 2000);
        }, err => {
            $('#loading').hide();
        
        }
        );
      }
     }

     // ------------ remove item from cart and re-add it ------------
     removeItemFromCart(prodId) {
      $('#loading').show();
      if(localStorage.getItem('customerToken') === null) {
        let cartId = localStorage.getItem('shopGuestCartId');
         this.checkoutService.deleteGuestCartItem(cartId, prodId).subscribe(data => {
          console.log('success ....' , data);
        }, err => {
          $('#loading').hide();
          console.error(err)});
      } else {
        // -------- remove if user loged in
        let  cartId = localStorage.getItem('shopCartId');
        this.checkoutService.deleteCustomerCartItem(prodId).subscribe(data => {
          console.log('success ....' , data);
            }, err => {
              $('#loading').hide();
              console.error(err)});
    }; // end remove form cart
  
  }

  // ------------------ update item id ---------------
  updateItemId()
  {
    if(localStorage.getItem('customerToken') === null) {
      if(localStorage.getItem('shopGuestCartId') != null) {
        this.checkoutService.getGuestCart(localStorage.getItem('shopGuestCartId')).subscribe(data => {
          for(let item of data) {
               this.itemId = item.item_id; 
             }
          $('#loading').hide();
        }, err => {
          $('#loading').hide();
          });
       }
    } else {
        this.checkoutService.getCustomerCart().subscribe(data => {
          for(let item of data) {
            if(item.sku === this.productSku)
             this.itemId = item.item_id;        
           }
        $('#loading').hide();
      }, err => {
        $('#loading').hide();
          });
  
    }
  }
}
