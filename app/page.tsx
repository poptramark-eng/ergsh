"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Navbar */}

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

      {/* Call to Action */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Ready to simplify your school management?
          </h2>
          <Link
            href="/erp/details/students"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Start Managing Now
          </Link>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
