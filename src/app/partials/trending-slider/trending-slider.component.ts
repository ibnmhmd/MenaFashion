import {Renderer, Component, OnInit, Pipe, PipeTransform, AfterViewInit, OnDestroy,ElementRef,
  AfterContentChecked, AfterViewChecked, AfterContentInit, ViewChild  } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalVar } from '../../globals';
import { NavigationService } from '../../services/navigation.service';

declare var $:any;

import 'rxjs/add/operator/map';







@Component({
  selector: 'app-trending-slider',
  templateUrl: './trending-slider.component.html',
  styleUrls: ['./trending-slider.component.css'],
  providers: [NavigationService]
})
export class TrendingSliderComponent implements OnInit, AfterContentChecked,
 AfterViewInit , AfterViewChecked, AfterContentInit, OnDestroy{
 
  private baseApiUrl = GlobalVar.BASE_API_URL;
  private landingPagePath = GlobalVar.LANDING_PAGE_URL;
  titleName: string = "";
  miniBannerData;
  landingPageContent:any;
  miniBannerData2;
  tst = [];
  imgf = [];
  fid = [];
  data3 = [];
  landingPage:any= "";

  constructor(private route: ActivatedRoute, private http: Http, 
    private router: Router, private sanitizer: DomSanitizer,
    private navigationService: NavigationService,private elRef: ElementRef, private rendered: Renderer) { }

    @ViewChild('landingPage') page:ElementRef;
// ------------- after component get rendered ------------
    ngAfterViewInit(): void
     {   

    }

    ngAfterViewChecked(): void {
    
    }
   
    ngAfterContentInit(): void {

    }
  
    ngAfterContentChecked()
    {
    
    }

    ngOnDestroy()
    {
 
    }
  ngOnInit() {
          window.scroll(0,0);
          setTimeout(function() {
            var isMulti = ($('.owl-carousel .item').length > 1) ? true : false
            $('.banner-carousel').owlCarousel({
              loop: isMulti,
              animateIn: 'fadeIn',
              animateOut: 'fadeOut',
              margin:0,
              nav:false,
              dots:true,
              responsive:{
                0:{
                  items:1
                },
                600:{
                  items:1
                },
                1000:{
                  items:1
                }
              }
            });
          }, 1);
          
          this.titleName = 'menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more';
          let headers = new Headers();
         this.navigationService.getLandingPage(this.landingPagePath).subscribe(data =>
            {             
               if(data !== undefined && data.results != undefined)
               {
                // let jsonParser = JSON.parse(data.results);
                 this.landingPageContent =data.results.content;
                
                $('#landingPage').html(this.landingPageContent);
             

                $('.landingPage').append('<span class="content-fully-loaded"><!-- content loaded --> </span>');
               }
            })
            
       localStorage['categoriesTotalCount'] = [];
     
      // $('html').not("#header").css("filter","blur(3px)");
       window.scrollTo(0,0);
  }

}
