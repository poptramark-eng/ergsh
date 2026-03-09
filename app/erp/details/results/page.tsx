"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function results() {
  const [results, setResults] = useState<
    {
      id: string;
      studentId: string;
      subjectId: string;
      examId: string;
      score: string;
      student: {name: string, school:{name: string}},
      subject: {name: string},
      exam: {exam: string}
    }[]
  >([]);

  useEffect(() => {
    async function fetchresults() {
      const data = await fetch("/api/erp/results");
      const results_array = await data.json();
      setResults(results_array.results);
    }
    fetchresults();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">results</h1>
        <Link
          href="/erp/results"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          ➕ Add result
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">School</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">subject</th>
              <th className="px-4 py-3 text-left">exam</th>
              <th className="px-4 py-3 text-left">score</th>
              <th className="px-4 py-3 text-center">Details</th>
              <th className="px-4 py-3 text-center">Delete</th>
              <th className="px-4 py-3 text-center">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-50">
            {results.length > 0 ? (
              results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{result.student.school.name}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {result.student.name}
                  </td>
                  <td className="px-4 py-3">{result.subject.name}</td>
                  <td className="px-4 py-3">{result.exam.exam}</td>
                  <td className="px-4 py-3">{result.score}</td>

                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/results/${result.id}?gender=${result.examId}&email=${result.studentId}&schoolId=${result.subjectId}`}
                      className="text-red-600 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/results/delete/${result.id}`}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/results/${result.id}?gender=${result.examId}&email=${result.studentId}&schoolId=${result.subjectId}`}
                      className="text-red-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
