(() => {
  // ✅ আপনার N8N production webhook এখানে বসান
  const N8N_WEBHOOK_URL = "https://vmi2977874.contaboserver.net/webhook/3f9f3f16-b52c-4d13-834a-96b9df752b79";

  // UI
  const css = `
    #sdh-chat-btn{
      position:fixed; right:18px; bottom:18px; z-index:2147483647;
      border:none; padding:12px 14px; border-radius:999px; cursor:pointer;
      background:rgba(0,0,0,.70); color:#fff; font-weight:900;
      border:1px solid rgba(255,255,255,.12); backdrop-filter: blur(10px);
      box-shadow: 0 18px 55px rgba(0,0,0,.35);
    }
    #sdh-chat-box{
      position:fixed; right:18px; bottom:74px; z-index:2147483647;
      width:360px; max-width:92vw; height:500px; display:none;
      border-radius:18px; overflow:hidden; background:#fff;
      border:1px solid rgba(0,0,0,.12);
      box-shadow: 0 18px 65px rgba(0,0,0,.25);
      font-family: Inter, Arial, sans-serif;
    }
    #sdh-chat-head{
      padding:12px 14px; font-weight:900; background:#0b0f19; color:#fff;
      display:flex; align-items:center; justify-content:space-between;
    }
    #sdh-chat-sub{font-size:12px; opacity:.8; font-weight:600; margin-top:2px}
    #sdh-chat-log{height:360px; overflow:auto; padding:12px 14px; background:#fff}
    .sdh-msg{margin:10px 0; line-height:1.35}
    .sdh-me{text-align:right}
    .sdh-bot{text-align:left}
    .sdh-bub{display:inline-block; padding:10px 12px; border-radius:14px; max-width:85%; font-size:14px}
    .sdh-me .sdh-bub{background:#0b0f19;color:#fff}
    .sdh-bot .sdh-bub{background:#f2f3f7;color:#111}
    #sdh-chat-form{display:flex; gap:8px; padding:10px; border-top:1px solid #eee; background:#fafafa}
    #sdh-chat-input{flex:1; padding:10px; border:1px solid #ddd; border-radius:10px; outline:none}
    #sdh-chat-send{padding:10px 12px; border:none; border-radius:10px; cursor:pointer; background:#0b0f19; color:#fff; font-weight:900}
    #sdh-chat-close{border:none;background:transparent;cursor:pointer;font-size:18px;color:#fff}
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.id = "sdh-chat-btn";
  btn.type = "button";
  btn.textContent = "💬 Chat";
  document.body.appendChild(btn);

  const box = document.createElement("div");
  box.id = "sdh-chat-box";
  box.innerHTML = `
    <div id="sdh-chat-head">
      <div>
        SDH Assistant
        <div id="sdh-chat-sub">Ask about automation systems</div>
      </div>
      <button id="sdh-chat-close" type="button" aria-label="Close">✕</button>
    </div>
    <div id="sdh-chat-log"></div>
    <form id="sdh-chat-form">
      <input id="sdh-chat-input" placeholder="Type your question..." autocomplete="off" />
      <button id="sdh-chat-send" type="submit">Send</button>
    </form>
  `;
  document.body.appendChild(box);

  const closeBtn = box.querySelector("#sdh-chat-close");
  const log = box.querySelector("#sdh-chat-log");
  const form = box.querySelector("#sdh-chat-form");
  const input = box.querySelector("#sdh-chat-input");

  const sessionKey = "sdh_chat_session_id";
  let sessionId = localStorage.getItem(sessionKey);
  if (!sessionId) {
    sessionId = (crypto?.randomUUID?.() || ("sdh_" + Date.now() + "_" + Math.floor(Math.random() * 1e9)));
    localStorage.setItem(sessionKey, sessionId);
  }

  function addMsg(text, who){
    const wrap = document.createElement("div");
    wrap.className = "sdh-msg " + (who === "me" ? "sdh-me" : "sdh-bot");
    const bub = document.createElement("div");
    bub.className = "sdh-bub";
    bub.textContent = text;
    wrap.appendChild(bub);
    log.appendChild(wrap);
    log.scrollTop = log.scrollHeight;
  }

  function toggle(){
    const open = box.style.display === "block";
    box.style.display = open ? "none" : "block";
    if (!open && log.childElementCount === 0) {
      addMsg("Hi! Ask me about automation, lead capture, dashboards, or integrations.", "bot");
    }
    setTimeout(() => { try { input.focus(); } catch(e){} }, 50);
  }

  btn.addEventListener("click", toggle);
  closeBtn.addEventListener("click", () => box.style.display = "none");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    addMsg(message, "me");
    input.value = "";

    addMsg("Typing...", "bot");
    const typingNode = log.lastChild;

    try{
      if (!N8N_WEBHOOK_URL || N8N_WEBHOOK_URL.includes("PASTE_YOUR_WEBHOOK_URL_HERE")) {
        throw new Error("Webhook URL not set");
      }

      const body = new URLSearchParams({
        message,
        sessionId,
        source: "website",
        page: location.pathname
      });

      const res = await fetch(N8N_WEBHOOK_URL, { method: "POST", body });
      if(!res.ok) throw new Error("HTTP " + res.status);

      const data = await res.json();

      typingNode.remove();
      addMsg((data && data.reply) ? data.reply : "No reply received.", "bot");

    }catch(err){
      typingNode.remove();
      addMsg("Chat is not connected. Please set the webhook URL and ensure n8n returns JSON {reply: ...}.", "bot");
      console.error(err);
    }
  });
})();
