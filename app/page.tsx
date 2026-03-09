// app/page.tsx
"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Hero Section */}
      <section className="text-center px-6">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to My App
        </h1>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          A modern platform designed to make your workflow faster, smarter, and more enjoyable.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 grid gap-8 md:grid-cols-3 px-6 max-w-5xl">
        <div className="bg-white text-blue-600 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-2">Fast</h2>
          <p>Optimized performance so you can get things done quickly.</p>
        </div>
        <div className="bg-white text-blue-600 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-2">Smart</h2>
          <p>Intelligent features that adapt to your needs.</p>
        </div>
        <div className="bg-white text-blue-600 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-2">Reliable</h2>
          <p>Built with stability and trust at its core.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-sm text-gray-200">
        © {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </main>
  );
}
