"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/src/assets/grassBackgroun.png')] bg-cover bg-fixed bg-center">
      <div className="max-w-md w-full p-6 bg-gray-300 border-8 border-gray-400 rounded-xl shadow-lg text-center font-mono text-gray-800">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-gray-700 drop-shadow-md">
          Welcome to EcoDex!
        </h1>
        
        {/* Subtitle */}
        <p className="text-base mb-6">
          EcoDex is a real-world plant and bug identification tool. Paste an image URL, 
          or use the camera to analyze plants and bugs!
        </p>

        {/* Image Display */}
        <div className="relative w-full h-64 bg-black rounded-lg mb-6 border-4 border-gray-600 shadow-inner">
          <Image
            src="/images/landing_image.jpg"
            alt="Sample plants and bugs"
            layout="fill"
            className="object-contain rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="/view/vision"
            className="bg-pink-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-transform transform hover:translate-y-1"
          >
            View Demo
          </a>
          <a
            href="/view/database"
            className="bg-pink-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-transform transform hover:translate-y-1"
          >
            View Database
          </a>
        </div>

        {/* Instructions */}
        <div className="bg-white border-2 border-gray-500 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2 text-gray-700">How It Works</h2>
          <ul className="text-left text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-pink-500 font-bold">➤</span> 
              Get a clear image of a plant or bug you want to identify.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 font-bold">➤</span> 
              Paste the image URL or capture it with your camera.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 font-bold">➤</span> 
              Our AI analyzes the image and gives you detailed insights!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}