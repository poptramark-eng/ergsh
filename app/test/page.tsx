"use client";

import { useEffect, useState } from "react";

export default function Test() {
  const [columns, setColumns] = useState<string[]>();
  const [results, setResults] = useState<
    {
      id: string;
      name: string;
      exam: string;
      total: number;
      avg: number;
      subjects: { score: number; name: string }[];
    }[]
  >([]);

  useEffect(() => {
    async function data() {
      const request = await fetch("/api/erp/results");
      const response = await request.json();

      const clean = response.results.reduce(
        function (
          acc: {
            [key: string]: {
              id: string;
              name: string;
              exam: string;
              total: number;
              avg: number;
              subjects: {}[];
            };
          },
          curr: {
            score: string;
            subject: { name: string };
            exam: { exam: string };
            student: { name: string; id: string };
            id: string;
          }
        ) {
          const score = curr.score as string;
          const subject = curr.subject;
          const exam = curr.exam;
          const student = curr.student;
          const id = student.id;

          if (!acc[id]) {
            acc[id] = {
              id: student.id,
              name: student.name,
              exam: exam.exam,
              total: 0,
              avg: 0,
              subjects: [],
            };
          }

          acc[id].total = acc[id].total + Number(score);
          acc[id].subjects.push({ score, name: [subject.name] });
          acc[id].avg = Number((acc[id].total / acc[id].subjects.length).toFixed(2));

          return acc;
        },
        {}
      );

      const flattened: {
        id: string;
        name: string;
        exam: string;
        total: number;
        avg: number;
        subjects: { score: number; name: string }[];
      }[] = Object.values(clean);

      setResults(flattened);
      const sub = flattened.flatMap((s) => s.subjects);
      const moo = sub.flatMap((s) => s.name);
      const nom = [...new Set(moo)];
      setColumns(nom);
    }
    data();
  }, []);

  return (
    <div>
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md bg-white">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">ADM</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Name</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Exam</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Average</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Total</th>
              {columns &&
                columns.map((col, index) => (
                  <th key={index} className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                    {col}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {results &&
              results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-2 border-b">{result.id}</td>
                  <td className="px-4 py-2 border-b">{result.name}</td>
                  <td className="px-4 py-2 border-b">{result.exam}</td>
                  <td className="px-4 py-2 border-b">{result.avg}</td>
                  <td className="px-4 py-2 border-b">{result.total}</td>
                  {result.subjects.map((subject) => (
                    <td key={subject.name} className="px-4 py-2 border-b">
                      {subject.score}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
