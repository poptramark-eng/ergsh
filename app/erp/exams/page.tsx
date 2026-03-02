"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const exam = formData.get("exam") as string;
    const term = formData.get("term") as string;

    const request = await fetch("/api/erp/exams", {
      method: "POST",
      body: JSON.stringify({ exam: exam, term: term }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await request.json();

    const message = response.message;
    message !== "success"
      ? alert("Exam exists")
      : router.push("/erp/details/exams");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h1>CREATE EXAM</h1>
      <div>
        <label
          htmlFor="exam"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          EXAM
        </label>
        <input
          type="text"
          id="exam"
          name="exam"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>
      <div>
        <label
          htmlFor="term"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          TERM
        </label>
        <input
          type="text"
          id="term"
          name="term"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
