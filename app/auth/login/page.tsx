"use client"

import Link from "next/link";
import {useRouter, useParams, useSearchParams} from "next/navigation";

export default function Reg(){
const router = useRouter();


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
   const formData = new FormData(event.currentTarget);
   
     
      const password = formData.get("password") as string;
     const email = formData.get('email') as string;
     
    const response = await fetch("/api/auth/login", {
        body: JSON.stringify({ password, email}),
        method: "POST",
    });
    const results = await response.json();
    results.message==="success"?(window.location.href='/'):alert(` ${results.message}`);
    
    
  }
  



return(
<div>
    <form onSubmit={handleSubmit}>
    
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
        <label htmlFor="password">password</label>
        <input 
        type="password"
        id="password"
        name="password"
        required
         />
    </div>
        
<div>
    <input type="submit" value="login" />
</div>
    </form>
        <div>
      <Link href="/auth/reg">Create Account</Link>
    </div>
</div>

);


}
