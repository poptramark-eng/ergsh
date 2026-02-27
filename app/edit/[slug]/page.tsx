"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";
export default function Edit() {
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();
  const name1 = search.get("name") as string;
  const email1 = search.get("email") as string;

  const { slug } = params;

  const [user, setUser] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [email, setEmail] = useState(email1);
  const [name, setName] = useState(name1);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //event.preventDefault();
    const form = new FormData(event.currentTarget);
    setEmail(form.get("email") as string);
    setName(form.get("name") as string);
    setUser(true);
  }

  useEffect(() => {
    async function edit() {
      const edited = await fetch("/api/register/edit", {
        method: "PUT",
        body: JSON.stringify({ name: name, email: email, id: slug }),
      });
      const res = await edited.json();
      const details = JSON.stringify(res);
      setMessage(details);
    }
    edit();
    user ? edit() : "";
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md ring-1 ring-gray-100">
      <div className="mb-6 text-gray-800">
        {user ? `${user} \n ${name} ${email}}` : "Getting user details"}
      </div>

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
          type="name"
          id="name"
          name="name"
          placeholder={name}
          className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
        />
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={email}
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

      <div className="mt-6 text-sm text-gray-700">
        {message ? `${message}` : "editing"}
      </div>
    </div>
  );
}
