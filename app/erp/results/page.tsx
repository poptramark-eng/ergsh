"use client";

import { useEffect, useState } from "react";

export default function Newresults() {
  const [students, setStudents] = useState<{ name: string; id: string; grade: string }[]>();
  const [exam, setExam] = useState<string>();
  const [grade, setGrade] = useState<string>();
  const [student, setStudent] = useState<string>();
  const [subjects, setSubjects] = useState<{ name: string; id: string }[]>();
  const [exams, setExams] = useState<{ id: string; exam: string }[]>();
  const options = [
    "Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6",
    "Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"
  ];

  useEffect(() => {
    async function relations() {
      const students = await fetch("/api/erp/students");
      const students_array = await students.json();
      let graded;
      grade
        ? (graded = students_array.students.filter(
            (s: { name: string; id: string; grade: string }) => s.grade === `${grade}`
          ))
        : "";
      graded ? setStudents(graded) : "";

      const subject = await fetch("/api/erp/subjects");
      const subject_array = await subject.json();
      setSubjects(subject_array.subjects);

      const exams = await fetch("/api/erp/exams");
      const exams_array = await exams.json();
      setExams(exams_array.exams);
    }
    relations();
  }, [grade]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    let scores;
    subjects
      ? (scores = subjects.map((s) => {
          return {
            examId: Number(form.get("examId")),
            studentId: Number(form.get("studentId")),
            subjectId: Number(s.id),
            score: Number(form.get(s.name)),
          };
        }))
      : "";
    const request = await fetch("/api/erp/results/test", {
      method: "POST",
      body: JSON.stringify({ scores: scores }),
    });
    const response = await request.json();
    response.message === "success"
      ? (window.location.href = "/erp/details/results")
      : alert(`${response.message}`);
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        
        <div className="flex flex-col">
          <label htmlFor="grade" className="mb-2 font-medium text-gray-700">Grade</label>
          <select
            onChange={(e) => setGrade(e.target.value)}
            value={grade ? grade : ""}
            name="grade"
            id="grade"
            className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          >
            {options.map((grade, index) => (
              <option value={grade} key={index}>{grade}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="studentId" className="mb-2 font-medium text-gray-700">Student</label>
          <select
            onChange={(e) => setStudent(e.target.value)}
            value={student ? student : ""}
            name="studentId"
            id="studentId"
            className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          >
            {students
              ? students.map((s, index: any) => (
                  <option value={s.id} key={index}>{s.name}</option>
                ))
              : ""}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="examId" className="mb-2 font-medium text-gray-700">Exam</label>
          <select
            onChange={(e) => setExam(e.target.value)}
            value={exam ? exam : ""}
            name="examId"
            id="examId"
            className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          >
            {exams
              ? exams.map((s, index: any) => (
                  <option value={s.id} key={index}>{s.exam}</option>
                ))
              : ""}
          </select>
        </div>

        {subjects && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Subject</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700 border-b">Score</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{sub.name}</td>
                    <td className="px-4 py-2 border-b">
                      <input
                        id={sub.name}
                        name={sub.name}
                        type="number"
                        min={0}
                        max={100}
                        className="w-24 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div>
          <input
            type="submit"
            value="Add Result"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          />
        </div>
      </form>
    </section>
  );
}
