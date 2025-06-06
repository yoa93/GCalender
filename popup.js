document.getElementById('fetchSchedules').addEventListener('click', async () => {
  const groupEmail = document.getElementById('groupEmail').value;
  const targetDate = document.getElementById('targetDate').value;

  if (!groupEmail || !targetDate) {
    alert('グループと日付を指定してください');
    return;
  }

  const url = chrome.runtime.getURL('result.html') + `?group=${encodeURIComponent(groupEmail)}&date=${targetDate}`;
  const link = document.getElementById('openTab');
  link.href = url;
  link.style.display = 'inline';
  link.click();
});

/* ======== background.js ======== */
// OAuth2とAPI呼び出しを管理
chrome.runtime.onInstalled.addListener(() => {
  console.log('拡張機能がインストールされました');
});

/* ======== result.html + JS（別ファイルに続きます） ======== */
// result.html で URL クエリから group & date を読み取り、APIでスケジュール取得して表示
// ここまでで構造準備OK。次に result.html + JS を組み込めば機能完成になります。

// 備考：Google Workspace の People API を使えばオートコンプリート風の候補表示も可能です（任意）。
