"use client"

import { useState } from "react"
import { useNavigate } from "react-router"
import usePageTitle from "../hooks/usePageTitle"
import { courseList } from "../utils/content"
import { useAuth } from "../context/authContext"

const OnlineCourse = () => {
  usePageTitle("Kursus Online")
  const [search, setSearch] = useState("")
  const { user, isCoursePurchased, getCourseProgress } = useAuth()
  const navigate = useNavigate()

  const filteredCourses = courseList.filter((course) => course.title.toLowerCase().includes(search.toLowerCase()))

  const handleCourseClick = (course) => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate("/login", { state: { from: `/course/${course.id}` } })
      return
    }

    // If course is paid and not purchased, redirect to payment
    if (course.isPaid && !isCoursePurchased(course.id)) {
      navigate(`/payment/${course.id}`)
      return
    }

    // Otherwise, go to course
    navigate(`/course/${course.id}`)
  }

  return (
    <section className="min-h-screen py-16 px-4 md:px-12">
      {/* Header + SearchBar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-black">Online Course</h1>
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
          <div key={course.id} className="rounded-xl overflow-hidden bg-gray-800 text-white shadow-md">
            <div className="bg-white flex items-center justify-center">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                {course.isPaid ? (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Rp {course.price.toLocaleString("id-ID")}
                  </span>
                ) : (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Gratis</span>
                )}
              </div>
              <p className="text-sm mb-4 text-white/75">Mentor: {course.mentor}</p>

              {user && isCoursePurchased(course.id) && (
                <div className="mb-3">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-orange-500 h-2.5 rounded-full"
                      style={{ width: `${getCourseProgress(course.id).progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-right text-white/75">
                    {getCourseProgress(course.id).progress}% selesai
                  </p>
                </div>
              )}

              <button
                onClick={() => handleCourseClick(course)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold transition cursor-pointer w-full"
              >
                {!user
                  ? "Masuk untuk Belajar"
                  : course.isPaid && !isCoursePurchased(course.id)
                    ? "Beli Kursus"
                    : "Belajar Sekarang"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredCourses.length === 0 && <p className="flex justify-center text-gray-700">Kursus tidak ditemukan.</p>}
    </section>
  )
}

export default OnlineCourse
