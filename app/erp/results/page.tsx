'use client';

import { useEffect, useState } from "react";
import Template  from "@/app/components/xlsx/students_template/page";
import Upload from "@/app/components/xlsx/results_upload/page";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertAction,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



export default function Newresults(){
const [students, setStudents]=useState<{name: string, id: string, grade: string}[]>();
const [exam, setExam]= useState<string>();
const[grade, setGrade]=useState<string>();
const [student, setStudent]=useState<string>();
const [subjects, setSubjects]=useState<{name:string, id: string}[]>();
const [exams, setExams]=useState<{id: string, exam: string}[]>();

const [error, setError]=useState(false);
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
    response.message==="success"?success():setError(true);

    function success(){
      alert("success");
window.location.href="/erp/details/results";
    }

};

return (<Card className="max-w-md w-full mx-auto p-1 bg-gray-600/10 my-2">
  
 <CardHeader>
  <CardTitle><h2 className="p-2 font-sans font-bold text-lg text-green-800/100">Add results for one student</h2></CardTitle>
 </CardHeader>
 <CardContent>

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Subject</TableHead>
                <TableHead >Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((sub) => (
                <TableRow key={sub.id} >
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>
                    <Input
                              id={sub.name}
                      name={sub.name}
                      type="number"
                      defaultValue={0}
                      min={0}
                      max={100}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )}

    {/* Submit */}
    <div>
     
      <Button asChild
      aria-label="Submit"
      variant="outline"
      className="w-fit"
    >
       <input
        type="submit"
        value="submit"
        className=""
      />
    </Button>

    {error&&(<Alert  className="max-w-md" variant={"destructive"}>
      <AlertTitle>
        Submission error
      </AlertTitle>
      <AlertDescription>
        An unknown erro has occured. Wait as we resolve the issue
      </AlertDescription>
      <AlertAction>
        <Button variant="outline">
          <a href={window.location.href}>Refresh</a>
        </Button>
      </AlertAction>
    </Alert>)}
    </div>
  </form>

   
  <Card className="my-2">
    
    <CardHeader>
      <CardTitle>
        <h2>Upload results</h2>
      </CardTitle>
      <CardDescription>
        <p>Upload Results here</p>
      </CardDescription>
    </CardHeader>
  <CardContent><Upload  /></CardContent>
  
  </Card>
  <Card className="my-2">
    
    <CardHeader>
      <CardTitle>
        <h1>Template</h1>
      </CardTitle>
      <CardDescription>
        <p>Download template for exam results upload</p>
      </CardDescription>
    </CardHeader>
  <CardContent><Template /></CardContent>
  
  </Card>
 </CardContent>
 
  

  
</Card>

);

}