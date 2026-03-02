"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit() {
  const router = useRouter();
  const param = useSearchParams();
  const params = useParams();
  const [teacher, setteacher] = useState<{
    name: string;
    phone: string;
    schoolId: string;
    gender: string;
    grade: string;
    id: string;
  }>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const teacher = {
      name: form.get("name") as string,
      phone: form.get("phone") as string,
      schoolId: form.get("schoolId") as string,
      gender: form.get("gender") as string,
      email: form.get("email") as string,
      id: form.get("id") as string,
    };
    const update = await fetch("/api/erp/teachers", {
      method: "PUT",
      body: JSON.stringify(teacher),
    });
    const response = await update.json();
    const message = response.message;
    message === "success"
      ? router.push("/erp/details/teachers")
      : alert("application error");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={param.get("name") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

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
            defaultValue={param.get("gender") as string}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          >
            <option value="">-- Select gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={param.get("phone") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={param.get("email") as string}
            readOnly
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            defaultValue={params.id as string}
            readOnly
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="schoolId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            School ID
          </label>
          <input
            type="text"
            id="schoolId"
            name="schoolId"
            defaultValue={param.get("schoolId") as string}
            readOnly
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <input
            type="submit"
            value="EDIT"
            className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </form>
    </div>
  );
}
