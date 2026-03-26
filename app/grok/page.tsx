"use client";

import { useState, useEffect, useRef } from "react";

type ChatMessage = {
  role: "user" | "assistant" | "error";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  async function sendMessage() {
    if (!input.trim()) return;
    const content = input.trim();

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "API error");
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.message || "",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: err.message || "Something went wrong." },
      ]);
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

  

  return (
    <div>
      

      {/* GLASS CARD */}
      <div>

        {/* Header */}
        <header className="p-4 border-b border-white/30 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Assistant</h1>
          <p className="text-xs text-gray-700 mt-1">
            Powered by Grok Console models
          </p>
        </header>

        {/* Messages */}
        <main className="">
          {messages.map((msg, i) => {
           
            const isAssistant = msg.role === "assistant";
            

            return (
              <div
                key={i}
                
              >
                <div >
                  {isAssistant ? (
                    <div className="leading-relaxed tracking-normal text-sm font-light px-1" dangerouslySetInnerHTML={{ __html: msg.content }} />
                  ) : (
                    msg.content
                  )}
                  
                  <hr />
                  <br />
                </div>
              </div>
            );
          })}

          <div/>
        </main>

        {/* Input */}
        <section className="m-auto flex items-center flex-col text-center w-full p-3 ">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message…"
            
            className="border-2 border-double rounded-md border-yellow-400 m-auto p-3"
          />

          <button className="w-full text-left"
            onClick={sendMessage}
            disabled={loading}
            
          >
            {loading ? "sending" : "Send"}
          </button>
        </section>

      </div>
    </div>
  );
}
