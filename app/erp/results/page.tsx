'use client';

import { useEffect, useState } from "react";
import Template  from "@/app/components/xlsx/students_template/page";
import Upload from "@/app/components/xlsx/results_upload/page";


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
    
    const request = await fetch("/api/erp/results", {method: "POST", body:JSON.stringify({scores: scores})});
    const response= await request.json();
    response.message==="success"?window.location.href="/erp/details/results":alert(`${response.message}`);

    

};

return (<section className="p-6 bg-gray-50 rounded-lg shadow-md">
  
  <div  className="m-6 bg-gray-200 p-6 shadow-xl">
    <h1 className="font-bold">Download upload template</h1>
  <Template />
  </div>
  
 <div className="m-6 bg-gray-200 p-6 shadow-xl">
   <h2 className="font-bold">Upload results</h2>
  <Upload  />
 </div>
  

  <form onSubmit={handleSubmit} className="space-y-6">
    
    <div>
      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
        Grade
      </label>
      <select
        onChange={e => setGrade(e.target.value)}
        value={grade ? grade : ""}
        name="grade"
        id="grade"
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((grade, index) => (
          <option value={grade} key={index}>{grade}</option>
        ))}
      </select>
    </div>

    {/* Student */}
    <div>
      <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
        Student
      </label>
      <select
        onChange={e => setStudent(e.target.value)}
        value={student ? student : ""}
        name="studentId"
        id="studentId"
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {students ? students.map((s, index: any) => (
          <option value={s.id} key={index}>{s.name}</option>
        )) : ""}
      </select>
    </div>

    {/* Exam */}
    <div>
      <label htmlFor="examId" className="block text-sm font-medium text-gray-700 mb-1">
        Exam
      </label>
      <select
        onChange={e => setExam(e.target.value)}
        value={exam ? exam : ""}
        name="examId"
        id="examId"
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {exams ? exams.map((s, index: any) => (
          <option value={s.id} key={index}>{s.exam}</option>
        )) : ""}
      </select>
    </div>

    {/* Subjects Table */}
    {subjects && (
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Subjects</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Subject</th>
                <th className="px-4 py-2 text-left font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{sub.name}</td>
                  <td className="px-4 py-2">
                    <input
                      id={sub.name}
                      name={sub.name}
                      type="number"
                      min={0}
                      max={100}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* Submit */}
    <div>
      <input
        type="submit"
        value="Add Result"
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
    </div>
  </form>
</section>

);

}