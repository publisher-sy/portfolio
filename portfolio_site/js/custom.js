$(document).ready(function(){
	var width=$(window).width(),
     	limitWidth=1024;

    // 0-1 첫페이지에서 보일 곳
    setTimeout(function(){
        $('html, body').animate({'scrollTop':$('#slide_section').offset().top},500);
    });
    	

     //1-1 슬라이드 자동이동
     var auto;
     autoslide();
    
    function start(){
		$('.slide').stop().animate({'left':-100+'%'},500,function(){
 		var s_clone = $('.slide li:first-child').clone();
 		$('.slide li:last-child').after(s_clone);
 		$('.slide li:first-child').remove();
 		$('.slide').css('left','0');
		});
    } 
   	function slideIndex(){

   		var data_number = $('.slide li').eq(1).data('number');
   			
     		$('.slide li, .indicater li').removeClass('on');
     		$('.slide li').eq(1).addClass('on');
     		$('.indicater li').eq(data_number-1).addClass('on');
   	}

    function autoslide(){
     	auto = setInterval(function(){
     		start();
     		slideIndex();
     	},4000);
    }
    // 1-2 슬라이드에 마우스 가져다대면 자동슬라이드 멈추게
    $('.slide_total_wrap').on('mouseover touchstart', function(){
    	clearInterval(auto);
    });
    $('.slide_total_wrap').on('mouseleave touchend', function(){
    	autoslide();
    });

    //1-3 이전,다음버튼 클릭
    $('.button_wrap .next').on('click touchstart',function(e){
    	e.preventDefault();
    	start();
    	slideIndex();
    });
    $('.button_wrap .prev').on('click touchstart',function(e){
    	e.preventDefault();
    	$('.slide').stop().css('left',-100+'%').animate({'left':0},500);
 		var s_clone = $('.slide li:last-child').clone();
 		$('.slide li:first-child').before(s_clone);
 		$('.slide li:last-child').remove();

    	var data_number = $('.slide li').eq(0).data('number');
     		$('.slide li, .indicater li').removeClass('on');
     		$('.slide li').eq(0).addClass('on');
     		$('.indicater li').eq(data_number-1).addClass('on');
    });
    //1-4 인디케이터 클릭
    $('.indicater li').on('click touchstart',function(e){
    	e.preventDefault();
    	var i = $(this).index(),
    		slide_i = $('.slide li[data-number="'+(i+1)+'"]').index();
    	$('.slide li, .indicater li').removeClass('on');
    	$('.slide li').eq(slide_i).addClass('on');
     	$('.indicater li').eq(i).addClass('on');
     	$('.slide').stop().animate({'left':-100*slide_i+'%'},500,function(){
	 		var s_clone = $('.slide li:lt('+slide_i+')').clone();
	 		$('.slide li:last-child').after(s_clone);
	 		$('.slide li:lt('+slide_i+')').remove();
	 		$('.slide').css('left','0');
		});
    });

    //2 메인 메뉴 클릭시 해당 위치로 이동
    $('#home_section a').on('click touchend',function(){
    	$('html, body').animate({'scrollTop':$($(this).attr('href')).offset().top},900,'easeInOutElastic')
    });

    //3 스크롤시 메뉴바 위치변경
    var  played=false;
    $(window).scroll(function(){
    	var nowscroll = $(this).scrollTop()+100,
    		standard_scroll = $('#slide_section').offset().top-200;
           
    	gnb_change();
        spy_scroll();
        if(nowscroll>= $('.introduce_wrap').offset().top && !played){
            skill_progressbar();
            played=true;
        }
        
            function gnb_change(){
                if(nowscroll<standard_scroll){
                    $('.gnb_cover').removeClass('scrolled');
                }else{
                $('.gnb_cover').addClass('scrolled');   
                }
            }
            function spy_scroll(){
                $('section').each(function(){
                    var section_index = $(this).index();
                    if(nowscroll >= $('#contact_section').offset().top){
                        $('#m_gnb li').removeClass('on');
                        $('#m_gnb li').eq(section_index).addClass('on');
                    }else{
                        if($(this).offset().top<=nowscroll && $(this).next('section').offset().top>nowscroll){
                            $('#m_gnb li').removeClass('on');
                            $('#m_gnb li').eq(section_index).addClass('on');
                        }
                    }  
                });
            }
            
            
    });
    
    //4 skill progressbar
    function skill_progressbar(){
        $('.skill').each(function(){
            var percent= $(this).data('percent'),
                name = $(this).data('name');
            
            progressmove(percent, name);
           
            function progressmove(max, dataname){
                
                var i=0,
                autoprogress=setInterval(function(){
                    if(i<=max){
                        $('.skill[data-name="'+dataname+'"] .progressbar').animate({'width':i+'%'},15);
                        $('.skill[data-name="'+dataname+'"] h3 span').text(i+'%');
                        i++;
                    }else{
                        clearInterval(autoprogress);
                    }
                },20);
            }
        }); 
    }
    
    

    //5. 모바일 메뉴버튼으로 메뉴 on/off
    $('.m_gnb_cover').on('click focus touchend', function(e){
        e.preventDefault();
       if($('.m_gnb_cover').hasClass('on')){
    		$('.m_gnb_cover').removeClass('on');
    		$('.m_gnb_cover input:checkbox[id="menu_btn"]').attr('checked',false);
    	}else{
    		$('.m_gnb_cover').addClass('on');
    		$('.m_gnb_cover input:checkbox[id="menu_btn"]').attr('checked',true);
    	}
    });
    $('#inner_wrap').on('click focus touchend', function(e){
      return false;
    });

    $('#m_gnb li').on('click focus touchend', function(e){
        e.stopPropagation();
        $('.m_gnb_cover input:checkbox[id="menu_btn"]').attr('checked',false);
    	$('.m_gnb_cover').removeClass('on');
    });
    $('.logo').on('click focus touchend', function(e){
         e.stopPropagation();
        $('.m_gnb_cover input:checkbox[id="menu_btn"]').attr('checked',false);
    	$('.m_gnb_cover').removeClass('on');
    });
    
    
	//resize 시 작동할 기능들
	$(window).resize(function(){
		var width=$(window).width(),
     	limitWidth=1024;
	 	// 0-1 첫페이지에서 보일 곳
    	$('html, body').animate({'scrollTop':$('#slide_section').offset().top},500);

	});//$(window).resize 끝
});