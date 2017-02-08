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
	$('#submit').click(function(event) {
		var remember = $("#remember").is(':checked');
		var email = $('#email').val();
		var password = $('#pswd').val();
		var pswd = MD5(email +"#" + password);
		var data = {pswd:pswd,email:email,rememberMe:remember};
		$.ajax({
			url: 'u/submitLogin.shtml',
			type: 'POST',
			dataType: 'json',
			data:data
    	})
    	.done(function(data) {
    		if(data.status != 200){
    			layer.msg('帐号或密码错误！');
    		} else {
    			layer.msg('登录成功！');
    			setTimeout(function(){
            		window.location.href = 'index.html';
				},1000);
    		}
		})
		.fail(function(xhr,errorStatus,errorText) {
			alert('请求失败：' + errorStatus + ',' + errorText); 
		});
	});
});