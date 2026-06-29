import React, { useState, useEffect, useRef } from "react";
import { IoMdFingerPrint } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const [step, setStep] = useState(1);
  const [step2Progress, setStep2Progress] = useState(0);
  const [step3Progress, setStep3Progress] = useState(0);
  const [trackCount, setTrackCount] = useState(0);
  const analysisData = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += 17;
      if (count >= 758) { setTrackCount(758); clearInterval(interval); }
      else setTrackCount(count);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const duration = 3500;
    const interval = setInterval(() => {
      const pct = Math.min(Math.round(((Date.now() - start) / duration) * 100), 100);
      setStep2Progress(pct);
      if (pct >= 100) { clearInterval(interval); setStep(3); }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step !== 3) return;

    fetch("http://localhost:3000/analyse", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { analysisData.current = d; })
      .catch((e) => console.error(e));

    const start = Date.now();
    const duration = 4500;
    const interval = setInterval(() => {
      const pct = Math.min(Math.round(((Date.now() - start) / duration) * 100), 100);
      setStep3Progress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setStep(4);
        setTimeout(() => {
          if (analysisData.current) navigate("/result", { state: analysisData.current });
        }, 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-grotesk gap-5 py-10">
      <span className="text-violet-600">SYSTEM IDENTITY VERIFICATION</span>

      <div className="w-1/8 h-auto bg-gray-200 border border-3 border-black shadow-xl/20 flex items-center justify-center p-4 gap-3">
        <IoMdFingerPrint className={`w-20 h-20 transition-colors duration-500 ${step >= 4 ? "text-violet-600" : step >= 3 ? "text-violet-400" : "text-black"}`} />
        <h1 className="font-bold text-3xl">{step >= 4 ? "ANALYSIS COMPLETE" : "ECHOSELF LOADING"}</h1>
      </div>

      <h1 className="text-2xl font-semibold">
        Decoding <span className="underline underline-offset-12 text-violet-500">{trackCount}</span> tracks
      </h1>

      <p className="text-gray-500 text-center">
        Analysing rhythmic patterns, sonic density, and <br />
        genre deviation to build your digital fingerprint.
      </p>

      <div className="flex flex-col gap-5">
        <div className="w-[700px] border-4 border-black shadow-2xl bg-violet-200 flex justify-between items-center px-12 py-4">
          <span className="font-mono text-sm">Step 01</span>
          <h1 className="font-semibold text-xl">Fetching top tracks</h1>
          <span className="font-mono text-sm text-violet-700 font-bold">COMPLETED</span>
        </div>

        <div
          className="w-[700px] border-4 border-black shadow-2xl flex justify-between items-center px-12 py-4 relative overflow-hidden"
          style={{ background: step2Progress >= 100 ? "#ddd6fe" : "#f3f4f6" }}
        >
          <div className="absolute inset-0 bg-violet-400" style={{ width: `${step2Progress}%`, opacity: step2Progress >= 100 ? 0 : 0.25, transition: "width 0.05s linear" }} />
          <span className="font-mono text-sm relative z-10">Step 02</span>
          <h1 className="font-semibold text-xl relative z-10">Mapping mood spectrum</h1>
          <span className="font-mono text-sm font-bold relative z-10 w-20 text-right">
            {step2Progress >= 100 ? <span className="text-violet-700">COMPLETED</span> : <span className="text-violet-600">{step2Progress}%</span>}
          </span>
        </div>

        <div
          className="w-[700px] border-4 shadow-2xl flex justify-between items-center px-12 py-4 relative overflow-hidden"
          style={{ borderStyle: step < 3 ? "dashed" : "solid", borderColor: "black", background: step3Progress >= 100 ? "#ddd6fe" : step >= 3 ? "#f3f4f6" : "#f9fafb" }}
        >
          <div className="absolute inset-0 bg-violet-400" style={{ width: `${step3Progress}%`, opacity: step3Progress >= 100 ? 0 : 0.25, transition: "width 0.05s linear" }} />
          <span className="font-mono text-sm relative z-10">Step 03</span>
          <h1 className={`font-semibold text-xl relative z-10 transition-colors duration-300 ${step < 3 ? "text-gray-400" : "text-black"}`}>
            Computing archetype
          </h1>
          <span className="font-mono text-sm font-bold relative z-10 w-20 text-right">
            {step3Progress >= 100 ? <span className="text-violet-700">COMPLETED</span> : step >= 3 ? <span className="text-violet-600">{step3Progress}%</span> : <span className="text-gray-400">QUEUED</span>}
          </span>
        </div>
      </div>

      <div className="mt-10 flex gap-20 w-1/4">
        <div className="w-full h-auto p-4 bg-gray-200 border border-black border-3 shadow-xl">
          <h1 className="font-bold text-sm">BITRATE</h1>
          <span className="text-sm">320kbps Lossless</span>
        </div>
        <div className="w-full h-auto p-4 border border-black border-3 shadow-xl transition-colors duration-500" style={{ background: step >= 4 ? "#ddd6fe" : "#e5e7eb" }}>
          <h1 className="font-bold text-sm">API STATUS</h1>
          <span className={`text-sm font-mono ${step >= 4 ? "text-violet-700 font-bold" : ""}`}>
            {step >= 4 ? "COMPLETE" : "STABLE"}
          </span>
        </div>
      </div>

      {step >= 4 && (
        <p className="mt-4 font-mono text-sm text-violet-600 animate-pulse">
          <button className="bg-violet-500 border border-black border-4 shadow-xl/20 cursor-pointer p-4 text-white " onClick={navigate('/result')}>See your card</button>
        </p>
      )}
    </div>
  );
};

export default LoadingPage;