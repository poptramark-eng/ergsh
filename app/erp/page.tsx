"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">School ERP</h1>
          <div className="space-x-6">
            <Link
              href="/erp/schools"
              className="text-gray-700 hover:text-blue-600"
            >
              Schools
            </Link>
            <Link
              href="/erp/students"
              className="text-gray-700 hover:text-blue-600"
            >
              Students
            </Link>
            <Link
              href="/erp/teachers"
              className="text-gray-700 hover:text-blue-600"
            >
              Teachers
            </Link>
            <Link
              href="/erp/subjects"
              className="text-gray-700 hover:text-blue-600"
            >
              Subjects
            </Link>
            <Link
              href="/erp/exams"
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
            href="/erp"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Our ERP?
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              📚 Student Management
            </h3>
            <p className="text-gray-600">
              Register students, track grades, and manage personal details
              securely.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              👩‍🏫 Teacher Management
            </h3>
            <p className="text-gray-600">
              Add teachers, assign classes, and keep contact info organized.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              📖 Subject & Exam Control
            </h3>
            <p className="text-gray-600">
              Create subjects, schedule exams, and monitor performance with
              ease.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              🏫 School Administration
            </h3>
            <p className="text-gray-600">
              Manage multiple schools, their visions, mottos, and contact
              details.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            A Glimpse of Your Dashboard
          </h2>
          <p className="text-gray-600 mb-8">
            Intuitive design, easy navigation, and powerful tools to keep your
            school organized.
          </p>
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Replace with actual screenshot or illustration */}
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Dashboard Preview Image
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Ready to simplify your school management?
          </h2>
          <Link
            href="/erp"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Start Managing Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} School ERP. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
