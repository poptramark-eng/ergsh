"use client";

import { useEffect, useState } from "react";




export default function Test(){
const [columns, setColumns] = useState<string[]>();
    const [results, setResults]= useState<{id: string,name: string,exam: string, total: number, avg: number,subjects:{score: number, name: string}[] }[]>([]);
    useEffect(()=>{
        async function data(){
const request = await fetch("/api/erp/results");
const response = await request.json();

const clean = response.results.reduce(function(acc:{[key: string]: {id: string,name: string,exam: string, total: number, avg: number,subjects:{}[] }}, curr:{score: string, subject:{name: string}, exam:{exam: string}, student:{name: string, id: string}, id: string}){
    const score = curr.score as string;
    
    const subject = curr.subject;
    const exam = curr.exam;
    const student = curr.student;
    const id = student.id;
if(!acc[id]){

    acc[id]={
    id : student.id,
    name:student.name,
    exam: exam.exam,
    total:0,
    avg:0,
    
    subjects:[],}
    
   
    
    
}


acc[id].total=acc[id].total+Number(score);

acc[id].subjects.push({ score, name:[subject.name]});
acc[id].avg=Number((acc[id].total/acc[id].subjects.length).toFixed(4)); 

return acc;
},{});
const flattened :{id: string,name: string,exam: string, total: number, avg: number,subjects:{score: number, name: string}[] }[]= Object.values(clean);

      setResults(flattened);
      const sub = flattened.flatMap((s)=>s.subjects);
      const moo = sub.flatMap(s=>s.name);
      const nom = [...new Set(moo)];
      setColumns(nom);
      
        }
        data();
    },[])

    return(<div>
        
        <table>
           
            <thead>
                <tr>
                    <th>ADM</th>
                    <th>Name</th>
                    <th>Exam</th>
                    <th>Average</th>
                    <th>Total</th>
                    {columns&&columns.map((col, index)=>(<th key={index}>{col}</th>))}
                    
                </tr>
            </thead>
           <tbody>
            {results&&results.map((result: {id: string,name: string,exam: string, total: number, avg: number,subjects:{score: number, name: string}[]})=>(<tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.name}</td>
                <td>{result.exam}</td>
                <td>{result.avg}</td>
                <td>{result.total}</td>
                {result.subjects.map((subject: {name: string, score: number})=>(<td key={subject.name}>{subject.score}</td>))}
                
                </tr>))}
           </tbody>
        </table>

           
    </div>);
}
