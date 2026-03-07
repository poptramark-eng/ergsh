"use client";
import { useState, useEffect, useRef } from "react";

type ChatMessage = {
  role: "user" | "assistant" | "error";
  content: string;
};

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const req = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!req.ok) {
        const text = await req.text();
        throw new Error(text || `API error: ${req.status}`);
      }

      const res = await req.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: res.message || "",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        role: "error",
        content: err?.message || "An unexpected error occurred.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="min-h-screen flex flex-col bg-white text-[#1f1f1f] antialiased font-sans"
      style={{
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto flex flex-col justify-start pb-28 w-full">
        {messages.map((msg, idx) => (
          <div key={idx} className="w-full max-w-3xl mx-auto px-4">
            <div
              className={`my-4 ${
                msg.role === "user"
                  ? "flex justify-end"
                  : msg.role === "assistant"
                  ? "flex justify-start"
                  : "flex justify-center"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-2xl break-words ${
                  msg.role === "user"
                    ? "bg-gray-100 px-4 py-2 rounded-lg text-right"
                    : msg.role === "assistant"
                    ? "bg-white px-3 py-2 rounded-lg shadow-sm"
                    : ""
                }`}
                style={{
                  // subtle typographic tuning per role
                  fontSize:
                    msg.role === "user"
                      ? "0.95rem"
                      : msg.role === "assistant"
                      ? "1rem"
                      : "0.9rem",
                  fontWeight:
                    msg.role === "user"
                      ? 600
                      : msg.role === "assistant"
                      ? 400
                      : 600,
                  lineHeight: msg.role === "assistant" ? 1.6 : 1.4,
                }}
                dangerouslySetInnerHTML={
                  msg.role === "assistant"
                    ? { __html: msg.content }
                    : undefined
                }
              >
                {msg.role !== "assistant" ? (
                  <span
                    className={
                      msg.role === "error"
                        ? "text-red-600 text-sm font-medium"
                        : ""
                    }
                  >
                    {msg.content}
                  </span>
                ) : null}
              </div>
            </div>
            <hr className="border-gray-100" />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar pinned at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
          <textarea
            id="chat-input"
            value={input}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                setInput(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your prompt..."
            rows={1}
            className="flex-1 resize-none overflow-hidden rounded-md px-3 py-2 text-base font-medium text-[#111827] bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0"
            aria-label="Type your message"
            style={{ lineHeight: 1.5 }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-lg font-semibold border border-black bg-white text-black hover:bg-black hover:text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none"
            aria-disabled={loading}
          >
            {loading ? "…" : "Send"}
          </button>
        </div>
        <div className="text-right text-xs text-gray-500 max-w-3xl mx-auto px-4 pb-2">
          <span className="font-medium">{input.length}</span>
          <span className="ml-1">/1000</span>
        </div>
      </div>
    </div>
  );
}
