"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('/src/assets/grassBackgroun.png')] bg-cover bg-fixed bg-center flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-300 bg-opacity-90 border-8 border-gray-400 rounded-none shadow-lg text-center font-mono text-gray-800">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-gray-700 drop-shadow-md">
          Welcome to EcoDex!
        </h1>

        {/* Subtitle */}
        <p className="text-lg max-w-2xl mb-8 px-4">
          EcoDex is a real-world plant and bug identification tool. Paste an image URL, 
          or use the camera to analyze plants and bugs!
        </p>

        {/* Image Display */}
        <div className="relative w-full max-w-sm h-64 bg-black rounded-lg mb-8 border-4 border-gray-600 shadow-inner">
          <Image
            src="/images/landing_image.jpg"
            alt="Sample plants and bugs"
            layout="fill"
            className="object-contain rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mb-6">
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
        <div className="bg-white border-2 border-gray-500 p-6 rounded-lg shadow-md max-w-md w-full mx-4">
          <h2 className="text-xl font-bold mb-4 text-gray-700">How It Works</h2>
          <ul className="text-left text-sm space-y-3">
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