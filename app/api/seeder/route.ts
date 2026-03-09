/*import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.students.createMany({
    data: [
      { name: "Alice Johnson", gender: "Female", dob: new Date("2010-03-15"), schoolId: 1, grade: "Grade 5" },
      { name: "Brian Smith", gender: "Male", dob: new Date("2011-07-22"), schoolId: 1, grade: "Grade 4" },
      { name: "Catherine Lee", gender: "Female", dob: new Date("2009-11-05"), schoolId: 1, grade: "Grade 6" },
      { name: "David Kim", gender: "Male", dob: new Date("2010-01-30"), schoolId: 1, grade: "Grade 5" },
      { name: "Ella Brown", gender: "Female", dob: new Date("2012-09-12"), schoolId: 1, grade: "Grade 3" },
      { name: "Frank Wilson", gender: "Male", dob: new Date("2008-06-18"), schoolId: 1, grade: "Grade 7" },
      { name: "Grace Martinez", gender: "Female", dob: new Date("2011-02-25"), schoolId: 1, grade: "Grade 4" },
      { name: "Henry Davis", gender: "Male", dob: new Date("2009-12-10"), schoolId: 1, grade: "Grade 6" },
      { name: "Isabella Thomas", gender: "Female", dob: new Date("2010-08-08"), schoolId: 1, grade: "Grade 5" },
      { name: "Jack White", gender: "Male", dob: new Date("2012-04-14"), schoolId: 1, grade: "Grade 3" },
      { name: "Karen Harris", gender: "Female", dob: new Date("2008-10-20"), schoolId: 1, grade: "Grade 7" },
      { name: "Liam Clark", gender: "Male", dob: new Date("2011-05-03"), schoolId: 1, grade: "Grade 4" },
      { name: "Mia Lewis", gender: "Female", dob: new Date("2009-09-27"), schoolId: 1, grade: "Grade 6" },
      { name: "Noah Walker", gender: "Male", dob: new Date("2010-12-01"), schoolId: 1, grade: "Grade 5" },
      { name: "Olivia Hall", gender: "Female", dob: new Date("2012-07-19"), schoolId: 1, grade: "Grade 3" },
      { name: "Paul Allen", gender: "Male", dob: new Date("2008-02-11"), schoolId: 1, grade: "Grade 7" },
      { name: "Quinn Young", gender: "Female", dob: new Date("2011-11-23"), schoolId: 1, grade: "Grade 4" },
      { name: "Ryan King", gender: "Male", dob: new Date("2009-03-07"), schoolId: 1, grade: "Grade 6" },
      { name: "Sophia Scott", gender: "Female", dob: new Date("2010-06-29"), schoolId: 1, grade: "Grade 5" },
      { name: "Thomas Green", gender: "Male", dob: new Date("2012-01-16"), schoolId: 1, grade: "Grade 3" },
    ],
  });

  console.log("Inserted 20 students successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
*/
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET() {
 
 const students = await prisma.students.createMany({
    data: [
      { name: "Alice Johnson", gender: "Female", dob: new Date("2010-03-15"), schoolId: 1, grade: "Grade 5" },
      { name: "Brian Smith", gender: "Male", dob: new Date("2011-07-22"), schoolId: 1, grade: "Grade 4" },
      { name: "Catherine Lee", gender: "Female", dob: new Date("2009-11-05"), schoolId: 1, grade: "Grade 6" },
      { name: "David Kim", gender: "Male", dob: new Date("2010-01-30"), schoolId: 1, grade: "Grade 5" },
      { name: "Ella Brown", gender: "Female", dob: new Date("2012-09-12"), schoolId: 1, grade: "Grade 3" },
      { name: "Frank Wilson", gender: "Male", dob: new Date("2008-06-18"), schoolId: 1, grade: "Grade 7" },
      { name: "Grace Martinez", gender: "Female", dob: new Date("2011-02-25"), schoolId: 1, grade: "Grade 4" },
      { name: "Henry Davis", gender: "Male", dob: new Date("2009-12-10"), schoolId: 1, grade: "Grade 6" },
      { name: "Isabella Thomas", gender: "Female", dob: new Date("2010-08-08"), schoolId: 1, grade: "Grade 5" },
      { name: "Jack White", gender: "Male", dob: new Date("2012-04-14"), schoolId: 1, grade: "Grade 3" },
      { name: "Karen Harris", gender: "Female", dob: new Date("2008-10-20"), schoolId: 1, grade: "Grade 7" },
      { name: "Liam Clark", gender: "Male", dob: new Date("2011-05-03"), schoolId: 1, grade: "Grade 4" },
      { name: "Mia Lewis", gender: "Female", dob: new Date("2009-09-27"), schoolId: 1, grade: "Grade 6" },
      { name: "Noah Walker", gender: "Male", dob: new Date("2010-12-01"), schoolId: 1, grade: "Grade 5" },
      { name: "Olivia Hall", gender: "Female", dob: new Date("2012-07-19"), schoolId: 1, grade: "Grade 3" },
      { name: "Paul Allen", gender: "Male", dob: new Date("2008-02-11"), schoolId: 1, grade: "Grade 7" },
      { name: "Quinn Young", gender: "Female", dob: new Date("2011-11-23"), schoolId: 1, grade: "Grade 4" },
      { name: "Ryan King", gender: "Male", dob: new Date("2009-03-07"), schoolId: 1, grade: "Grade 6" },
      { name: "Sophia Scott", gender: "Female", dob: new Date("2010-06-29"), schoolId: 1, grade: "Grade 5" },
      { name: "Thomas Green", gender: "Male", dob: new Date("2012-01-16"), schoolId: 1, grade: "Grade 3" },
    ],
  });

  return NextResponse.json({ students });
}

