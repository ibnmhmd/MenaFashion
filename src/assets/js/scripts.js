
(function($){
$(document).ready(function() {

//   $('.check-size').click(function() {
//     $(this).siblings('input:checkbox').prop('checked', false);
// }); 


  

  // $(".input-number-wrap .fa").on("click", function() {

  //   var $button = $(this);
  //   var oldValue = $button.parent('.input-number-wrap').find("input").val();
    

  //   if ($button.hasClass('fa-plus')) {
  //     var newVal = parseFloat(oldValue) + 1;
  //   } else {
  //    // Don't allow decrementing below zero
  //     if (oldValue > 0) {
  //       var newVal = parseFloat(oldValue) - 1;
  //     } else {
  //       newVal = 0;
  //     }
  //   }

  //   $button.parent().find("input").val(newVal);

  // });
  
    // $('#main-banner').each(function(){
    //   $(this).find('.bannerImage').hide();
    //   var _Bg = 'url('+ $(this).find('.bannerImage').attr('src') + ')';
    //   $(this).css("background-image", _Bg);
    //   $(this).find('.bannerImage').hide();
    // });
    
 
      




      //  setInterval(function(){
      //   $('.megamenu').each(function(){
      //     if($(this).css('visibility')=='visible') {
      //     console.log($(this));
      //     $(this).parent().find('.dropdown-toggle1').addClass("helloworld");
      //   }
      //   else {
      //     $(this).parent().find('.dropdown-toggle1').removeClass("helloworld");
      //   }
      //   });
      // },500);


// $('.wsdownmenu-list > li').hover(function() {
//   if(('.megamenu').css('opacity') == 1) {
//     $(this).addClass('tst');
//   }
// });




$('.shop-color li').each(function(){

            var DD = $(this).find('label').data('color');
            $(this).find('label').css('backgroundColor', DD);
        });

     $('.nav-stacked a').hover(function (e) {
          e.preventDefault()
          $(this).tab('show')
       });
       $('.menu-list a').each(function(){
        var $this =$(this);
      $this.hover(function(){
       var Src = $(this).data('src');
       $(".img-part").find('img').attr('src', Src);
      })
      });

$('.user a').click(function(){
    $('.user-information').slideDown("300");
});
 $('.close2').click(function(){
        $('.user-information').slideUp(300);
 });

 $('.user1 a').click(function(){
    $('.user-information1').slideDown("300");
});

$('.user2 a').click(function(){
  $('.user-information1').slideDown("300");
});
$('.cart-product-bag').click(function() {
    $('.user-information1').slideDown("300");
})

$('.cart-product-bag-second').click(function() {
  $('.user-information2').slideDown("300");
})

 $('.close2').click(function(){ 
    $('.user-information1').slideUp(300);
 });
    


  // $(document).on("scroll", function(){
  //   if($(document).scrollTop() > 100){
  //     $("#header").addClass("shrink");
  //     //updateSliderMargin();
  //   }
  //   else
  //   {
  //     $("#header").removeClass("shrink");
  //     //updateSliderMargin();
  //   }
  // });


$('.tours-expand').magnificPopup({
      type: 'inline',
      closeBtnInside:true, 
      preloader: true
      
    });  






   $('.smheight').matchHeight();



      


var scrollTop = $(".scrollTop");

  $(window).scroll(function() {

    var topPos = $(this).scrollTop();

    if (topPos > 100) {
      $(scrollTop).css("opacity", "1");

    } else {
      $(scrollTop).css("opacity", "0");
    }

  }); // scroll END

  //Click event to scroll to top
  $(scrollTop).click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    return false;

  });


  


   
// $('#tabbed-nav').zozoTabs({
//     animation: {
//         duration: 600,
//         effects: "slideV",
//         easing: "easeInQuad",
//         type: "css"
//     }    
// });


  // $('ul.accordion').accordion();

$('#mm').sidr({
      name: 'sidr',
      displace :false,
      side: 'right' // By default
    });

    $('#mm2').sidr({
      name: 'sidr2',
      displace :false,
      side: 'right' // By default
    });

    $('#mm3').sidr({
      name: 'sidr3',
      displace :false,
      side: 'right' // By default
    });

    $('.close-sidr').click(function(){
      $.sidr('close', 'sidr');
      $.sidr('close', 'sidr2');
      $.sidr('close', 'sidr3');
    });



//      $('.slider-for').slick({
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       arrows: false,
//       fade: true,
//       asNavFor: '.slider-nav'
//     });

// $('.slider-nav').slick({
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     asNavFor: '.slider-for',
//       arrows: false,
//     dots: false,
//     vertical:true,
//     centerMode: false,
//     focusOnSelect: true
//   });


     $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      autoplay: false,
        //trigger after the slide appears
        // i is current slide index
        afterChange: function (slickSlider, i) {
            //remove all active class
            $('.slider-nav .slick-slide').removeClass('slick-active');
            //set active class for current slide
            $('.slider-nav .slick-slide').eq(i).addClass('slick-active');
        }

    });


     //set active class to first slide
