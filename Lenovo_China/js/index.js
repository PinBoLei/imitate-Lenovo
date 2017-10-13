define(["enroll","login"],function(enroll,login){
	function index(){
		var str = $.cookie("useInfo");
		console.log(str);
		//动态创建页内导航按钮
		$.ajax({
			url:"json/nav_btn.json",
			type:"get",
			success:function(nav){
				var html = "";
				for(var i= 0; i < nav.length; i++){
					html += '<li><a href="#"><img src="'+nav[i].img1+'" class="img_show" /><img src="'+nav[i].img2+'" class="img_hide" /><span></span><p class="">'+nav[i].txt+'</p></a></li>';
				}
				$(".nav_btn").find("ul").html(html);
			}
		})
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
			stars();
		});
		//当屏幕滚动时对应楼层时显示相应的内容
		function stars(){
			var scrollTop = $(window).scrollTop();
			var li = $(".floor_list").find("ul").find("li");
			if(scrollTop > 571 && scrollTop < 731){
				$(".floor_list").css("display","block");
				
				li.eq(0).find("span").css("display","inline-block");
				li.eq(0).find("em").css("display","none");
				
			}else if(scrollTop > 731 && scrollTop < 1122){
				
				li.eq(0).find("span").css("display","none");
				li.eq(0).find("em").css("display","block");
				
				li.eq(2).find("span").css("display","block");
				li.eq(2).find("em").css("display","none");
			}else if(scrollTop > 1122 && scrollTop < 1722){
				
				li.eq(0).find("span").css("display","inline-block");
				li.eq(0).find("em").css("display","none");
				
				li.eq(2).find("span").css("display","none");
				li.eq(2).find("em").css("display","block").css("color","#1C94C4");
				
				li.eq(4).find("span").css("display","block");
				li.eq(4).find("em").css("display","none");
			}else if(scrollTop > 1722 && scrollTop < 2337){
				li.eq(2).find("span").css("display","block");
				li.eq(2).find("em").css("display","none");
				
				li.eq(4).find("span").css("display","none");
				li.eq(4).find("em").css("display","block").css("color","#1C94C4");
				
				li.eq(6).find("span").css("display","block");
				li.eq(6).find("em").css("display","none");
			}else if(scrollTop > 2237 && scrollTop < 2960){
				li.eq(4).find("span").css("display","block");
				li.eq(4).find("em").css("display","none");
				
				li.eq(6).find("span").css("display","none");
				li.eq(6).find("em").css("display","block").css("color","#1C94C4");
				
				li.eq(8).find("span").css("display","block");
				li.eq(8).find("em").css("display","none");
			}else if(scrollTop > 2960 && scrollTop < 3566){
				li.eq(6).find("span").css("display","block");
				li.eq(6).find("em").css("display","none");
				
				li.eq(8).find("span").css("display","none");
				li.eq(8).find("em").css("display","block").css("color","#1C94C4");
				
				li.eq(10).find("span").css("display","block");
				li.eq(10).find("em").css("display","none");
			}else if(scrollTop > 3566 && scrollTop < 4177){
				li.eq(8).find("span").css("display","block");
				li.eq(8).find("em").css("display","none");
				
				li.eq(10).find("span").css("display","none");
				li.eq(10).find("em").css("display","block").css("color","#1C94C4");
				
				li.eq(12).find("span").css("display","block");
				li.eq(12).find("em").css("display","none");
			}else if(scrollTop > 4177 && scrollTop < 4640){
				li.eq(10).find("span").css("display","block");
				li.eq(10).find("em").css("display","none");
				
				li.eq(12).find("span").css("display","none");
				li.eq(12).find("em").css("display","block").css("color","#1C94C4");
				
				li.eq(14).find("span").css("display","block");
				li.eq(14).find("em").css("display","none");
			}else if(scrollTop >= 4640){
				li.eq(12).find("span").css("display","block");
				li.eq(12).find("em").css("display","none");
				
				li.eq(14).find("span").css("display","none");
				li.eq(14).find("em").css("display","block").css("color","#1C94C4");
			}
			else{
				$(".floor_list").css("display","none");
			}
		}
	
	/*===========================================================================*/
		//轮播图
		var aBtns = $(".ban_div").find("ol").find("li");
		var oUl = $(".ban_div").find(".ban_pic");
		var aLi = oUl.find("li");
		var iNow = 0;//代表当前显示的图片的下标
		var timer = null;
		var clearTimer = null;
		aBtns.click(function(){
			iNow = $(this).index();
			tab();
		})
	
		function tab(){
			//当点击的时候将所有的按钮的class取消掉
			aBtns.attr("class","");
			aLi.css("display","none");
			
			aBtns.eq(iNow).attr("class","active");
			aLi.eq(iNow).css("display","block");
			
		}
	
		function timerInner(){
			iNow++;
			tab();
			if(iNow == aBtns.size()){
				iNow = 0;
				aBtns.eq(0).attr("class","active");
				aLi.eq(0).css("display","block");
			}
		}
		timer = setInterval(timerInner,2000);
	/*===========================================================================*/	
		//鼠标移入轮播图关闭计时器
		aLi.mouseenter(function(){
			clearTimer = clearInterval(timer);
		}).mouseleave(function(){
			timer = setInterval(timerInner,2000);
		})
	/*===========================================================================*/	
		//鼠标移入出现左右箭头
		$(".ban_div").mouseover(function(){
			$(".btnLeft").css("display","block");
			$(".btnRight").css("display","block");
		}).mouseout(function(){
			$(".btnLeft").css("display","none");
			$(".btnRight").css("display","none");
		})
	/*===========================================================================*/	
		//当点击向左箭头，轮播图向左切换
		$(".btnLeft").click(function(){
			//var num = $(".ban_div").find("ol").find("li").length;
			--iNow;
			if(iNow <= 0){
				iNow = 0;
				aBtns.eq(0).attr("class","active");
				aLi.eq(0).css("display","block");
			}
			tab();		
		})
	/*===========================================================================*/
		//当点击向右箭头，轮播图向右切换
		$(".btnRight").click(function(){
			var num = $(".ban_div").find("ol").find("li").length;
			++iNow;
			if(iNow >= num -1){
				iNow = num -1;
				aBtns.eq(num -1).attr("class","active");
				aLi.eq(num -1).css("display","block");
			}
			tab();	
		})
/*===========================================================================*/
		
	/*===========================================================================*/
		//当鼠标移入对应楼层时显示相应的内容
		var scrollTop = $(window).scrollTop();
		for(var i = 0; i < 15; i+=2){
			$(".floor_list").find("ul").find("li").eq(i).hover(function(){
				$(this).find("span").css("display","none");
				$(this).find("em").css("display","block").css("color","#1C94C4");
			},function(){
				$(this).find("span").css("display","inline-block");
				$(this).find("em").css("display","none");
			})
			
			$(".floor_list").find("ul").find("li").eq(i).click(function(){
				$(this).find("span").css("display","none");
				$(this).find("em").css("display","block").css("color","#1C94C4");
				$(this).siblings("li").find("span").css("display","inline-block");
				$(this).siblings("li").find("em").css("display","none");
			}/*,function(){
				$(this).find("span").css("display","inline-block");
				$(this).find("em").css("display","none");
			}*/)
		}
/*==========================================================================*/
		//点击登录,弹出注册框
		$(".logina").click(function(){
			var	html='<div class="mask"></div><div class="login" id = "enter"><div class="login_title"><h3>登录</h3><a href="#"></a></div><div class="login_inputa"><div class="imga"><img src="images/icon03.jpg"/></div><input type="text" id="txt" placeholder="请输入手机号或邮箱" /></div><div class="login_inputb"><div class="imgb"><img src="images/icon04.jpg"/></div><input type="password"  id="password" placeholder="密码" /></div><div class="login_hint"></div><div class="login_main"><input type="checkbox"  id="check" checked="checked" /><p>自动登录</p></div><div class="login_btn"><a href="#">登&nbsp;&nbsp;录</a></div><div class="login_footer"><p><a href="#" class="a1">立即注册</a><a href="#" class="a2">忘记密码</a></p></div><div class="cooperation">使用合作网站账号登录:<div class="co_items"><a href="#" class="qq"><img src="images/ico_qq.png"/></a><a href="#" class="wb"><img src="images/ico_sina.png"/></a><a href="#" class="wx"><img src="images/ico_wc.png"/></a><a href="#" class="zfb"><img src="images/ico_zfb.png"/></a></div></div></div>';
			$("body").append(html);
			login.login();
			$(".a1").click(function(ev){
				$(".mask").remove();
				$(".login").remove();
				enrolla();
				enroll.enroll();
				return false;
			})
		})
			
		//点击注册,弹出注册框
		$(".enrolla").click(function(){
			enrolla();
			enroll.enroll();
		})
		
		function enrolla(){
			var html ='<div class="mask"></div><div class="enroll"><div class="enroll_title"><h1>欢迎注册联想会员</h1><a href="#"></a></div><div class="enroll_inputa"><label>账号</label><input type="text" id="account" placeholder="请输入手机号" /></div><div class="enroll_hinta"></div><div class="enroll_inputb"><label>密码</label><input type="password" id="passworda" placeholder="密码长度8~20位,数字、字母、字符" /></div><div class="enroll_hintb"></div><div class="enroll_inputc"><label>确认密码</label><input type="password" id="passwordb"  /></div><div class="enroll_hintc"></div><div class="enroll_inputd"><p class="inputd"><label>验证码</label><input type="text" id="auth_code1"/></p><img src="images/img.jpg"/><span>换一张</span></div><div class="enroll_hintd"></div><div class="enroll_inputd"><p class="inputd"><label>手机验证码</label><input type="text" id="auth_code2"/></p><button>获取手机验证码</button></div><div class="enroll_hintd"></div><div class="enroll_main"><label><input type="checkbox" checked="checked"/><p> 同意联想的 <a href="#">使用条款</a> 和<a href="#">隐私权政策</a></p></label></div><div class="enroll_btn"><a>立即注册</a></div></div>';
			$("body").append(html);
		}
		
		
		
		
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
	}
	 return {index:index}
})

	
