"use client"
import Link from "next/link";
import {useRouter, useParams, useSearchParams} from "next/navigation";
import  {  useEffect, useState } from "react";


export default function Reg(){
const router = useRouter();

 const [school, setSchool] = useState<
    {
      id: string;
      name: string;
      email: string;
      phone: string;
      motto: string;
      vision: string;
    }[]
  >([]);
useEffect(() => {
    async function fetchSchools() {
      const schid = await fetch("/api/erp/schools");
      const data = await schid.json();
      setSchool(data.school);
    }
    fetchSchools();
  }, []);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
   const formData = new FormData(event.currentTarget);
   const name = formData.get('name') as string;
     const id = formData.get('id');
     const role = formData.get('role') as string;
      const password = formData.get("password") as string;
     const email = formData.get('email') as string;
      const schoolId = formData.get('schoolId');
    const response = await fetch("/api/auth", {
        body: JSON.stringify({name, id , role, password, email, schoolId}),
        method: "POST",
    });
    const results = await response.json();
    results.message==="success"?router.push("/auth/login"):alert("Registered > Proceed to login");
    
    
  }
  



return(
<div>
    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="name">name</label>
        <input 
        type="text"
        id="name"
        name="name"
        required
         />
    </div>
    <div>
        <label htmlFor="email">email</label>
        <input 
        type="email"
        id="email"
        name="email"
        required
         />
    </div>
    <div>
        <label htmlFor="text">role</label>
        <input 
        type="role"
        id="role"
        name="role"
        defaultValue={"user"}

        readOnly
         />
    </div>
    <div>
        <label htmlFor="password">password</label>
        <input 
        type="password"
        id="password"
        name="password"
        required
         />
    </div>
        <div>
          <label
            htmlFor="school"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Select School
          </label>
          <select
            name="schoolId"
            id="schoolId"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          >
            
            {school&&school.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
<div>
    <input type="submit" value="register" />
</div>
    </form>
    <div>
      <Link href="/auth/login">Already registered. Login here</Link>
    </div>
</div>

);


}
/* name: name as string,
        email: email as string,
        schoolId: Number(schoolId),
        password: password,
        role: role,
    }})*/