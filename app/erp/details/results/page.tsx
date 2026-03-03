"use client";
import { useState, useEffect } from "react";

export default function Result() {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<
    [
      {
        id: string;
        name: string;
        email: string;
        phone: string;
        motto: string;
        vision: string;
      }
    ]
  >();
  const [students, setStudents] = useState<
    [
      {
        id: string;
        name: string;
        gender: string;
        dob: string;
        schoolId: string;
        grade: string;
      }
    ]
  >();
  const [subjects, setSubjects] = useState<
    [
      {
        id: string;
        name: string;
      }
    ]
  >();
  const [exams, setExams] = useState<
    [
      {
        id: string;
        exam: string;
        term: string;
        year: string;
      }
    ]
  >();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = {
      examId: form.get("examId"),
      studentId: form.get("studentId"),
      subjectId: form.get("subjectId"),
      score: form.get("score"),
    };
  }
  useEffect(() => {
    async function relations() {
      const school = await fetch("/api/erp/schools");
      const school_array = await school.json();
      setSchools(school_array.school);
      const students = await fetch("/api/erp/students");
      const students_array = await students.json();
      setStudents(students_array.student);
      const subject = await fetch("/api/erp/subjects");
      const subject_array = await subject.json();
      setSubjects(subject_array.subject);
      const exams = await fetch("/api/erp/exams");
      const exams_array = await exams.json();
      setExams(exams_array.exams);
    }
    relations();
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <select name="" id="">
        {}
      </select>
      <select name="" id="">
        {}
      </select>
      <select name="" id="">
        {}
      </select>
      <button
        type="submit"
        disabled={loading}
        className={`w-full font-semibold py-3 px-4 rounded-lg transition ${
          loading
            ? "bg-gray-400 text-gray-100 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
