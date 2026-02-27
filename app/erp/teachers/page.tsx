"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Students() {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [school, setSchool] = useState<
    [
      {
        id: string;
        name: string;
        email: string;
        phone: string;
        motto: string;
        vision: string;
      }
    ]
  >();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const student = {
      schoolId: form.get("school"),
      name: form.get("name") as string,
      gender: form.get("gender") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
    };

    if (student) {
      const response = await fetch("/api/erp/teachers", {
        method: "POST",
        body: JSON.stringify(student),
      });

      const message = await response.json();
      setMessage(message.message);
      alert(message.message);
    }
  }

  useEffect(() => {
    async function add() {
      const schid = await fetch("/api/erp/schools");
      const school = await schid.json();
      setSchool(school.school);
    }
    add();
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
          <label
            htmlFor="school"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            School
          </label>
          <select
            name="school"
            id="school"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          >
            {school &&
              school.map((schools) => (
                <option key={schools.id} value={schools.id}>
                  {schools.name}
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
          <input
            type="text"
            id="gender"
            name="gender"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition"
          >
            Add Teacher
          </button>
        </div>
      </form>
    </div>
  );
}
