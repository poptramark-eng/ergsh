"use client";
import { useParams, useSearchParams } from "next/navigation";

export default function student() {
  const { id } = useParams<{ id: string }>();
  const student = useSearchParams();

  return (
    <article className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {student.get("name")}
      </h1>
      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">ID:</span> {id}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Gender:</span> {student.get("gender")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Date of Birth:</span>{" "}
          {student.get("dob")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Grade:</span> {student.get("grade")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">School ID:</span>{" "}
          {student.get("schoolId")}
        </li>
      </ul>
    </article>
  );
}
