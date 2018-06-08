

(function($){

	$(".input-number-wrap .fa").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent('.input-number-wrap').find("input").val();
    

    if ($button.hasClass('fa-plus')) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
     // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }

    $button.parent().find("input").val(newVal);

  });



$(document).ready(function() {

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

  }); // click() scroll top EMD




}); // ready() END

	$(document).ready(function(){	
		$('#main-banner').each(function(){
			$(this).find('.bannerImage').hide();
			var _Bg = 'url('+ $(this).find('.bannerImage').attr('src') + ')';
			$(this).css("background-image", _Bg);
			$(this).find('.bannerImage').hide();
		});

          $('.user').click(function(){
          $('.user-information').slideDown("300");
        });
        $('.close2').click(function(){
              $('.user-information').hide();
        });

        $('.user1').click(function(){
          $('.user-information1').slideDown("300");
        });

        $('.user2').click(function(){
          $('.user-information1').slideDown("300");
        });
        
        $('.user1').mouseleave(function(){
              $('.user-information1').hide();
        });
         
        $('.user2').mouseleave(function(){
          $('.user-information1').hide();
    });
        $(".ellipsis").dotdotdot({
          height: 20,
          fallbackToLetter: true,
          watch: true,
        });
		
	});

	$('.shop-color li').each(function(){
            var DD = $(this).find('label').data('color');
            $(this).find('label').css('backgroundColor', DD);
        });


	$(document).ready(function(){	
		$('.category-banner').each(function(){
			$(this).find('.bannerImage').hide();
			var _Bg = 'url('+ $(this).find('.bannerImage').attr('src') + ')';
			$(this).css("background-image", _Bg);
			$(this).find('.bannerImage').hide();
		});

		 $('.nav-stacked a').hover(function (e) {
          e.preventDefault()
          $(this).tab('show')
       });
		   $('.menu-list a').each(function( ){
		   	var $this =$(this);
			$this.hover(function(){
			 var Src = $(this).data('src');
			 console.log(Src);
			 $(".img-part").find('img').attr('src', Src);
			})
			});

		
	});
	

	$(document).on("scroll", function(){
		if($(document).scrollTop() > 100){
		  $("#header").addClass("shrink");
			//updateSliderMargin();
		}
		else
		{
			$("#header").removeClass("shrink");
			//updateSliderMargin();
		}
	});



// $('.newsletter-image').each(function(e) { 
//    var bg_ = 'url(' + $(this).find('img').attr('src') + ')';
       
//    $(this).find('img').hide();
//    $(this).css('background-image', bg_);
//   });


$(document).ready(function() {

   // $('.smheight').matchHeight();	  

   $('.tours-expand').magnificPopup({
      type: 'inline',
      closeBtnInside:true, 
      preloader: true
      
    });

    
  });


$('#tabbed-nav').zozoTabs({
    animation: {
        duration: 600,
        effects: "slideV",
        easing: "easeInQuad",
        type: "css"
    }    
});




    $('ul.accordion').accordion();






})(jQuery);


