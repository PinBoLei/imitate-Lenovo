$(function(){
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
	//加入购物车部分
	$.ajax({
		url:"json/star.json",
		type:"GET",
		success:function(res){
			var html ="";
			html = '<span class="operate_stock">'+res[1].stock+'</span><span class="bg_reduce"></span><input type="text" id="buy_number" value="1" /><span class="bg_add"></span><div class="operate_money"><span class="price_unit">RMB</span><span class="span_price">'+ res[1].RMB +'</span></div><div class="div_button_group"><a href="#" class="button-pay">'+ res[1].pay +'</a><a href="shopCart.html" class="button-add" id="'+ res[1].id +'">'+ res[1].add +'</a></div>';
			$(".operate_right").html(html);
			//点击加减商品数量
			var num = $("#buy_number").val();
			var html = Number($(".span_price").html());
			var value = html / num;
			$("#buy_number").blur(function(){
				var numa = $("#buy_number").val();
				html = value * numa;
				if(numa <= 1){
					numa = 1;
					html = value;
					$("#buy_number").val(numa);
				}else if(numa >=5){
					numa = 5;
					html = value * numa;
					$("#buy_number").val(numa);
					alert("该商品最多只能购买5件");
				}
				
				$(".span_price").html(html+".00");
			})
			$(".bg_reduce").click(function(){
				var value = html / num;
				num --;
				html = html - value;
				if(num <= 1){
					num = 1;
					html = value;
				}
				$("#buy_number").val(num);
				$(".span_price").html(html+".00");
			})
			$(".bg_add").click(function(){
				var value = html / num;
				num ++;
				html = html + value;
				if(num >=5){
					num = 5;
					html = value * num;
				}
				$("#buy_number").val(num);
				$(".span_price").html(html+".00");
			})
			
			//点击加入购物车
			$(".button-add").click(function(){
				//是否是第一次添加cookie
				var id = this.id;
				var num = parseInt($("#buy_number").val());
				var html = parseInt($(".span_price").html());
				
				var first = $.cookie("goods") == null ? true : false;
				if (first) {
					//第一次添加  [{id:id,num:2}]
					$.cookie("goods",'[{id:'+ id +',num:'+ num +',price:'+ html +'}]',{expires:7});
				}else{
					var str = $.cookie("goods");
					var arr = eval(str);
					var same = false;//代表是否有相同商品
					
					
					//遍历所有的对象，判断是否id和规格spec相同，num++
					for(var i in arr){
						if(arr[i].id == id){
							arr[i].num = arr[i].num + num;
							arr[i].price = arr[i].price + html;
							var cookieStr = JSON.stringify(arr);
							$.cookie("goods",cookieStr,{expires:7});
							same = true;
							break;
						}
					}

					//没有相同的商品
					if(!same){
						var obj = {id:id,num:num,price:html};
						arr.push(obj);
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods",cookieStr,{expires:7});
					}
					
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
			})
		}
	})
})