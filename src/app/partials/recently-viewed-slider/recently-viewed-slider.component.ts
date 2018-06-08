import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { WishlistService } from '../../services/wishlist.service';
import { GlobalVar } from '../../globals';
declare var $:any;

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-recently-viewed-slider',
  templateUrl: './recently-viewed-slider.component.html',
  styleUrls: ['./recently-viewed-slider.component.css'],
  providers: [WishlistService]
})
export class RecentlyViewedSliderComponent implements OnInit {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  numberOfProducts = '9';
  recentlyViewed;
  displayItems: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private http: Http, 
    private router: Router, 
    private sanitizer: DomSanitizer,
    private wishlistService: WishlistService
     
    ) { }

  ngOnInit() {
    
    if(localStorage.getItem('customerToken') !== null) {
      this.displayItems = false;
      let body = new FormData(); 
      body.append('count', this.numberOfProducts);
      body.append('customer_id', localStorage.getItem('customerId'));
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('customerToken')
      });
      let options = new RequestOptions({headers: headers});
      
      this.http.post(this.baseApiUrl + 'rest/V1/custom/recent/products/',body, {headers: headers} ).map(res => res.json()).catch(err => Observable.throw(err.json()|| "Error loading stuffs . . .")).subscribe(data => {
        this.recentlyViewed = data;

        setTimeout(function() {
          $('.product-slider').owlCarousel({
            loop:true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            margin:25,
            nav:true,
            dots:false,
            navText:["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"],
            responsive:{
              0:{
                items:1
              },
              600:{
                items:2,
                margin:5,
              },
              1000:{
                items:4
              }
            }
          });
        }, 10);
      },(err) => {
       // console.log('Error loading recently viewed  . . .'+err.json())
        });
    }  else { this.displayItems = false; } 
 
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
  addToWishlist(id) {
      $('.loader').show();
      if(localStorage.getItem('customerToken') === null) {
          $('#mm').click();
      } else {
          this.wishlistService.addToWishlist(id).subscribe(data => {
            $('.loader').hide();
            console.log(data)
        }, err => {
            console.log(err)
        }
        );
      }
  }

}
