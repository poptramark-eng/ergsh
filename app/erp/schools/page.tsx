"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const vision = formData.get("vision") as string;
    const motto = formData.get("motto") as string;
    const phone = formData.get("phone") as string;

    const request = await fetch("/api/erp/schools", {
      method: "POST",
      body: JSON.stringify({ name, email, phone, vision, motto }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await request.json();
    const message = response.message;
    message !== "success"
      ? alert("school exists")
      : router.push("/erp/details/schools");

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800">
        School Registration
      </h1>

      {["name", "email", "phone", "motto", "vision"].map((field) => (
        <div key={field}>
          <label
            htmlFor={field}
            className="block text-sm font-semibold text-gray-700 mb-2 capitalize"
          >
            {field}
          </label>
          <input
            type={
              field === "email" ? "email" : field === "phone" ? "tel" : "text"
            }
            id={field}
            name={field}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`w-full font-semibold py-3 px-4 rounded-lg transition ${
          loading
            ? "bg-gray-400 text-gray-100 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
