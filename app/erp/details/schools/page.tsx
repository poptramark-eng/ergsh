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
  <main className="max-w-6xl mx-auto mt-12 p-8 bg-gray-50 rounded-3xl shadow-lg">
    <header className="mb-12 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900">School Directory</h1>
      <p className="mt-2 text-gray-600">Browse and manage registered schools</p>
    </header>

    {schools.length > 0 ? (
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {schools.map((school) => (
          <article
            key={school.id}
            className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h2 className="text-xl font-bold text-blue-700">{school.name}</h2>
              <address className="not-italic text-sm text-gray-600 mt-1">
                {school.email} • {school.phone}
              </address>
              <p className="text-sm text-gray-500 mt-3">
                <span className="font-medium">Motto:</span> "{school.motto}"
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Vision:</span> {school.vision}
              </p>
            </div>

            <nav className="mt-6 flex gap-3">
              <Link
                href={`/erp/details/schools/detail/${school.id}?motto=${school.motto}&email=${school.email}&phone=${school.phone}&name=${school.name}&vision=${school.vision}`}
                className="flex-1 px-4 py-2 text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Details
              </Link>
              <Link
                href={`/erp/details/schools/${school.id}?motto=${school.motto}&email=${school.email}&phone=${school.phone}&name=${school.name}&vision=${school.vision}`}
                className="flex-1 px-4 py-2 text-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Edit
              </Link>
              <Link
                href={`/erp/details/schools/delete/${school.id}`}
                className="flex-1 px-4 py-2 text-center rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </Link>
            </nav>
          </article>
        ))}
      </section>
    ) : (
      <section className="text-center py-12">
        <p className="text-gray-500 italic">No schools found.</p>
        <Link
          href="/erp/details/schools/new"
          className="mt-4 inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add a School
        </Link>
      </section>
    )}
  </main>
);
}
