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
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex space-x-6">
                <Link
                  href="/erp"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  ERP
                </Link>
                <Link
                  href="/erp/students"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Add Students
                </Link>
                <Link
                  href="/erp/teachers"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Add Teachers
                </Link>
                <Link
                  href="/erp/subjects"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Add Subjects
                </Link>
                <Link
                  href="/erp/exams"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Add Exam
                </Link>
                <Link
                  href="/erp/schools"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Add School
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
