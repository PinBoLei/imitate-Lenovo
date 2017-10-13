define(function(){
	function login(){
		
		//点击登录框中的关闭按钮，登录框消失
		$(".login").find(".login_title").find("a").click(function(){
			$(".mask").remove();
			$(".login").remove();
			
		})
		/*//点击登录框中的立即注册，跳转到注册框
		$(".login_footer").find("a").eq(0).click(function(){
			$(".login").css("display","none");
			$(".enroll").css("display","block");
		})*/
		
		$("#password").click(function(){
			//1、将用户名中误输入的空格清除掉
			var oValue = $("#txt").val().replace(/ /g, "");
			$("#txt").val(oValue);
			oValue = $("#txt").val();
			//手机号验证
			var regPhone = /^1[3|4|5|7|8][0-9]{9}$/;
			//验证邮件格式
			var regEmail = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}$/;
			if(oValue == ""){
				var html = '<p>账号不能为空</p>'; 
				$(".login_hint").html(html);
			}else if(!(regPhone.test(oValue) || regEmail.test(oValue))){
				var html = '<p>账号格式错误!</p>'; 
				$(".login_hint").html(html);
			}
		})
		$(".login_btn").on("click","a",function(ev){
			var oValue = $("#txt").val().replace(/ /g, "");
			var pass = $("#password").val().replace(/ /g, "");
			$("#password").val(pass);
			$("#txt").val(oValue);
			pass = $("#password").val();
			oValue = $("#txt").val();
			if(oValue == ""){
				var html = '<p>账号格式错误!</p>'; 
				$(".login_hint").html(html);
			}else if(pass == ""){
				var html = '<p>密码不能为空</p>'; 
				$(".login_hint").html(html);
			}else{ 
				$(".login_hint").html("");
				//获取用户数据
				var user = $("#txt").val();
				var pass = $("#password").val();
				//alert(user+","+pass);
				var str = $.cookie("useInfo");
				var arr = str.split(":");
				var same = false;//代用户名和密码是否相同
				//遍历所有的对象，判断是否id相同
				for(var i = 0; i < arr.length;i++){
					if(arr[i] == user && arr[i+1] == pass){
						alert("登录成功");
						var html = '<a href="#">'+ user +'</a>';
						$(".domain").html(html).css("width","100px");
						$(".domain").find("a").css("color","block");
						//location.reload();
						//隐藏登录框和蒙版
						//$(".login").css("display","none");
						//$(".mask").css("display","none");
						$(".mask").remove();
						$(".login").remove();
						same = true;
						break;
					}
				}
				if(!same){
					alert("用户名或密码错误");
				}
			}
			return false;
		})
	}
	return {login:login}
})