import type { Metadata } from "next";

import "./globals.css";
import Link from "next/link";
import Pay from "./payments/page";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "EXAM MANAGEMENT",
  description: "Manage students, teachers, and exams",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("scroll-smooth text-lg antialiased leading-snug tracking-wide font-mono whitespace-normal text-black text-pretty", "font-sans", geist.variable)}>
      <body className="m-0 h-screen flex flex-col p-0  box-border ">

        {/* NAVIGATION (Preserved but non-intrusive) */}
        <nav className="flex flex-wrap p-4 m-0  bg-gray-900/80 justify-around w-full  text-white flex-row  ">
            
               <Link href="/" className="p-1  leading-none  m-1 text-white   ">
                HOME
              </Link>
              <Link href="/erp/details/schools" className="p-1  leading-none  m-1 text-white   ">School</Link>
              <Link href="/erp/details/students" className="p-1  leading-none  m-1 text-white   ">Students</Link>
              <Link href="/erp/details/teachers" className="p-1  leading-none  m-1 text-white   ">Teachers</Link>
              <Link href="/erp/details/subjects" className="p-1  leading-none  m-1 text-white   ">Subjects</Link>
              <Link href="/erp/details/exams" className="p-1  leading-none  m-1 text-white   ">Exams</Link>
              <Link href="/erp/details/results" className="p-1  leading-none  m-1 text-white  ">Results</Link>
              <Link href="/erp/results" className="p-1  leading-none  m-1 text-white   ">Add results</Link>

            
             
              <Link href="/auth/logout?id=/" className="p-1  leading-none  m-1 text-white   ">Logout</Link>
            

          
        </nav>
       

        {/* PAGE CONTENT — NO FORCED STYLING */}
        
          
          <div>
              {children} 
          
          </div>
          
          
        

        {/* FOOTER */}
        <div className="w-full bg-cover mb-0">
          <footer className="bg-gray-800 text-gray-300 py-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} School ERP. All rights reserved.</p>
        </footer>
        </div>

      </body>
    </html>
  );
}
