$(function() {
	img_url = "http://pnq3l7twf.bkt.clouddn.com/hime";
	// el = document.querySelector("body");
	if (Math.random()>0.5) {
		// el.innerHTML += '<img id="hime07" src="'+img_url+'2.png" style="display: block;position: fixed;right: 0px;top: 0px;height: 80px; z-index: 9999999999">';
		$("body").append('<img id="hime07" src="'+img_url+'2.png" style="display: block;position: fixed;right: 0px;top: 0px;height: 80px; z-index: 9999999999">')
	}
	else{
		// el.innerHTML += '<img id="hime07" src="'+img_url+'1.png" style="display: block;position: fixed;right: 0px;top: 0px;height: 80px; z-index: 9999999999">';
		$("body").append('<img id="hime07" src="'+img_url+'1.png" style="display: block;position: fixed;right: 0px;top: 0px;height: 80px; z-index: 9999999999">')
	}
	$("#hime07").click(function(){
		$(this).css("display",'none');
	})
})
