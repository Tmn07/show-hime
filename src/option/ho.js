
function set_options(data){
	if (data.ho_btn=="1") {
		$("#o11").click();
	}
	else{
		$("#o12").click();
	}

	if (data.ho_range=="1") {
		$("#o21").click();
	}
	else{
		$("#o22").click();
	}

	$("#prob").val(data.ho_prob);

	for(var num in data.ho_method){
		$("#a"+data.ho_method[num]).click();
	}
	
	$("#audio1").click();
}


$("#ho_save_btn").click(function(){

	ho_btn = $("[name='open']:checked")[0].value;
	ho_range = $("[name='range']:checked")[0].value;
	ho_prob = $("#prob").val();
	ho_method = [];
	methods = $("[name='methods']:checked");
	method_num = methods.length;
	if (ho_btn=="1" && method_num==0) {
		alert("未选择ho叫方式");
		return 0;
	}
	else{
		for (var i = 0; i < method_num; i++) {
			ho_method.push(methods[i].value);
		}
	}
	// ho_method = $("");
	console.log(ho_btn);
	console.log(ho_range);
	console.log(ho_prob);
	console.log(ho_method);
    chrome.storage.local.set({
    	ho_btn: ho_btn,
    	ho_range: ho_range,
    	ho_prob: ho_prob,
    	ho_method: ho_method,
    }, function(){
        console.log('存储完成');
        alert("存储完成");
    })
})

chrome.storage.local.get({
	 ho_btn:"0",
	 ho_range:"1",
	 ho_prob:"3",
	 ho_method:[1],
	 ho_audio: [0],
	 }, function(data){

	 console.log(data);

	 set_options(data);

    // var show_list = data.list;
    
});

