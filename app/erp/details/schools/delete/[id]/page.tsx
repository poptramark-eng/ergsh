"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function school() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    async function del() {
      const del = await fetch("/api/erp/schools", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      const response = await del.json();
      const message = response.message;
      message === "succesfully deleted"
        ? router.push("/erp/details/schools")
        : null;
    }
    del();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <p>Deleting school ...</p>
    </div>
  );
}
