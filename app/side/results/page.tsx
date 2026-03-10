'use client';

import { useEffect, useState } from "react";


export default function Newresults(){
const [students, setStudents]=useState<{name: string, id: string, grade: string}[]>();
const [exam, setExam]= useState<string>();
const[grade, setGrade]=useState<string>();
const [student, setStudent]=useState<string>();
const [subjects, setSubjects]=useState<{name:string, id: string}[]>();
const [exams, setExams]=useState<{id: string, exam: string}[]>();
const options = ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11", "Grade 12"];

useEffect(()=>{
 async function relations() {
      
      const students = await fetch("/api/erp/students");
      const students_array = await students.json();
      let graded;
      grade?(graded = students_array.students.filter((s:{name: string, id: string, grade: string})=> s.grade===`${grade}`)):("");
      graded?setStudents(graded):("");
       
      
      const subject = await fetch("/api/erp/subjects");
      const subject_array = await subject.json();
      setSubjects(subject_array.subjects);
      const exams = await fetch("/api/erp/exams");
      const exams_array = await exams.json();

      setExams(exams_array.exams);
    }
    relations();
 


},[grade]);

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    let scores;
    subjects?(scores=subjects.map((s)=>{
        return{ 
      examId: Number(form.get("examId")),
      studentId: Number(form.get("studentId")),
      subjectId: Number(s.id),
      score: Number(form.get(s.name)),}
    })):"";
    const results = {
      
      scores

    };
    const request = await fetch("/api/erp/results/test", {method: "POST", body:JSON.stringify({scores: scores})});
    const response= await request.json();
    response.message==="success"?window.location.href="/erp/details/results":alert(`${response.message}`);

    

};

return (<section>
<form onSubmit={handleSubmit}>
<div>
    <label htmlFor="grade">Grade</label>
<select onChange={e=>setGrade(e.target.value)} value={grade?grade:""} name="grade" id="grade">
            {options.map((grade, index)=>(<option value={grade} key={index}>{grade}</option>))}
        </select>
</div>
<div>
    <label htmlFor="studentId">Student</label>
     <select onChange={e=>setStudent(e.target.value)} value={student?student:""}  name="studentId" id="studentId">
{students?(students.map((s,index: any)=>(<option value={s.id} key={index}>{s.name}</option>))):""}
    </select>

</div>

<div>
    <label htmlFor="examId">Exam</label>
 <select onChange={e=>setExam(e.target.value)} value={exam?exam:""} name="examId" id="examId">
        {exams?(exams.map((s,index: any)=>(<option value={s.id} key={index}>{s.exam}</option>))):""}
    </select>
</div>

{subjects&&subjects.map((sub, index)=>(<div key={sub.id}>
<label htmlFor={sub.name}>{sub.name}</label>
<br />
<input style={{border:"1px solid black"}} id={sub.name} name={sub.name} type="number"  min={0} max={100}/>
</div>))}







<div>
    <input type="submit" value="add result" />
</div>





</form>



</section>);

}