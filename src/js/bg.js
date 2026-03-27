'use strict';

// ---------------------------------------------------------------------------
// 右键菜单
// ---------------------------------------------------------------------------

chrome.contextMenus.create({
  id: 'show-hime',
  title: 'まつり!',
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  chrome.tabs.create({ url: 'option/index.html' });
});

// ---------------------------------------------------------------------------
// 插件图标点击：切换所有 http(s) 标签页上的立绘显示状态
// ---------------------------------------------------------------------------

chrome.action.onClicked.addListener(function (tab) {
  chrome.storage.local.set({ ho_show_flag: true });
  broadcastToContentScripts({ cmd: 'browserAction.onClicked' });
});

// ---------------------------------------------------------------------------
// 向所有 http(s) 标签页广播消息
// ---------------------------------------------------------------------------

function broadcastToContentScripts(message) {
  chrome.tabs.query({}, function (tabs) {
    for (const tab of tabs) {
      if (tab.url && tab.url.startsWith('http')) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// 接收内容脚本消息：读写 position / show_flag
// ---------------------------------------------------------------------------

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
  const defaults = {
    ho_position: 'right: 30px;top: 30px;',
    ho_show_flag: true,
  };

  chrome.storage.local.get(defaults, function (result) {
    const response = {};

    if (request.position === 'what') {
      response.position = result.ho_position;
    }

    if (request.position === 'set') {
      const position = `left:${request.X}px;top:${request.Y}px;`;
      chrome.storage.local.set({ ho_position: position });
      response.msg = `set position at ${position}`;
    }

    if (request.show === 'what') {
      response.show = result.ho_show_flag;
    }

    if (request.show === true || request.show === false) {
      chrome.storage.local.set({ ho_show_flag: request.show });
      response.msg = `set show_flag ${request.show}`;
      if (request.show === false) {
        broadcastToContentScripts({ cmd: 'browserAction.onClicked' });
      }
    }

    callback(response);
  });

  // 告知浏览器我们会异步调用 callback
  return true;
});

// ---------------------------------------------------------------------------
// 扩展安装 / 更新时的初始化逻辑（如有需要可在此扩展）
// ---------------------------------------------------------------------------

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.storage.local.set({
      list: [20],
      ho_btn: '0',
      ho_range: '1',
      ho_prob: '3',
      ho_method: ['1'],
      ho_audio: ['1'],
      ho_position: 'right: 30px;top: 30px;',
      ho_show_flag: true,
    });
  }
});
