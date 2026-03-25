"use client";
import React, { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant" | "error";
  content: string; // assistant content may contain safe HTML
  id?: string;
  createdAt?: string;
};

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);

  // Utility: generate id + timestamp
  const nowIso = () => new Date().toISOString();

  // Utility: strip HTML tags for copying / plain-text export
  function stripHtml(html: string) {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    } catch {
      // fallback
      return html.replace(/<[^>]*>/g, "");
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(240, ta.scrollHeight)}px`;
  }, [input]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Announce copy actions for assistive tech
  function announce(message: string) {
    if (liveRef.current) {
      liveRef.current.textContent = message;
      setTimeout(() => {
        if (liveRef.current) liveRef.current.textContent = "";
      }, 2000);
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      id: `${Date.now()}-user`,
      createdAt: nowIso(),
    };
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
        id: `${Date.now()}-assistant`,
        createdAt: nowIso(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        role: "error",
        content: err?.message || "An unexpected error occurred.",
        id: `${Date.now()}-error`,
        createdAt: nowIso(),
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

  // Copy a single message (assistant) as plain text (no HTML)
  async function copyMessagePlain(msg: ChatMessage) {
    const text = stripHtml(msg.content);
    try {
      await navigator.clipboard.writeText(text);
      announce("Copied assistant response");
    } catch {
      announce("Copy failed");
    }
  }

  // Copy entire conversation as plain text
  async function copyConversationPlain() {
    const text = messages
      .map((m) => {
        const who = m.role === "assistant" ? "Assistant" : m.role === "user" ? "You" : "Error";
        const body = m.role === "assistant" ? stripHtml(m.content) : m.content;
        const time = m.createdAt ? ` [${new Date(m.createdAt).toLocaleString()}]` : "";
        return `${who}${time}:\n${body}`;
      })
      .join("\n\n---\n\n");
    try {
      await navigator.clipboard.writeText(text);
      announce("Copied conversation");
    } catch {
      announce("Copy failed");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
              AI
            </div>
            <div>
              <h1 className="text-sm md:text-base font-semibold leading-tight">Assistant</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">Ask anything — mobile-first, responsive chat</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyConversationPlain}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md focus:outline-none"
              aria-label="Copy entire conversation"
            >
              <svg className="h-4 w-4 text-gray-600 dark:text-gray-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Copy</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6">
          {/* Conversation area */}
          <section
            aria-label="Conversation"
            className="space-y-6"
          >
            {messages.length === 0 && (
              <article className="max-w-prose leading-relaxed p-4 md:p-8 mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-semibold mb-2">Welcome</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Start the conversation by typing a message below. Press Enter to send, Shift+Enter for a new line.
                </p>
              </article>
            )}

            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";
              const isUser = msg.role === "user";
              const bubbleBase =
                "max-w-[90%] md:max-w-[75%] break-words leading-relaxed text-sm md:text-base p-3 md:p-4 rounded-lg shadow-sm";
              return (
                <div key={msg.id ?? idx} className="w-full flex items-start gap-3">
                  {/* Avatar */}
                  <div className={`flex-shrink-0 mt-1 ${isAssistant ? "" : "ml-auto"}`}>
                    {isAssistant ? (
                      <div className="h-8 w-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold shadow">
                        A
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center font-semibold shadow">
                        Y
                      </div>
                    )}
                  </div>

                  {/* Bubble + content */}
                  <div className={`flex-1 ${isUser ? "flex justify-end" : ""}`}>
                    <article
                      className={`${bubbleBase} ${isAssistant ? "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800" : "bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700"} ${isAssistant ? "" : "ml-auto"}`}
                      style={{ lineHeight: 1.6 }}
                      aria-live={isAssistant ? "polite" : undefined}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="prose max-w-prose leading-relaxed text-gray-800 dark:text-gray-100">
                          {isAssistant ? (
                            // assistant content may contain safe HTML
                            <div
                              className="space-y-2"
                              dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                          ) : (
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                          )}
                        </div>

                        {/* Copy button for assistant messages */}
                        {isAssistant && (
                          <div className="ml-3 flex items-start">
                            <button
                              onClick={() => copyMessagePlain(msg)}
                              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                              title="Copy assistant response"
                              aria-label="Copy assistant response"
                            >
                              <svg className="h-5 w-5 text-gray-500 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9 12H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* meta row */}
                      <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center justify-between">
                        <span>{msg.role === "assistant" ? "Assistant" : msg.role === "user" ? "You" : "Error"}</span>
                        <span>{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ""}</span>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </section>
        </div>
      </main>

      {/* Composer pinned to bottom */}
      <div className="w-full fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-30">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-end gap-3"
            aria-label="Message composer"
          >
            <textarea
              ref={textareaRef}
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
              className="flex-1 resize-none overflow-hidden rounded-md px-3 py-2 text-base font-medium text-[#111827] bg-gray-50 dark:bg-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 max-h-60"
              aria-label="Type your message"
              style={{ lineHeight: 1.6 }}
            />

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-lg font-semibold border border-black bg-black text-white hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none"
                aria-disabled={loading}
              >
                {loading ? (
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="3" strokeOpacity="0.2" />
                    <path d="M22 12a10 10 0 0 0-10-10" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                ) : (
                  "Send"
                )}
              </button>

              <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                <div>
                  <span className="font-medium">{input.length}</span>
                  <span className="ml-1">/1000</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Live region for announcements */}
      <div ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true" />
    </div>
  );
}
