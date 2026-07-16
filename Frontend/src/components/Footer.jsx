import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-black px-4 sm:px-6 lg:px-10 py-10">
            <div className="w-full h-px bg-gray-600"></div>

            <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 text-white font-grotesk">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        ECHOSELF
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-gray-500">
                        MADE WITH SPOTIFY API.
                    </p>

                    <p className="text-sm sm:text-base text-gray-500">
                        NOT AFFILIATED WITH SPOTIFY.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm sm:text-base">
                    <h2 className="cursor-pointer hover:text-gray-300 transition">
                        PRIVACY POLICY
                    </h2>

                    <h2 className="cursor-pointer hover:text-gray-300 transition">
                        TERMS OF USE
                    </h2>

                    <h2 className="cursor-pointer hover:text-gray-300 transition">
                        CONTACT
                    </h2>
                </div>
            </div>
        </footer>
    );
};

export default Footer;