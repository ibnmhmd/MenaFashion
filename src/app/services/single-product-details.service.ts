import { Injectable } from '@angular/core';

@Injectable()
export class SingleProductDetailsService {
  
   public productInstance:any ={};
   public  productExchangeRate: number ;
   public brandFilter:string = "";
   public exchangeRate:any ;
   public productListingObject:any = [];
   public page=0;
   public brandsArray:any = [];
   public minPrice= 0;
   public maxPrice= 0;
   public totalCount = 0;
   public colorsArray:any = [];
   public titleName: string = "";
  constructor() { }
   public setProductInstance (_instance:any, _exchangeRate: any): void
   {
     this.productInstance = _instance;
     this.productExchangeRate = _exchangeRate;
   }

   isEmpty(object)
   {
     for (var key in object)
     {
       if(object.hasOwnProperty(key))
       {
         return false;
       }
     }

     return true;
   }
   getProductInstance(): any
   {
     return this.productInstance ;
   }

   setBrand(brand)
   {
       this.brandFilter = brand ;
   }

   setExchangeRate(rate)
   {

     this.exchangeRate = rate;
   }

 getExchangeRate()
   {
      return this.exchangeRate;
   }
   getBrand()
   {
       return this.brandFilter;
   }

   setProductListing(_instance)
   {
     if(!this.isEmpty(_instance))
     {
      this.productListingObject = _instance.productInfo;
      this.page =_instance.page;
      this.brandsArray = _instance.brands;
      this.minPrice = _instance.minPrice;
      this.maxPrice = _instance.maxPrice;
      this.totalCount = _instance.totalCount;
      this.colorsArray = _instance.colors;
      this.titleName = _instance.title;
     }else{
      this.productListingObject = [];
      this.page =0;
      this.brandsArray = [];
      this.minPrice =0;
      this.maxPrice = 0;
      this.totalCount = 0;
      this.colorsArray = [];
      this.titleName = '' ;
     }
   }

   getProductListing()
   {
      return this.productListingObject 
   }

   getProductListingPage()
   {
      return this.page 
   }

   getBrandsArray()
   {
     return this.brandsArray;
   }

   getMinPrice()
   {
     return this.minPrice;
   }
   getMaxPrice()
   {
     return this.maxPrice;
   }

   getCount()
   {
     return this.totalCount;
   }
   
   getColorsArray()
   {
     return this.colorsArray;
   }

   getTitleName()
   {
     return this.titleName ;
   }
}
