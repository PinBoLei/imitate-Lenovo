define(function(){
	function enroll(){
		//点击注册框中的关闭按钮，注册框消失
		$(".enroll").find(".enroll_title").find("a").click(function(){
			$(".mask").remove();
			$(".enroll").remove();
		})
		//验证账号
		$("#account").blur(function(){
			//1、将用户名中误输入的空格清除掉
			var oValue = $("#account").val().replace(/ /g, "");
			$("#account").val(oValue);
			oValue = $("#account").val();
			//手机号验证
			var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
			if(oValue == ""){
				var html = '<p>账号不能为空</p>'; 
				$(".enroll_hinta").html(html);
			}else if(!regPhone.test(oValue)){
				var html = '<p>请输入正确格式的账号</p>'; 
				$(".enroll_hinta").html(html);
			}else{
				$(".enroll_hinta").find("p").remove();
			}
		})
		//验证密码
		$("#passworda").blur(function(){
			//1、将密码中误输入的空格清除掉
			var oValue = $("#passworda").val().replace(/ /g, "");
			$("#passworda").val(oValue);
			oValue = $("#passworda").val();
			//密码规则验证
			var resPass = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
			if(oValue == ""){
				var html = '<p>密码不能为空</p>'; 
				$(".enroll_hintb").html(html);
			}else if(oValue.length > 20 || oValue.length < 8){
				var html = '<p>密码长度8-20位</p>'; 
				$(".enroll_hintb").html(html);
			}else if(!resPass.test(oValue)){
				var html = '<p>密码至少包含数字、字母、字符其中的2种</p>'; 
				$(".enroll_hintb").html(html);
			}else{
				$(".enroll_hintb").find("p").remove();
				
				//确认密码验证
				$("#passwordb").blur(function(){
					//1、将密码中误输入的空格清除掉
					var oValue = $("#passwordb").val().replace(/ /g, "");
					var oValuea = $("#passworda").val();
					$("#passwordb").val(oValue);
					oValue = $("#passwordb").val();
					if(oValue == ""){
						var html = '<p>确认密码和密码不一致，请重新输入</p>'; 
						$(".enroll_hintc").html(html);
					}else if(oValue != oValuea){
						var html = '<p>确认密码和密码不一致，请重新输入</p>'; 
						$(".enroll_hintc").html(html);
					}else{
						$(".enroll_hintc").find("p").remove();
					}
				})
			}
		})
		//注册事件
		//点击注册
		$(".enroll_btn").find("a").click(function(ev){
			var id = $("#account").val();
			var pwd = $("#passworda").val();
			var first = $.cookie("useInfo") == null ? true : false;
			if (first) {
				//第一次添加 
				$.cookie("useInfo",id + ":" + pwd,{expires:7});
				alert("注册成功");
				location.reload();
			}else{
				var str = $.cookie("useInfo");
				var arr = str.split(":");
				var same = false;//代表是否有相同用户
				//遍历所有的对象，判断是否id相同
				for(var i = 0; i < arr.length; i++){
					if(arr[i] == id){
						same = true;
						alert("该用户已经注册");
						break;
					}
				}
				//没有相同的用户
				if(!same){
					str += ":" + id + ":" + pwd;
					$.cookie("useInfo",str,{expires:7});
					alert("注册成功");
					location.reload();
				}
			}
			/*var str = $.cookie("useInfo");
			console.log(str);*/
			return false;
		})
	}
	return {enroll:enroll}
})