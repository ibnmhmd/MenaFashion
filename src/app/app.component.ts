import { Component, Pipe, OnInit } from '@angular/core';

import {ViewEncapsulation} from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import {GoogleAnalyticsEventsService} from "app/services/google-analytics-events.service";
import { Title }     from '@angular/platform-browser';

declare var $:any;
declare let ga: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //pipes: [ PrettyPrintPipe ],

  encapsulation: ViewEncapsulation.None            
})
export class AppComponent implements OnInit{
  public _image;
  titleName: string = "";
  constructor(public router: Router, public googleAnalyticsEventsService: GoogleAnalyticsEventsService, private titleService: Title) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
  
  
  submitEvent() {
    this.googleAnalyticsEventsService.emitEvent("testCategory", "testAction", "testLabel", 10);
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  goToStore()
  {
    $('#myModal').hide();
  }
  ngOnInit(): void {
    
     this.titleName = 'menamall.com: Top UAE fashion destination for Clothes, Shoes, Bags, and more';
	   this.submitEvent();	
   
       if(!localStorage.getItem('firstLoad')) {
     
       }

     // window.location.reload();
  //  } else {
  //      localStorage.removeItem('firstLoad');
  //  }
  // alert(localStorage.getItem('firstLoad'))
   
   // $('#myModal').show();   
    
    // Get the image and insert it inside the modal - use its "alt" text as a caption
   // var img = document.getElementById('myImg');
   // var modalImg = document.getElementById("img01");
   // var captionText = document.getElementById("caption");
    
       // modal.style.display = "block";
      //  modalImg.setAttribute('backgroud-image', this._image);
        
       // captionText.innerHTML = this.alt;
    
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() { 
    //   modal.style.display = "none";
    // }

  }

  
}
