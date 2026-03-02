"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function student() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const student = useSearchParams();

  return (
    <article>
      <button
        onClick={() => {
          return router.back();
        }}
        className="text-blue-600 hover:text-blue-800 font-medium items-center space-x-2 flex"
      >
        <span className="text-xl">&larr;</span> <span>Back</span>
      </button>
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
      <button onClick={() => router.back()}>view teachers</button>
    </article>
  );
}
