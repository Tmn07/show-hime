chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'display = document.querySelector("#hime07").style["display"]; if (display=="none") {document.querySelector("#hime07").style["display"] = "block";} else{document.querySelector("#hime07").style["display"] = "none";}'
  });
});