$('.slider-nav .slick-slide').eq(0).addClass('slick-active');

$('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    autoplay: false,
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    vertical: true
});







$('.slider-nav').on('mouseenter', '.slick-slide', function (e) {
  var $currTarget = $(e.currentTarget), 
      index = $currTarget.data('slick-index'),
        slickObj = $('.slider-for').slick('getSlick');
    
    slickObj.slickGoTo(index);
    
});






// $('.product-slider').owlCarousel({
//           loop:true,
//           animateIn: 'fadeIn',
//           animateOut: 'fadeOut',
//           margin:0,
//           nav:true,
//           dots:false,
//           navText:["<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>"],
//           responsive:{
//               0:{
//                   items:1
//               },
//               600:{
//                   items:2,
//                   margin:0,
//               },
//               1000:{
//                   items:4
//               }
//           }
//       });





$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})



$(document).mouseup(function (e){
    var container = $(".user-information1");
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.hide();
    }
    var container1 = $(".user-information");
    if (!container1.is(e.target) && container1.has(e.target).length === 0)
    {
        container1.hide();
    }
   
    


});

$(document).mouseup(function (e){


// var container2 = $(".dropdown-menu");
//     var gg = $('.dropdown-toggle');
//     if (!container2.is(e.target) && container2.has(e.target).length === 0 && !gg.is(e.target) && gg.has(e.target).length === 0)
//     {
  
        
//         $('.dropdown-toggle').addClass('tst')
//         //container2.hide();
//         gg.attr('aria-expanded', false);
//         container2.hide();
//         gg.parent().attr('closable', true);
//     }
// });


// var btnn = $(".close-dropdown");
// btnn.click(function(){
//   console.log('clicked');
// $(this).parents().find('.dropdown-menu').prev().attr('aria-expanded', false);
// $(this).parents().find('.dropdown').attr('closable', true);
// });







    // function t(t) {
    //     $(t).bind("click", function (t) {
    //         t.preventDefault();
    //         $(this).parent().fadeOut()
    //     })
    // }
    // $(".dropdown-toggle").click(function () {
    //     var t = $(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
    //     $(".button-dropdown .dropdown-menu").hide();
    //     $(".button-dropdown .dropdown-toggle").removeClass("active");
    //     if (t) {
    //         $(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
    //     }
    // });
    // $(document).bind("click", function (t) {
    //     var n = $(t.target);
    //     if (!n.parents().hasClass("button-dropdown")) $(".button-dropdown .dropdown-menu").hide();
    // });
    // $(document).bind("click", function (t) {
    //     var n = $(t.target);
    //     if (!n.parents().hasClass("button-dropdown")) $(".button-dropdown .dropdown-toggle").removeClass("active");
    // })



$('.singlerating').each(function (e){
  var $this  = $(this);

  $this.find('.quick_Add').bind('mouseenter click', function(){
    $this.find('.size-selection').css('opacity','1');
  });

   $this.bind('mouseleave blur', function() {
    $this.find('.size-selection').css('opacity','0');
  });

//     $('.quick_Add').bind('mouseenter click', function() {
//  var $this = $(this);
//  console.log(this);
//  $this.parents().find('.singlerating').find('.size-selection').css('opacity','1');
// });
// $('.singlerating').bind('mouseleave blur', function() {
//  var $this = $(this);
//  $this.parents().find('.singlerating').find('.size-selection').css('opacity','0');
// });
});


  

}); // end document .ready        

})
})(jQuery)




