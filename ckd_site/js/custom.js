$(document).ready(function(){
     var width=$(window).width();
     var limitWidth=768;
    //화장품 리스트 온오프
    var li = $('#small_nav').children('li:nth-child(4)');
    $(li).on('click focus', function(){
	    if($(this).children('ul').is(':visible')){
	    	$(this).children('a').css({'background':"url('img/list_off.png')", 'background-repeat':'no-repeat', 'background-position':'right center'});
    		$(this).children('ul').hide();
	    	// return false;
	    }else{
	    	$(this).children('a').css({'background':"url('img/list_on.png')", 'background-repeat':'no-repeat', 'background-position':'right center'});
	    	$(this).children('ul').show();
	    }
    });

    //메뉴버튼 클릭시 전체메뉴 나왔다 사라지게
    $('.menu_button, .fixed_menu_btn').on('click focus', function(){
    	$(".main_nav_wrap").animate({"right":"0px"},500).css({'position':'fixed', 'body':'100%'});
    	$(".blind_wrap").animate({"right":"0px", "opacity":"0.8"},100).css({'position':'fixed', 'body':'100%'});
    });
    $(".main_nav_wrap h3").on('click focus', function(){
    	$(".main_nav_wrap").animate({"right":"-100%"},500);
    	$(".blind_wrap").animate({"right":"-100%", "opacity":"0"},100);
    	$('#main_nav>li>ul').css({'display':'none'}).parent('li').css({'opacity':'0.7'});
        $('#main_nav>li>a').css({'background':"url('img/list_off.png')", 'background-repeat':'no-repeat', 'background-position':'right center'});
    });

    //메뉴 li 클릭시 슬라이드토글
    $('#main_nav>li>a').click(function(){
    	$(this).next().slideToggle(300).parent('li').addClass('active');
    	$('#main_nav>li>a').not(this).next().slideUp(300).parent('li').removeClass('active');
    });

    //sec2,4 버튼 클릭시 다음상품+설명 보여주기
    //sec2다음버튼 
        var i=0;
        var sec2_li_length = $('.sec2_detail_item_list li').length;
    $('#sec2 .next_btn').on('click touchend', function(e){
        e.preventDefault();
        i++;
        if(i == sec2_li_length){i=0}
        $('.sec2_detail_item_list').animate({'left': -i*50+'%'},500);
        $('.sec2_detail_text_list').animate({'left': -i*100+'%'},500);
        $('.sec2_detail_item_list li').removeClass('active');
        $('.sec2_detail_item_list li').eq(i).addClass('active');
        return false;
    });

    //sec2 이전버튼
    $('#sec2 .prev_btn').on('click touchend', function(e){
        e.preventDefault();
        i--; 
        if(i == -1){i=7}
        $('.sec2_detail_item_list').animate({'left': -i*50+'%'},500);
        $('.sec2_detail_text_list').animate({'left': -i*100+'%'},500);
        $('.sec2_detail_item_list li').removeClass('active');
        $('.sec2_detail_item_list li').eq(i).addClass('active');
        return false;
    });

    //sec4다음버튼
        var i2=0;
        var sec4_li_length = $('.sec4_detail_item_list li').length;
    $('#sec4 .next_btn').on('click touchend', function(e){
        e.preventDefault();
        i2++;
        if(i2 == sec4_li_length){i2=0}
        $('.sec4_detail_item_list').animate({'left': -i2*50+'%'},500);
        $('.sec4_detail_text_list').animate({'left': -i2*100+'%'},500);
        $('.sec4_detail_item_list li').removeClass('active');
        $('.sec4_detail_item_list li').eq(i2).addClass('active');
        return false;
    });

    //sec4 이전버튼
    $('#sec4 .prev_btn').on('click touchend', function(e){
        e.preventDefault();
        i2--; 
        if(i2 == -1){i2=8}
        $('.sec4_detail_item_list').animate({'left': -i2*50+'%'},500);
        $('.sec4_detail_text_list').animate({'left': -i2*100+'%'},500);
        $('.sec4_detail_item_list li').removeClass('active');
        $('.sec4_detail_item_list li').eq(i2).addClass('active');
        return false;
    });

    //family site 클릭시 나오게
    $('.family_site_wrap h4').on('click focus', function(e){
        e.preventDefault();
        $('.family_site_wrap>ul').slideToggle(300);
    });

    // 스크롤 위치에 따라 애니메이션효과
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var hasClass = $('html, body').find('.scroll_active'),
            hasSec2 = $('body').find('div').hasClass('sec24_wrap');
        if(hasSec2){
            if(scrollTop==0  || scrollTop <$('#sec2').offset().top-200){
                $(hasClass).removeClass('scroll_active');
                $('.scroll_1').addClass('scroll_active');
            }else if(scrollTop>=$('#sec2').offset().top-200 && scrollTop<$('#sec4').offset().top-100){
                $('.scroll_2').addClass('scroll_active');
                $('.scroll_3').addClass('scroll_active');
            }else if(scrollTop>=$('#sec4').offset().top-100 && scrollTop<$('#sec5').offset().top-200){
                $('.scroll_4').addClass('scroll_active');
            }else if(scrollTop>=$('#sec5').offset().top-200 && scrollTop<$('footer').offset().top){
                $(hasClass).removeClass('scroll_active');
                $('.scroll_5').addClass('scroll_active');
            }else{
                  $(hasClass).removeClass('scroll_active');
            }
            if(scrollTop>50){
                $('.fixed_menu_btn').css({'display':'block'});
            }else{
                $('.fixed_menu_btn').css({'display':'none'});
            }
        }else{
            return false;
        }    
    });
    $(window).trigger('scroll');

    //******서브페이지**********
    //서브_제품안내 header nav 보이기
    $('#gnb').mouseover(function(){
        if(width>limitWidth){
            $('.gnb_cover').stop().animate({'height':'470px'},300);
            $('#gnb ul').stop().slideDown(330);
        }
        else{
            return false;
        }
    });
    $('#gnb').mouseleave(function(){
        if(width>limitWidth){
            $('.gnb_cover').stop().animate({'height':'0'},300);
            $('#gnb ul').stop().slideUp(50);
        }
        else{
            return false;
        }
    });

    //서브_제품안내 페이지넘기기
     $('.product_list_num_box ul li a').click(function(e){
        e.preventDefault();
        var i = $(this).parent('li').index();
        $('.product_list_num_box a').not(this).parent().removeClass('active');
        $(this).parent().addClass('active');
        $('.product_list_box').removeClass('active');
        $('.product_list_box').eq(i).addClass('active');
    });

    //서브_제품안내 sub_nav ul 보이게, 클릭시 내용바꾸기
    $('.sub_nav, .sub_nav_noEvent').mouseover(function(){
        $('.sub_nav ul, .sub_nav_noEvent ul').stop().slideDown(300);
    });
    $('.sub_nav, .sub_nav_noEvent').mouseleave(function(){
        $('.sub_nav ul, .sub_nav_noEvent ul').stop().slideUp(300);
    });
    $('.sub_nav li>a, .product_ul li>a, .table_wrap th>a, .product_mo_nav li>a').on('click touchend',function(e){
        var clone_a = $(this).clone();
        var clone_txt = $(this).text();
            e.preventDefault();
            $('.sub_nav>a').remove();
            $('.sub_nav').prepend(clone_a);
            $('.sub_nav ul, #gnb ul').hide();
            $('.gnb_cover').stop().css({'height':'0'});
            $('.list_title_box h3, h3.mo_nav_title').text(clone_txt);
            $('.mo_nav_h3').hide();
            $(".main_nav_wrap").animate({"right":"-100%"},500);
            $(".blind_wrap").animate({"right":"-100%", "opacity":"0"},100);
            $('#main_nav>li>ul').css({'display':'none'}).parent('li').css({'opacity':'0.7'});
            $('#main_nav>li').removeClass('active');

            var i = $(this).parent().index();
            $('.table_wrap td a').css({'color':'#666', 'font-weight':'normal'});
            $('.table_wrap tr:last-child span:last-child a').css({'color':'#004A86'});
            $('.table_wrap tr').eq(i).find('td a').css({'color':'#004A86', 'font-weight':'bold'});
            $(this).parent().next('td').find('a').css({'color':'#004A86', 'font-weight':'bold'});
            return false;           
        
    });
    $('.table_wrap td a').click(function(e){
        e.preventDefault();
        var clone_a = $(this).closest('td').prev().find('a').clone();
        var clone_txt = $(this).text();
        $('.sub_nav>a').remove();
        $('.sub_nav').prepend(clone_a);
        $('.list_title_box h3').text(clone_txt);
        $('.table_wrap td a').css({'color':'#666', 'font-weight':'normal'});
        $('.table_wrap tr:last-child span:last-child a').css({'color':'#004A86'});
        $(this).css({'color':'#004A86', 'font-weight':'bold'});
   });

    //서브_제품안내 검색기능 알럿
    $('.search_wrap button').click(function(){
        alert('서비스 준비 중입니다.');
    });

    //상품안내, 서브네비 누르면 해당 상품 보이게
    $('.sub_nav li>a, .table_wrap tr a, .product_ul li>a, .product_mo_nav li>a').on('click touchend', function(){
        // e.preventDefault();
        var clickClass = $(this).attr('class');
        var productClass = $('.product_list_box_total li');
        var sameClass = $('.product_list_box_total li.'+clickClass);
        var sameClassLength = sameClass.length;
        if(productClass.hasClass(clickClass)){
            $('.product_list_box').removeClass('active');
            productClass.removeClass('active');
            sameClass.addClass('active');
            $('.product_list_num_box').hide();
            $('.list_title_box p strong').text(sameClassLength+' ');

        }else if(clickClass == 'total'){
                productClass.removeClass('active');
                $('.product_list_wrap .product_list_box').eq(0).addClass('active');
                $('.product_list_num_box').show();
                $('.product_list_num_box li').removeClass('active');
                $('.product_list_num_box li').eq(0).addClass('active');
                $('.list_title_box p strong').text(61+' ');
        }else{
            return false;
        }
    });

    //다음버튼 클릭시 페이지 이동 
    $('.page_btn_wrap a').click(function(){
        var index= $('.product_list_num_box ul li.active').index();
        var index_length = $('.product_list_num_box>ul>li').length-1;
        if($(this).hasClass('next_page_btn')){
            index++;
            if(index>index_length){
                alert('마지막 페이지입니다.');
                index = index_length;
                 return false;
            }else{
                $('.product_list_num_box li,.product_list_box').removeClass('active');
                $('.product_list_num_box li').eq(index).addClass('active');
                $('.product_list_box').eq(index).addClass('active');
                return false;
            }
        }else{
            index--;
            if(index<0){
                alert('마지막 페이지입니다.');
                $('.product_list_num_box li, .product_list_box').removeClass('active');
                $('.product_list_num_box li').eq(0).addClass('active');
                $('.product_list_box').eq(0).addClass('active');
                return false;

            }else{
                
                $('.product_list_num_box li, .product_list_box').removeClass('active');
                $('.product_list_num_box li').eq(index).addClass('active');
                $('.product_list_box').eq(index).addClass('active');
                return false;
            }
        }
    });

    //서브_gnb누르면 메뉴 목록보이게
    $('h2.mo_nav_title').click(function(){
        if(width<limitWidth){
            $('#gnb').stop().slideToggle(300);
        }
        else{
            return false;
        }
    });
    $('h3.mo_nav_title').click(function(){
        if(width<limitWidth){
            $('.mo_nav_h3').slideToggle(300);
        }
        else{
            return false;
        }
    });

    //윈도우 리사이즈시 작동
    $(window).resize(function(){
        var width=$(window).width();
        var limitWidth=768; 
        
    });// resize부분 끝

 

}); //$(document).ready(function() 끝나는 지점임
