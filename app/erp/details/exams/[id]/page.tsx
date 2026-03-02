"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function exam() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const exam = useSearchParams();

  return (
    <article className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <button
        onClick={() => {
          return router.back();
        }}
        className="text-blue-600 hover:text-blue-800 font-medium items-center space-x-2 flex"
      >
        <span className="text-xl">&larr;</span> <span>Back</span>
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {exam.get("name")}
      </h1>
      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">ID:</span> {id}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Exam: </span> {exam.get("exam")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Year:</span> {exam.get("year")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Term:</span> {exam.get("term")}
        </li>
      </ul>
    </article>
  );
}
