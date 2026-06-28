import React from "react";

const Info_Section = () => {
  return (
    <div className="w-full min-h-screen bg-gray-300 font-grotesk px-10 py-12 flex grid grid-cols-2 gap-6">
      <div className="w-auto h-auto p-5 bg-gray-100 border border-4 border-black shadow-2xl">
        <h1 className="font-bold text-[90px] ">Deep Analytics</h1>
        <p className="text-gray-600 text-2xl">
          We don't just count plays. We analyze tempo, energy, and harmonic
          patterns to build <br/>a comprehensive map of your taste.
        </p>
      </div>
      <div className="w-auto h-auto p-5 bg-violet-500 border border-black border-4 shadow-2xl">
        <h1 className="text-white font-bold text-[90px] ">Shareable Art</h1>
        <p className="text-gray-200 text-2xl">
          Export your Persona card in high-res for Instagram, Twitter, or
          physical printing.
        </p>
      </div>
      <div className="w-auto h-auto p-5 bg-red-400 border border-black border-4 shadow-2xl">
        <h1 className="text-white font-bold text-[90px] ">Privacy First</h1>
        <p className="text-gray-200 text-2xl">
          Your data is yours. We process your listening history via the official
          API and store nothing on our servers.
        </p>
      </div>
      <div className="w-auto h-auto p-5 bg-gray-100 border border-4 border-black shadow-2xl">
        <h1 className="text-[90px] font-bold">Timeline Evolution</h1>
        <p className="text-gray-600 text-2xl">
          See how your Persona has shifted over the seasons. From Summer's
          uptempo house to Winter's ambient soundscapes.
        </p>
      </div>
    </div>
  );
};

export default Info_Section;
