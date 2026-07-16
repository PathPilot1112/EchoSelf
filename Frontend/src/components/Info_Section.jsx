import React from "react";

const Info_Section = () => {
    return (
        <div className="w-full min-h-screen bg-gray-300 font-grotesk px-4 sm:px-6 lg:px-10 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 lg:p-8 bg-gray-100 border-4 border-black shadow-2xl">
                <h1 className="font-bold text-4xl sm:text-5xl lg:text-7xl xl:text-[90px] leading-none">
                    Deep Analytics
                </h1>

                <p className="mt-4 text-base sm:text-lg lg:text-2xl text-gray-600">
                    We don't just count plays. We analyze tempo, energy, and harmonic
                    patterns to build a comprehensive map of your taste.
                </p>
            </div>

            <div className="p-5 lg:p-8 bg-violet-500 border-4 border-black shadow-2xl">
                <h1 className="font-bold text-white text-4xl sm:text-5xl lg:text-7xl xl:text-[90px] leading-none">
                    Shareable Art
                </h1>

                <p className="mt-4 text-base sm:text-lg lg:text-2xl text-gray-200">
                    Export your Persona card in high resolution for Instagram, Twitter,
                    or physical printing.
                </p>
            </div>

            <div className="p-5 lg:p-8 bg-red-400 border-4 border-black shadow-2xl">
                <h1 className="font-bold text-white text-4xl sm:text-5xl lg:text-7xl xl:text-[90px] leading-none">
                    Privacy First
                </h1>

                <p className="mt-4 text-base sm:text-lg lg:text-2xl text-gray-200">
                    Your data is yours. We process your listening history through the
                    official API and store nothing on our servers.
                </p>
            </div>

            <div className="p-5 lg:p-8 bg-gray-100 border-4 border-black shadow-2xl">
                <h1 className="font-bold text-4xl sm:text-5xl lg:text-7xl xl:text-[90px] leading-none">
                    Timeline Evolution
                </h1>

                <p className="mt-4 text-base sm:text-lg lg:text-2xl text-gray-600">
                    See how your Persona has shifted over the seasons. From Summer's
                    uptempo house to Winter's ambient soundscapes.
                </p>
            </div>
        </div>
    );
};

export default Info_Section;