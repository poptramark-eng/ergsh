import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { refresh } from "next/cache";

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
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-gray-800`}>
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Logo / Home */}
            <h1 className="text-lg sm:text-xl font-bold text-blue-600 mb-4 sm:mb-0">
              <Link href="/" className="hover:text-blue-800">
                HOME
              </Link>
            </h1>

            {/* Links */}
            <div className="flex flex-wrap gap-4 text-sm sm:text-base">
              <Link href="/grok" className="hover:text-blue-600">Grok</Link>
              <Link href="/erp/details/schools" className="hover:text-blue-600">School Details</Link>
              <Link href="/erp/details/students" className="hover:text-blue-600">Students</Link>
              <Link href="/erp/details/teachers" className="hover:text-blue-600">Teachers</Link>
              <Link href="/erp/details/subjects" className="hover:text-blue-600">Subjects</Link>
              <Link href="/erp/details/exams" className="hover:text-blue-600">Exams</Link>
              <Link href="/erp/details/results" className="hover:text-blue-600">Results</Link>
              <Link href="/auth/logout?id=pop" className="hover:text-red-600 font-medium">Logout</Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-6 text-center text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} School ERP. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
