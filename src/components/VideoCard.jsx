import { useEffect, useState } from "react";

export default function VideoCard({ video, onDelete }) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${video.videoId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.view_count) setViews(data.view_count);
      });
  }, [video.videoId]);

  return (
    <div className="bg-white shadow rounded-lg p-3">
      <iframe
        width="100%"
        height="180"
        src={video.link}
        title={video.title}
        className="rounded-md"
        allowFullScreen
      ></iframe>

      <h3 className="mt-2 font-semibold">{video.title}</h3>

      <p className="text-sm text-gray-500">Views: {views}</p>

      <div className="flex gap-2 mt-3">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded w-full"
          onClick={() =>
            window.open(`https://youtube.com/watch?v=${video.videoId}`, "_blank")
          }
        >
          View
        </button>

        <button
          className="bg-red-600 text-white px-3 py-1 rounded w-full"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
