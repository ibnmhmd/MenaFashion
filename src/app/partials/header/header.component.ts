import { Component, OnInit,  AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { WishlistService } from '../../services/wishlist.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { GlobalVar } from '../../globals';
import { SingleProductDetailsService } from '../../services/single-product-details.service';

declare var $ : any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
  providers: [NavigationService, WishlistService]
})
export class HeaderComponent implements OnInit,AfterViewInit {
  private baseApiUrl = GlobalVar.BASE_API_URL;
  navigationLinks = [];
  categoryId = [];
  searchValue;
  indexTab:any = 1;
  showLogout:boolean = false;
  wishListCount: any = 0; 
  mySources; 
  suggestionsObject:any ;
  breadCrumb;
  suggestionArray:any = []; 
  source:any = 'https://api.myjson.com/bins/1amg4d' ;
  public mySource: FormControl;
  availableTags;
  redirectionURL="";
  valueFormText= "";
  displayValue= "";
  notifMessage:any = "";
  loggedOut:boolean = false ;
  hide: boolean = true;
  constructor(
            private route: ActivatedRoute, 
            private router: Router, 
            private navigationService: NavigationService,
            private wishlistService: WishlistService,
            private builder: FormBuilder, private _sanitizer: DomSanitizer,
            private singleProductService: SingleProductDetailsService
            ) { 
   
  }


  ngAfterViewInit(): void {   
    const self = this; 
    
    $('.logoSmall').css('display','none');
    $('.mm-navbar').css('padding', '0 0');
    $('#header > div > div > div.header_main_row.wsdownmenu > div.wsdownmenu-text > a').remove();
    //	for demo only
       $('#imageId').css('marginLeft', '0');
    let height = $('.sectionClass').height();
    $('.mm-opened').css({'top':height+'px !important;'})

    document.addEventListener('click', function()
     {	
        $('.wsdown-mobile').click(function()
        {
          $('.close-sidr').click();
          $('.sider-layer').css('display', 'none');
              $('#cart_wrap').removeClass('blur');
              $('#header').removeClass('blur');
              $('.row').removeClass('blur');
        });
          $('.norecord').hide();
          $( ".suggestionBox" ).keydown(function( event ) 
          {
            self.searchValue = $('.popover #email').val();
            self.keyDownSearch(event);
          });    
        $('.megamenuSmall').click(function()
        {
          $('.megamenuSmall').css('display', 'none');
          $('.first-tabSmall').css('display', 'none');       
        })

        $('#subscribe').click(function(){

          console.log('ccc');
          $('[data-toggle="popover"]').popover('show');
         });
     });  
     document.addEventListener('mouseover', function()
    { 
      if($('.megamenu:hover').length == 0)
      {
        $('.activeList').removeClass('active-list');
      }
    });
    document.addEventListener('scroll', function()
    {
      $('.user-information1').css('display','none');

     
    });  
    if(localStorage.getItem('scrollerPosition') != null && localStorage.getItem('scrollerPosition') != undefined)
    {
          window.scrollTo(0, parseInt(localStorage.getItem('scrollerPosition'))|| 0);
    } 

$("#subscribe").popover({
      trigger: 'manual',
      animate: false,
      placement: 'bottom',
      container: 'body',
      html: true,
      content: function() {
           return $('#popover-form').html();
         }
        }).click(function(e) {      
          e.preventDefault() ;
        }).mouseover(function(e) {
          $(this).stop().popover('show');
        }).on('shown.bs.popover', function() {
          // --------- auto focus on popover opened -----
            $('.popover').find("#email").focus();
      });

     // ------ popover dismiss on scroll
        $(window).on("scroll", function () {
              $('.popover').fadeOut(300);
          });

          // ------------ on keydown -----
          $(window).on('keydown', function(event)
          {
            if($('.popover').hasClass('in'))
            {
              self.searchValue = $('.popover #email').val();
              self.keyDownSearch(event);
            }
          });
}


