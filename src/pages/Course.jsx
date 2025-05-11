import React, { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { courseList } from "../utils/content";
import { Link } from "react-router";

const OnlineCourse = () => {
  usePageTitle("Kursus Online");
  const [search, setSearch] = useState("");

  const filteredCourses = courseList.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen py-16 px-4 md:px-12">
      {/* Header + SearchBar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          Online Course
        </h1>
        <input
          type="text"
          placeholder="Cari kursus..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-80"
        />
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-xl overflow-hidden bg-gray-800 text-white shadow-md"
          >
            <div className="bg-white flex items-center justify-center">
              <img
                src={course.image}
                alt={course.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-sm mb-4 text-white/75">Mentor :{course.mentor}</p>
              <Link to={`/course/${course.id}`}>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold transition cursor-pointer">
                Belajar Sekarang
              </button>  
              </Link>
            </div>
          </div>
        ))}
      </div>
        {filteredCourses.length === 0 && (
          <p className="flex justify-center text-gray-700">Kursus tidak ditemukan.</p>
        )}
    </section>
  );
};

export default OnlineCourse;
