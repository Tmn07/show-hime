$(function() {
	// img_url = "https://tmn07.com/MLTD-rankingview/img/hime";
	var show_flag=true;

	chrome.storage.local.get({list:[20]}, function(data){
// test: list空的情况
		// 获取showlist，并随机一个
		console.log(data.list);
		var show_list = data.list;
		// $.get("http://tmn07.com/info.json")
		var info = {"1": ["\u5929\u6d77 \u6625\u9999", 3], "2": ["\u5982\u6708 \u5343\u65e9", 3], "3": ["\u661f\u4e95 \u7f8e\u5e0c", 3], "4": ["\u8429\u539f \u96ea\u6b69", 2], "5": ["\u9ad8\u69fb \u3084\u3088\u3044", 2], "6": ["\u83ca\u5730 \u771f", 3], "7": ["\u6c34\u702c \u4f0a\u7e54", 2], "8": ["\u56db\u6761 \u8cb4\u97f3", 1], "9": ["\u79cb\u6708 \u5f8b\u5b50", 1], "10": ["\u4e09\u6d66 \u3042\u305a\u3055", 1], "11": ["\u53cc\u6d77 \u4e9c\u7f8e", 1], "12": ["\u53cc\u6d77 \u771f\u7f8e", 1], "13": ["\u6211\u90a3\u8987 \u97ff", 2], "14": ["\u6625\u65e5 \u672a\u6765", 4], "15": ["\u6700\u4e0a \u9759\u9999", 4], "16": ["\u4f0a\u5439 \u7ffc", 4], "17": ["\u7530\u4e2d \u7434\u8449", 2], "18": ["\u5cf6\u539f \u30a8\u30ec\u30ca", 2], "19": ["\u4f50\u7af9 \u7f8e\u5948\u5b50", 3], "20": ["\u6240 \u6075\u7f8e", 1], "21": ["\u5fb3\u5ddd \u307e\u3064\u308a", 2], "22": ["\u7bb1\u5d0e \u661f\u68a8\u82b1", 2], "23": ["\u91ce\u3005\u539f \u831c", 2], "24": ["\u671b\u6708 \u674f\u5948", 2], "25": ["\u4f34\u7530 \u8def\u5b50", 2], "26": ["\u4e03\u5c3e \u767e\u5408\u5b50", 2], "27": ["\u9ad8\u5c71 \u7d17\u4ee3\u5b50", 2], "28": ["\u677e\u7530 \u4e9c\u5229\u6c99", 1], "29": ["\u9ad8\u5742 \u6d77\u7f8e", 2], "30": ["\u4e2d\u8c37 \u80b2", 2], "31": ["\u5929\u7a7a\u6a4b \u670b\u82b1", 2], "32": ["\u30a8\u30df\u30ea\u30fc \u30b9\u30c1\u30e5\u30a2\u30fc\u30c8", 2], "33": ["\u5317\u6ca2 \u5fd7\u4fdd", 2], "34": ["\u821e\u6d5c \u6b69", 3], "35": ["\u6728\u4e0b \u3072\u306a\u305f", 2], "36": ["\u77e2\u5439 \u53ef\u5948", 2], "37": ["\u6a2a\u5c71 \u5948\u7dd2", 2], "38": ["\u4e8c\u968e\u5802 \u5343\u9db4", 2], "39": ["\u99ac\u5834 \u3053\u306e\u307f", 1], "40": ["\u5927\u795e \u74b0", 1], "41": ["\u8c4a\u5ddd \u98a8\u82b1", 2], "42": ["\u5bae\u5c3e \u7f8e\u4e5f", 1], "43": ["\u798f\u7530 \u306e\u308a\u5b50", 2], "44": ["\u771f\u58c1 \u745e\u5e0c", 2], "45": ["\u7be0\u5bae \u53ef\u6190", 1], "46": ["\u767e\u702c \u8389\u7dd2", 3], "47": ["\u6c38\u5409 \u6634", 1], "48": ["\u5317\u4e0a \u9e97\u82b1", 1], "49": ["\u5468\u9632 \u6843\u5b50", 2], "50": ["\u30b8\u30e5\u30ea\u30a2", 1], "51": ["\u767d\u77f3 \u7d2c", 2], "52": ["\u685c\u5b88 \u6b4c\u7e54", 3], "53": ["\u97f3\u7121 \u5c0f\u9ce5", 0], "54": ["\u9752\u7fbd \u7f8e\u54b2", 0], "55": ["\u8a69\u82b1", 1]};
		var n = Math.floor(Math.random() * show_list.length + 1)-1; 
		// console.log(show_list[n]);
		idolid = show_list[n]+1;
		console.log(info[idolid]);
		picid = Math.floor(Math.random()*info[idolid][1]);
		console.log(picid);

		// 获取showflag，position，注入元素
		chrome.runtime.sendMessage({show:"what", position:"what"},function (response) {
			show_flag = response.show;
			position = response.position;
		    console.log('show_flag response:',response.show);
		    console.log("position =", response.position);
		    img_url = "http://tmn07.com/" + idolid + "-" + picid + ".png"
			// img_url = "http://tmn07.com/hime";
			if(show_flag){
				display_val = 'block';
			}
			else{
				display_val = "none"
			}
			$("body").append("<div id='hime07' style='background-repeat:no-repeat;\
							background-size:100% 100%;-moz-background-size:100% 100%;\
							display: "+display_val+";position: fixed;"+position+"height:\
							80px; width: 80px; z-index: 9999999999'> \
							</div>");
						// <audio id='myaudio'src='http://tmn07.com/ho-test.mp3' hidden='true'></audio>\

			$("#hime07").css('background-image', "url('"+img_url+"')");
			// if (Math.random()>0.5) {
			// 	$("#hime07").css('background-image', "url('"+img_url+"1.png')");
			// }
			// else{
			// 	$("#hime07").css('background-image', "url('"+img_url+"2.png')");
			// }
			

			$("#hime07").dblclick(function(){
				$(this).css("display",'none');
				chrome.runtime.sendMessage({show:false},function (response) {
				    console.log('content get response:',response);
				});
			})
			var moving = false;
			var cat = document.getElementById("hime07");
			cat.addEventListener("mousedown", initialClick, false);
			cat.addEventListener("mouseup", stopmove, false);

			function stopmove(e){
				console.log(e.clientX, e.clientY)
			  	// var newX = e.clientX -30;
			  	// var newY = e.clientY -30;
				console.log('up');
				document.removeEventListener("mousemove", move);
				chrome.runtime.sendMessage(
					{position:'set', X:e.clientX, Y:e.clientY},
					function (response) {
				    	console.log('content get response:',response);
					}
				);
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
			
		});
	})



})
