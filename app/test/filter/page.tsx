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

        const [fresults , setFresults]= useState<{ id: string, 
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

const terms=["Term 1", "Term 2", "Term 3"];
const grades= ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];

const [grade, setGrade]=useState<string>();
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
    if(year&&term&&exam&&grade){
   const flt = results?(results.filter((e)=> {
    const yr = new Date (e.exam.year).toLocaleDateString("en-gb", {year: "numeric"});
   return e.exam.term===term&&e.exam.exam===exam&&yr===year&&e.student.grade==grade})):[];
   setFresults(flt);
          // alert(JSON.stringify(flt));
        
        
const flattened = flt.reduce((acc:any, curr)=>{
const {score, student, exam, subject, studentId}=curr;
if(!acc[studentId]){
    acc[studentId]={
name: student.name,
score: score,
id: studentId,
grade: student.grade,
subjects: [],
exams: [],
total: 0,
avg: 0,
count: 0,
    }
}
//acc[studentId].scores.push([{[subject.name]: score}]);
acc[studentId][subject.name]=score;
acc[studentId].total += score;
acc[studentId].count+=1;
acc[student.id].avg=acc[studentId].total/acc[studentId].count;
acc[student.id].subjects.push(subject.name);
acc[student.id].exams.push(exam.exam);

return acc;

        }, {});
        //end of reduce
        
        
        alert(JSON.stringify(Object.values(flattened)));
        }
}, [grade]);



useEffect(()=>{
    async function Results(){
        
       

       
          
             const request = await fetch("/api/erp/results/test"/*, {body : JSON.stringify(filters),method:"GET"}*/ );

const response= await request.json();

 const resultsx = response.results;
            setResults(resultsx);
        
            
            


       
    }
    Results();

},[]);


useEffect(()=>{


},[ exam]);
 






return (<div>
    
    <select onChange={e=> setYear(e.target.value)}  value={year??new Date().toLocaleDateString()} name="exam" id="exam">
        <option value="">--select year--</option>
    {years&&years.map((s,index)=><option value={s} key={index}>{s}</option>)}
    
    
</select>
    {(year)&&<select onChange={e=> setTerm(e.target.value)} value={term??"No terms"} name="exam" id="exam">
         <option value="">--select Term--</option>
    {terms.map((s,index)=><option value={s} key={index}>{s}</option>)}
</select>}


{(term)&&<select onChange={e=> setExam(e.target.value)} name="exam" value={exam??"No exams available"} id="exam">
     <option value="">--select Exam--</option>
    {exams&&exams.map((s,index)=><option value={s} key={index}>{s}</option>)}
</select>}


 {(exam)&&<select onBlur={e=>setGrade("")} onChange={e=> setGrade(e.target.value)} value={grade??"No terms"} name="exam" id="exam">
         <option value="">--select Grade--</option>
    {grades.map((s,index)=><option value={s} key={index}>{s}</option>)}
</select>}



{fresults&&(JSON.stringify(fresults))}

</div>);

}
