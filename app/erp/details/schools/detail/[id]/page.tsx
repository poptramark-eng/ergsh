"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function school() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const school = useSearchParams();

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
        {school.get("name")}
      </h1>
      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">ID:</span> {id}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">motto:</span> {school.get("motto")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Vision:</span> {school.get("vision")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">name:</span> {school.get("name")}
        </li>
        <li className="flex justify-between border-b pb-2">
          <span className="font-semibold">Email:</span> {school.get("email")}
        </li>
      </ul>
    </article>
  );
}
