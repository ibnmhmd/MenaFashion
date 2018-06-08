import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { GlobalVar } from '../globals';
import 'rxjs/add/operator/map';
declare var $:any;

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css'],
  providers: [NavigationService]
})
export class StaticPageComponent implements OnInit {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  page;
  pageData;
  title:string = "";
  titleName:string = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
  constructor(private route: ActivatedRoute,
              private http: Http,
              private router: Router,
              private navigationService: NavigationService
             ) { }

  ngOnInit() {
    this.titleName = "menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more";
    $('#loading').show();
    
    window.scrollTo(0,0);
    //check static page id
    switch (this.router.url) {
      case "/about-us":
          this.page ="";
          this.page = "about-us";
          this.title = "";
          this.title = "About Us";
          break;
      case "/carrer":
      this.page = "carrer";
          this.title = "Carrer";
          break;
      case "/faq":
      this.page ="";
      this.page = "faq";
      this.title = "";
          this.title = "Frequently Asked Questions";
          break;
      case "/terms-of-use":
         this.page = "tou";
          this.title = "Terms and Conditions";
          break;
      case "/privacy-policy":
            this.page = "privacy-policy";
            this.title = "Privacy  Policy";
            break;
      case "/shipping-guide":
      this.page = "shipping-guid";
            this.title = "Shipping Guide";
            break;
     case "/careers":
        this.page ="";
        this.page = "careers";
        this.title = "";
        this.title = "Careers";
         break;
      case "/delivery-time":
      this.page = "delivery-time";
            this.title = "Delivery Time";
            break;
            case "/contact-us":
            this.page ="";
            this.page = "about-us";
            this.title = "";
            this.title = "Contact Us";
            break;
                   
    };

    ///V1/cmsBlock/:blockId

    // this.http.get(this.baseApiUrl + 'rest/V1/cmsPage/' + this.pageId).map(res => res.json()).subscribe(data => {
    //   this.pageData = data;
    //   console.log(data);
     
    // })
    $('#loading').hide();
  } //ngOnInit

}
