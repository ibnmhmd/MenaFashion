import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalVar } from '../../globals';
declare var $:any;

import 'rxjs/add/operator/map';
@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.css']
})
export class MainBannerComponent implements OnInit {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  bannerData;
  bannerImages =[];
  imgPath =[];

  constructor(private route: ActivatedRoute, private http: Http, private router: Router, private sanitizer: DomSanitizer) { }
 
  ngOnInit() {
   // $('#loading').show();
   
      let headers = new Headers();
      //headers.append('Content-Type', 'application/json');
      // return this.http.get(this.baseApiUrl + 'rest/V1/Custom/name/slider',
      // { headers: headers }).map(res => res.json()).subscribe(data => {
      //  this.bannerData = data;
      // console.log(this.bannerData);

      // setTimeout(function() {
      //   var isMulti = ($('.owl-carousel .item').length > 1) ? true : false
      //   $('.banner-carousel').owlCarousel({
			// 		loop: isMulti,
			// 		animateIn: 'fadeIn',
			// 		animateOut: 'fadeOut',
			// 		margin:0,
			// 		nav:false,
      //     dots:true,
			// 		responsive:{
			// 			0:{
			// 				items:1
			// 			},
			// 			600:{
			// 				items:1
			// 			},
			// 			1000:{
			// 				items:1
			// 			}
			// 		}
			// 	});
      // }, 1);
      
      
      // $('#loading').hide();

      // })
  }

  ngAfterViewInit() {
    
  }
  ngOnDestroy() {
    
  }
  

}
