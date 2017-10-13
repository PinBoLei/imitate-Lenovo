define(function(){       
	function demo(){
		//轮播图
		var aBtns = $(".dots").find("div").find("li");
		var oUl = $(".banner_jsd").find("ul");
		var aLi = oUl.find("li");
		var iNow = 0;//代表当前显示的图片的下标
		var timer = null;
		var clearTimer = null;
		aBtns.hover(function(){
			iNow = $(this).index();
			tab();
			clearTimer = clearInterval(timer);
		},function(){
			iNow = $(this).index();
			tab();
			timer = setInterval(timerInner,2000);
		})
	
		function tab(){
			//当点击的时候将所有的按钮的class取消掉
			aBtns.removeClass("active");
			aBtns.eq(iNow).addClass("active");
			if(iNow % 2 == 0){
				$(".banner_jsd").find("ul").stop().animate({left:0},1000);
			}else{
				$(".banner_jsd").find("ul").stop().animate({left:"-100%"},1000);
			}
		}
	
		function timerInner(){
			iNow++;
			tab();
			if(iNow == aBtns.size()){
				iNow = 0;
				aBtns.eq(0).addClass("active");
				$(".banner_jsd").find("ul").stop().animate({left:0},1000);
				//animate2();
			}
		}
		timer = setInterval(timerInner,2000);
		
		//鼠标移入轮播图关闭计时器
		aLi.mouseenter(function(){
			clearTimer = clearInterval(timer);
		}).mouseleave(function(){
			timer = setInterval(timerInner,2000);
		})
	}
	return {demo:demo}
})
