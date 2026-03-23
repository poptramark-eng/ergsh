import {NextResponse, NextRequest} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request:NextRequest){
const payload:{examId: number, studentId: number, score: number, subjectId: number}[]
= await request.json();


try{
    payload?.map(async (s)=>{
        const db =await prisma.results.createMany({data: s});
        
    });
    return NextResponse.json({message: "success"});
}catch(error){
    console.log(JSON.stringify(error));
    return NextResponse.json({message: "fail"});
}

}