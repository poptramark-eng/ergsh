"use client";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";
export default function Edit() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const name = search.get("name") as string;
  const email = search.get("email") as string;

  const { id } = params;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md ring-1 ring-gray-100">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
        {`Hi ${name}, Welcome to poptrwaorld`}
      </h1>

      <h2 className="text-sm text-gray-600 mb-4">{`your id is ${id}`}</h2>

      <article className="text-sm text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-100">
        {`your email is ${email}`}
      </article>
    </div>
  );
}
