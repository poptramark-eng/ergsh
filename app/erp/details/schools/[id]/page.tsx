"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit() {
  const router = useRouter();
  const param = useSearchParams();
  const params = useParams();
  const [school, setschool] = useState<{
    name: string;
    phone: string;
    vision: string;
    motto: string;
    email: string;
    id: string;
  }>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const school = {
      name: form.get("name") as string,
      phone: form.get("phone") as string,
      vision: form.get("vision") as string,
      motto: form.get("motto") as string,
      email: form.get("email") as string,
      id: form.get("id") as string,
    };
    const update = await fetch("/api/erp/schools", {
      method: "PUT",
      body: JSON.stringify(school),
    });
    const response = await update.json();
    const message = response.message;
    message === "success"
      ? router.push("/erp/details/schools")
      : alert("application error");
  }

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
            htmlFor="motto"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            motto
          </label>
          <input
            type="text"
            id="motto"
            name="motto"
            defaultValue={param.get("motto") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={param.get("phone") as string}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={param.get("email") as string}
            readOnly
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
          <label
            htmlFor="vision"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vision
          </label>
          <input
            type="text"
            id="vision"
            name="vision"
            defaultValue={param.get("vision") as string}
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
