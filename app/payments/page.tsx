'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Pay(){
async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const req = await fetch("/api/paystack", {method:"POST",body:JSON.stringify({
        email: form.get("email") as string,
        amount: form.get("amount") as string,
    })});
    const test:{url: {data:{authorization_url:string}}}=await req.json();
    window.location.href=`${test.url.data.authorization_url}`;
    


}
return (
       <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video " />
      <img
        src="https://llywftzbmhpxnsewxdxf.supabase.co/storage/v1/object/public/Data%20center/xinying-lin-QvFzcFwLjYo-unsplash.jpg"
        alt="Event cover"
        className="relative aspect-video w-full object-cover"
      />
     
    <CardHeader>  
        <CardTitle>Donate</CardTitle>
         <CardDescription>
          Feel free to send me something
        </CardDescription>
        </CardHeader>
    <CardContent>
        <div className="">
   
<form className=" " onSubmit={handleSubmit}>
    <div className="">
        <label htmlFor="email">Email</label>
        <input className="outline-1  p-4 m-6 bg-white" type="email" required id="email" name="email" />
    </div>
    <div>
        <label htmlFor="amount">Amount</label>
        <input type="number" required name="amount" id="amount"  className="outline-1 bg-white p-4 m-6"/>
    </div>
    
     <CardAction>
          <Button variant="link"><input className="bg-black text-white rounded-lg m-4 p-4" type="submit" value={`Donate`} /></Button>
        </CardAction>
</form>
</div>
        </CardContent>
         <CardFooter>
    <p>Thank you for your contribution</p>
  </CardFooter>
</Card>);
}