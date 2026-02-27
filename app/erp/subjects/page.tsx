"use client";
import { useState } from "react";

export default function Create() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    const request = await fetch("/api/erp/subjects", {
      method: "POST",
      body: JSON.stringify({ name: name }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await request.json();

    setMessage(data);
    setName(name);
    setEmail(email);
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200 space-y-6"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Create Subject
      </h1>

      {/* Subject Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Subject Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition"
      >
        Submit
      </button>

      {/* Success Message */}
      {submitted && (
        <div className="mt-6 p-5 bg-green-50 border border-green-300 rounded-lg text-center">
          <h1 className="text-lg font-bold text-green-800">
            🎉 Subject Created: {name}
          </h1>
          <h2 className="text-green-700">
            {email ? `Your email address is ${email}` : "No email provided"}
          </h2>
        </div>
      )}

      {/* Server Response */}
      {message && (
        <div className="mt-4 text-center text-sm text-gray-600">{message}</div>
      )}
    </form>
  );
}
