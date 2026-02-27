"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

export default function Delete() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  const [message, setMessage] = useState<any>();
  useEffect(() => {
    async function request() {
      const res = await fetch("/api/register/delete", {
        method: "DELETE",
        body: JSON.stringify({ id: slug }),
      });
      const re = await res.json();
      re.message === "successfully"
        ? router.push("/users")
        : setMessage(re.message);
    }
    request();
  }, []);
  return (
    <div>
      {message ? <h1>{(message + slug) as string}</h1> : "deleting...."}
    </div>
  );
}
