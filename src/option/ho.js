'use strict';

// ---------------------------------------------------------------------------
// i18n（始终从 messages.json 中读取，zh_CN 也使用同一套机制）
// ---------------------------------------------------------------------------

function msg(key) {
  return chrome.i18n.getMessage(key) || '';
}

function applyI18n() {
  if (chrome.i18n.getUILanguage() === 'zh_CN') return;

  document.title = msg('hoPageTitle');
  $('h1').text(msg('hoHead1'));
  $('#hoOpenOption').text(msg('hoOpenOption'));
  $('#hoOpen1').text(msg('hoOpen1'));
  $('#hoOpen0').text(msg('hoOpen0'));
  $('#hoRangeOption').text(msg('hoRangeOption'));
  $('#idolAll').text(msg('idolAll'));
  $('#hoProbOption').text(msg('hoProbOption'));
  $('#hoMethodOption').text(msg('hoMethodOption'));
  $('#hoMethod1').text(msg('hoMethod1'));
  $('#hoMethod2').text(msg('hoMethod2'));
  $('#hoMethod4').text(msg('hoMethod4'));
  $('#hoAudioOption').text(msg('hoAudioOption'));
  $('#ho_save_btn').text(msg('optionButtonSave'));
}

// 不区分语言，直接从 messages.json 取（zh_CN 也在其中定义）
const finishMsg    = msg('finishMsg')    || '保存成功';
const noneHoMethod = msg('noneHoMethod') || '未选择ho叫方式';
const noneHoAudios = msg('noneHoAudios') || '未选择ho叫语音';

// ---------------------------------------------------------------------------
// 从存储恢复表单状态
// ---------------------------------------------------------------------------

function restoreOptions(data) {
  // 开关
  $(`#o1${data.ho_btn === '1' ? '1' : '2'}`).prop('checked', true);

  // 范围
  $(`#o2${data.ho_range === '1' ? '1' : '2'}`).prop('checked', true);

  // 概率
  $('#prob').val(data.ho_prob);

  // 触发方式
  for (const val of data.ho_method) {
    $(`#m${val}`).prop('checked', true);
  }

  // 音频
  for (const val of data.ho_audio) {
    $(`#a${val}`).prop('checked', true);
  }
}

// ---------------------------------------------------------------------------
// 保存表单
// ---------------------------------------------------------------------------

function saveOptions() {
  const ho_btn   = $('[name="open"]:checked').val();
  const ho_range = $('[name="range"]:checked').val();
  const ho_prob  = $('#prob').val();

  const methods   = $('[name="methods"]:checked');
  const audios    = $('[name="audios"]:checked');

  if (ho_btn === '1' && methods.length === 0) {
    alert(noneHoMethod);
    return;
  }

  if (ho_btn === '1' && audios.length === 0) {
    alert(noneHoAudios);
    return;
  }

  const ho_method = methods.map(function () { return this.value; }).get();
  const ho_audio  = audios.map(function () { return this.value; }).get();

  chrome.storage.local.set({ ho_btn, ho_range, ho_prob, ho_method, ho_audio }, function () {
    alert(finishMsg);
  });
}

// ---------------------------------------------------------------------------
// 入口
// ---------------------------------------------------------------------------

$(function () {
  applyI18n();

  const storageDefaults = {
    ho_btn:    '0',
    ho_range:  '1',
    ho_prob:   '3',
    ho_method: ['1'],
    ho_audio:  ['1'],
  };

  chrome.storage.local.get(storageDefaults, function (data) {
    restoreOptions(data);
  });

  $('#ho_save_btn').on('click', saveOptions);
});
