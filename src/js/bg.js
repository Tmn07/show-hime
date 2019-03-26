chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'display = document.querySelector("#hime07").style["display"]; if (display=="none") {document.querySelector("#hime07").style["display"] = "block";} else{document.querySelector("#hime07").style["display"] = "none";}'
  });
});

chrome.contextMenus.create({
    title: "まつり!",
    onclick: function(){
    	// alert('您点击了右键菜单！');
    	chrome.tabs.executeScript({
		    code: "document.getElementById('myaudio').play()"
		  });
    }
});