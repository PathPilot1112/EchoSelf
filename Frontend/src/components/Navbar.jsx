import React from "react";
import { BsShare } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  return (
    <div>
      <nav className="w-full p-5 text-white flex items-center justify-between bg-violet-700 text-2xl px-10">
        <h2 className="font-[700] text-3xl text-pink-100 font-oswald">ECHOSELF</h2>
        <div className="flex gap-4">
          <span>
            <BsShare />
          </span>
          <span>
            <CgProfile />
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
