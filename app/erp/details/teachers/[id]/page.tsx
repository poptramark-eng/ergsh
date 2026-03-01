"use client";
import { useParams, useSearchParams } from "next/navigation";

export default function Teacher() {
  const { id } = useParams<{ id: string }>();
  const teacher = useSearchParams();

  return (
    <article className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {teacher.get("name")}
      </h1>
      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">ID:</span> {id}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Gender:</span> {teacher.get("gender")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Phone:</span> {teacher.get("phone")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Email:</span> {teacher.get("email")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">School ID:</span>{" "}
          {teacher.get("schoolId")}
        </li>
      </ul>
    </article>
  );
}
