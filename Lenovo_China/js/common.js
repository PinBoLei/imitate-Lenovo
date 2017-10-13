define(function(){
	function common(){
		//购物车数字
		var sc_str = $.cookie("goods");
		if(sc_str){//判断字符串是否存在
			var sc_str = eval(sc_str);
			var sc_num = 0;
			for(var i in sc_str){
				sc_num = Number(sc_str[i].num) + sc_num;
			}
			$(".shop_num").html(sc_num);
		} 
/*==========================================================================*/
		//下拉菜单1
		$.ajax({
			url:"json/nav_ul1.json",
			type:"get",
			success:function(nav){
				var html = "";
				for(var i= 0; i < nav.length; i++){
					html += '<li><a href="#" >'+ nav[i].name +'</a></li>';
				}
				$(".nav_ul1").html(html);
			}
		})
		//下拉菜单2
		$.ajax({
			url:"json/nav_ul2.json",
			type:"get",
			success:function(nav){
				var html = "";
				for(var i= 0; i < nav.length; i++){
					html += '<li><a href="#" ><span class="'+ nav[i].span +'"></span><em>'+ nav[i].name +'</em></a></li>';
				}
				$(".nav_ul2").html(html);
			}
		})
		//购物指南
		$.ajax({
			url:"json/footerText.json",
			type:"get",
			success:function(data){
				var html = "";
				for(var i= 0; i < data.length; i++){
					html += '<div class=""><h3>'+data[i].title+'</h3><a href="#">'+data[i].txt1+'</a><a href="#">'+data[i].txt2+'</a><a href="#">'+data[i].txt3+'</a></div>';
				}
				$(".footer_text").html(html);
				$(".footer_text").find("div").eq(0).css("margin-left",0);
			}
		})
		//底部导航
		$.ajax({
			url:"json/boxLinea.json",
			type:"get",
			success:function(data){
				var html = "";
				for(var i= 0; i < data.length; i++){
					html += '<li><a href="#">'+data[i].txt+'</a></li>';
				}
				$(".box_line").find(".ul1").html(html);
				$(".box_line").find(".ul1").eq(9).css("border-right",0);
			}
		})
		$.ajax({
			url:"json/boxLineb.json",
			type:"get",
			success:function(data){
				var html = "";
				for(var i= 0; i < data.length; i++){
					html += '<li><a href="#">'+data[i].txt+'</a></li>';
				}
				$(".box_line").find(".ul2").html(html);
				$(".box_line").find(".ul2").eq(9).css("border-right",0);
			}
		})
		//头部加载效果
		$(".head .head_ban").stop().animate({
			height:100
		},1000,function(){
			$(".head .head_big").css("display","none");
			$(".head .head_small").css("display","block");
			$(".head .minimize").css("display","none");
			$(".head .maximize").css("display","block");
		})
		$(".head_ban").on("click",".minimize",function(){
			$(".head_big").css("height",100);
		})
		$(".head_ban").on("click",".maximize",function(){
			$(".head .head_ban").stop().animate({
				height:0
			},function(){
				$("head_small").css("display","none");
				$(".maximize").css("display","none");
			});
		})
	/*===========================================================================*/
		//下拉菜单1
		$(".nav_four").hover(function(){
			
			$(".nav_ul1").stop().slideDown(500).css("display","block");
		},function(){
			$(".nav_ul1").stop().slideUp(500);
		})
	/*===========================================================================*/
		//下拉菜单2
		$(".nav_sex").hover(function(){
			
			$(".nav_ul2").stop().slideDown(500).css("display","block");
		},function(){
			$(".nav_ul2").stop().slideUp(500);
		})
	/*===========================================================================*/
		//下拉菜单3
		$(".nav_seven").hover(function(){
			
			$(".nav_box").stop().slideDown(500).css("display","block");
		},function(){
			$(".nav_box").stop().slideUp(500);
		})
	/*===========================================================================*/	
		//广播消息
		var timer = setInterval(function(){
			$(".headInfomation").delay(1000).animate({
					top:-18,
				},1000,function(){
					$(".headInfomation").css("top",5);
				}
			)
		},1000)
/*===========================================================================*/
		//鼠标滚动事件
		$(document).scroll(function(){
			var scrollTop = $(document).scrollTop();
			//document.title = scrollTop;
			if(scrollTop >= 126){
				//navTop = 0;
				$(".navbar").attr("id","navScroll");
				$(".logo").css("display","none");
				$(".nav_logo").css("display","block");
			}else if(scrollTop <= 126){
				$(".navbar").attr("id","");
				$(".logo").css("display","block");
				$(".nav_logo").css("display","none");
			}
		});
	}
	return {common:common}

})

