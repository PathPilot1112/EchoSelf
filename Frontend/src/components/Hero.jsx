import React from "react";
import Navbar from "./Navbar";
import { FaPlay } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="w-full h-screen bg-[url('/Hero_Bg.png')] bg-cover bg-center relative z-10">
      <Navbar />
      <div className="w-full h-screen absolute top-0 flex flex-col items-center justify-center" id="preview">
        <h1 className="text-gray-300 font-[1000] font-grotesk text-[132px]">ECHOSELF</h1>
        <p className="text-xl font-grotesk text-gray-300 mb-10">
          Your Sonic DNA,distilled. Connect your Spotify to generate<br/> your unique
          visual identity based on a year of listening.
        </p>
        <button className="w-1/4 h-auto p-5 bg-white text-black shadow-xl/40 shadow-black border border-5 border-black flex items-center justify-center gap-4 text-3xl font-grotesk font-medium cursor-pointer ">
          <FaPlay />
          Connect with Spotify
        </button>
      </div>
    </div>
  );
};

export default Hero;
