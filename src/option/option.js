'use strict';

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

function applyI18n() {
  // 中文界面直接使用 HTML 中的硬编码文字，仅对其他语言做替换
  if (chrome.i18n.getUILanguage() === 'zh_CN') return;

  document.title = chrome.i18n.getMessage('optionPageTitle');
  $('h1').text(chrome.i18n.getMessage('optionHead1'));
  $('#ho_btn').text(chrome.i18n.getMessage('hoHead1'));
  $('#save_btn').text(chrome.i18n.getMessage('optionButtonSave'));
  $('#all_btn').text(chrome.i18n.getMessage('optionButtonAll'));
  $('#clr_btn').text(chrome.i18n.getMessage('optionButtonClr'));
}

const finishMsg = chrome.i18n.getUILanguage() === 'zh_CN'
  ? '保存成功'
  : chrome.i18n.getMessage('finishMsg');

// ---------------------------------------------------------------------------
// 渲染复选框列表（使用 idols.js 中的 IDOL_NAMES）
// ---------------------------------------------------------------------------

function buildCheckbox(index, name) {
  const idolid = parseInt(index) + 1;  // 1-based，与图片文件名一致
  return `<div class="hvr-grow">
    <label>
      <div class="icon_img" style="background-image: url(../data/${idolid}-6.png);"></div>
      <br>
      <input class="idol" type="checkbox" name="idol" data-iid="${index}">${name}
    </label>
  </div>`;
}

// ---------------------------------------------------------------------------
// 初始化：渲染列表并恢复存储状态
// ---------------------------------------------------------------------------

$(function () {
  applyI18n();

  const $form = $('#main');

  // 渲染所有偶像复选框
  for (const [index, name] of Object.entries(IDOL_NAMES)) {
    $form.append(buildCheckbox(index, name));
  }

  // 从存储恢复选中状态
  chrome.storage.local.get({ list: [] }, function (data) {
    const savedSet = new Set(data.list.map(String));
    $('input.idol').each(function () {
      if (savedSet.has($(this).data('iid').toString())) {
        this.checked = true;
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 按钮事件
  // ---------------------------------------------------------------------------

  $('#save_btn').on('click', function () {
    const showList = [];
    $('input.idol:checked').each(function () {
      showList.push(parseInt($(this).data('iid')));
    });
    chrome.storage.local.set({ list: showList }, function () {
      alert(finishMsg);
    });
  });

  $('#all_btn').on('click', function () {
    $('input.idol').prop('checked', true);
  });

  $('#clr_btn').on('click', function () {
    $('input.idol').prop('checked', false);
  });

  $('#ho_btn').on('click', function () {
    window.open('./ho.html', '_blank');
  });
});
