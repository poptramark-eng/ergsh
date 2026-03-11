"use client";

import Link from "next/link";
import {Suspense} from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Reg() {
  const router = useRouter();
  const callback: any= useSearchParams().get("callback");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const password = formData.get("password") as string;
    const email = formData.get("email") as string;

    const response = await fetch("/api/auth/login", {
      body: JSON.stringify({ password, email }),
      method: "POST",
    });
   try{ const results = await response.json();
    results.message === "success"
      ? (window.location.href = callback)
      : (alert(results.message));}catch(error){
        alert("!!!User not found , please Create account first");
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to ERP
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/auth/reg"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
export default function Login(){
return (<Suspense fallback={<p>..loading</p>}>
  <Reg />
</Suspense>)
}
