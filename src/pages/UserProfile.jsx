"use client"

import { useState } from "react"
import { useAuth } from "../context/authContext"
import usePageTitle from "../hooks/usePageTitle"
import EditProfileModal from "../components/EditProfileModal"
import { courseList } from "../utils/content"
import { Star, BookOpen, Award, Clock } from "lucide-react"
import { Link } from "react-router"

const UserProfile = () => {
  usePageTitle("Profil Pengguna")
  const { user, isCoursePurchased, getCourseProgress, getCourseRatings } = useAuth()
  const [showEditModal, setShowEditModal] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Silakan login untuk melihat profil Anda</p>
          <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Login
          </Link>
        </div>
      </div>
    )
  }

  // Get user's purchased courses
  const userCourses = courseList.filter((course) => isCoursePurchased(course.id))

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user.name) return "U"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Calculate total progress across all courses
  const calculateTotalProgress = () => {
    if (userCourses.length === 0) return 0
    const totalProgress = userCourses.reduce((sum, course) => {
      return sum + getCourseProgress(course.id).progress
    }, 0)
    return Math.round(totalProgress / userCourses.length)
  }

  // Count completed courses
  const completedCourses = userCourses.filter((course) => getCourseProgress(course.id).progress === 100).length

  // Get user's ratings
  const userRatings = courseList.flatMap((course) => {
    const ratings = getCourseRatings(course.id)
    return ratings
      .filter((rating) => rating.userId === user.id)
      .map((rating) => ({
        ...rating,
        courseId: course.id,
        courseTitle: course.title,
      }))
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Photo */}
            <div className="relative">
              {user.photo ? (
                <img
                  src={user.photo || "/placeholder.svg"}
                  alt={user.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-orange-100"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-medium border-4 border-orange-100">
                  {getInitials()}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
              <p className="text-gray-500 mb-4">{user.email}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                  <BookOpen size={16} />
                  <span>{userCourses.length} Kursus</span>
                </div>
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  <Award size={16} />
                  <span>{completedCourses} Selesai</span>
                </div>
                <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <Star size={16} />
                  <span>{userRatings.length} Ulasan</span>
                </div>
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
              >
                Edit Profil
              </button>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Progress Belajar</h2>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress Keseluruhan</span>
              <span>{calculateTotalProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${calculateTotalProgress()}%` }}></div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <h3 className="text-lg font-medium mb-3">Kursus Saya</h3>
          {userCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {userCourses.map((course) => {
                const progress = getCourseProgress(course.id)
                return (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300">
                    <Link to={`/course/${course.id}`} className="flex gap-3">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-1">{course.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">Mentor: {course.mentor}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-orange-500 h-1.5 rounded-full"
                            style={{ width: `${progress.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>{progress.progress}% selesai</span>
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            {progress.progress === 100 ? "Selesai" : "Sedang berlangsung"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <BookOpen size={40} className="mx-auto mb-2 opacity-30" />
              <p>Anda belum mengikuti kursus apapun</p>
              <Link
                to="/courses"
                className="mt-2 inline-block text-orange-500 hover:text-orange-600 font-medium underline"
              >
                Jelajahi Kursus
              </Link>
            </div>
          )}
        </div>

        {/* My Reviews */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Ulasan Saya</h2>

          {userRatings.length > 0 ? (
            <div className="space-y-4">
              {userRatings.map((rating, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/course/${rating.courseId}`} className="font-medium text-orange-500 hover:underline">
                      {rating.courseTitle}
                    </Link>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < rating.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  {rating.comment && <p className="text-gray-700 text-sm">{rating.comment}</p>}
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(rating.timestamp).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <Star size={40} className="mx-auto mb-2 opacity-30" />
              <p>Anda belum memberikan ulasan</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && <EditProfileModal onClose={() => setShowEditModal(false)} />}
    </div>
  )
}

export default UserProfile
