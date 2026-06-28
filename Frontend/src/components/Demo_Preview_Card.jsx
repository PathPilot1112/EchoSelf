import React from "react";

const Demo_Preview_Card = () => {
  return (
    <div className="max-w-xl w-[420px] h-[700px] bg-black p-5 text-white font-grotesk shadow-xl/40 flex flex-col justify-between -rotate-8 rounded-xl ">
      <div className="flex justify-between ">
        <div>
          <h2 className="text-md font-semibold">LISTENER PROFILE</h2>
          <h1 className="text-2xl font-semibold ">THE ARCHITECT</h1>
        </div>
        <div className="w-15 h-15 border border-[3px] border-white bg-purple-600"></div>
      </div>

      <div className="p-2 flex flex-col h-auto gap-3">
        <div className="relative ">
          <span>DANCEABILITY</span>
          <div className="w-1/2 h-5  bg-red-400 border border-white border-[3px] ">
            <div className="w-10 h-5 border border-white border-[3px] absolute right-[180px] top-6"></div>
          </div>
        </div>
        <div className="relative ">
          <span>LISTENING COMPLEXITY</span>
          <div className="w-1/2 h-5  bg-yellow-400 border border-white border-[3px] ">
            <div className="w-10 h-5 border border-white border-[3px] absolute right-[180px] top-6"></div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-400 h-1"></div>
    </div>
  );
};

export default Demo_Preview_Card;
