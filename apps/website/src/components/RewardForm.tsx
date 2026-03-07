"use client";

import { useState, type FormEvent } from "react";

interface RewardFormProps {
  score: number;
  total: number;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function RewardForm({ score, total }: RewardFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address, score, total }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Lỗi gửi form");
      }

      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Lỗi không xác định");
    }
  };

  if (state === "success") {
    return (
      <div style={{
        padding: "32px",
        borderRadius: "16px",
        border: "2px solid var(--accent-teal)",
        background: "var(--accent-teal-dim)",
        textAlign: "center",
        marginTop: "20px",
        boxShadow: "0 0 40px var(--accent-teal-dim)",
        animation: "fadeInUp 0.5s ease-out",
      }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px" }}>🎉</span>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "var(--accent-teal)",
          margin: 0,
        }}>
          Cảm ơn bạn, {name}!
        </p>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--text-dim)",
          margin: "8px 0 0",
        }}>
          Thông tin đã được gửi. GSCFin sẽ liên hệ bạn qua SĐT {phone} để gửi cafe ☕
        </p>
      </div>
    );
  }

  return (
    <div style={{
      padding: "28px",
      borderRadius: "16px",
      border: "2px solid var(--accent-teal)",
      background: "linear-gradient(135deg, var(--surface) 0%, var(--surface-elevated) 100%)",
      marginTop: "20px",
      boxShadow: "0 0 40px var(--accent-teal-dim), 0 8px 32px rgba(0,0,0,0.12)",
      animation: "fadeInUp 0.5s ease-out",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "8px" }}>☕</span>
        <h3 style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--accent-teal)",
          margin: "0 0 6px",
        }}>
          Chúc mừng! Bạn đạt {score}/{total} câu đúng 🎊
        </h3>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.82rem",
          color: "var(--text-dim)",
          margin: 0,
          lineHeight: 1.5,
        }}>
          Hãy nhập thông tin để nhận cafe được mời từ GSCFin
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {/* Name field */}
        <div>
          <label style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "var(--text-dim)",
            display: "block",
            marginBottom: "4px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}>
            Họ và Tên *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent-teal)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Phone field */}
        <div>
          <label style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "var(--text-dim)",
            display: "block",
            marginBottom: "4px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}>
            Số điện thoại *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0901234567"
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent-teal)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Address field */}
        <div>
          <label style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "var(--text-dim)",
            display: "block",
            marginBottom: "4px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}>
            Địa chỉ nhận cafe
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Nguyễn Huệ, Q1, TPHCM"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1.5px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent-teal)"}
            onBlur={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Error message */}
        {state === "error" && (
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "#ef4444",
            margin: 0,
            padding: "8px 12px",
            borderRadius: "8px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          }}>
            ❌ {errorMsg}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={state === "submitting" || !name.trim() || !phone.trim()}
          style={{
            padding: "12px 20px",
            borderRadius: "12px",
            border: "none",
            background: state === "submitting"
              ? "var(--border)"
              : "linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-cyan) 100%)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: "0.88rem",
            fontWeight: 700,
            cursor: state === "submitting" ? "wait" : "pointer",
            transition: "all 0.3s ease",
            opacity: (!name.trim() || !phone.trim()) ? 0.5 : 1,
            marginTop: "4px",
            boxShadow: "0 4px 16px var(--accent-teal-dim)",
          }}
        >
          {state === "submitting" ? "⏳ Đang gửi..." : "☕ Nhận Cafe từ GSCFin"}
        </button>
      </form>

      {/* Animation keyframe */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
