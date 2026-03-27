"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Students() {
  const [students, setStudents] = useState<
    {
      id: string,
      name: string,
      gender: string,
      dob: string,
      schoolId: string,
      grade: string,
      createdAt: string,
      school: {
       
        id: string,
        name:string,
        email: string,
        phone: string,
        motto: string,
        vision: string,
      
      }
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
    <div className="m-4">
      <div className="m-0 p-4">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
        <Link
          href="/erp/students"
          className="bg-blue-600/100 text-white p-2 inline-block rounded-lg font-semibold m-2 transition"
        >
           Add Student
        </Link>
      </div>

      <div className="overflow-x-scroll">
        <table className="m-6 p-4 shadow-lg flex-1">
          <thead className="bg-stone-500/100 text-black">
            <tr>
              <th className="px-4 py-3 text-left">ADM</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Gender</th>
              <th className="px-4 py-3 text-left">DOB</th>
              <th className="px-4 py-3 text-left">School</th>
              <th className="px-4 py-3 text-left">Grade</th>
              <th className="px-4 py-3 text-center">Details</th>
              <th className="px-4 py-3 text-center">Edit</th>
              <th className="px-4 py-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody className=" ">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-3">{student.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-4 py-3">{student.gender}</td>
                  <td className="px-4 py-3">{(new Date(student.dob)).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{student.school.name}</td>
                  <td className="px-4 py-3">{student.grade}</td>
                  

                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/students/${student.id}?gender=${student.gender}&dob=${student.dob}&schoolId=${student.school.name}&grade=${student.grade}&name=${student.name}`}
                      className="text-white p-2 rounded-lg bg-blue-900 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center ">
                    <Link
                      href={`/erp/details/students/edit/${student.id}?gender=${student.gender}&dob=${student.dob}&schoolId=${student.schoolId}&grade=${student.grade}&name=${student.name}`}
                     className="rounded-lg bg-green-400/100 p-2 text-white"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/erp/details/students/delete/${student.id}`}
                      className="text-white bg-red-900 p-2 rounded-sm hover:underline"
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
                  className="px-4 py-3 text-center text-gray-500 italic"
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
