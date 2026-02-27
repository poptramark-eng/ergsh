"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function request() {
      try {
        setLoading(true);
        const res = await fetch("/api/register");
        if (!res.ok) throw new Error(`Request failed ${res.status}`);
        const data = await res.json();
        setUsers(data.data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    request();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl ring-1 ring-gray-100">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Registered Users
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-gray-700">
              {users ? users.length : "—"}
            </span>{" "}
            users in the system
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search name or email"
              className="w-56 sm:w-72 pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
              aria-label="Search users"
              disabled
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Add User
          </Link>
        </div>
      </header>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="h-4 w-10 bg-gray-200 rounded-md" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-44 bg-gray-200 rounded-md" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-60 bg-gray-200 rounded-md" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-32 bg-gray-200 rounded-md" />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <div className="h-8 w-20 bg-gray-200 rounded-md" />
                      <div className="h-8 w-20 bg-gray-200 rounded-md" />
                    </div>
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-red-600"
                >
                  {error}
                </td>
              </tr>
            ) : users && users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm text-gray-700">{user.id}</td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 text-right space-x-2">
                    <Link
                      href={`/user/${user.id}?name=${encodeURIComponent(
                        user.name
                      )}&email=${encodeURIComponent(user.email)}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-sm text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Details
                    </Link>

                    <Link
                      href={`/edit/${user.id}?name=${encodeURIComponent(
                        user.name
                      )}&email=${encodeURIComponent(user.email)}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5h6M5 7v10a2 2 0 002 2h10"
                        />
                      </svg>
                      Edit
                    </Link>

                    <Link
                      href={`/delete/${user.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 text-sm rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 7h12M9 7v10m6-10v10M10 7l1-2h2l1 2"
                        />
                      </svg>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-sm text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
