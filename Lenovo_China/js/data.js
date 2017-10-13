define(function(){
	function data(){
		$.ajax({
			url:"json/data1.json",
			type:"get",
			success:function(data){
				var html = "";
				for(var i = 0; i < data.length; i++){
					html += '<div class="shop_lta"><p><a href="#">'+data[i].title+'</a></p><ul></ul></div>';
				}
				$(".ban_list").find("li").find(".shop_l").html(html);
			}
		})
		
		$.ajax({
			url:"json/data2.json",
			type:"get",
			success:function(data){
				var html = "";
				for(var i = 0; i < data[0].data.length; i++){
					html += '<li><a href="#">'+ data[0].data[i].title +'</a></li>';
				}
				$(".ban_list").find("li").find("ul").html(html);
				
				
			}
		})
	}
	return {data : data};
})
