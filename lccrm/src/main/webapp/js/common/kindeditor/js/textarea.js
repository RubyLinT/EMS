$(function() {
	    	//转换textarea到kindeditor,默认编辑器类型
	    	var editor1 = KindEditor.create('textarea[name="content"],textarea[name="reason"]', {
	    		uploadJson : '../kindeditor/upload_json.jsp',
	    		fileManagerJson : '../kindeditor/file_manager_json.jsp',
	    		allowFileManager : true
	    	});
	    	
	    	//转换textarea到kindeditor，简化类型编辑器
	    	var editor2 = KindEditor.create('textarea[name="comment"]', {
	    		resizeType : 1,
	    		allowPreviewEmoticons : false,
	    		allowImageUpload : false,
	    		items : [
	    			'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
	    			'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
	    			'insertunorderedlist', '|', 'emoticons', 'image', 'link']
	    	});	
	    	
	    	$("#saveButton").click(function(){
	    		
	    		if (editor1) {
	    			editor1.sync();	
	    		}
	    		
	    		if (editor2) {
	    			editor2.sync();
	    		}
	    		
	    		$("#editForm").submit();
	    	});	    		
	    	
	    });