// 执行定时器，返回定时器id
function action(){
	var EXPIRE_IN_15MIN = 1000*120*10; // 10 min
	var logoutTimer = setInterval(function(){
		layer.msg('登录超时，请您从新登录！');
		setTimeout(function(){
    		window.location.href = 'login.html';
    	},500);
	}, EXPIRE_IN_15MIN);	    	
	document.onmouseover = function(){
		clearInterval(logoutTimer);
	}
}
action();
var log = setInterval(action, 1205000);