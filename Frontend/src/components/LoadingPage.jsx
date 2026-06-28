import React from "react";
import { IoMdFingerPrint } from "react-icons/io";

const LoadingPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-grotesk gap-5 py-10">
      <span className="text-violet-600">SYSTEM IDENTITY VERIFICATION</span>
      <div className="w-1/8  h-auto bg-gray-200 border border-3 border-black shadow-xl/20 flex items-center justify-center p-4 gap-3 ">
        <IoMdFingerPrint className="w-20 h-20" />
        <h1 className="font-bold text-3xl ">ECHOSELF LOADING</h1>
      </div>
      <h1 className="text-2xl font-semibold">
        Decoding{" "}
        <span className="underline underline-offset-12 text-violet-500 ">
          758
        </span>{" "}
        tracks
      </h1>
      <p className="text-gray-500 ">
        Analysing rhythmic patterns, sonic density, and <br />
        genre deviation to build your digital fingerprint.
      </p>
      <div className="flex flex-col gap-5">
        <div className="w-[700px] border-4 border-black shadow-2xl bg-violet-200 flex justify-between items-center px-12 py-4">
          <span>Step 01</span>
          <h1 className="font-semibold text-xl ">Fetching top tracks</h1>
          <h1>COMPLETED</h1>
        </div>
        <div className="w-[700px] border-4 border-black shadow-2xl bg-gradient-to-r from-violet-500 to-violet-100 flex justify-between items-center px-12 py-4">
          <span>Step 02</span>
          <h1 className="font-semibold text-xl">Mapping mood spectrum</h1>{" "}
          <span>42%</span>
        </div>
        <div className="w-[700px] border-4 border-black shadow-2xl border-dashed bg-gray-100 flex justify-between items-center px-12 py-4">
          <span>Step 03</span>
          <h1 className="font-semibold text-xl">Computing archetype</h1>
          <span>QUEUED</span>
        </div>
      </div>

      <div className="mt-10 flex gap-20 w-1/4">
        <div className="w-full  h-auto p-4 bg-gray-200 border border-black border-3 shadow-xl  ">
          <h1>BITRATE</h1>
          <span>320kbps Lossless</span>
        </div>
        <div className="w-full  h-auto p-4 bg-gray-200 border border-black border-3 shadow-xl  ">
          <h1>API STATUS</h1>
          <span>STABLE</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
