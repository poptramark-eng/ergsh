"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit() {
  const router = useRouter();
  const param = useSearchParams();
  const params = useParams();
  const [student, setStudent] = useState<{
    name: string;
    dob: string;
    schoolId: string;
    gender: string;
    grade: string;
    id: string;
  }>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = new FormData(event.currentTarget);

    setStudent({
      name: form.get("name") as string,
      dob: form.get("dob") as string,
      schoolId: form.get("schoolId") as string,
      gender: form.get("gender") as string,
      grade: form.get("grade") as string,
      id: form.get("id") as string,
    });
  }
  useEffect(() => {
    async function edit() {
      const update = await fetch("/api/erp/students", {
        method: "PUT",
        body: JSON.stringify(student),
      });
      const response = await update.json();
      const message = response.message;
      message === "success"
        ? router.push("/erp/details/students")
        : alert("application error");
    }
    student ? edit() : "";
  }, [student]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={param.get("name") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            defaultValue={param.get("gender") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth
          </label>
          <input
            type="text"
            id="dob"
            name="dob"
            defaultValue={param.get("dob") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="grade"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Grade
          </label>
          <input
            type="text"
            id="grade"
            name="grade"
            defaultValue={param.get("grade") as string}
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
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="schoolId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            School ID
          </label>
          <input
            type="text"
            id="schoolId"
            name="schoolId"
            defaultValue={param.get("schoolId") as string}
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
