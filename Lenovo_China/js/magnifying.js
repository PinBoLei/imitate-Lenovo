define(function(){
	function magnifying(){
		$(".mark_box").mouseenter(function(){
			$(".position_box").css("display", "block");
			$("#b_box").css("display", "block");
		})
		$(".mark_box").mouseleave(function(){
			$(".position_box").css("display", "none");
			$("#b_box").css("display", "none");
		})
		$(".mark_box").mousemove(function(ev){
			var left = ev.offsetX - $(".position_box").width()/2;
			var top = ev.offsetY - $(".position_box").height()/2;
			if(left < 0){
				left = 0;
			}else if(left > $(".mark_box").width() - $(".position_box").width()){
				left = $(".mark_box").width() - $(".position_box").width();
			}
			$(".position_box").css("left", left + "px");
			
			if(top < 0){
				top = 0
			}else if(top > $(".mark_box").height() - $(".position_box").height()){
				top = $(".mark_box").height() - $(".position_box").height()
			}
			$(".position_box").css("top", top + "px");
			
			var proportionX = left/($(".mark_box").width() - $(".position_box").width());
			var proportionY = top/($(".mark_box").height() - $(".position_box").height());
			
			$("#b_box_all").css("left", -proportionX * ($("#b_box_all").width()-$("#b_box").width()) + "px");
			$("#b_box_all").css("top", -proportionY * ($("#b_box_all").height()-$("#b_box").height()) + "px");
		})
	}
	return {magnifying:magnifying};
})