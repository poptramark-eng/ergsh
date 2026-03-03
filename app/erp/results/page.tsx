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
    alert(JSON.stringify(result));
  }
  useEffect(() => {
    async function relations() {
      const school = await fetch("/api/erp/schools");
      const school_array = await school.json();
      setSchools(school_array.school);
      const students = await fetch("/api/erp/students");
      const students_array = await students.json();
      setStudents(students_array.students);
      const subject = await fetch("/api/erp/subjects");
      const subject_array = await subject.json();
      setSubjects(subject_array.subjects);
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
      {/* School Select */}
      <div>
        <label
          htmlFor="school"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Select School
        </label>
        <select
          name="school"
          id="school"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          <option value="">-- Choose a school --</option>
          {schools &&
            schools.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="student"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Select student
        </label>
        <select
          name="studentId"
          id="studentId"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          <option value="">-- Choose a student --</option>
          {students &&
            students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="exam"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Select exam
        </label>
        <select
          name="examId"
          id="examId"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          <option value="">-- Choose a exam --</option>
          {exams &&
            exams.map((s) => (
              <option key={s.id} value={s.id}>
                {s.exam}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Select subject
        </label>
        <select
          name="subjectId"
          id="subjectId"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          <option value="">-- Choose a subject --</option>
          {subjects &&
            subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="score"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          score
        </label>
        <input
          type="number"
          min={0}
          max={100}
          id="score"
          name="score"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        />
      </div>

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
