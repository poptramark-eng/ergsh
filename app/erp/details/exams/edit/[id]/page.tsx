"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Edit() {
  const router = useRouter();
  const param = useSearchParams();
  const params = useParams();
  const [school, setschool] = useState<{
    name: string;
    id: string;
  }>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const school = {
      exam: form.get("exam") as string,
      id: form.get("id") as string,
      term: form.get("term") as string,
    };
    const update = await fetch("/api/erp/exams", {
      method: "PUT",
      body: JSON.stringify(school),
    });
    const response = await update.json();
    const message = response.message;
    message === "success"
      ? router.push("/erp/details/exams")
      : alert("application error");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="exam"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            exam
          </label>
          <input
            type="text"
            id="exam"
            name="exam"
            defaultValue={param.get("exam") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>
        <div>
          <label
            htmlFor="term"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            term
          </label>
          <input
            type="text"
            id="term"
            name="term"
            defaultValue={param.get("term") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            defaultValue={params.id as string}
            readOnly
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <input
            type="submit"
            value="EDIT"
            className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </form>
    </div>
  );
}
