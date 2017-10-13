define(function(){
	function star(){
		$.ajax({
			url:"json/star.json",
			type:"GET",
			success:function(res){
				var html ="";
				for(var i = 0; i < res.length; i++){
					html += '<li><a href="'+ res[i].href +'" target="_blank"><img src="'+ res[i].img +'"/></a><p class="start_name"><a href="#">'+ res[i].name +'</a></p><p><a href="#">'+ res[i].desc +'</a></p><p class="start_price"><a href="#">'+ res[i].price +'</a></p></li>';
				}
				
				$(".main_wrap").find("ul").html(html);
				//明星单品的右方向button
				$(".main_right").click(function(){
					var starLeft = $(".main_wrap").find("ul").position().left;
					starLeft = starLeft - 200;
					if(starLeft <= -1000){
						starLeft = -1000;
					}
					$(".main_wrap").find("ul").stop().animate({
						left:starLeft
					},1000)
					
				})
				//明星单品的左方向button
				$(".main_left").click(function(){
					var starLeft = $(".main_wrap").find("ul").position().left;
					starLeft = starLeft + 200;
					if(starLeft >= 0){
						starLeft = 0;
					}
					$(".main_wrap").find("ul").stop().animate({
						left:starLeft
					},1000)
					
				})
			}
		})
	}
	return {star:star}
})