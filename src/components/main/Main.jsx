import { IoCalendarOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

const Main = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">

      {/* HEADER BAR */}
      <header className="w-full bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        
        {/* Left side: Good Morning */}
        <h2 className="text-xl font-semibold text-gray-700">
          Good Morning
        </h2>

        {/* Right side icons + Add Album */}
        <div className="flex items-center gap-6">
          <IoCalendarOutline className="text-2xl text-gray-600 cursor-pointer" />
          <IoNotificationsOutline className="text-2xl text-gray-600 cursor-pointer" />

          <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600">
            + Add Album
          </button>
        </div>

      </header>

      {/* BODY */}
      <main className="flex-1 bg-white p-6 m-6 rounded-md shadow">
        {/* Body is empty (ready for album cards later) */}
      </main>

    </div>
  );
};

export default Main;
