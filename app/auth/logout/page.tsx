
"use client";
import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";

function Hty(){
const search= useSearchParams();
const id  = search.get("id");

if (id){
    
   confirm("Are you sure you want to logout?")&&handleClick();
}


 async function handleClick(){
  const response = await fetch("/api/auth/logout");
  const logout = await response.json()
  logout.message==="logout success"?(window.location.href="/auth/login"):(alert("logout error"));
}
return <p>waiting</p>;
}

export default function Logout(){




  
  



return(
<div>

  <Suspense fallback={<p>...logging out</p>}>
  <Hty />
    </Suspense>
        
</div>

);


}

