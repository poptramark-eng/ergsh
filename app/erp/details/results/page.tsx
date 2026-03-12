'use client';
import {useState, useEffect} from "react";
import Link from "next/link";
import * as EX from "xlsx";



export default function Filter() {
  const [url, setUrl]=useState<any>();
  const [pop, setPop]=useState<any>();

const [exams, setExams]=useState<string[]>();
const [exam , setExam]= useState<string>();
const [results , setResults]= useState<{ id: string, 
        studentId: string,
         subjectId: string, 
         examId: string, 
         score: string,
        student: {
            name: string, 
            id: string,
            grade: string,
        }, 
        subject: {
            name: string
        }, 
        exam: {
            exam: string,
            term: string,
            year: string,
            
        }}[]>();

        const [fresults , setFresults]= useState<any[]>();

const terms=["Term 1", "Term 2", "Term 3"];
const grades= ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];

const [grade, setGrade]=useState<string>();
const [term, setTerm]=useState<string>();

const [year, setYear]=useState<string>();
const [years, setYears]=useState<string[]>();

const [cols, setCols]=useState<string[]>();



  


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


useEffect(()=>
{
    if(year&&term&&exam&&grade){
   const flt = results?(results.filter((e)=> {
    const yr = new Date (e.exam.year).toLocaleDateString("en-gb", {year: "numeric"});
   return e.exam.term===term&&e.exam.exam===exam&&yr===year&&e.student.grade==grade})):[];

        
      
    const flattened = flt.reduce((acc:any, curr)=>{
                      const {score, student, exam, subject, studentId}=curr;
                      let marks = Number(score);
                      if(!acc[studentId]){
                      acc[studentId]={
                      name: student.name,
                      id: studentId,
                      grade: student.grade,
                      subjects: [],
                      exams: [],
                      }
                          }
                      //acc[studentId].scores.push([{[subject.name]: score}]);
                      acc[studentId][subject.name]=marks;
                      acc[studentId].subjects.push(subject.name);
                      acc[studentId].exams.push(exam.exam);

                      return acc;

                      }, {});
        //end of reduce1
        
        const subjs =[...new Set( Object.values(flattened).flatMap((e: any)=> e.subjects))];
        const cleaned = Object.values(flattened);
        const sorted = cleaned.sort((a: any,b: any)=>Number(b.total)-Number(a.total));
        setCols(subjs);
        setFresults(sorted);
        
        }
}, [grade]);

//pop-docs

useEffect(()=>{
      if(year&&term&&exam&&grade){
      const flt = results?(results.filter((e)=> {
      const yr = new Date (e.exam.year).toLocaleDateString("en-gb", {year: "numeric"});
      return e.exam.term===term&&e.exam.exam===exam&&yr===year&&e.student.grade==grade})):[];       
        
    const flattened = flt.reduce((acc:any, curr)=>{
                      const {score, student, exam, subject, studentId}=curr;
                      if(!acc[studentId]){
                      acc[studentId]={
                      name: student.name,
                      id: studentId,
                      grade: student.grade,
                          }
                      }

                      acc[studentId][subject.name]=Number(score);

                      return acc;

                       }, {});
        //end of reduce2
        const cleaned = Object.values(flattened); //getting object values
        setPop(cleaned);
        alert(JSON.stringify(cleaned));
        //excel workbook of filtered results by user
        const sheet = EX.utils.json_to_sheet(cleaned);
        const workbook = EX.utils.book_new();
        EX.utils.book_append_sheet(workbook,sheet, "students" );
        const excelBuffer = EX.write(workbook, {type: "array", bookType:"xlsx"});
        const blob = new Blob([excelBuffer], {type:  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",});
        const url = URL.createObjectURL(blob);
        setUrl(url);
        
        
        }
}, [fresults]);

//results fetching from database
useEffect(()=>{
        async function Results(){      
        const request = await fetch("/api/erp/results"/*, {body : JSON.stringify(filters),method:"GET"}*/ );
        const response= await request.json();
        const resultsx = response.results;
        setResults(resultsx);       
    }
        Results();
},[]);








  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      {/* Dropdowns */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          onChange={e => setYear(e.target.value)}
          value={year ?? ""}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--select year--</option>
          {years && years.map((s, index) => (
            <option value={s} key={index}>{s}</option>
          ))}
        </select>

        {year && (
          <select
            onChange={e => setTerm(e.target.value)}
            value={term ?? ""}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--select Term--</option>
            {terms.map((s, index) => (
              <option value={s} key={index}>{s}</option>
            ))}
          </select>
        )}

        {term && (
          <select
            onChange={e => setExam(e.target.value)}
            value={exam ?? ""}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--select Exam--</option>
            {exams && exams.map((s, index) => (
              <option value={s} key={index}>{s}</option>
            ))}
          </select>
        )}

        {exam && (
          <select
            onChange={e => setGrade(e.target.value)}
            value={grade ?? ""}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--select Grade--</option>
            {grades.map((s, index) => (
              <option value={s} key={index}>{s}</option>
            ))}
          </select>
        )}
      </div>

      {/* Results table */}
      <div className="overflow-x-auto">
         <Link
          href="/erp/results"
          className="text-1f1f1f px-4 py-2 rounded-lg font-semibold hover:bg-black-700 transition"
        >
          ➕ Add result
        </Link>
        {fresults && (
          <div>
          
          <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">ADM</th>
                <th className="px-4 py-2 text-left font-semibold">Name</th>
                

                {cols && cols.map((s, index) => (
                  <th key={index} className="px-4 py-2 text-left font-semibold">{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cols && fresults && fresults.map((s, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{s.id}</td>
                  <td className="px-4 py-2">{s.name}</td>
                  {cols && cols.map((x, i) => (
                    <td key={i} className="px-4 py-2">{s[x]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {fresults&&url&&<Link href={url}>Download results </Link>}
          </div>
          
        )}
      </div>
      
    </div>
  );
}



