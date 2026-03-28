import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

    const { amount, email} = await request.json();

    const res = await fetch("https://api.paystack.co/transaction/initialize",{
        headers:{
            Authorization:`Bearer ${process.env.PAYSTACK}`,
            "Content-Type":"application/json",
        },
        body:JSON.stringify({amount:Number(amount)*100,email:email,callback_url:`${new URL("/",request.url)}`}),
        method: "POST",

    });
    const url:{data: {authorization_url: string}} = await res.json();
    console.log(url);
    
    return NextResponse.json({url});
}