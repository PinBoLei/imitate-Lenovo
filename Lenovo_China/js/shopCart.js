define(function(){
	function shopCart(){
		frist();
		function frist(){
			/*判断cookie是否有数据***/
			var sc_arr = eval($.cookie("goods"));
			var first = sc_arr == null || sc_arr =="" ? true : false;
			if(first){
				//如果没有，加载空列表的页面
				var html = '<div class="bc_null"><h3>您的购物车内暂无商品,您可以</h3><div class="bc_no_btn"><a href="index.html">选购商品</a></div></div>';
				$(".bc_body").html(html);
			}else{
				sc_mag();
			}
		}
		
		function sc_mag(){
			//已经存储在cookie数据进行加载
			$.ajax({
				url:"json/star.json",
				type:"get",
				success:function(res){
					var sc_arr = eval($.cookie("goods"));
					var html = "";
					for(var i in sc_arr){
						html +='<div class="bc_box" id="'+ sc_arr[i].id +'"><div class="bc_box_top"><div class="bc_table_sel"><a href="#" class="bc_active1"></a></div><div class="bc_table_img"><a href="'+ res[sc_arr[i].id].href +'" target="_blank"><img src="'+res[sc_arr[i].id].img+'"/></a></div><div class="bc_proname"><a href="#">'+ res[sc_arr[i].id].name +'</a></div><div class="bc_desc"><p>'+ res[sc_arr[i].id].desc +'</p></div><div class="bc_pice"><span>'+ res[sc_arr[i].id].RMB +'</span></div><div class="bc_i"><div class="i_box"><input type="button"  id="pro_less" value="-" data="'+sc_arr[i].id+'" /><input type="text"  id="pro_num" value="'+ sc_arr[i].num +'" /><input type="button"  id="pro_add" value="+" data="'+sc_arr[i].id+'"/></div></div><div class="bc_red">'+ sc_arr[i].price +'</div><div class="bc_operate"><a href="#" class="bc_a" id="'+ sc_arr[i].id +'">删除</a><a href="#">移入收藏夹</a></div></div><div class="bc_gift"><div class="gift_con"><div class="gift_title">赠品:</div><div class="gift_img"><a href="#"><img src="images/bao.jpg"/></a></div><div class="gift_desc"><a href="#">联想笔记本双肩包鼠套装BM400 </a></div><div class="gift_num">1</div></div></div></div>';
					}
					$(".bc_body").html(html);
					var	html1 = '<div class="bc_num"><div class="bc_num_fl"><div class="bc_all"><a href="#" class="all_active1"></a><span>全选</span></div><a href="#" class="bc_num_del">删除选中商品</a></div><ul class="bc_num_fr"><li class="li1" style="margin-top:0px;">商品总价： <span id="total_price"></span></li><li class="li2">合计：<span id="totalmoney"></span></li></ul></div><div class="bc_probtn"><a href="#">去结算</a></div>';
					$(".bc_body").append(html1);
					sc_car();
				}
			})
			
		}
		function sc_car(){
			//点击单个按钮
			var isYes = false;
			$(".bc_box").delegate(".bc_active1","click",function(ev){
				if(isYes){
					$(this).removeClass("bc_active2");
					$(".all_active1").removeClass("all_active2");
					$("#total_price").html("");
					$("#totalmoney").html("");
					isYes = false;
				}else{
					$(this).addClass("bc_active2");
					var html = Number($(".bc_red").eq($(this).parents(".bc_box").index()).html());
					$("#total_price").html(html+".00");
					$("#totalmoney").html(html+".00");
					var a = $(".bc_active2").size();
					var b = $(".bc_box").size();
					if(a == b){
						$(".all_active1").addClass("all_active2");
						var addPrice = 0;
						for(var i = 0; i < b; i++){
							var money = Number($(".bc_box").eq(i).find(".bc_red").html());
							addPrice += money;
						}
						$("#total_price").html(addPrice+".00");
						$("#totalmoney").html(addPrice+".00");
						isYes = true;
					}
					isYes = true;
				}
				return false;
				var html = Number($(".bc_red").eq($(".bc_active2").parents(".bc_box").index()).html());
				$("#total_price").html(html+".00");
				$("#totalmoney").html(html+".00");
			})
			
			//点击加减商品数量
			var num = parseInt($("#pro_num").val());
			var html = parseInt($(".bc_red").html());
			
			var value = html / num;	
			//手动改变商品数量
			$(".bc_box").delegate("#pro_num","blur",function(){
				var numa = parseInt($("#pro_num").val());
				var index = $(this).parents(".bc_box").index();
				html = value * numa;
				if(numa <= 1){
					numa = 1;
					html = value;
					$(".bc_box").eq(index).find("#pro_num").val(numa);
				}else if(numa >=5){
					numa = 5;
					html = value * numa;
					$(".bc_box").eq(index).find("#pro_num").val(numa);
					alert("该商品最多只能购买5件");
				}
				$(".bc_red").eq(index).html(html+".00");
				var id = $(".bc_box").eq(index).attr("id");
				var shopNum = parseInt($(".bc_box").eq(index).find("#pro_num").val());
				var str = $.cookie("goods");
				var arr = eval(str);
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num = shopNum;
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods",cookieStr,{expires:7});
					}
				}
				//sc_mag();
			})
			//商品数量 减法
			$(".bc_box").delegate("#pro_less","click",function(){
				var value = html / num;
				var index = $(this).parents(".bc_box").index();
				
				num --;
				html = html - value;
				if(num <= 1){
					num = 1;
					html = value;
				}
				$(".bc_box").eq(index).find("#pro_num").val(num);
				$(".bc_red").eq(index).html(html+".00");
				
				var id = $(".bc_box").eq(index).attr("id");
				var shopNum = parseInt($(".bc_box").eq(index).find("#pro_num").val());
				var money = parseInt($(".bc_red").eq(index).html());
				var str = $.cookie("goods");
				var arr = eval(str);
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num = shopNum;
						arr[i].price =  money;
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods",cookieStr,{expires:7});
					}
				}
				//sc_mag();
			})
			//商品数量 加法
			$(".bc_box").delegate("#pro_add","click",function(){
				var value = html / num;
				var index = $(this).parents(".bc_box").index();
				
				num ++;
				html = html + value;
				if(num >=5){
					num = 5;
					html = value * num;
				}
				$(".bc_box").eq(index).find("#pro_num").val(num);
				$(".bc_red").eq(index).html(html+".00");
				
				var id = $(".bc_box").eq(index).attr("id");
				var shopNum = parseInt($(".bc_box").eq(index).find("#pro_num").val());
				var money = parseInt($(".bc_red").eq(index).html());
				var str = $.cookie("goods");
				var arr = eval(str);
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num = shopNum;
						arr[i].price = money;
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods",cookieStr,{expires:7});
					}
				}
				//sc_mag();
			})
			//点击删除，删除商品
			$(".bc_box").delegate(".bc_a","click",function(){
				var arr = eval($.cookie("goods"));
				var index = $(this).parents(".bc_box").index();
				
				//var id = $(".bc_box").eq(index).attr("id");
				var id = $(this).attr("id");
				for(var i in arr){
					if(arr[i].id == id){
						arr.splice(i,1);
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods",cookieStr,{expires:7});
					}
				}
				$(".bc_box").eq(index).remove();
				$(".all_active1").removeClass("all_active2");
				$("#total_price").html("");
				$("#totalmoney").html("");
				frist();
				//sc_mag();
			})
			//点击全选中
			$(".all_active1").click(function(ev){
				if(isYes){
					$(".bc_active1").removeClass("bc_active2");
					$(".all_active1").removeClass("all_active2");
					$("#total_price").html("");
					$("#totalmoney").html("");
					isYes = false;
				}else{
					$(".bc_active1").addClass("bc_active2");
					$(".all_active1").addClass("all_active2");
					var boxNum = $(".bc_box").size();
					var addPrice = 0;
					for(var i = 0; i < boxNum; i++){
						var money = Number($(".bc_box").eq(i).find(".bc_red").html());
						addPrice += money;
					}
					$("#total_price").html(addPrice+".00");
					$("#totalmoney").html(addPrice+".00");
					isYes = true;
				}
				return false;
			})
			//点击删除全部商品
			$(".bc_num_del").click(function(){
				var sure = confirm("确定要清空吗？");	
				if(sure == true){
					$.cookie("goods",null);
				}
				location.reload();
			})
		}
		
	}
	return {shopCart:shopCart}
})
