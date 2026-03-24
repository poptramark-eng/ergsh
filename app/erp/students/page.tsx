"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Students() {
  const router = useRouter();
  const [school, setSchool] = useState<
    {
      id: string;
      name: string;
      email: string;
      phone: string;
      motto: string;
      vision: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const student = {
      schoolId: form.get("school"),
      name: form.get("name") as string,
      gender: form.get("gender") as string,
      dob: form.get("dob") as string,
      grade: form.get("grade") as string,
    };

    const request = await fetch("/api/erp/students", {
      method: "POST",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });

    const response = await request.json();
    const message = response.message;
    message !== "success"
      ? alert(message)
      : router.push("/erp/details/students");

    setLoading(false);
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
        Add Student
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* School Select */}
        <div>
          <label
            htmlFor="school"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Select School
          </label>
          <select
            name="school"
            id="school"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          >
            <option value="">-- Choose a school --</option>
            {school.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
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
          <label
            htmlFor="gender"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
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
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Grade */}
        <div>
          <label
            htmlFor="grade"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Grade
          </label>
          <select
            id="grade"
            name="grade"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          >
            <option value="">-- Select grade --</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={`Grade ${i + 1}`}>
                Grade {i + 1}
              </option>
            ))}
          </select>
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
            {loading ? "Adding..." : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
