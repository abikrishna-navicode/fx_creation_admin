import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { IoIosCard } from "react-icons/io";
import { MdOutlinePayments, MdOutlineAccountBalance } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="h-screen bg-white shadow-lg w-64">
      <div className="flex flex-col gap-3 w-full text-gray-700 h-full justify-between">

        <div className="flex flex-col gap-10 px-4 mt-4">
          <div className="flex items-center justify-start gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuQoH4esCwnJqdER7i6H_ZZgtW4RQfg-U-Bg&s"
              alt="profile"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
            />
            <div className="font-bold text-gray-900 text-lg">
              FX CREATIONS STUDIO
            </div>
          </div>

          <div className="flex flex-col gap-5 text-md">

            {/* Dashboard */}
            <div
              className="flex items-center gap-3 hover:text-indigo-700 cursor-pointer"
              onClick={() => onNavigate("dashboard")}
            >
              <AiFillDashboard />
              <div>Dashboard</div>
            </div>

            <div className="flex items-center gap-3 hover:text-indigo-700 cursor-pointer">
              <IoIosCard />
              <div>Gallery Management</div>
            </div>

            <div className="flex items-center gap-3 hover:text-indigo-700 cursor-pointer">
              <MdOutlinePayments />
              <div>Video Management</div>
            </div>

            <div className="flex items-center gap-3 hover:text-indigo-700 cursor-pointer">
              <MdOutlineAccountBalance />
              <div>Booking Management</div>
            </div>

            <div className="flex items-center gap-3 hover:text-indigo-700 cursor-pointer">
              <MdOutlineAccountBalance />
              <div>Contact Messages</div>
            </div>
          </div>
        </div>

        <div className="flex items-center text-md px-4 mb-6 gap-3 hover:text-indigo-700 cursor-pointer">
          <IoSettingsOutline />
          <div>Settings</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
