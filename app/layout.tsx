import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERP System",
  description: "Manage schools, students, teachers, and exams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">School ERP</h1>
            <div className="space-x-6">
              <Link
                href="/erp/details/schools"
                className="text-gray-700 hover:text-blue-600"
              >
                Schools
              </Link>
              <Link
                href="/erp/details/students"
                className="text-gray-700 hover:text-blue-600"
              >
                Students
              </Link>
              <Link
                href="/erp/details/teachers"
                className="text-gray-700 hover:text-blue-600"
              >
                Teachers
              </Link>
              <Link
                href="/erp/details/subjects"
                className="text-gray-700 hover:text-blue-600"
              >
                Subjects
              </Link>
              <Link
                href="/erp/details/exams"
                className="text-gray-700 hover:text-blue-600"
              >
                Exams
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="bg-blue-600 text-white py-20">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              School ERP Management System
            </h1>
            <p className="text-lg md:text-xl mb-8">
              A modern platform to manage schools, students, teachers, subjects,
              and exams — all in one place.
            </p>
            <Link
              href="/erp/details/schools"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          </div>
        </header>
        {children}
        <footer className="bg-gray-800 text-gray-300 py-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} School ERP. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
