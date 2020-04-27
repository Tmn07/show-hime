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
		$("#m"+data.ho_method[num]).click();
	}
	for(var num in data.ho_audio){
		$("#a"+data.ho_audio[num]).click();
	}
	// $("#audio1").click();
}

if (chrome.i18n.getUILanguage()!="zh_CN") {
	finish_msg = chrome.i18n.getMessage("finishMsg");
	noneHoMethod = chrome.i18n.getMessage("noneHoMethod");
	noneHoAudios = chrome.i18n.getMessage("noneHoAudios");
    $('title')[0].innerText = chrome.i18n.getMessage("hoPageTitle");
    $('h1').text(chrome.i18n.getMessage("hoHead1"))
    $("#hoOpenOption").text(chrome.i18n.getMessage("hoOpenOption"));
    $("#hoOpen1").text(chrome.i18n.getMessage("hoOpen1"));
    $("#hoOpen0").text(chrome.i18n.getMessage("hoOpen0"));
    $("#hoRangeOption").text(chrome.i18n.getMessage("hoRangeOption"));
    $("#idolAll").text(chrome.i18n.getMessage("idolAll"));
    $("#hoProbOption").text(chrome.i18n.getMessage("hoProbOption"));
    $("#hoMethodOption").text(chrome.i18n.getMessage("hoMethodOption"));
    $("#hoMethod1").text(chrome.i18n.getMessage("hoMethod1"));
    $("#hoMethod2").text(chrome.i18n.getMessage("hoMethod2"));
    $("#hoMethod4").text(chrome.i18n.getMessage("hoMethod4"));
    $("#hoAudioOption").text(chrome.i18n.getMessage("hoAudioOption"));
    $("#ho_save_btn").text(chrome.i18n.getMessage("optionButtonSave"))
    // $('#all_btn').text(chrome.i18n.getMessage("optionButtonAll"))
    // $('#clr_btn').text(chrome.i18n.getMessage("optionButtonClr"))
    // finish_msg = chrome.i18n.getMessage("finishMsg")
}

$("#ho_save_btn").click(function(){

	ho_btn = $("[name='open']:checked")[0].value;
	ho_range = $("[name='range']:checked")[0].value;
	ho_prob = $("#prob").val();
	ho_method = [];


	methods = $("[name='methods']:checked");
	method_num = methods.length;
	if (ho_btn=="1" && method_num==0) {
		alert(noneHoMethod);
		return 0;
	}
	else{
		for (var i = 0; i < method_num; i++) {
			ho_method.push(methods[i].value);
		}
	}

	ho_audio = [];
	audios = $("[name='audios']:checked");
	audio_num = audios.length;
	if (ho_btn=="1" && audio_num==0) {
		alert(noneHoAudios);
		return 0;
	}
	else{
		for (var i = 0; i < audio_num; i++) {
			ho_audio.push(audios[i].value);
		}
	}
	// ho_method = $("");
	// console.log(ho_btn);
	// console.log(ho_range);
	// console.log(ho_prob);
	// console.log(ho_method);
    chrome.storage.local.set({
    	ho_btn: ho_btn,
    	ho_range: ho_range,
    	ho_prob: ho_prob,
    	ho_method: ho_method,
    	ho_audio: ho_audio
    }, function(){
        // console.log('存储完成');
        alert(finish_msg);
    })
})


chrome.storage.local.get({
	 ho_btn:"0",
	 ho_range:"1",
	 ho_prob:"3",
	 ho_method:['1'],
	 ho_audio: ['1'],
	 }, function(data){
	 // console.log(data);
	 set_options(data);
});

