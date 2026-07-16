import React from "react";
import Demo_Preview_Card from "./Demo_Preview_Card";
import { WiStars } from "react-icons/wi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoFlowerOutline } from "react-icons/io5";
import { GiRearAura } from "react-icons/gi";

const Preview_Section = () => {
    const handleScroll = () => {
        document.getElementById("preview").scrollIntoView({
            behavior: "smooth",
        });
    };

    const personas = [
        { icon: <WiStars />, title: "THE CHAMELEON" },
        { icon: <BsFillLightningChargeFill />, title: "THE VIBRANT" },
        { icon: <IoFlowerOutline />, title: "THE NOSTALGIC" },
        { icon: <GiRearAura />, title: "THE ETHEREAL" },
    ];

    return (
        <div className="w-full min-h-screen bg-zinc-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-10 gap-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-grotesk font-medium underline underline-offset-8 text-center">
                YOUR IDENTITY PREVIEW
            </h1>

            <div className="relative flex items-center justify-center w-full">
                <div className="blur-sm scale-90 sm:scale-100">
                    <Demo_Preview_Card />
                </div>

                <button
                    onClick={handleScroll}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-xs sm:max-w-sm md:max-w-md
          border-4 border-black bg-white
          px-6 py-4
          text-lg sm:text-xl md:text-2xl
          font-grotesk font-medium
          shadow-xl shadow-black
          cursor-pointer
          transition hover:scale-105"
                >
                    LOGIN TO UNLOCK
                </button>
            </div>

            <div className="grid w-full max-w-7xl grid-cols-2 lg:grid-cols-4 gap-4">
                {personas.map((item) => (
                    <div
                        key={item.title}
                        className="flex items-center justify-center gap-2 border-4 border-black bg-white p-4 shadow-xl/40 text-sm sm:text-base lg:text-lg"
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Preview_Section;