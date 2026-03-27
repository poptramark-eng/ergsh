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
    <div className="m-2 flex place-items-center flex-col">
      
        <h1 className="text-2xl text-center font-bold text-black">Exams</h1>
        <Link
          href="/erp/exams"
          className="text-white bg-black text-center  p-2 m-4 rounded-lg font-semibold"
        >
          Create Exam
        </Link>
      

      <div className="overflow-x-scroll inline-block place-self-center p-8 m-0 ">
        <table className="rounded-lg bg-gray-900/400 p-4 min-w-0 shadow-xl">
          <thead>
            <tr className="bg-orange-300/50 w-full m-0">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Exam</th>
              <th className="p-2 text-left">Term</th>
              <th className="p-2 text-left">Year</th>
              <th className="p-2 text-left">Delete</th>
              <th className="p-2 text-left">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-50">
            {exams? (
              exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-100 w-full m-0 transition">
                  <td className="p-2 text-left">{exam.id}</td>
                  <td className="p-2 text-left ">
                    {exam.exam}
                  </td>
                  <td className="p-2 text-left">{exam.term}</td>
                  <td className="p-2 text-left">{(new Date(exam.year)).toLocaleDateString("en-us", {year:"numeric"})}</td>
                  <td className="p-2 text-left">
                    <Link
                      href={`/erp/details/exams/edit/${exam.id}?term=${exam.term}&year=${exam.year}&exam=${exam.exam}`}
                      className="p-2 text-left bg-blue-500/100 m-2 text-white rounded-lg"
                    >Edit</Link>
                  </td>
                  <td className="p-2 text-left">
                    <Link
                      href={`/erp/details/exams/delete/${exam.id}`}
                      className="text-white p-2 m-2 text-left bg-red-500/100 rounded-lg"
                    >Delete</Link>
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-2 text-left"
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
