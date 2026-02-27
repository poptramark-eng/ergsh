"use client";
import { useEffect, useState } from "react";

export default function Teachers() {
  const [message, setMessage] = useState<string>();
  const [school, setSchool] = useState<
    { id: string; name: string; email: string; phone: string; motto: string; vision: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const teacher = {
      schoolId: form.get("school"),
      name: form.get("name") as string,
      gender: form.get("gender") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
    };

    try {
      const response = await fetch("/api/erp/teachers", {
        method: "POST",
        body: JSON.stringify(teacher),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("❌ Failed to add teacher. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchSchools() {
      const schid = await fetch("/api/erp/schools");
      const data = await schid.json();
      setSchool(data.school);
    }
    fetchSchools();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add Teacher
      </h1>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg text-center">
          <h2 className="text-green-700 font-semibold">{message}</h2>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* School Select */}
        <div>
          <label htmlFor="school" className="block text-sm font-semibold text-gray-700 mb-2">
            School
          </label>
          <select
            name="school"
            id="school"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          >
            <option value="">-- Select a school --</option>
            {school.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-2">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          >
            <option value="">-- Select gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 px-4 rounded-lg transition ${
              loading
                ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
            }`}
          >
            {loading ? "Adding..." : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
}
