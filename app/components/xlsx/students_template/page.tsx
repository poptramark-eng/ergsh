"use client";
import {useState,useEffect} from "react";
import * as XLSX from "xlsx";

export default function Template(){
const grades =["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];
const [students, setStudents] =useState<{id:string, name:string,grade:string}[]>();
const [data, setData] = useState<string[][]>();
const [subjects, setSubjects]=useState<string[]>();
const [grade, setGrade]= useState<string>();
//prefetching of students and subjects
useEffect(()=>{
async function details(grade: string){
    const students_request = await fetch("/api/erp/students");
    const std_response: {students: {id: string, name: string, grade: string}[]} = await students_request.json();
    const studs = (std_response.students).filter(s=>s.grade===grade);
    const studs2 = studs.map(s=>{return {id:s.id, name:s.name,grade:s.grade}});
    //alert(JSON.stringify(studs2));
    const stud3 = studs.map(s=>{return [s.id, s.name,s.grade]});
    //alert(JSON.stringify(stud3));
    setStudents(studs2);
    
    
    
    //fetching subjects
    const subjects_request = await fetch("/api/erp/subjects");
    const subjects_response : {subjects: {id: string, name: string}[]}= await subjects_request.json();
    const subs = subjects_response.subjects;
    const subs2 = [...new Set(subs.map(s=>s.name))];
    setSubjects(["ADM","Name","Grade",...subs2]);
    const data1 =[["ADM","Name","Grade",...subs2],...stud3];
    setData(data1);
  
    //alert(JSON.stringify(subjects));
    //alert(JSON.stringify([["ADM","Name","Grade",...subs2],...stud3]));
    
    
}
if(grade){
    details(grade);
}

},[grade]);
function upload(data: string[][]){
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet(data);
XLSX.utils.book_append_sheet(workbook, worksheet);
XLSX.writeFile(workbook, "students.xlsx");
}



    return(
        <div className="inline-block">

<select className="bg-white inline-block w-full tracking-tight text-[#1f1f1f] outline-none" name="grade" id="grade" onChange={(e)=>setGrade(e.target.value)}>
    <option value="">select grade</option>
    {grades.map((s,index)=><option key={index} value={s}>{s}</option>)}
</select>

<div>
    <section>
        
        {data&&<button className="rounded-lg p-2 text-md tracking-tight bg-black text-white text-center m-4" onClick={()=>{upload(data)}}>Download Template</button>}
    </section>
    
   {/* <table>
        <thead>
            <tr>
               
                {subjects&&subjects.map((s,index)=><th key={index}>{` ${s} `}</th>)}
            </tr>
        </thead>
        <tbody>
            <tr></tr>
            {students&&students.map((s,index)=>(<tr key={index}><td>{" "}{s.id}</td><td>{" "}{s.name}</td></tr>))}
            
        </tbody>
    </table>*/}
</div>

        </div>
    );
}