  getSuggestions()
  {
        this.navigationService.getSuggestions().subscribe(data => {   
       let self =this;
      this.suggestionArray= [];
      if(data != undefined)
        {
          $.each(data, (key, value) => 
          {
             self.suggestionsObject ={};
            if(value.type != undefined && value.type === "category")
              {
                self.suggestionsObject.title = value.title;
                self.suggestionsObject.url = value.url;
                self.suggestionsObject.breadCrumb = value.breadcrumb;
                self.suggestionArray.push(self.suggestionsObject);
              }
          })

          $( ".tags").autocomplete( "option", "source", self.suggestionArray );
      
    }},err=> {//conse.error('error occured . . .')
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

  //---------- parse object -----
  parseSuggestionsResponse(response)
  {
    let self =this;
   
    $.each(response, (key, value) => 
  {
     self.suggestionsObject ={};
    if(value.type != undefined && value.type === "category")
      {
        self.suggestionsObject.title = value.title;
        self.suggestionsObject.url = value.url;
        self.suggestionsObject.breadCrumb = value.breadcrumb;
        self.suggestionArray.push(self.suggestionsObject);
      }
  })

 
  }
  customCallback(event)
  {
    alert(event.target.value)
  }

  /*************** Added by Amine  *********************/
  public removeHoverPopUp(id)
  { 
    $('.first-tab').css('display','none')
  if($('.list-'+id).find('.megamenu').css('visibility') == 'visible') 
  {
    $('.list-'+id).removeClass('active-list');
  }

  localStorage['routeChanged'] = 'true';
  }

  public removeHoverPopUpMain(id)
  { 
    $('.first-tabMain').css('display','none')
  if($('.listMain-'+id).find('.megamenu').css('visibility') == 'visible') 
  {
    $('.listMain-'+id).removeClass('active-list');
  }

  localStorage['routeChanged'] = 'true';
  }

  public searchItem() {
    if(this.searchValue != undefined) { 
     this.router.navigate(['/search/'+this.searchValue]); 
    }
  };


  keyDownSearchMain(event) {
    let self =this;
    $('.norecord').hide();
  
    $( ".tagsMain" ).autocomplete({
      // source: this.baseApiUrl+'/restapis',
      source: 'https://ocs.menamall.com/elastic/IO_brand_suggestion.php?type=all',
      minLength: 3,
      // autoFocus: true,
      // selectFirst: true,
      search: (res)=> {
        $('.imgClass').show();
    },
    response: (event, ui)=> {
       $('.imgClass').hide();
      if(ui.content.length <= 0) 
        {
          $('.norecord').show();
        }else{
          $('.norecord').hide();
        }
  },
      select: function( event, ui ) {
       self.redirectionURL = ui.item.value;
       self.singleProductService.setBrand(ui.item.brand);
       self.searchValue = ui.item.label;
       if(event.keyCode !== 13) 
       {
        self.router.navigate(['/search/'+self.redirectionURL+'/fullMatch']);
       }
       if(self.searchValue.length > 30)
        {
          self.searchValue = self.searchValue.substring(0,20)+'...';
        }else
         {
          self.searchValue = self.searchValue;
         }
       $('.imgClass').hide();
       $('.norecord').hide();
      }
    });
   
    if(event.keyCode == 13) 
    { 
          $('#ui-id-1').css('display', 'none');
           $('.norecord').hide();
           $('.imgClass').hide();
           this.searchItem(); 
    }
}


  keyDownSearch(event) {
    let self =this;
    $('.norecord').hide();
   
    $( ".tags" ).autocomplete({
      // source: this.baseApiUrl+'/restapis',
      source: 'https://ocs.menamall.com/elastic/IO_brand_suggestion.php?type=all',
      minLength: 3,
      search: (res)=> {
        $('.imgClass').show();
    },
    response: (event, ui)=> {
       $('.imgClass').hide();
      if(ui.content.length <= 0) 
        {
          $('.norecord').show();
        }else{
          $('.norecord').hide();
        }
  },
      select: function( event, ui ) {
       self.redirectionURL = ui.item.value;
       self.singleProductService.setBrand(ui.item.brand);
       self.searchValue = ui.item.label;
       if(event.keyCode !== 13) 
       {
        self.router.navigate(['/search/'+self.redirectionURL+'/fullMatch']);
       }
       if(self.searchValue.length > 30)
        {
          self.searchValue = self.searchValue.substring(0,20)+'...';
        }else
         {
          self.searchValue = self.searchValue;
         }
       $('.imgClass').hide();
       $('.norecord').hide();
      }
    });
   
    if(event.keyCode == 13) 
    { 
          $('#ui-id-1').css('display', 'none');
           $('.norecord').hide();
           $('.imgClass').hide();
           this.searchItem(); 
    }
}
  
  showItems(parent, name, pos) {
     $('.sub-item-el').removeClass('active');
     $('#subitem'+ parent + name + pos).addClass('active');
     $('.tab-pane').removeClass('active');
     $('#tab' + parent + name + pos).addClass('active');
    
  }

  showItemsMain(parent, name, pos) {
    $('.sub-item-elMain').removeClass('active');
    $('#subitemMain'+ parent + name + pos).addClass('active');
    $('.tab-paneMain').removeClass('active');
    $('#tabMain' + parent + name + pos).addClass('active');
   
 }

 loginMenu()  {
  if(localStorage.getItem('customerToken') === null || localStorage.getItem('customerToken') === 'undefined') {
 
    if(!this.loggedOut)
    {
      $('#menu').css('display', 'none');
      $('#mm').click();
      $('.sider-layer').css('display', 'block');
      $('#cart_wrap').addClass('blur');
      $('#header').addClass('blur');
      $('.row').addClass('blur');
      this.showLogout = false;
    }else
    {
      this.loggedOut = false;
    }
  } else {
    this.showLogout = true;
  }
}

removeJump()
{
  $('.jump > ul > div > ul > li.user1 > app-mini-cart > div').css('display','none');
  $('.jump > ul > div > ul > li:nth-child(2) > div').css('display','none');
}
  loginMenuMain()  {
    if(localStorage.getItem('customerToken') === null || localStorage.getItem('customerToken') === 'undefined') {
   
      if(!this.loggedOut)
      {
        $('#mm').click();
        $('.sider-layer').css('display', 'block');
        $('#cart_wrap').addClass('blur');
        $('#header').addClass('blur');
        $('.row').addClass('blur');
        this.showLogout = false;
      }else
      {
        this.loggedOut = false;
      }
    } else {
      this.showLogout = true;
    }

    $('.jump > ul > div > ul > li.user > div').css('display', 'none');
  }
  logInPanel() {
    $('#mm').click();
  }
  logOut() {
      $('#logOutModal').modal('show');
      this.loggedOut = true ;
      setTimeout(()=> {
        $('#logOutModal').modal('hide');
      }, 2000);
    $('.close-sidr').click();
    $('#loading').show();
    $('.user-information').hide();
     localStorage.setItem('shopCartId','');
     localStorage.clear();
     this.updateWishList();
   $('#loading').hide();
    $('.minicart-update').click();
      window.location.href = "#/";
  }
  
  setGlobalFlag()
  {
    localStorage['routeChanged'] = 'true';
  }
 
  
  updateWishList()
  {
    if(localStorage.getItem('customerToken') !== null) {
        this.wishlistService.checkWishlist().subscribe(data => { 
          if(data.length != 0)
          { 
              let itemsArray =[];
              $.each(data, (k,v) =>{
                  itemsArray.push(v.product_id);
              });
              localStorage.setItem('wishListIds',itemsArray.toString()); 
              this.wishListCount= data.length;    
          }else {
            this.wishListCount = 0 ;
            localStorage.setItem('wishListIds',''); 
         }

          },(err) => { 
            this.wishListCount = 0 ;
            console.error("Error loading wishlist ..."+err)
            }
        );
     }else
     {  
      this.wishListCount = 0 ;
     }
  }


  wishList() {
    if(this.wishListCount == 0 || this.wishListCount == undefined || this.wishListCount == null)
    {
      $('.wishlist-dropdown').slideDown();
      setTimeout(function() {
          $('.wishlist-dropdown').slideUp();
         }, 2000);    
         
         $('.wishlist-dropdownMain').slideDown();
         setTimeout(function() {
             $('.wishlist-dropdownMain').slideUp();
            }, 2000);  
      this.wishListCount = 0 ;
    }else
    {
      $('#loading').show();      
      this.wishlistService.checkWishlist().subscribe(data => {
        $('#loading').hide();
        if(data != undefined && data != null )
        {
          if(data.length > 0) {
            this.router.navigate(['/wishlist']); 
            this.wishListCount= data.length;
          
        } else {
            this.wishListCount = 0 ;
            $('.wishlist-dropdown').slideDown();
            setTimeout(function() {
            $('.wishlist-dropdown').slideUp();
            }, 2000);

             
         $('.wishlist-dropdownMain').slideDown();
         setTimeout(function() {
             $('.wishlist-dropdownMain').slideUp();
            }, 2000);  
            }
          }         
        },(err) => { 
          this.wishListCount = 0 ;
          $('#loading').hide();
         }
      );
    }
   
  }

  closeDropdown() {
    $('.user-information').hide();
  }
    
  autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.title}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }


  closeTabSecond(len)
  {
    if(len == null || len == 0 || len == '')
    {
      this.closeTab();
    }
  }

  countLength()
  {
    $( ".tags" ).autocomplete({
      source: this.baseApiUrl+'/restapis?searchSuggestion='+this.searchValue,
      minLength: 3,
      select: function( event, ui ) {
      }
    });
  }


  closeTab()
  {
    $('.user-information').hide();
    $('html').removeClass('mm-opened mm-blocking mm-background mm-opening');
    $('.mm-menu').removeClass('mm-opened');
  }
  

  valueFormatter(data:any)
  {
    alert(data.population)
  }
  ngOnInit() {

  $('.tags').text('');
  this.showLogout = false;
    this.updateWishList();
    $('#registrationModal').modal('hide');
    this.mySource = new FormControl('');

    this.mySources =[{
    id: 1,
    name: 'Asia',
    population: '4,157,300,000'
  }, {
    id: 2,
    name: 'Africa',
    population: '1,030,400,000'
  }, {
    id: 3,
    name: 'Europe',
    population: '738,600, 000'
  }, {
    id: 4,
    name: 'North America',
    population: '461,114,000'
  }, {
    id: 5,
    name: 'South America',
    population: '390,700,000'
  }, {
    id: 6,
    name: 'Australia',
    population: '36,700,000'
  }, {
    id: 7,
    name: 'Antartica',
    population: 0
  }
  ];
  

   $('#loading').show(); //------where cats get loaded . . . 
   $('#NavWrap .tab-pane:first').each(function() {
      $(this).addClass('active');
   })
   $('#NavWrap .sub-item-el:first').each(function() {
      $(this).addClass('active').mouseenter();
   });
    this.navigationService.getMenuCategories().subscribe(data => {
         localStorage.setItem('menuCategories',JSON.stringify(data.children_data));
        for( var i=0, l=data.children_data.length; i<l; i++ ) {
          if (data.children_data[i].name !== 'Rejected Items' && data.children_data[i].name !== 'Health and Beauty' && data.children_data[i].name !== 'Baby and Toys'
            && data.children_data[i].name !== 'Sports and Entertainmentms' && data.children_data[i].name !== 'Auto and Tires' && data.children_data[i].name !== 'Sale') {
            this.navigationLinks.push(data.children_data[i]);
            }
             
        } 
        $('.megamenu .sub-item-el:first').each(function() {
          $(this).addClass('active').mouseenter();
        });

        setTimeout(() => {
          $('#menu').mmenu();
          //	fire the plugin
          $('.mh-head').mhead();
          $('.mm-navbar').prepend('<img src="/assets/img/logo.png" width="30%" style="margin-left: 10px;" alt="someimage" id="imageId"/>');
          $('.mm-title').remove();
          $('.mm-slideout').remove();
        }, 2000);

       $('#loading').hide();
    }); 

    // -------- count ---------
    this.getTotalCategoriesTotalProduct();
    // ------ sale count -------------
     this.getTotalCategoriesSaleTotalProduct();
     // ------ count ends -----------
  }

  // ------------- load shop products count -----------
  getTotalCategoriesTotalProduct()
  {
      this.navigationService.getCategoriesTotalProduct('shop').subscribe(data => {
      if(data != null && data !== undefined)
        {
             localStorage['categoriesTotalCount'] = JSON.stringify(data) ;
        }
      },err => {
      console.error(err)
     });
  }
  // -------- ends ---------------------------

    // ------------- load sale products count -----------
    getTotalCategoriesSaleTotalProduct()
    {
        this.navigationService.getCategoriesTotalProduct('sale').subscribe(data => {
        if(data != null && data !== undefined)
          {
               localStorage['categoriesSaleTotalCount'] = JSON.stringify(data) ;
          }
        },err => {
        console.error(err)
       });
    }
    // -------- ends ---------------------------
  listHover(id) {
   
    $('.first-tab').css('display','block')
    if($('.list-'+id).find('.megamenu').css('visibility') == 'visible') {
      $('.list-'+id).addClass('active-list').mouseenter();
      $('.list-'+id).find('.sub-item-el').removeClass('active');
      $('.list-'+id).find('.sub-item-el').first().addClass('active');
      $('.list-'+id).find('.tab-pane').removeClass('active');
      let tab = $('.list-'+id).find('.tab-pane:first').attr('id');
      $('#'+tab).addClass('active')

    }

  }

  listHoverMain(id) {
    
     $('.first-tabMain').css('display','block')
     if($('.listMain-'+id).find('.megamenu').css('visibility') == 'visible') {
       $('.listMain-'+id).addClass('active-list').mouseenter();
       $('.listMain-'+id).find('.sub-item-elMain').removeClass('active');
       $('.listMain-'+id).find('.sub-item-elMain').first().addClass('active');
       $('.listMain-'+id).find('.tab-paneMain').removeClass('active');
       let tab = $('.listMain-'+id).find('.tab-paneMain:first').attr('id');
       $('#'+tab).addClass('active')
 
     }
 
   }

  removeHeart()
  {
   // console.log('left')
  }
  listHoverOut(id) {
  
    if($('.list-'+id).find('.megamenu').css('visibility') == 'hidden') {
    
      $('.list-'+id).removeClass('active-list');
      $('.list-'+id).find('.sub-item-el').first().addClass('active').mouseenter();
    }
  }
  
  listHoverOutMain(id) {
    
      if($('.listMain-'+id).find('.megamenu').css('visibility') == 'hidden') {
      
        $('.listMain-'+id).removeClass('active-list');
        $('.listMain-'+id).find('.sub-item-elMain').first().addClass('active').mouseenter();
      }
    }
    


}