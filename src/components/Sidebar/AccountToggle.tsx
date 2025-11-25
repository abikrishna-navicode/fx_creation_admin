import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://yt3.googleusercontent.com/vpDDBn-64epiVkk4Rq48PnUL1_ihmsAbL4yD15qwDoxkV3w2w8xsVrk0rsH5u44-464An6lU3A=s900-c-k-c0x00ffffff-no-rj"
          alt="logo"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">FX Creations Studio</span>
        </div>

        <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
        <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
      </button>
    </div>
  );
};
