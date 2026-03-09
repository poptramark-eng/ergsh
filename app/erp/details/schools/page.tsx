"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Schools() {
  const [schools, setSchools] = useState<
    {
      id: string;
      name: string;
      email: string;
      phone: string;
      motto: string;
      vision: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchSchools() {
      const data = await fetch("/api/erp/schools");
      const schools_array = await data.json();
      setSchools(schools_array.school);
    }
    fetchSchools();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-12 p-10 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        School Details
      </h1>



      {schools.length > 0 ? (
        <ul className="space-y-6">
          {schools.map((school) => (
            <li
              key={school.id}
              className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-blue-700">
                    {school.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {school.email} • {school.phone}
                  </p>
                  <p className="text-sm italic text-gray-500 mt-2">
                    "{school.motto}" — {school.vision}
                  </p>
                </div>

                <div className="flex flex-col space-y-2 text-right">
                  <Link
                    href={`/erp/details/schools/detail/${school.id}?motto=${school.motto}&email=${school.email}&phone=${school.phone}&name=${school.name}&vision=${school.vision}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/erp/details/schools/${school.id}?motto=${school.motto}&email=${school.email}&phone=${school.phone}&name=${school.name}&vision=${school.vision}`}
                    className="text-green-600 hover:underline font-medium"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/erp/details/schools/delete/${school.id}`}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 italic mt-6">
          School not found.
        </p>
      )}
    </div>
  );
}
