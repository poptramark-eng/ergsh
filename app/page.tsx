"use client";
import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function sendMessage() {
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const req = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });

      if (!req.ok) {
        const text = await req.text();
        throw new Error(text || `API error: ${req.status}`);
      }

      const res = await req.json();
      setResponse(res.message || "");
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Chat application</h1>
          <p className="mt-1 text-sm text-gray-600">
            Type a prompt and press <span className="font-medium">Enter</span> or click <span className="font-medium">Send</span>.
          </p>
        </header>

        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
          <label htmlFor="chat-input" className="block text-sm font-medium text-gray-700 mb-2">
            Your message
          </label>

          <div className="flex gap-3">
            <input
              id="chat-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              aria-label="Type your message"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </section>

        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Response</h2>

          <div className="prose max-w-none leading-relaxed text-gray-800 space-y-4">
            {response ? (
              <div dangerouslySetInnerHTML={{ __html: response }} />
            ) : (
              <p className="text-sm text-gray-500">No response yet. Send a message to receive a styled article.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
