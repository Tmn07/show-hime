// 右键菜单
chrome.contextMenus.create({
    title: "まつり!",
    onclick: function(){
      chrome.tabs.executeScript({
        code: "document.getElementById('myaudio').play()"
      });
      // 获取id
      // var myid = chrome.runtime.id;
      // chrome.tabs.create({url: "option/index.html"});
    }
});


var show_flag = true;
var position ="right: 0px;top: 0px;";
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  cbk_obj = {}
  if (request.hasOwnProperty("position")) {
    if (request.position=="what"){
      // callback(position);
      cbk_obj["position"] = position;
    }
    if (request.position=="set") {
      left_var = request.X-40;
      top_var = request.Y-60;
      position = "left:" + left_var + "px;top:" + top_var + "px;"
      // callback["msg"]
      callback("set position at "+position);
    }
  }

  if(request.hasOwnProperty("show")){
    if (request.show == "what")
    {
      cbk_obj["show"] = show_flag;
      // callback(show_flag);
    }
    if (request.show==true)
    {
      show_flag = true;
      cbk_obj['msg'] = "set show_flag true";
      callback("set show_flag true");
    }
    if(request.show==false)
    {
      show_flag = false;
      cbk_obj['msg'] = "set show_flag false";
      callback("set show_flag false");
    }
  }
  callback(cbk_obj);
});

chrome.browserAction.onClicked.addListener(function(tab) {
  if (show_flag) {
    show_flag=false;
  }
  else{
    show_flag=true;
  }
  chrome.tabs.executeScript({
    code: 'display = document.querySelector("#hime07").style["display"];\
     if (display=="none") {document.querySelector("#hime07").style["display"] = "block";}\
      else{document.querySelector("#hime07").style["display"] = "none";}'
  });
});