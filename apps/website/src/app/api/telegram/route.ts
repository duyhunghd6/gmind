import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, address, score, total } = body;

    /* ── Validate ── */
    if (!name?.trim()) {
      return NextResponse.json({ error: "Tên là bắt buộc" }, { status: 400 });
    }
    if (!phone?.trim()) {
      return NextResponse.json({ error: "Số điện thoại là bắt buộc" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in env");
      return NextResponse.json(
        { error: "Server chưa cấu hình Telegram" },
        { status: 500 }
      );
    }

    /* ── Build message ── */
    const msg = [
      `☕ *Yêu cầu nhận cafe GSCFin*`,
      ``,
      `👤 *Tên:* ${name.trim()}`,
      `📱 *SĐT:* ${phone.trim()}`,
      address?.trim() ? `📍 *Địa chỉ:* ${address.trim()}` : null,
      ``,
      `📊 *Điểm quiz:* ${score}/${total}`,
      `📅 *Thời gian:* ${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}`,
    ]
      .filter(Boolean)
      .join("\n");

    /* ── Send to Telegram ── */
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: msg,
          parse_mode: "Markdown",
        }),
      }
    );

    const telegramData = await telegramRes.json();

    if (!telegramData.ok) {
      console.error("Telegram API error:", telegramData);
      return NextResponse.json(
        { error: "Không gửi được tin nhắn Telegram" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Telegram route error:", err);
    return NextResponse.json(
      { error: "Lỗi server" },
      { status: 500 }
    );
  }
}
