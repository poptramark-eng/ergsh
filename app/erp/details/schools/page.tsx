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
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Registered Schools
      </h1>
      <Link
        href={`/erp/schools`}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Add schools
      </Link>
      {schools.length > 0 ? (
        <ul className="space-y-4">
          {schools.map((school) => (
            <li
              key={school.id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-600">
                  {school.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {school.email} • {school.phone}
                </p>
                <p className="text-sm italic text-gray-500">
                  "{school.motto}" — {school.vision}
                </p>

                <div className="px-4 py-3 text-center">
                  <Link
                    href={`/erp/details/schools/detail/${school.id}?motto=${school.motto}&email=${school.email}&phone=${school.phone}&name=${school.name}}&vision=${school.vision}`}
                    className="text-red-600 hover:underline"
                  >
                    Details
                  </Link>
                </div>

                <p className="px-4 py-3 text-center">
                  <Link
                    href={`/erp/details/schools/delete/${school.id}`}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </Link>
                </p>
                <p className="px-4 py-3 text-center">
                  <Link
                    href={`/erp/details/schools/${school.id}?motto=${school.motto}&email=${school.email}&phone=${school.phone}&name=${school.name}}&vision=${school.vision}`}
                    className="text-red-600 hover:underline"
                  >
                    edit
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 italic">No schools found.</p>
      )}
    </div>
  );
}
