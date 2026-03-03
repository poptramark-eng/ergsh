"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Students() {
  const [students, setStudents] = useState<
    {
      id: string;
      name: string;
      gender: string;
      dob: string;
      schoolId: string;
      grade: string;
      createdAt: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchStudents() {
      const data = await fetch("/api/erp/students");
      const students_array = await data.json();
      setStudents(students_array.students); // adjust if API returns differently
    }
    fetchStudents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
        <Link
          href="/erp/students"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          ➕ Add Student
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Gender</th>
              <th className="px-4 py-3 text-left">DOB</th>
              <th className="px-4 py-3 text-left">School ID</th>
              <th className="px-4 py-3 text-left">Grade</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-center">Details</th>
              <th className="px-4 py-3 text-center">Edit</th>
              <th className="px-4 py-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-50">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{student.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-4 py-3">{student.gender}</td>
                  <td className="px-4 py-3">{student.dob}</td>
                  <td className="px-4 py-3">{student.schoolId}</td>
                  <td className="px-4 py-3">{student.grade}</td>
                  <td className="px-4 py-3">{student.createdAt}</td>

                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/students/${student.id}?gender=${student.gender}&dob=${student.dob}&schoolId=${student.schoolId}&grade=${student.grade}&name=${student.name}`}
                      className="text-red-600 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/students/edit/${student.id}?gender=${student.gender}&dob=${student.dob}&schoolId=${student.schoolId}&grade=${student.grade}&name=${student.name}`}
                      className="text-red-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/students/delete/${student.id}`}
                      className="text-red-600 hover:underline"
                    >
                      Delete
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
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
/*  
const student =useSearchParams();
const name = student.get("name")as string;
const grade = student.get("grade")as string;
const dob = student.get("dob")as string;
const gender = student.get("gender")as string;*/
