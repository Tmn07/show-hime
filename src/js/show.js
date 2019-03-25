$(function() {
	img_url = "https://tmn07.com/MLTD-rankingview/img/hime";
	// img_url = "http://pnq3l7twf.bkt.clouddn.com/hime";
	$("body").append("<div id='hime07' style='background-repeat:no-repeat;\
					background-size:100% 100%;-moz-background-size:100% 100%;\
					display: block;position: fixed;right: 0px;top: 0px;height: 80px;\
					width: 80px; z-index: 9999999999'></div>");
	if (Math.random()>0.5) {
		$("#hime07").css('background-image', "url('"+img_url+"1.png')");
	}
	else{
		$("#hime07").css('background-image', "url('"+img_url+"2.png')");
	}
	

	$("#hime07").dblclick(function(){
		$(this).css("display",'none');
	})
	var moving = false;
	var cat = document.getElementById("hime07");
	cat.addEventListener("mousedown", initialClick, false);
	cat.addEventListener("mouseup", stopmove, false);

	function stopmove(e){
		console.log('up');
		document.removeEventListener("mousemove", move);
	}

	function move(e){
	  var newX = e.clientX -30;
	  var newY = e.clientY -30;
	  image.style.left = newX + "px";
	  image.style.top = newY + "px";
	}

	function initialClick(e) {
		image = this;
		document.addEventListener("mousemove", move, false);
	}
})
