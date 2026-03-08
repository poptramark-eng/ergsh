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
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-blue-600 mb-4 sm:mb-0">
                          <Link
                href="/"
                className="text-gray-700 hover:text-blue-600"
              >
                School
              </Link>
            </h1>
            {/* Links visible on all screens, stacked on mobile */}
            <div>
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
              <Link
                href="/erp/details/results"
                className="text-gray-700 hover:text-blue-600"
              >
                Results
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
 

        {/* Page Content */}
        {children}

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-4 sm:py-6 text-center text-sm sm:text-base">
          <p>
            &copy; {new Date().getFullYear()} School ERP. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
