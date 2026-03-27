'use strict';

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// 图片尺寸规则（根据 picid 决定）
// ---------------------------------------------------------------------------

function getSize(picid) {
  if (picid === '00') return { width: 80, height: 90 };
  if (picid === '41') return { width: 80, height: 75 };
  if (picid === '4' || picid === '5' || picid === '6') return { width: 100, height: 100 };
  return { width: 80, height: 80 };
}

// ---------------------------------------------------------------------------
// 拖拽逻辑（鼠标 + 触摸）
// ---------------------------------------------------------------------------

function createDragController(himeEl, idolid, picid) {
  let offsetX = 0;
  let offsetY = 0;
  let oriImg = '';

  function getGifUrl() {
    return chrome.runtime.getURL(`data_gif/${idolid}-${picid}.gif`);
  }

  function saveOffset(clientX, clientY) {
    const rect = himeEl.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  }

  function applyPosition(clientX, clientY) {
    himeEl.style.left = (clientX - offsetX) + 'px';
    himeEl.style.top  = (clientY - offsetY) + 'px';
  }

  function persistPosition(clientX, clientY) {
    const X = clientX - offsetX;
    const Y = clientY - offsetY;
    chrome.runtime.sendMessage({ position: 'set', X, Y });
  }

  // -- 鼠标事件 --

  function onMouseMove(e) {
    applyPosition(e.clientX, e.clientY);
  }

  function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    if (picid === '2') {
      himeEl.style.backgroundImage = oriImg;
    }
    persistPosition(e.clientX, e.clientY);
  }

  function onMouseDown(e) {
    oriImg = himeEl.style.backgroundImage;
    saveOffset(e.clientX, e.clientY);
    if (picid === '2') {
      himeEl.style.backgroundImage = `url(${getGifUrl()})`;
    }
    document.addEventListener('mousemove', onMouseMove);
  }

  // -- 触摸事件 --

  function onTouchMove(e) {
    const t = e.touches[0];
    applyPosition(t.clientX, t.clientY);
  }

  function onTouchEnd(e) {
    document.removeEventListener('touchmove', onTouchMove);
    if (picid === '2') {
      himeEl.style.backgroundImage = oriImg;
    }
    const t = e.changedTouches[0];
    persistPosition(t.clientX, t.clientY);
  }

  function onTouchStart(e) {
    oriImg = himeEl.style.backgroundImage;
    const t = e.touches[0];
    saveOffset(t.clientX, t.clientY);
    if (picid === '2') {
      himeEl.style.backgroundImage = `url(${getGifUrl()})`;
    }
    document.addEventListener('touchmove', onTouchMove);
  }

  himeEl.addEventListener('mousedown',  onMouseDown,  false);
  himeEl.addEventListener('mouseup',    onMouseUp,    false);
  himeEl.addEventListener('touchstart', onTouchStart, false);
  himeEl.addEventListener('touchend',   onTouchEnd,   false);
}

// ---------------------------------------------------------------------------
// 音效逻辑
// ---------------------------------------------------------------------------

const HO_AUDIO_FILES = [
  'ho.ogg', 'ho_.ogg', 'hiho.ogg', 'wonderho.ogg',
  'kuluri.ogg', 'waa.ogg', 'hehen.ogg', 'hemn.ogg',
  'lumilumi.ogg', 'nanodesu.ogg', 'sonanodesu.ogg',
  'morning.ogg', 'matsuri.ogg',
];

const HO_PROBS = [1, 0.8, 0.6, 0.4, 0.2];

function createHoController(himeEl, settings) {
  const { ho_btn, ho_range, ho_prob, ho_method, ho_audio } = settings;

  const shouldActivate = ho_btn === '1' &&
    (ho_range === '0' || (ho_range === '1' && settings.idolid === 21));

  if (!shouldActivate) return;

  const audioIndex = parseInt(randomPick(ho_audio)) - 1;
  const audioFile  = HO_AUDIO_FILES[audioIndex];
  const audioUrl   = chrome.runtime.getURL(`audio/${audioFile}`);

  const audioEl = document.createElement('audio');
  audioEl.id     = 'hime-audio';
  audioEl.src    = audioUrl;
  audioEl.hidden = true;
  document.body.appendChild(audioEl);

  function tryPlay() {
    if (Math.random() < HO_PROBS[parseInt(ho_prob) - 1]) {
      audioEl.currentTime = 0;
      audioEl.play();
    }
  }

  if (ho_method.includes('1')) himeEl.addEventListener('mousedown', tryPlay);
  if (ho_method.includes('2')) himeEl.addEventListener('mouseup',   tryPlay);
  if (ho_method.includes('4')) himeEl.addEventListener('dblclick',  tryPlay);
}

// ---------------------------------------------------------------------------
// 创建立绘元素
// ---------------------------------------------------------------------------

function createHimeElement(imgUrl, position, displayVal, size) {
  const div = document.createElement('div');
  div.id = 'hime07';
  div.style.cssText = [
    'background-repeat: no-repeat',
    'background-size: 100% 100%',
    '-moz-background-size: 100% 100%',
    `display: ${displayVal}`,
    'position: fixed',
    position,
    `height: ${size.height}px`,
    `width: ${size.width}px`,
    'z-index: 9999999999',
  ].join(';');
  div.style.backgroundImage = `url('${imgUrl}')`;
  return div;
}

// ---------------------------------------------------------------------------
// 主逻辑
// ---------------------------------------------------------------------------

$(function () {
  // 监听后台广播（插件图标点击）
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.cmd === 'browserAction.onClicked') {
      const hime = document.querySelector('#hime07');
      if (hime) {
        hime.style.display = hime.style.display === 'none' ? 'block' : 'none';
      }
    }
    sendResponse('ok');
  });

  // 默认存储参数
  const storageDefaults = {
    list:      [20],
    ho_btn:    '0',
    ho_range:  '1',
    ho_prob:   '3',
    ho_method: ['1'],
    ho_audio:  ['1'],
  };

  chrome.storage.local.get(storageDefaults, function (data) {
    const showList = data.list.length > 0 ? data.list : [20];

    // 随机选取偶像与服装
    const listIndex = Math.floor(Math.random() * showList.length);
    const idolid    = showList[listIndex] + 1;  // 1-based
    const idolData  = IDOL_INFO[String(idolid)];

    if (!idolData) return;

    const costumeList = idolData[1];
    const picid       = randomPick(costumeList);
    const size        = getSize(picid);
    const imgUrl      = chrome.runtime.getURL(`data/${idolid}-${picid}.png`);

    // 预加载 GIF（若有），避免首次拖拽时闪烁
    if (picid === '2') {
      const gifUrl = chrome.runtime.getURL(`data_gif/${idolid}-${picid}.gif`);
      const preload = new Image();
      preload.src = gifUrl;
    }

    // 向后台获取 show_flag 与 position，再注入元素
    chrome.runtime.sendMessage({ show: 'what', position: 'what' }, function (response) {
      const showFlag  = response && response.show !== undefined ? response.show : true;
      const position  = (response && response.position) || 'right: 30px;top: 30px;';
      const displayVal = showFlag ? 'block' : 'none';

      // 确认图片可访问后再创建 DOM
      const probe = new Image();
      probe.onload = function () {
        const himeEl = createHimeElement(imgUrl, position, displayVal, size);
        document.body.appendChild(himeEl);

        // 双击隐藏
        himeEl.addEventListener('dblclick', function () {
          chrome.runtime.sendMessage({ show: false });
        });

        createDragController(himeEl, idolid, picid);
        createHoController(himeEl, { ...data, idolid });
      };
      probe.src = imgUrl;
    });
  });
});
