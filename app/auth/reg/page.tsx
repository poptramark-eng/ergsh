"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
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
        <label htmlFor="role">role</label>
        <input 
        type="text"
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
           
          >
            Select School
          </label>
          <select
            name="schoolId"
            id="schoolId"
            required
           
          >
            
            {school.map((s) => (
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