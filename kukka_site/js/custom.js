$(document).ready(function(){
	var width=$(window).width(),
     	limitWidth=1024;

	// 상단팝업 닫으면 닫힘
	$('.up_modal_close').on('click focus', function(){
		$('.up_modal').slideUp(300).addClass('up_state');
	}); 
	// 상단팝업 닫힘여부에 따른 css 수정
	if($('.up_modal').hasClass('.up_state')){
		if (width >= limitWidth) {
			$('.slide_wrap').animate({'margin-top':'110px'},300);
		} else{
			$('.slide_wrap').css('margin-top','0');
		}		
	}


	//스크롤 내리면 메인메뉴 fixed
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
     	if(width >= limitWidth){
			if(scrollTop>100){
				if($('.up_modal').hasClass('up_state')){
					$('header').stop().animate({'top':'-50px'},300).css('box-shadow','1px 3px 10px #999');
				}else{
					$('header').stop().animate({'top':'-80px'},300).css('box-shadow','1px 3px 10px #999');
				}
			}else if(scrollTop<50){
				$('header').stop().animate({'top':'0px'},300).css('box-shadow','none');
			}
		}else{
			if(scrollTop>50){
				if($('.up_modal').hasClass('up_state')){
					$('header').stop().animate({'top':'0px'},300).css('box-shadow','1px 3px 10px #999');
				}else{
					$('header').stop().animate({'top':'-30px'},300).css('box-shadow','1px 3px 10px #999');
				}
			}else{
				$('header').stop().animate({'top':'0px'},300).css('box-shadow','none');
			}
		}
	});
	
	//메뉴에 마우스 올리면 서브메뉴 보이게
	$('.main_nav_wrap').on('mouseover focus', function(){
		$('.sub_nav').stop().slideDown(300);
		$('.logo_nav_wrap').stop().animate({'height':'130px'},300);
	});
	$('.gnb li').on('mouseout', function(){
		$('.sub_nav').stop().slideUp(300);
		$('.logo_nav_wrap').stop().animate({'height':'60px'},300);
	});

	//모바일_메뉴버튼 클릭시 메뉴 보이게
	$('.m_menu').on('click touchstart focus', function(){
		$('.m_nav_wrap').animate({'left':'0'},300);
		$('.m_nav_cover').animate({'left':'260px'},250);
		$('body').css('position','fixed');
	});
	$('.m_nav_cover').on('click touchstart focus', function(){
		$('.m_nav_wrap, .m_nav_cover').animate({'left':'-100%'},300);
		$('body').css('position','static');
	});

	//검색, 장바구니 아이콘 클릭시 모달팝업
	$('.search_icon, .cart_icon').on('click touchstart focus', function(){
		var clone = $(this).attr('class').substring(0,4);
		$('.modal_cover').show();
		if(clone == 'sear'){
			$('.search_pop').show();
		}else if(clone == 'cart'){
			$('.cart_pop').show();
			$('.m_nav_wrap, .m_nav_cover').animate({'left':'-100%'},300);
			$('body').css('position','static');
		}
	});
	$('.modal_cover h2 a').on('click touchstart focus', function(){
		$('.modal_cover, .search_pop, .cart_pop').hide();
	});

	//꽃과 함께하면 좋은 아이템 탭메뉴
	$('.ect_list li a').on('click touchend focus', function(e){
		e.preventDefault();
		var i = $(this).parent('li').index();
		$('.ect_list li, .ect>li').removeClass('on');
		$(this).parent().addClass('on');
		$('.ect>li').eq(i).addClass('on');
		console.log(i);
	});

	//mainbanner 슬라이드(1:자동회전, 멈춤)
	var slide_auto;
		auto();
	function auto(){
		slide_auto = setInterval(function(){
			slide_move();		
		},4500);
	}

	function slide_move(){
		$('.slide').stop().animate({'left':-100+'%'},500, function(){
				var s_clone = $('.slide li:first-child').clone();
				$('.slide li:last-child').after(s_clone);
				$('.slide li:first-child').remove();
				$('.slide').css('left','0');
			});
			var slide_i = $('.slide li').eq(1).text();
			$('.indicate li').removeClass('active');
			$('.indicate li').eq(slide_i-1).addClass('active');
	}
	function slide_backmove(){
		$('.slide').css('left',-100+'%').animate({'left':0},500);
		var s_clone = $('.slide li:last-child').clone();
		$('.slide li:first-child').before(s_clone);
		$('.slide li:last-child').remove();
		var slide_i = $('.slide li').eq(0).text();
			$('.indicate li').removeClass('active');
			$('.indicate li').eq(slide_i-1).addClass('active');
	}
	$('.slide, .button_wrap .prev, .button_wrap .next, .indicate').on('mouseover touchstart touchmove',function(e){
		clearInterval(slide_auto);
	});
	$('.slide, .button_wrap .prev, .button_wrap .next, .indicate').on('mouseleave touchend',function(e){
		auto();
	});

	//mainbanner 슬라이드(2:버튼 클릭시 이동)
	$('.button_wrap .next').on('click',function(){
		slide_move();	
	});
	$('.button_wrap .prev').on('click',function(){
		slide_backmove();
	});

	//mainbanner 슬라이드(3:인디케이터)
	$('.indicate li').on('click', function(){
		$('.indicate li').removeClass('active');
		$(this).addClass('active');
		
		var indi_i = $(this).index()+1,
			slide_i = $('.slide li:contains('+indi_i+')').index();
		$('.slide').stop().animate({'left':-100*slide_i+'%'},500, function(){
			var s_prev_clone = $('.slide li:lt('+slide_i+')').clone();
			$('.slide li:last-child').after(s_prev_clone);
			$('.slide li:lt('+slide_i+')').remove();
			$('.slide').css('left',0);
		});
	});
	//mainbanner 슬라이드(4:터치로 스와이프 이동)
	var isDown = false,
		oldLeft = 0,
		originalLeft = 0,
		nowPosition;
	
	$('.slide').on('touchstart',function(e){
		oldLeft = e.touches[0].clientX;
		isDown = true;
		e.preventDefault();
	});
	$('.slide').on('touchmove',function(e){
		if(isDown){
			var distance = oldLeft - e.touches[0].clientX;
			oldLeft = e.changedTouches[0].clientX;
			// $(this).animate({left:- distance},0);
			// $(this).stop(true);
			if(distance>=0){
				nowPosition = 1;
			}else{
				nowPosition = -1;
			}
		}
		e.preventDefault();
	});
	$('.slide').on('touchend',function(e){
		if(nowPosition>0){
			slide_move();
		}else{
			slide_backmove();
		}
		e.preventDefault();
		isDown = false;
	});


	//정기구독 슬라이드(fade in/out)
	if(width >= limitWidth){
		$('.subscription_content li:gt(0)').hide();
	}else{
		$('.subscription_content li').show();
	}
	var cur_index = 0,
		subscription_length = $('.subscription_content li').length;
	$('.bottom_arrow_wrap a').click(function(e){
		e.preventDefault();

		if($(this).hasClass('next')){
			if(cur_index < subscription_length-1){
				cur_index++;
				$('.subscription_content li').eq(cur_index).show(200);
				$('.subscription_content li').eq(cur_index-1).hide(200);
				$('.bottom_arrow_wrap .dark_blue').text(cur_index+1);
			}else{
				return false;
			}
		}else if($(this).hasClass('prev')){
			if(0 < cur_index && cur_index <= subscription_length-1){
				cur_index--;
				$('.subscription_content li').eq(cur_index).show(200);
				$('.subscription_content li').eq(cur_index+1).hide(200);
				$('.bottom_arrow_wrap .dark_blue').text(cur_index+1);
			}else{
				return false;
			}
		}
	});

	// 파머스, new, best 슬라이드
	$('.content_product').each(function(){
		var name= $(this).data('name'),
			product_length = $(this).find('li').length;
		
		product_move(name, product_length);

		function product_move(dataname, length){
			// 파머스, new, best 슬라이드(1:버튼 클릭으로 넘어가게)
			var	cur_i = 0;
			$('.list_button_wrap[data-name="'+dataname+'"] a').on('click',function(e){
				e.preventDefault();
				if($(this).hasClass('next')){
					if(cur_i < length-5){
						cur_i++;
						$(this).siblings('.prev').removeClass('off');
					}else if(cur_i == length-5){
						cur_i = length-4;
						$(this).addClass('off');
					}
				}else if($(this).hasClass('prev')){
					if(1 < cur_i && cur_i <= length-4){
						cur_i--;
						$(this).siblings('.next').removeClass('off');
					}else{
						cur_i = 0;
						$(this).addClass('off');
					}
				}
				$('.content_product[data-name="'+dataname+'"] li').animate({'left':-(12.5*cur_i)+'%'},400);
			});

			// 파머스, new, best 슬라이드(2:드래그/터치로 넘어가게)-2
			$('.content_product[data-name="'+dataname+'"]').on('mouseup touchend', function(e){
				var product_li = $(this).find('li'),
					li_width = product_li.eq(0).width(),
					all_distance = Math.floor(originalLeft - oldLeft)/li_width,
					all_distance_l = Math.round(all_distance);
				// e.preventDefault();
				isDown = false;	
				cur_i += all_distance_l;
				if(width>=limitWidth){
					if(cur_i<=length-5 && cur_i>=1){
						$('.list_button_wrap[data-name="'+dataname+'"] a').removeClass('off');
					}else if(cur_i<1){
						cur_i = 0;
						$('.list_button_wrap[data-name="'+dataname+'"] .prev').addClass('off');
					}else if(cur_i>length-5){
						cur_i = length-4;
						$('.list_button_wrap[data-name="'+dataname+'"] .next').addClass('off');
					}
					product_li.stop().animate({'left':-(cur_i*12.5)+'%'},800);
				}
				else{
					if(cur_i<length && cur_i>=1){
						$('.list_button_wrap[data-name="'+dataname+'"] a').removeClass('off');
					}else if(cur_i<1){
						cur_i = 0;
						$('.list_button_wrap[data-name="'+dataname+'"] .prev').addClass('off');
					}else if(cur_i>=length){
						cur_i = length-1;
						$('.list_button_wrap[data-name="'+dataname+'"] .next').addClass('off');
					}
					product_li.stop().animate({'left':-(cur_i*li_width)+'px'},800);
				}
				
			});
		}
		// 파머스, new, best 슬라이드(2:드래그/터치로 넘어가게)-1
		$(this).on('mousedown touchstart',function(e){
			isDown = true;
			if(width>limitWidth){
				oldLeft = originalLeft = e.clientX;
			}else{
				oldLeft = originalLeft = e.touches[0].clientX;
			}
		});

		$(this).on('mousemove touchmove', function(e){
			var product_li = $(this).find('li'); 
			if(width>limitWidth && isDown){
				var distance = oldLeft - e.clientX;	
					oldLeft = e.clientX;
					product_li.animate({'left':'-='+distance},0);
					$(this).stop(true);
			}else if(width<=limitWidth && isDown){
				var distance = oldLeft - e.touches[0].clientX;
				oldLeft = e.changedTouches[0].clientX;
				product_li.animate({'left':'-='+distance},0);
				$(this).stop(true);
			}
		});

	});
	
	//인스타그램 자동슬라이드
	var li_width = $('.insta_banner_wrap li img').outerWidth();
	setInterval(function(){
		$('.insta_banner_wrap ul').animate({'left':- li_width +'px'},2000, function(){
			var clone = $('.insta_banner_wrap li:first-child').clone();
			$('.insta_banner_wrap li:last-child').after(clone);
			$('.insta_banner_wrap li:first-child').remove();
			$('.insta_banner_wrap ul').css({'left':0});
		});	
	});
	

	//resize 시 작동할 기능들
	$(window).resize(function(){
	 	var width=$(window).width(),
     	limitWidth=1024;
		

	    // 상단팝업 닫힘여부에 따른 css 수정
		if($('.up_modal').hasClass('.up_state')){
			if (width >= limitWidth) {
				$('.slide_wrap').animate({'margin-top':'110px'},300);
			} else{
				$('.slide_wrap').css('margin-top','0');
			}		
		}

		//스크롤 내리면 메인메뉴 fixed
		$(window).scroll(function(){
			var scrollTop = $(this).scrollTop();
	     	if(width >= limitWidth){
				if(scrollTop>100){
					if($('.up_modal').hasClass('up_state')){
						$('header').stop().animate({'top':'-50px'},300).css('box-shadow','1px 3px 10px #999');
					}else{
						$('header').stop().animate({'top':'-80px'},300).css('box-shadow','1px 3px 10px #999');
					}
				}else if(scrollTop<50){
					$('header').stop().animate({'top':'0px'},300).css('box-shadow','none');
				}
			}else{
				if(scrollTop>50){
					if($('.up_modal').hasClass('up_state')){
						$('header').stop().animate({'top':'0px'},300).css('box-shadow','1px 3px 10px #999');
					}else{
						$('header').stop().animate({'top':'-30px'},300).css('box-shadow','1px 3px 10px #999');
					}
				}else{
					$('header').stop().animate({'top':'0px'},300).css('box-shadow','none');
				}
			}
		});

		//정기구독 슬라이드(fade in/out)
		if(width >= limitWidth){
			$('.subscription_content li:gt(0)').hide();
		}else{
			$('.subscription_content li').show();
		}

	});//$(window).resize 끝
});