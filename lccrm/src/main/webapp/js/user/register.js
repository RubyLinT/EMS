//需要预加载的图片url数组
var images = ['images/background3.png','images/background2.png','images/background.png'];
//执行预加载
preloadImage(images);
//预加载图片的函数
function preloadImage(images) {
	var temp = [];//临时数组		
	for (var i = 0;i < images.length;i ++) {
		temp[i] = new Image(); //创建图片对象
		temp[i].src = images[i]; //动态设置src属性
		(function(index) {
			//图片加载成功事件
			temp[i].onload = function() {
				//console.log(temp[index].src + '加载成功');
			}
			
			//图片加载失败事件
			temp[i].onerror = function(){
				//console.log(temp[index].src + '加载失败');
			}
		})(i);
	}
}
$(document).ready(function(){
	//验证码
	$("#vcode").on("click",'img',function(){
		/**动态验证码，改变地址，多次在火狐浏览器下，不会变化的BUG，故这样解决*/
		var i = new Image();
		i.src = 'open/getGifCode.shtml?'  + Math.random();
		$(i).replaceAll(this);
	});
	$('#registerSub').click(function(event) {
		var nickname = $('#nickname').val();
		var email = $('#email').val();
		var pswd = $('#pswd').val();
		var repswd = $('#repswd').val();
		var vcode = $('#vcodes').val();
		var data = {nickname:nickname,pswd:pswd,email:email,vcode:vcode};
		if(pswd != repswd){
			layer.msg('2次密码输出不一样！');
    		return;
    	}
		$.ajax({
			url: 'u/subRegister.shtml',
			type: 'POST',
			dataType: 'json',
			data:data
    	})
    	.done(function(data) {
    		console.log(data);
    		if(data.status != 200){
    			layer.msg(data.message);
    		} else {
    			layer.msg('注册成功！请重新登录!');
    			setTimeout(function(){
            		window.location.href = 'login.html';
				},1000);
    		}
		})
		.fail(function(xhr,errorStatus,errorText) {
			alert('请求失败：' + errorStatus + ',' + errorText); 
		});
	});
	$('#backSub').click(function(){
		window.location.href = 'login.html';
	});
});