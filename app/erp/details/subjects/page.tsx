"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Subjects() {
  const [subjects, setSubjects] = useState<
    { id: string; name: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    async function fetchSubjects() {
      const data = await fetch("/api/erp/subjects");
      const subjects_array = await data.json();
      setSubjects(subjects_array.subjects);
    }
    fetchSubjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Subjects</h1>
        <Link
          href="/erp/subjects"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          ➕ Add Subject
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-center">Details</th>
              <th className="px-4 py-3 text-center">Delete</th>
              <th className="px-4 py-3 text-center">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-50">
            {subjects? (
              subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{subject.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {subject.name}
                  </td>
                  <td className="px-4 py-3">{subject.createdAt}</td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/subjects/details/${subject.id}?name=${subject.name}`}
                      className="text-red-600 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/subjects/delete/${subject.id}`}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/subjects/edit/${subject.id}?name=${subject.name}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
