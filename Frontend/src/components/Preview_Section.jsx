import React from "react";
import Demo_Preview_Card from "./Demo_Preview_Card";
import { WiStars } from "react-icons/wi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoFlowerOutline } from "react-icons/io5";
import { GiRearAura } from "react-icons/gi";

const Preview_Section = () => {

    const handleScroll =()=>{
        document.getElementById("preview").scrollIntoView({
            behavior:"smooth"
        });
    };
  return (
    <div className="w-full min-h-screen bg-zinc-100 flex flex-col items-center py-12 relative gap-12">
      <h1 className="text-4xl font-grotesk font-medium underline underline-offset-8 z-20">
        YOUR IDENTITY PREVIEW
      </h1>

      <div className="flex-1 w-full flex items-center justify-center relative">
        <div className="blur-sm">
          <Demo_Preview_Card />
        </div>

        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-1/4 p-5 bg-white text-black shadow-xl shadow-black
          border-4 border-black flex items-center justify-center gap-4
          text-3xl font-grotesk font-medium cursor-pointer z-20"
          onClick={handleScroll}
        >
          LOGIN TO UNLOCK
        </button>
      </div>
      <div className="flex justify-between items-center w-full px-[100px] mt-16 font-grotesk">
        <div className="w-auto h-auto p-3 border border-4 shadow-xl/40 flex items-center justify-center">
          <WiStars />
          THE CHAMELEON
        </div>
        <div className="w-auto h-auto p-3 border border-4 shadow-xl/40 flex items-center justify-center">
          <BsFillLightningChargeFill />
          THE VIBRANT
        </div>
        <div className="w-auto h-auto p-3 border border-4 shadow-xl/40 flex items-center justify-center">
          <IoFlowerOutline />
          THE NOSTALGIC
        </div>
        <div className="w-auto h-auto p-3 border border-4 shadow-xl/40 flex items-center justify-center">
          <GiRearAura />
          THE ETHEREAL
        </div>
      </div>
    </div>
  );
};

export default Preview_Section;
