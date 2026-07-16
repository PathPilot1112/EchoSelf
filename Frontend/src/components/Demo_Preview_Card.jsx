import React from "react";

const Demo_Preview_Card = () => {
    return (
        <div className="w-full max-w-[420px] aspect-[3/5] bg-black p-4 sm:p-5 text-white font-grotesk shadow-xl/40 flex flex-col justify-between -rotate-3 sm:-rotate-8 rounded-xl">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xs sm:text-sm font-semibold">
                        LISTENER PROFILE
                    </h2>
                    <h1 className="text-xl sm:text-2xl font-semibold">
                        THE ARCHITECT
                    </h1>
                </div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 border-[3px] border-white bg-purple-600" />
            </div>

            <div className="flex flex-col gap-6">
                <div>
                    <span className="text-xs sm:text-sm">DANCEABILITY</span>

                    <div className="relative mt-2 w-full h-5 border-[3px] border-white bg-red-400">
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-10 h-5 border-[3px] border-white bg-black" />
                    </div>
                </div>

                <div>
          <span className="text-xs sm:text-sm">
            LISTENING COMPLEXITY
          </span>

                    <div className="relative mt-2 w-full h-5 border-[3px] border-white bg-yellow-400">
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-10 h-5 border-[3px] border-white bg-black" />
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-400" />
        </div>
    );
};

export default Demo_Preview_Card;