// 注册右键菜单
chrome.contextMenus.create({
    id: "show-hime",
    title: "まつり!",
});

// 注册右键菜单事件
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  // chrome.scripting.executeScript({
  //   code: "document.getElementById('myaudio').play()"
  // });
  // 获取id
  // var myid = chrome.runtime.id;
  console.log(info);
  console.log(tab);
  chrome.tabs.create({url: "option/index.html"});
});


// 默认参数
// var show_flag = true;
// var position ="right: 30px;top: 30px;";

// 接收从“前台页面”(ContentScript)传来的信息
// 记录show、position相关信息（其实都用chrome.storage进行存储也行？）
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  chrome.storage.local.get({
    ho_position: "right: 30px;top: 30px;",
    ho_show_flag: true,
  }, function (result) {
    cbk_obj = {}
    if (request.hasOwnProperty("position")) {
      if (request.position=="what"){
        // callback(position);
        cbk_obj["position"] = result.ho_position;
      }
      if (request.position=="set") {
        left_var = request.X;
        top_var = request.Y;
        position = "left:" + left_var + "px;top:" + top_var + "px;"
        // callback["msg"]
        chrome.storage.local.set({
          ho_position: position,
        });
        callback("set position at "+position);
      }
    }
    
    if(request.hasOwnProperty("show")){
      if (request.show == "what")
      {
        cbk_obj["show"] = result.ho_show_flag;
        // callback(show_flag);
      }
      if (request.show==true)
      {
        chrome.storage.local.set({
          ho_show_flag: request.show,
        });
        cbk_obj['msg'] = "set show_flag true";
        callback("set show_flag true");
      }
      if(request.show==false)
      {
        chrome.storage.local.set({
          ho_show_flag: request.show,
        });
        cbk_obj['msg'] = "set show_flag false";
        callback("set show_flag false");
        // 关掉全部页面的显示
        sendMessageToContentScript({cmd:'browserAction.onClicked', value:'click'},function(res){});
      }
    }
    callback(cbk_obj);
  })
  return true;
});


// 插件按钮事件定义在“后台脚本”，所以需要发信息到具体执行的页面里
function sendMessageToContentScript(message, callback)
{
  // 仅关掉当前页面的显示
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  // {
  //   console.log(tabs);
  //   chrome.tabs.sendMessage(tabs[0].id, message, function(response)
  //   {
  //     if(callback) callback(response);
  //   });
  // });

  // 关掉全部页面的显示
  chrome.tabs.query({}, function(tabs) {
    console.log(tabs);
    for (var i = 0; i < tabs.length; i++) {
      // 匹配http, https页面（避免向没法注入的页面发信息，产生报错）
      if (tabs[i].hasOwnProperty("url")) {
        if (tabs[i].url.startsWith('http')) {
          chrome.tabs.sendMessage(tabs[i].id, message, function(response)
          {
            if(callback) callback(response);
          });
        }
      }
    }
  })
}

// 注册插件按钮事件
chrome.action.onClicked.addListener(function(tab) {
  chrome.storage.local.set({
    ho_show_flag: true,
  });
  sendMessageToContentScript({cmd:'browserAction.onClicked', value:'click'},function(res){});
  // chrome.tabs.executeScript({
  //   code: 'display = document.querySelector("#hime07").style["display"];\
  //    if (display=="none") {document.querySelector("#hime07").style["display"] = "block";}\
  //     else{document.querySelector("#hime07").style["display"] = "none";}'
  // });
});

chrome.runtime.onInstalled.addListener()