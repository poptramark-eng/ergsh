"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Edit() {
  const router = useRouter();
  const [state, setState] = useState<boolean>(false);
  const [form_name, setName] = useState<string>();
  const [form_dob, setdob] = useState<string>();
  const [form_grade, setgrade] = useState<string>();
  const [form_gender, setgender] = useState<string>();
  const [form_id, setid] = useState<string>();
  const { id } = useParams();
  const search = useSearchParams();

  const student = useSearchParams();
  const name = student.get("name") as string;
  const grade = student.get("grade") as string;
  const dob = student.get("dob") as string;
  const gender = student.get("gender") as string;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const student = {
      name: form.get("name") as string,
      grade: form.get("grade") as string,
      dob: form.get("dob") as string,
      gender: form.get("gender") as string,
      id: form.get("id") as string,
    };
    setName(student.name);
    setdob(student.dob);
    setgender(student.gender);
    setgrade(student.grade);
    setid(student.id);
    setState(true);
  }

  useEffect(() => {
    async function edit() {
      if (state) {
        const edited = await fetch("/api/erp/students", {
          method: "PUT",

          body: JSON.stringify({
            name: form_name,
            dob: form_dob,
            gender: form_gender,
            id: form_id,
            grade: form_grade,
          }),
        });
        const response = await edited.json();
        const message = response.message;
        message === "success"
          ? router.push("/erp/details/students")
          : alert(message);
      }
    }
    edit();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md ring-1 ring-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={name}
          className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
        />
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            defaultValue={gender}
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
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
            type="date"
            id="dob"
            name="dob"
            defaultValue={dob}
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
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
            defaultValue={grade}
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            id
          </label>
          <input
            type="text"
            id="id"
            name="id"
            defaultValue={`${id}`}
            className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
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
