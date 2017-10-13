define(function(){
	function imgs(){
		$.ajax({
			url:"json/imgs.json",
			type:"GET",
			success:function(res){
				var html ="";
				for(var i = 0; i < res.length; i++){
					html += '<div class="imgs1"><a href="#" class="imgs_img"><img src="'+ res[i].img +'"/></a><a href="#" class="imgs_name">'+ res[i].name +'</a><a href="#" class="imgs_desc">'+ res[i].desc +'</a><p><a href="#" class="imgs_price">'+ res[i].price +'</a></p><span class="imgs_lable'+ res[i].id +'"></span></div>';
				}
				$(".box1_img").find(".img_right").html(html);
			}
		})
	}
	return {imgs:imgs}
})
