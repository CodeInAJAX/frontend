"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { courseList } from "../utils/content"
import { useAuth } from "../context/authContext"
import { CheckCircle, Star } from "lucide-react"
import RatingModal from "../components/RatingModal"
import CourseRatings from "../components/CourseRatings"

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    user,
    isCoursePurchased,
    updateLessonProgress,
    getCourseProgress,
    isLessonCompleted,
    isCourseCompleted,
    hasUserRatedCourse,
  } = useAuth()

  const courseId = Number.parseInt(id)
  const course = courseList.find((c) => c.id === courseId)

  const [currentVideo, setCurrentVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [showRatingSection, setShowRatingSection] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate("/login", { state: { from: `/course/${id}` } })
      return
    }

    // Check if course exists
    if (!course) {
      setLoading(false)
      return
    }

    // Check if course is purchased for paid courses
    if (course.isPaid && !isCoursePurchased(courseId)) {
      navigate(`/payment/${id}`)
      return
    }

    // Set the current video to the first one or the first incomplete one
    const progress = getCourseProgress(courseId)
    if (progress.completed.length === 0) {
      setCurrentVideo(course.videos[0])
    } else {
      // Find the first incomplete video
      const firstIncomplete = course.videos.find((video) => !progress.completed.includes(video.id))
      setCurrentVideo(firstIncomplete || course.videos[0])
    }

    // Determine if we should show the rating section
    setShowRatingSection(true)

    setLoading(false)
  }, [user, course, courseId, id, isCoursePurchased, navigate, getCourseProgress])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!course) {
    return <div className="min-h-screen p-10 text-center text-xl text-red-700">Kursus tidak ditemukan.</div>
  }

  const handleMarkComplete = () => {
    if (currentVideo) {
      updateLessonProgress(courseId, currentVideo.id)
    }
  }

  const progress = getCourseProgress(courseId)
  const courseCompleted = isCourseCompleted(courseId)
  const hasRated = hasUserRatedCourse(courseId)

  return (
    <section className="min-h-screen px-4 py-16 md:px-12 bg-white">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-black">{course.title}</h1>
        <p className="text-gray-500">Mentor: {course.mentor}</p>

        {/* Progress Bar */}
        <div className="mt-4 mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress Kursus</span>
            <span>{progress.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${progress.progress}%` }}></div>
          </div>
        </div>

        {/* Course Completion Banner */}
        {courseCompleted && !hasRated && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-3 sm:mb-0">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              <span className="text-green-700 font-medium">Selamat! Anda telah menyelesaikan kursus ini.</span>
            </div>
            <button
              onClick={() => setShowRatingModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Star className="mr-2" size={16} />
              Beri Rating
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* List Video */}
        <div className="lg:w-1/3 space-y-4">
          <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Daftar Video</h2>
            <ul className="space-y-2">
              {course.videos.map((video, index) => {
                const isCompleted = isLessonCompleted(courseId, video.id)

                return (
                  <li key={index}>
                    <button
                      onClick={() => setCurrentVideo(video)}
                      className={`text-left w-full px-3 py-2 rounded-lg transition flex items-center justify-between ${
                        currentVideo?.id === video.id
                          ? "bg-orange-500 text-white"
                          : isCompleted
                            ? "bg-green-100 text-black"
                            : "hover:bg-orange-100 text-black"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="font-medium">{video.title}</div>
                        <div className="text-xs opacity-80">{video.duration}</div>
                      </div>
                      {isCompleted && <CheckCircle size={18} className="text-green-600" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Video Player */}
        <div className="lg:w-2/3">
          {currentVideo && (
            <>
              <div className="aspect-video w-full overflow-hidden rounded-xl shadow-md">
                <iframe src={currentVideo.url} title={currentVideo.title} className="w-full h-full" allowFullScreen />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{currentVideo.title}</h3>
                <p className="text-gray-600 mt-2">{currentVideo.description}</p>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{currentVideo.duration}</span>

                  <button
                    onClick={handleMarkComplete}
                    disabled={isLessonCompleted(courseId, currentVideo.id)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      isLessonCompleted(courseId, currentVideo.id)
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    {isLessonCompleted(courseId, currentVideo.id) ? (
                      <>
                        <CheckCircle size={18} />
                        <span>Selesai</span>
                      </>
                    ) : (
                      <span>Tandai Selesai</span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Ratings Section */}
      {showRatingSection && (
        <div className="mt-12">
          <CourseRatings courseId={courseId} />
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <RatingModal
          courseId={courseId}
          courseName={course.title}
          onClose={() => setShowRatingModal(false)}
          onRatingSubmitted={() => {
            // Refresh the page to show the new rating
            window.location.reload()
          }}
        />
      )}
    </section>
  )
}

export default CourseDetail
