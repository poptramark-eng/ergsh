'use client';
import { useEffect, useState } from "react";

export default function Test() {
    const [table, setTable] = useState<any[]>([]);

    useEffect(() => {
        async function results() {
            const results = await fetch("/api/erp/results/test");
            const response = await results.json();
            const arr = response.results;

            const tableDataObj = arr.reduce((acc: any, curr: {
                score: number,
                student: { id: string, name: string, school: { name: string } },
                exam: { exam: string, term: string },
                subject: { name: string }
            }) => {
                const { score, student, exam, subject } = curr;

                if (!acc[student.id]) {
                    acc[student.id] = {
                        id: student.id,
                        name: student.name,
                        school: student.school.name,
                        exam: exam.exam,
                        term: exam.term,
                        mathematics: 0,
                        english: 0,
                        science: 0,
                        kiswahili: 0,
                        cre: 0,
                        art: 0,
                        total: 0,
                        mean: 0,
                        subjectCount: 0,
                    };
                }

                const subjectKey = subject.name.toLowerCase();
                acc[student.id][subjectKey] = Number(score);
                acc[student.id].total += Number(score);
                acc[student.id].subjectCount += 1;

                // mean based on subjects present
                acc[student.id].mean = acc[student.id].total / acc[student.id].subjectCount;

                return acc;
            }, {});

            const tableD = Object.values(tableDataObj);
            setTable(tableD);
        }
        results();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Exam Results</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">School</th>
                            <th className="px-4 py-2 text-left">Exam</th>
                            <th className="px-4 py-2 text-left">Term</th>
                            <th className="px-4 py-2 text-center">Mathematics</th>
                            <th className="px-4 py-2 text-center">English</th>
                            <th className="px-4 py-2 text-center">Science</th>
                            <th className="px-4 py-2 text-center">Kiswahili</th>
                            <th className="px-4 py-2 text-center">CRE</th>
                            <th className="px-4 py-2 text-center">Art</th>
                            <th className="px-4 py-2 text-center">Total</th>
                            <th className="px-4 py-2 text-center">Mean</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row: any, idx: number) => (
                            <tr
                                key={row.id}
                                className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                            >
                                <td className="px-4 py-2">{row.name}</td>
                                <td className="px-4 py-2">{row.school}</td>
                                <td className="px-4 py-2">{row.exam}</td>
                                <td className="px-4 py-2">{row.term}</td>
                                <td className="px-4 py-2 text-center">{row.mathematics}</td>
                                <td className="px-4 py-2 text-center">{row.english}</td>
                                <td className="px-4 py-2 text-center">{row.science}</td>
                                <td className="px-4 py-2 text-center">{row.kiswahili}</td>
                                <td className="px-4 py-2 text-center">{row.cre}</td>
                                <td className="px-4 py-2 text-center">{row.art}</td>
                                <td className="px-4 py-2 text-center font-bold text-blue-700">
                                    {row.total}
                                </td>
                                <td className="px-4 py-2 text-center font-bold text-green-700">
                                    {row.mean.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
