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
  title: "EXAM MANAGEMENT",
  description: "Manage students, teachers, and exams",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col text-1f1f1f-800">

        {/* NAVIGATION (Preserved but non-intrusive) */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="w-full px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">

            {/* Logo */}
            <h1 className="text-lg sm:text-xl font-bold text-blue-600">
              <Link href="/" className="hover:text-blue-800">
                HOME
              </Link>
            </h1>

            {/* Links */}
            <div className="flex flex-wrap gap-4 text-sm sm:text-base mt-3 sm:mt-0">
              <Link href="/erp/details/schools" className="hover:text-blue-600">School Details</Link>
              <Link href="/erp/details/students" className="hover:text-blue-600">View Students</Link>
              <Link href="/erp/details/teachers" className="hover:text-blue-600">View Teachers</Link>
              <Link href="/erp/details/subjects" className="hover:text-blue-600">View Subjects</Link>
              <Link href="/erp/details/exams" className="hover:text-blue-600">View Exams</Link>
              <Link href="/erp/details/results" className="hover:text-blue-600">View Results</Link>
              <Link href="/erp/results" className="hover:text-red-600 font-medium">Add results</Link>
              <Link href="/erp/edit" className="hover:text-red-600 font-medium">Edit results</Link>
              <Link href="/grok" className="hover:text-blue-600">Ask AI</Link>
              <Link href="/auth/logout?id=/" className="hover:text-red-600 font-medium">Logout</Link>
            </div>

          </div>
        </nav>

        {/* PAGE CONTENT — NO FORCED STYLING */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-800 text-gray-300 py-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} School ERP. All rights reserved.</p>
        </footer>

      </body>
    </html>
  );
}
