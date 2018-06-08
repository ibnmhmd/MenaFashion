import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';
import {GlobalVar} from '../globals'
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
declare var $:any;
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-category-landing-page',
  templateUrl: './category-landing-page.component.html',
  styleUrls: ['./category-landing-page.component.css'],
  providers: [    
    NavigationService,
    CategoryListProductService,
    WishlistService,
    ProductAttributesService,
    ProductDetailService,
    AddProductCartService,
    CookieService
    ]
})
export class CategoryLandingPageComponent implements OnInit {


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
  filterOptions;
  productStock;
  productLoad = false;
  loaderImage: string = "";
  productSku;
  productData;
  productQty = 1;
  productDiscountVal;

  productImage;
  productSize;
  productColor;
  productSizeId;
  productColorId;
  mytable;
  selectedColor = null;
  selectedSize = null;

  colorNotSelected = false;
  sizeNotSelected = false;
  selectedBrands2:string ="";
  selectedAttr;
  selectedBrand;
  selectedPrice;
  selectedOrder;
  sortOrder; 
  checkedBrands = [];
  colorShow = false;
  brandShow = false;
  priceShow = false;
  sizeShow = false;
  sortShow = false;
  private _routeScrollPositions: {[url: string] : number}[] = [];
  private _subscriptions: Subscription[] = [];
  //--------- Added By Amine ------
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
pageName:string = "";
landingPageContent:any ;
titleName: string = "";

constructor(private route: ActivatedRoute,
  private http: Http,
  private router: Router,
  private navigationService: NavigationService,
  private categoryListProductService: CategoryListProductService,
  private wishlistService: WishlistService,
  private productAttributesService: ProductAttributesService,
  private productDetailService: ProductDetailService,
  private addProductCartService: AddProductCartService,
  private singleProductDetailsService: SingleProductDetailsService, private  _sanitizer: DomSanitizer,private titleService:Title) {}


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
  
