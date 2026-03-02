"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Exams() {
  const [exams, setExams] = useState<
    { id: string; exam: string; term: string; year: string }[]
  >([]);

  useEffect(() => {
    async function fetchExams() {
      const data = await fetch("/api/erp/exams");
      const exams_array = await data.json();
      setExams(exams_array.exams);
    }
    fetchExams();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Exams</h1>
        <Link
          href="/erp/exams"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          ➕ Add Exam
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Exam</th>
              <th className="px-4 py-3 text-left">Term</th>
              <th className="px-4 py-3 text-left">Year</th>
              <th className="px-4 py-3 text-center">Details</th>
              <th className="px-4 py-3 text-center">Delete</th>
              <th className="px-4 py-3 text-center">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-50">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{exam.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {exam.exam}
                  </td>
                  <td className="px-4 py-3">{exam.term}</td>
                  <td className="px-4 py-3">{exam.year}</td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/exams/${exam.id}?term=${exam.term}&year=${exam.year}&exam=${exam.exam}`}
                      className="text-red-600 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/exams/delete/${exam.id}`}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-green-600 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No exams found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
