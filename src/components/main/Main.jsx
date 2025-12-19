import SectionsPage from "../gallery/SectionsPage";
import AlbumPage from "../gallery/AlbumPage";
import VideoManagement from "../video/VideoManagement";

const Main = ({ activePage }) => {
  if (activePage === "sections") return <SectionsPage />;
  if (activePage === "albums") return <AlbumPage />;
  if (activePage === "video") return <VideoManagement />;

  // Dashboard & Contact Messages (same output)
  if (activePage === "dashboard" || activePage === "contact") {
    return (
      <div className="p-6 bg-white rounded shadow-sm">
        <h1 className="text-2xl font-semibold">
          {activePage === "contact" ? "Contact Messages" : "Dashboard"}
        </h1>
        <p className="mt-3 text-gray-600">
          Nothing to show yet.
        </p>
      </div>
    );
  }

  return null;
};

export default Main;
