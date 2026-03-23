"use client";

import { useState,useEffect } from "react";
import * as XLSX from "xlsx";

export default function Upload(){

    const [exams, setExams]=useState<{id:string, exam:string}[]>();
    useEffect(()=>{
    async function exams(){
    const request = await fetch("/api/erp/exams");
    const response :{exams: {id: string, exam: string}[]}= await request.json();
    const {exams}=response;
    setExams(exams);
        }
    exams();
    },[]);

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const file = form.get("file") as File;
    const exam =form.get("exam") as string;
    if(!file) return;
    const reader = new FileReader();
    reader.onload= (event: ProgressEvent<FileReader>)=>{
        const arrayBuffer=event.target?.result;
        if(!(arrayBuffer instanceof ArrayBuffer)) return;
        const workbook = XLSX.read(arrayBuffer, {type: "array"});
        const sheetName =workbook.SheetNames[0];
        const sheet =workbook.Sheets[sheetName];
        const json: {}[] =XLSX.utils.sheet_to_json(sheet);
        clean(json,exam);

        
    };
    reader.readAsArrayBuffer(file);

    
}
async function clean(json: any,exam: string){
    const request = await fetch("/api/erp/subjects");
    const response :{subjects: {id: string, name: string}[]}= await request.json();
    const {subjects}=response;
    const scoresx = json?.map((s: any)=>{
            const score = subjects?.map((subj)=>{
                return {subjectId: Number(subj.id), studentId:Number(s.ADM), examId:Number(exam),score: Number(s[subj.name]) }
            });
            return score;
                    
        });
       const mass_data =await fetch("/api/erp/resultsm", {
            method: "POST",
            body: JSON.stringify(scoresx),
        });
        const resp = await mass_data.json();
        resp.message ==="success"?window.location.href="/erp/details/results":alert(resp.message);
        //setScores(scoresx);
         
}


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="exam" id="exam">
                    {exams&&exams.map((s,index)=><option key={index} value={s.id}>{s.exam}</option>)}
                </select>

                <div>
                    
                    <label htmlFor="file"></label>
                    <input required name="file" id="file" type="file" />
                </div>
                <div>
                    <input type="submit" value="upload" />
                </div>
            </form>
        
        </div>
    );
}
/*     subjectId: number,
        studentId: number,
        examId: number,
        score: number};*/