$(document).ready(function(){
    

	//gnb 호버 슬라이드 
	$(".gnb li").on("mouseover",function(){
		$(".gnb_cover, .gnb_detail").stop().animate({height:"200px", opacity:"1"},600);
	});
	$(".gnb li").on("mouseleave",function(){
		$(".gnb_cover, .gnb_detail").stop().animate({height:"0", opacity:"0"},300);
	});

        //메인 : 모바일 전체메뉴(햄버거메뉴) 껐다 켜기
        var $width=$(window).width();
        var limitWidth=768;
         $(".all_menu").off('click').on('click',function(){
                 event.stopPropagation();
                if($width < limitWidth){
                    $(this).parent().parent().next(".mo_total_menu_wrap").slideToggle('slow');
                    $(".mo_total_menu_cover").slideToggle(500);
                }else if($width >= limitWidth){
                        return false;
                    }
           });   //all_menu 클릭부분

            $("html").click(function(){
                $(".all_menu").parent().parent().next(".mo_total_menu_wrap").slideUp(400);
                $(".mo_total_menu_cover").slideUp(500);
            });  //html 클릭부분

    //totop 스크롤
    $(window).scroll(function(){
        var Top = $(this).scrollTop();
                if(Top>50){
                    $('.to_top').css('display','block');
                }else{
                    $('.to_top').css('display','none');
                }
        });
    $(".to_top").on('click',function(){
        $('html,body').animate({scrollTop : 0},500,"easeOutSine");
    });

    //서브 : 모바일 세부메뉴(수련관소개)
        var ul = $('.toggle_button').siblings('ul');
            $('.toggle_button').off('click').on('click',function(){
                if($width < limitWidth){
                    if (ul.hasClass('active')) {
                         $(ul).removeClass('active');
                    }
                    else{
                        $(ul).addClass('active');
                        $('.nav_toggle li').off('click').on('click',function(){
                            $(ul).removeClass('active');
                            // return false;
                         });
                    }
                }else{
                            return false;
                        } 
            });

      //메인 운영시간
      $('.open_time').on('click',function(){
        var hasActive = $('.open_time').hasClass('active');
        if(hasActive){
            $('.open_time').removeClass('active');
        }else{
            $('.open_time').addClass('active');
        }
       });  

    //윈도우 리사이즈시 작동
    $(window).resize(function(){

         //메인 : 모바일 전체메뉴(햄버거메뉴) 껐다 켜기
        var $width=$(window).width();
        var limitWidth=768;
         $(".all_menu").off('click').on('click',function(){
                 event.stopPropagation();
                if($width < limitWidth){
                    $(this).parent().parent().next(".mo_total_menu_wrap").slideToggle('slow');
                    $(".mo_total_menu_cover").slideToggle(500);
                }else if($width >= limitWidth){
                        return false;
                    }
           });   //all_menu 클릭부분

            $("html").click(function(){
                $(".all_menu").parent().parent().next(".mo_total_menu_wrap").slideUp(400);
                $(".mo_total_menu_cover").slideUp(500);
            });  //html 클릭부분


        //서브 : 모바일사이즈 세부메뉴(수련관소개)
        var ul = $('.toggle_button').siblings('ul');
        $('.toggle_button').off('click').on('click',function(){
            if($width < limitWidth){
                if (ul.hasClass('active')) {
                     $(ul).removeClass('active');
                }
                else{
                    $(ul).addClass('active');
                    $('.nav_toggle li').off('click').on('click',function(){
                        $(ul).removeClass('active');
                        // return false;
                     });
                }
            }else{
                        return false;
                    } 
        });

        // //totop 스크롤
       $(window).scroll(function(){
        var Top = $(this).scrollTop();
                if(Top>50){
                    $('.to_top').css('display','block');
                }else{
                    $('.to_top').css('display','none');
                }
        });


        
    });// resize부분 끝

 //자동 슬라이드
    var $ul = $(".rolling_wrap").find("ul"),
        $li = $ul.find("li"),
        itemWidth = $ul.children().outerWidth(),
        itemLength = $ul.children().length;
    var $width=$("body").width();
    var limitWidth=768;
    var rollingId;
    auto();
    $ul.mouseover(function() {
                    clearInterval(rollingId);
                });
 
                // 배너 마우스 아웃 이벤트
                $ul.mouseout(function() {
                    auto();
                });
 
                // 이전 이벤트
                $("#prev").on("click", prev);
 
                $("#prev").mouseover(function(e) {
                    // e.preventDefault();
                    clearInterval(rollingId);
                });
 
                $("#prev").mouseout(auto);
 
                // 다음 이벤트
                $("#next").on("click", next);
 
                $("#next").mouseover(function(e) {
                    // e.preventDefault();
                    clearInterval(rollingId);
                });
 
                $("#next").mouseout(auto);
 
                function auto() {
 
                    rollingId = setInterval(function() {
                        start();
                    }, 2500);
                }
 
                function start() {
                    $ul.animate({"left": - itemWidth + "px"}, function() {

                            
                        // 첫번째 li 마지막에 추가
                        $(this).append("<li>" + $(this).find("li:first").html() + "</li>");
 
                        // 첫번째 li 삭제
                        $(this).find("li:first").remove();
                        $(this).find("li").removeClass("on");
                        $(this).find("li:nth-child(2)").addClass("on");
                    
                        // 좌측 패널 수치 초기화
                        $(this).css("left", 0);
                    });
                }
 
                // 이전버튼 실행
                function prev(e) {
                    e.preventDefault();
                    $ul.css("left", - itemWidth);
                    $ul.prepend("<li>" + $ul.find("li:last").html() + "</li>");
                    $ul.find("li:last").remove();
                    $ul.animate({"left": "0px"}, function() {
                        $(this).find("li").removeClass("on");
                        $(this).find("li:nth-child(2)").stop().addClass("on");
                        $(this).css("left", 0);
                    });
                }
 
                // 다음버튼 실행
                function next(e) {
                    e.preventDefault();
                    $ul.animate({"left": - itemWidth + "px"}, function() {
                        $(this).append("<li>" + $(this).find("li:first").html() + "</li>");
                        $(this).find("li:first").remove();
                        $(this).find("li").removeClass("on");
                        $(this).find("li:nth-child(2)").addClass("on");
                        $(this).css("left", 0);
                    });
                }
    
    //서브페이지(로그인) 탭
    $(".tap a").on('click focus',function(){
        var i = $(this).parent().index();
        $(".tap a").removeClass('active');
        $(this).addClass('active');
        $('.sub_contain').children('div').removeClass('active');
        $('.sub_contain').children('div').eq(i).addClass('active');
    });

    //로그인버튼 알림창
    $('button#login_btn').click(function(){
        var idval = $('input#myid').val(),
            check1 = $("input#myid").val().length,
            check2 = $("input#mypw").val().length;
        if(check1 > 0 && check2 > 0){
            alert(idval+'님 환영합니다!');            
        }
    });

    //로그인-버튼(id/pw, join)클릭시 창 이동
    $('.find_or_new button').click(function(){
        var i = $(this).parent().index()+1;
        $(".tap a").removeClass('active');
        $(".tap a").eq(i).addClass('active');
        $('.sub_contain').children('div').removeClass('active');
        $('.sub_contain').children('div').eq(i).addClass('active');
    });

    //회원가입 체크 유효성검사
    $('button#join_btn').click(function(){
        var uncheck1 = !$("input:checked[id='join_agree1']").is(':checked');
        var uncheck2 = !$("input:checked[id='join_agree2']").is(':checked');
        var check1 = $("input:checked[id='join_agree1']").is(':checked');
        var check2 = $("input:checked[id='join_agree2']").is(':checked');
        if (uncheck1 || uncheck2) {
            alert('모든 항목에 동의하셔야 합니다.');
            return false;
        }else if (check1 && check2) {
             alert('회원가입페이지로 이동합니다. 반갑습니다!');
            return false;
        }
        
    });
    
    //이메일 직접입력 선택시 활성화
    $('select#email').click(function(){
        if($('select#email option:nth-child(5)').is(':selected')){
            $('input#email_site').attr('disabled',false);
        }else{
            $('input#email_site').attr('disabled',true).val('');
        }
    }); 

    //ID-PW찾기 버튼 알림
    $('button#find_id_btn').click(function(){
        var nameval = $('input#myname').val(),
            check1 = $("input#myname").val().length,
            check2 = $("input#myphone").val().length,
            check3 = $("input#myemail").val().length,
            check4 = $("input#email_site").val().length,
            checkhas4 = $("input#email_site").attr('disabled');
        if(check1 > 0 && check2 > 0 && check3>0 && check4>0 && checkhas4!='disabled'){
            alert(nameval+'님의 회원정보가 없습니다.');         
        }else if(check1 > 0 && check2 > 0 && check3>0 && checkhas4=='disabled'){
            alert(nameval+'님의 회원정보가 없습니다.');         
        }
    });





}); //$(document).ready(function() 끝나는 지점임
