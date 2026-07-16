import React from "react";
import Navbar from "./Navbar";
import { FaPlay } from "react-icons/fa";

const Hero = () => {
  const handleLogin = () => {
    window.location.href = "https://echoself-ohd4.onrender.com/login";
  };

  return (
      <div className="relative min-h-screen w-full bg-[url('/Hero_Bg.png')] bg-cover bg-center">
        <Navbar />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="font-grotesk font-black text-gray-300 text-5xl sm:text-7xl md:text-8xl lg:text-[132px] leading-none">
            ECHOSELF
          </h1>

          <p className="mt-6 max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
            Your Sonic DNA, distilled. Connect your Spotify to generate your
            unique visual identity based on a year of listening.
          </p>

          <button
              onClick={handleLogin}
              className="mt-10 flex w-full max-w-xs sm:max-w-sm md:max-w-md items-center justify-center gap-3 border-4 border-black bg-white px-6 py-4 text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-black shadow-xl shadow-black/40 transition hover:scale-105 cursor-pointer"
          >
            <FaPlay />
            Connect with Spotify
          </button>
        </div>
      </div>
  );
};

export default Hero;