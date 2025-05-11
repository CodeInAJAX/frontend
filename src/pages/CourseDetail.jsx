import React, { useState } from "react";
import { useParams } from "react-router";
import { courseList } from "../utils/content";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courseList.find((c) => c.id === parseInt(id));

  const [currentVideo, setCurrentVideo] = useState(course?.videos[0]);

  if (!course) {
    return (
      <div className="min-h-screen p-10 text-center text-xl text-red-700">Kursus tidak ditemukan.</div>
    );
  }

  return (
    <section className="min-h-screen px-4 py-16 md:px-12 bg-white">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-black">{course.title}</h1>
        <p className="text-gray-500">Mentor: {course.mentor}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* List Video */}
        <div className="lg:w-1/3 space-y-4">
          <img
            src={course.image}
            alt={course.title}
            className="w-full rounded-xl object-cover mb-4"
          />
          <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Daftar Video</h2>
            <ul className="space-y-2">
              {course.videos.map((video, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentVideo(video)}
                    className={`text-left w-full px-3 py-2 rounded-lg transition ${
                      currentVideo.title === video.title
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-100 text-black"
                    }`}
                  >
                    {video.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video Player */}
        <div className="lg:w-2/3">
          <div className="aspect-video w-full overflow-hidden rounded-xl shadow-md">
            <iframe
              src={currentVideo.url}
              title={currentVideo.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold">{currentVideo.title}</h3>
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