 // -------------- exclude any special character from the url------
excludeSpecialCharacter(string)
{
    if(string != undefined && string != null)
    {
        return string.replace(/[^\w\s]/gi," ")
    }
   return string;
}
  ngOnInit() {
    $('#loading').show();
    $('.sider-layer').css('display', 'none');
        $('#cart_wrap').removeClass('blur');
        $('#header').removeClass('blur');
        $('.row').removeClass('blur');
        $('.close-sidr').click();

    this.selectedAttr = {};
     this.route.params.forEach(params => {
         this.searchedItem = this.route.snapshot.params['category'];  
         // ---- scroll browser to top upon route change -----
         window.scrollTo(0,0);
         //empty breadcrumbs array
         this.categoryLevel = [];
     
         //add elements to breadcrumbs array
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
 
      
        this.pageName = this.route.snapshot.params['category'];

        this.navigationService.getMenuCategories().subscribe(data => {  

         var arrayData = data.children_data;
         var out = [];
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
         //cone.log('out obj', out)
         var elementIndex = out.findIndex(x => x.name==this.excludeSpecialCharacter(this.route.snapshot.params['category']));
         //cone.log('index', elementIndex)
 
        if(typeof this.route.snapshot.params['subcategory'] == 'undefined' && typeof this.route.snapshot.params['subcategory2'] == 'undefined' ) {
            this.categoryId = out[elementIndex]['id'];
             //cone.log(this.categoryId);
 
             this.selectedAttr.cat_id = this.categoryId;
 
             //cone.log('sub and sub 2 undefined');
 
             this.productPath = "";
             this.productPath = this.route.snapshot.params['category'].replace(/\s+/g, '-');
             //cone.log(this.productPath);
        } else if(typeof this.route.snapshot.params['subcategory2'] == 'undefined') {
            //second level category
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
             this.categoryId = outSubcat[elementIndexSubcat]['id'];
             this.selectedAttr.cat_id = this.categoryId;
             //cone.log(this.categoryId);
             //cone.log('sub2 undefined');
             this.productPath = "";
             this.productPath = this.route.snapshot.params['category'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory'].replace(/\s+/g, '-');
             //cone.log(this.productPath);
 
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
           
            //cone.log(outSubcat+'i<----d');
            //cone.log('sub2 defined');
            this.productPath = "";
            this.productPath = this.route.snapshot.params['category'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory'].replace(/\s+/g, '-') + '/' + this.route.snapshot.params['subcategory2'].replace(/\s+/g, '-');
            //------------Added By Amine -----------
            this.selectedCategoryTag = this.route.snapshot.params['subcategory'].replace(/\s+/g, '-');
            this.selectedCategoryTag =  this.selectedCategoryTag.charAt(0).toUpperCase()+this.selectedCategoryTag.slice(1);
 
            //cone.log(this.productPath + ' and new tag is -->'+this.selectedCategoryTag);
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
             var elementIndexSubcat2 = outSubcat2.findIndex(x => x.name== this.excludeSpecialCharacter (this.route.snapshot.params['subcategory2']));
            
                     this.categoryId = outSubcat2[elementIndexSubcat2]['id'];
               
            // //cone.log('-->'+ outSubcat2[elementIndexSubcat2]['id'])
           
             this.selectedAttr.cat_id = this.categoryId;
             //cone.log(this.categoryId)
 
        };
         this.navigationService.getMenuCategories().subscribe( data => {
         for( var i = 0, l=data.children_data.length; i<l; i++ ) {
             this.navigationLinks.push(data.children_data[i]);
         } 
 
         this.subcategories = this.navigationLinks[elementIndex];
         $('#loading').hide();
     }); 
 
      
     }); 

     if(this.pageName.toLowerCase() === 'men')
      {
        this.landingPageContent = "";
        this.navigationService.getLandingPage(GlobalVar.MENS_LANDING_PAGE).subscribe(data =>{
            if(data.results.content != undefined && data.results.content!= null)
              {                   
                this.landingPageContent =data.results.content;
                if(data.results.meta_title !== "" && data.results.meta_title !== undefined)
                {
                    this.titleService.setTitle(data.results.meta_title);
                }else{
                    this.titleService.setTitle('menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more');
                }
                $('.landingHolder').html( this.landingPageContent);
                $('.landingHolder').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                                 
                $('#loading').hide();
              }

        },err => {
          //cone.error(err)
          $('#loading').hide();
        })
      }else
      if(this.pageName.toLowerCase() === 'women')
        {          
            this.landingPageContent = "";
          this.navigationService.getLandingPage(GlobalVar.WOMEN_LANDING_PAGE).subscribe(data =>{
            if(data.results.content != undefined && data.results.content!= null)
              {
                this.landingPageContent =data.results.content;
                if(data.results.meta_title !== "" && data.results.meta_title !== undefined)
                {
                    this.titleService.setTitle(data.results.meta_title);
                }else{
                    this.titleService.setTitle('menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more');
                }
                $('.landingHolder').html( this.landingPageContent);
                $('.landingHolder').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                                  
                $('#loading').hide();
              }
          },err => {
            //cone.error(err);
            $('#loading').hide();
          })
        }else
        if(this.pageName.toLowerCase() === 'kids')
          {
            this.landingPageContent = "";
            this.navigationService.getLandingPage(GlobalVar.KIDS_LANDING_PAGE).subscribe(data =>{
              if(data.results.content != undefined && data.results.content!= null)
                {
                  this.landingPageContent =data.results.content;
                  if(data.results.meta_title !== "" && data.results.meta_title !== undefined)
                  {
                      this.titleService.setTitle(data.results.meta_title);
                  }else{
                      this.titleService.setTitle('menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more');
                  }
                  $('.landingHolder').html( this.landingPageContent);
                  $('.landingHolder').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                     
                  
                  $('#loading').hide();
                }
    
            },err => {
              //cone.error(err);
              $('#loading').hide();
            })
          }else
          if(this.pageName.toLowerCase() === 'beauty')
            {
              this.landingPageContent = "";
                 this.navigationService.getLandingPage(GlobalVar.BEAUTY_LANDING_PAGE).subscribe(data =>{
                  if(data.results.content != undefined && data.results.content!= null)
                    {
                      this.landingPageContent =data.results.content;
                      if(data.results.meta_title !== "" && data.results.meta_title !== undefined)
                      {
                          this.titleService.setTitle(data.results.meta_title);
                      }else{
                          this.titleService.setTitle('menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more');
                      }
                      $('.landingHolder').html( this.landingPageContent);
                      $('.landingHolder').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                                         
                      $('#loading').hide();
                    }
              },err => {
                //cone.error(err);
                $('#loading').hide();
              })
            } else
            if(this.pageName.toLowerCase() === 'grooming')
              {
                  this.landingPageContent = "";
                   this.navigationService.getLandingPage(GlobalVar.GROOMING_LANDING_PAGE).subscribe(data =>{
                    if(data.results.content != undefined && data.results.content!= null)
                      {
                        this.landingPageContent =data.results.content;
                        if(data.results.meta_title !== "" && data.results.meta_title !== undefined)
                        {
                            this.titleService.setTitle(data.results.meta_title);
                        }else{
                            this.titleService.setTitle('menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more');
                        }
                        $('.landingHolder').html( this.landingPageContent);
                        $('.landingHolder').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                                             
                        $('#loading').hide();
                      }
                },err => {
                  $('#loading').hide();
                })
              }else
              if(this.pageName.toLowerCase() === 'sale')
              {
                this.landingPageContent = '';
                this.navigationService.getLandingPage(GlobalVar.SALE_LANDING_PAGE).subscribe(data =>{
                 if(data.results.content !== undefined && data.results.content !== null)
                   {
                     this.landingPageContent =data.results.content;
                     if(data.results.meta_title !== '' && data.results.meta_title !== undefined)
                     {
                         this.titleService.setTitle(data.results.meta_title);
                     }else{
                         this.titleService.setTitle('menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more');
                     }
                     $('.landingSaleHolder').html( this.landingPageContent);
                     $('.landingSaleHolder').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');                                                                                                             
                     $('#loading').hide();
                   }
             },err => {
               $('#loading').hide();
             })
              }

              
     }); // check if params changed

     //---------------- redirection base on the category selected --------------
    } 

      // -------------- check the side panel chidren data if empty then redirects to the corresponding category ---
  normalizeCategoryName(name)
  {
      if(name !== undefined && name !== null)
      {
        return  name.replace(/[^A-Z0-9]/ig, "-");
      }else
            {
                return name;
            }
  }
  checkChildrenDataAndRedirect(panelChildrenData, parentCategory, panelNode)
  {
   if(panelChildrenData.length == 0)
   {     
        this.router.navigate(['/shop/'+parentCategory.toLowerCase()+'/'+this.normalizeCategoryName(panelNode).toLowerCase()])
   }
  }
}
