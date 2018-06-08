import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  categoryLevel =[];
  selectedItem:any;
  rootPathName:String = "";

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.rootPathName =  route.url['value'][0].path;
  }

  excludeSpecialCharacter(string)
  {
      if(string != undefined && string != null)
      {
          return string.replace(/[^\w\s]/gi," ")
      }else
      {
        return string;
      }
  }

  ngOnInit() {
      this.route.params.forEach(params => {
        //empty breadcrumbs array
        this.categoryLevel = [];
    
        //add elements to breadcrumbs array
        if(this.route.snapshot.params['category'] != undefined) {
            this.categoryLevel.push(this.excludeSpecialCharacter(this.route.snapshot.params['category']))
        } 
        if(this.route.snapshot.params['subcategory'] != undefined) {
            this.categoryLevel.push(this.excludeSpecialCharacter(this.route.snapshot.params['subcategory']))
        } 
        if(this.route.snapshot.params['subcategory2'] != undefined) {
            this.categoryLevel.push( this.excludeSpecialCharacter(this.route.snapshot.params['subcategory2']))
        }
       
    });   

    //conse.log('breadcumb is -->'+  this.categoryLevel)
  } //end ngOnInit
  



}
