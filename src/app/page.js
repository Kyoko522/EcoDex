"use client";
import { useState } from 'react';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-gray-800 p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to EcoDex!</h1>
      <p className="text-lg text-center mb-6 max-w-2xl">
        EcoDex is a real-world plant and bug identification tool. Paste an image URL, and our AI will analyze it to give you insights on health, type, and more!
      </p>
      
      <div className="mb-8">
        {/* update this code so that it shows the image of the vison page with the completed CSS code */}
        <img 
          src="/images/landing_image.jpg" 
          alt="Sample plants and bugs" 
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>

      <a href="/vision" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition bg-clip-padding">
        Go to Vision Page
      </a>
      
      <a href="/database" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        Go to Datbase
      </a>

      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ul className="text-lg max-w-xl space-y-4">
          <li>1. Get a clear image of a plant or bug you want to identify.</li>
          <li>2. Paste the image URL into the search tool.</li>
          <li>3. Our AI analyzes the image to provide detailed information!</li>
        </ul>
      </section>
    </div>
  );
}
