define(function(){
	function goods(){
		//商品大图
		$.ajax({
			url:"json/pic.json",
			type:"get",
			success:function(pic){
				var html = "";
				for(var i= 0; i < pic.length; i++){
					html += '<img src="'+ pic[i].img +'" class="pic" />';
				}
				$(".deatil_left").prepend(html);
				$("#b_box_all").html(html);
				$(".pic").eq(0).css("display","block");
				$("#b_box_all").find(".pic").eq(0).css("display","block");
			}
		})
		
		//商品小图
		$.ajax({
			url:"json/ul_pic.json",
			type:"get",
			success:function(pic){
				var html = "";
				for(var i= 0; i < pic.length; i++){
					html += '<li ><a href="#"><img src="'+ pic[i].img +'"/></a></li>';
				}
				$(".list_ul").html(html);
				
				$(".list_ul").find("li").eq(0).addClass("play_active");
				
				//点击图片列表
				$(".list_ul").find("li").click(function(ev){
					$(".list_ul").find("li").attr("class","");
					$(".pic").css("display","none");
					$("#b_box_all").find(".pic").css("display","none");
					
					$(this).attr("class","play_active");
					$(".pic").eq($(this).index()).css("display","block");
					$("#b_box_all").find(".pic").eq($(this).index()).css("display","block");
					return false;
				})
				/*var num = $(".list_ul").find("li").length;
				alert(num);*/
			}
			
		})
		//右侧列表信息
		$.ajax({
			url:"json/product.json",
			type:"get",
			success:function(product){
				var name = "";
				var dec = "";
				var promotion = "";
				var itemChecked = "";
				var guige = "";
				name = '<div><span id="span_product_name">'+ product[0].name +'</span></div>';
				dec = '<div class="div_product_dec">'+ product[0].desc +'</div>';
				promotion = '<div class="promotion_xdlj"><span class="pro_title">'+product[0].tltle+'</span><div class="promotion-body"><span>'+ product[0].text1 +'</span></div></div><div class="pc_promotion"><a href="#">'+ product[0].info +'</a></div>';
				itemChecked = '<div class="item_checked"><img src="'+product[0].img+'"/><a href="#" target="_blank" class="item-text">'+product[0].itemText+'</a></div>';
				
				$(".deatil_right").prepend(name);
				$(".container_cuxiao").before(dec);
				$(".div_promotion").html(promotion);
				$(".div_zengpin").html(itemChecked);
				
				for(var i = 0; i < product[1].guige.length; i++){
					guige +='<span ><i>'+product[1].guige[i].text+'</i></span>'; 
				}
				$(".guige").find("li").append(guige);
				
				//购选列表
				$(".guige").find("li").find("span").click(function(){
					//$(this).css("borderColor","red");
					$(".guige").find("li").find("span").removeClass("spec_active");
					$(this).addClass("spec_active");
				})
			}
			
		})
		//点击左右键
		var iNow = 0;//代表当前显示的图片的下标
		var aLisNum = 0;//代表点击图片的下标
		//点击右键
		$(".play_right").click(function(){
			var aLeft = $(".list_ul").position().left;
			
			var num = $(".list_ul").find("li").length;//列表图片的个数
			for(i = 0; i < num; i++){
				var className = $(".list_ul").find("li").eq(i).attr("class");
				if(className == "play_active"){
					aLisNum = $(".list_ul").find("li").eq(i).index();
				}
			}
			iNow = aLisNum;
			
			++iNow;
			if(iNow >= num -1){
				iNow = num -1;
				$(".list_ul").find("li").eq(num -1).attr("class","play_active");
				$(".pic").eq(num -1).css("display","block");
				$("#b_box_all").find(".pic").eq(num -1).css("display","block");
				
				$(this).css("opacity","0.3");
				aLeft = aLeft - 480;
				if(aLeft <= -480){
					aLeft = -480;
				}
				$(".list_ul").stop().animate({
					left:aLeft
				},500)
			}
			tab();
		})
		//点击左键
		$(".play_lfet").click(function(){
			var aLeft = $(".list_ul").position().left;
			aLeft = aLeft + 480;
			if(aLeft >= 0){
				aLeft = 0;
			}
			$(".list_ul").stop().animate({
				left:aLeft
			},500)
			
			var num = $(".list_ul").find("li").length;//列表图片的个数
			for(i = 0; i < num; i++){
				var className = $(".list_ul").find("li").eq(i).attr("class");
				if(className == "play_active"){
					aLisNum = $(".list_ul").find("li").eq(i).index();
				}
			}
			iNow = aLisNum;
			
			--iNow;
			if(iNow <= 0){
				iNow = 0;
				$(".list_ul").find("li").eq(0).attr("class","play_active");
				$(".pic").eq(0).css("display","block");
				$("#b_box_all").find(".pic").eq(0).css("display","block");
				$(this).css("opacity","0.3");
			}
			tab();
		})
		function tab(){
			//当点击的时候将所有的按钮的class取消掉
			$(".list_ul").find("li").attr("class","");
			$(".pic").css("display","none");
			$("#b_box_all").find(".pic").css("display","none");
			
			$(".list_ul").find("li").eq(iNow).attr("class","play_active");
			$(".pic").eq(iNow).css("display","block");
			$("#b_box_all").find(".pic").eq(iNow).css("display","block");
			
		}
		//选择配置
		$(".clearfix").find("ul").find("li").click(function(){
			//点击按钮的时候
			$(".clearfix").find("ul").find("li").attr("class","");
			$(".clearfix").find(".box_info").css("display","none");
			//设置当前点击的按钮和对应div
			$(this).attr("class","cl_active");
			$(".clearfix").find(".box_info").eq($(this).index()).css("display","block");
		})
		//配置信息
		$.ajax({
			url:"json/main.json",
			type:"get",
			success:function(data){
				var html = "";
				for(var i = 0; i < data.length; i++){
					html += '<div class="good_item"><div class="item_row_first"><div class="item_title">'+ data[i].name +'</div></div><div class="item_row"><div class="col_one">'+ data[i].list1 +'</div><div class="col_two">'+ data[i].desc1 +'</div></div><div class="item_row"><div class="col_one">'+ data[i].list2 +'</div><div class="col_two">'+ data[i].desc2 +'</div></div><div class="item_row"><div class="col_one">'+ data[i].list3 +'</div><div class="col_two">'+ data[i].desc3 +'</div></div><div class="item_row_last"><div class="col_one"></div><div class="col_two"></div></div></div>';
				}
				$(".con").html(html);
			}
		})
		//商品详情
		$.ajax({
			url:"json/maina.json",
			type:"get",
			success:function(dataImg){
				var htmla = "";
				var htmlb = "";
				for(var i = 0; i < dataImg.length; i++){
					htmla +='<img src="'+ dataImg[i].img +'" />';
				}
				$(".P1").html(htmla);
				htmlb = '<img src="'+ dataImg[0].image +'" />';
				$(".P2").html(htmlb);
			}
		})
	}
	return {goods:goods}
})