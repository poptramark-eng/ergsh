"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Reg() {
  const router = useRouter();
  

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const schname = formData.get("School_name") as string;
    const schemail = formData.get("School_email") as string;
    const vision = formData.get("vision") as string;
    const motto = formData.get("motto") as string;
    const phone = formData.get("phone") as string;
    

    const response = await fetch("/api/all", {
      body: JSON.stringify({ name,  role, password, email ,schname, schemail,vision, motto, phone}),
      method: "POST",
    });
    const results = await response.json();
    results.message === "success"
      ? router.push("/auth/login")
      : alert(JSON.stringify(results));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              defaultValue="admin"
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          
               {["School_name", "School_email", "phone", "motto", "vision"].map((field) => (
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
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Already registered? Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
