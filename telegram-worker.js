/**
 * Proxy gửi lời chúc về Telegram (Cloudflare Workers – miễn phí)
 *
 * CÁCH DÙNG
 * 1. Vào https://dash.cloudflare.com → Workers & Pages → Create → Hello World → dán toàn bộ file này → Deploy.
 * 2. Settings → Variables and Secrets, thêm 3 biến:
 *      BOT_TOKEN       (Secret)  token bot mới lấy từ @BotFather
 *      CHAT_ID         (Text)    id nhóm nhận tin, ví dụ -4644267354
 *      ALLOWED_ORIGIN  (Text)    địa chỉ web thiệp của bạn, ví dụ https://ten-cua-ban.github.io
 * 3. Copy link Worker (dạng https://xxx.workers.dev) dán vào CONFIG.telegram.endpoint trong index.html,
 *    rồi XOÁ dòng botToken.
 * 4. Vào @BotFather → /revoke để vô hiệu hoá token cũ đã bị lộ.
 */
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: cors });
    if (env.ALLOWED_ORIGIN && origin !== env.ALLOWED_ORIGIN) {
      return new Response("Forbidden", { status: 403, headers: cors });
    }

    let body;
    try { body = await request.json(); } catch { return new Response("Bad Request", { status: 400, headers: cors }); }

    const text = String(body.text || "").slice(0, 3500);
    if (!text) return new Response("Empty", { status: 400, headers: cors });

    const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text, disable_web_page_preview: true }),
    });

    return new Response(res.ok ? "ok" : "telegram error", { status: res.ok ? 200 : 502, headers: cors });
  },
};