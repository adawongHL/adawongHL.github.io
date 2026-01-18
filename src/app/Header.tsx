"use client";
import { useState, useEffect } from "react";
import { monda } from "@/utils/fonts";

export default function Header() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100); // delay 100ms before starting animation
    return () => clearTimeout(timer); 
  }, []);   // run once upon intial render

  return (
    <div className="flex">
      <header className={`mb-16 text-left ${monda.className} w-full`}>
        <h1
          className={`text-5xl font-bold mb-4 transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}
          style={{ transition: 'opacity 0.3s ease-in' }}>
          Hi, I'm Ada!
        </h1>
        <div className="flex items-end relative">
          <p className={`text-lg text-gray-600 w-full ${fadeIn ? "opacity-100" : "opacity-0"}`}
          style={{ transition: 'opacity 0.9s ease-in' }}>I tinker, build and write 🏔️ </p>
        </div>
      </header>
    </div>
  );
}