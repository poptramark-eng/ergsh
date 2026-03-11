'use client';
import {useState, useEffect} from "react";



export default function Filter() {

const [exams, setExams]=useState<string[]>();
const [exam , setExam]= useState<string>();
const [results , setResults]= useState<{ id: string, 
        studentId: string,
         subjectId: string, 
         examId: string, 
         score: string,
        student: {
            name: string, 
            id: string
        }, 
        subject: {
            name: string
        }, 
        exam: {
            exam: string,
            term: string,
            year: string,
            
        }}[]>();

const terms=["Term 1", "Term 2", "Term 3"];
const [term, setTerm]=useState<string>();

const [year, setYear]=useState<string>();
const [years, setYears]=useState<string[]>();



  


useEffect(()=>{
    async function filter(){
const exam_req= await fetch("/api/erp/exams");
const exam_res: {exams: {exam: string, term: string, year: string}[]}=await exam_req.json();
const {exams} = exam_res;
const exam = [...new Set(exams.flatMap(s=>s.exam))];

const years = [...new Set(exams.flatMap(s=> new Date(s.year).toLocaleDateString("en-us", {year: "numeric"})))];
setYears(years);
setExams(exam);

    }
    filter();

},[]);
useEffect(()=>{
    async function Results(){
        
       

       
          if(year&&term&&exam){
             const request = await fetch("/api/erp/results/test"/*, {body : JSON.stringify(filters),method:"GET"}*/ );

        const response:{results: {id: string, 
        studentId: string,
         subjectId: string, 
         examId: string, 
         score: string,
        student: {
            name: string, 
            id: string
        }, 
        subject: {
            name: string
        }, 
        exam: {
            exam: string,
            term: string,
            year: string,
            
        }}[]} = await request.json();
            if(results){
            const flt = results.filter(e=> e.exam.term===term&&e.exam.exam===exam);
            alert(JSON.stringify(flt));
            setResults(flt);
            }

}
       
    }
    Results();

},[exam]);


useEffect(()=>{


},[ exam]);
 






return (<div>
    
    <select onChange={e=> setYear(e.target.value)}  value={year??new Date().toLocaleDateString()} name="exam" id="exam">
        <option value="">--select year--</option>
    {years&&years.map((s,index)=><option value={s} key={index}>{s}</option>)}
    
</select>
    {(year)&&<select onChange={e=> setTerm(e.target.value)} value={term??"No terms"} name="exam" id="exam">
         <option value="">--select Term--</option>
    {terms&&terms.map((s,index)=><option value={s} key={index}>{s}</option>)}
</select>}
{(term&&year)&&<select onChange={e=> setExam(e.target.value)} name="exam" value={exam??"No exams available"} id="exam">
     <option value="">--select Exam--</option>
    {exams&&exams.map((s,index)=><option value={s} key={index}>{s}</option>)}
</select>}

{results&&JSON.stringify(results)}
</div>);

}