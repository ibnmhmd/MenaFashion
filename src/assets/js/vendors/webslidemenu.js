 /*
 * Webslide - v3.1
 * Web Slide - Responsive Mega Menu for Bootstrap 3+
 *
 * Copyright 2016 webthemex
 * http://codecanyon.net/user/webthemex?ref=webthemex
 *
 * Licensed under Envato licenses
 * http://codecanyon.net/licenses/standard
 */
 
 $(function() { 
		
 
		// Append the mobile icon wsdownmenu
		$('.wsdownmenu').append($('<a class="wsdownmenu-animated-arrow"><span></span></a>'));
		// $('.wsdownmenu').append($('<div class="wsdownmenu-text"><a href="javascript:;"><img src="img/logo.svg" height="56" width="193" alt="" class="img-responsive"></a></div>'));
		
		// Add a <span> to every .wsdownmenu that has a <ul> inside
		
		$('.wsdownmenu-list > li').has('.wsdownmenu-submenu').prepend('<span class="wsdownmenu-click"><i class="wsdownmenu-arrow fa fa-angle-down"></i></span>');
		$('.wsdownmenu-submenu > li').has('ul').prepend('<span class="wsdownmenu-click02"><i class="wsdownmenu-arrow fa fa-angle-down"></i></span>');
		$('.wsdownmenu-submenu-sub > li').has('ul').prepend('<span class="wsdownmenu-click02"><i class="wsdownmenu-arrow fa fa-angle-down"></i></span>');
 		$('.wsdownmenu-submenu-sub-sub > li').has('ul').prepend('<span class="wsdownmenu-click02"><i class="wsdownmenu-arrow fa fa-angle-down"></i></span>');
		$('.wsdownmenu-list li').has('.megamenu').prepend('<span class="wsdownmenu-click"><i class="wsdownmenu-arrow fa fa-angle-down"></i></span>');
		
		
		// Click to reveal 
		$('.wsdownmenu-animated-arrow').click(function(){$('.wsdownmenu-list').slideToggle('300')
		$(this).toggleClass('wsdownmenu-lines')
		;});
		

		$('.wsdownmenu-click').click(function(){
		$(this).toggleClass('wsdownmenuarrow-rotate').parent().siblings().children().removeClass('wsdownmenuarrow-rotate');
		$(".wsdownmenu-submenu, .megamenu").not($(this).siblings('.wsdownmenu-submenu, .megamenu')).slideUp('300');
		$(this).siblings('.wsdownmenu-submenu').slideToggle('300');
		$(this).siblings('.megamenu').slideToggle('300');
		});
		

		$('.wsdownmenu-click02').click(function(){
		$(this).toggleClass('wsdownmenuarrow-rotate').parent().siblings().children().removeClass('wsdownmenuarrow-rotate');
		$(this).siblings('.wsdownmenu-submenu').slideToggle('300');
		$(this).siblings('.wsdownmenu-submenu-sub').slideToggle('300');
		$(this).siblings('.wsdownmenu-submenu-sub-sub').slideToggle('300');
		});
 		
		
		// Remove inline styles when browser > 767
		window.onresize = function(event) {
			console.log('window resize');
			if($(window).width() > 992){
				$('.wsdownmenu-submenu').removeAttr("style");
 				$('.wsdownmenu-list').removeAttr("style");
 			}
    	};
 
 

 
 });

 