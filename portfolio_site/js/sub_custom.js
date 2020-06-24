$(document).ready(function(){
	$('.view_key_code').on('click touchend',function(){
    	$('html, body').animate({'scrollTop':$($(this).attr('href')).offset().top},450,'easeInExpo')
    });
	$('.code_wrap h3').on('click', function(){
		$(this).next('.code_content').slideToggle(500,'easeInSine').siblings('.code_content').slideUp();
		$(this).siblings('h3').find('img').removeClass('up');
		$(this).find('img').toggleClass('up');
	});
});