document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const groupEmail = params.get("group");
  const targetDate = params.get("date");

  if (!groupEmail || !targetDate) {
    document.getElementById("loading").textContent = "グループまたは日付が指定されていません。";
    return;
  }

  console.log("📨 group:", groupEmail);
  console.log("📅 date:", targetDate);

  const endpoint = "https://script.google.com/a/macros/sho-ei.net/s/AKfycbxkWcWduNlZcSMY0r31FkjdxZXjHaXwJDc_PraTXV_mm77P9a8-Epk2vrXRRqDrBFJhwA/exec";
  const url = `${endpoint}?group=${encodeURIComponent(groupEmail)}&date=${encodeURIComponent(targetDate)}&callback=renderResult`;
  console.log("🔗 JSONP URL:", url);

  const script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
});

function renderResult(data) {
  console.log("📦 GAS JSONP response:", data);
  if (data.error) {
    document.getElementById("loading").textContent = `取得失敗: ${data.error}`;
    return;
  }

  const scheduleList = document.getElementById("scheduleList");
  scheduleList.innerHTML = "";

  data.calendars.forEach(user => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${user.email}</h3>`;
    if (user.events.length === 0) {
      div.innerHTML += "<p>予定なし</p>";
    } else {
      const ul = document.createElement("ul");
      user.events.forEach(ev => {
        ul.innerHTML += `<li>${ev.start}〜${ev.end}：${ev.summary}${ev.location ? " @ " + ev.location : ""}</li>`;
      });
      div.appendChild(ul);
    }
    scheduleList.appendChild(div);
  });

  document.getElementById("loading").style.display = "none";
} 
