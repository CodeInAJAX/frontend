"use client"

import { useState } from "react"
import StarRating from "./StarRating"
import { useAuth } from "../context/authContext"
import { MessageSquare, ThumbsUp, Flag } from "lucide-react"

const CourseRatings = ({ courseId }) => {
  const { getCourseRatings, user, likeRating } = useAuth()
  const [sortBy, setSortBy] = useState("newest") // newest, highest, lowest

  // Get ratings for this course
  const ratings = getCourseRatings(courseId)

  // Calculate average rating
  const averageRating = ratings.length > 0 ? ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length : 0

  // Format the average rating to one decimal place
  const formattedAverage = averageRating.toFixed(1)

  // Calculate rating distribution
  const distribution = [0, 0, 0, 0, 0] // 5 stars to 1 star
  ratings.forEach((rating) => {
    distribution[5 - rating.rating]++
  })

  // Calculate percentages for the distribution bars
  const percentages = distribution.map((count) => (ratings.length > 0 ? (count / ratings.length) * 100 : 0))

  // Sort ratings based on selected sort option
  const sortedRatings = [...ratings].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.timestamp) - new Date(a.timestamp)
    } else if (sortBy === "highest") {
      return b.rating - a.rating
    } else if (sortBy === "lowest") {
      return a.rating - b.rating
    }
    return 0
  })

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  // Handle like button click
  const handleLike = (ratingId) => {
    if (user) {
      likeRating(courseId, ratingId)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-xl font-semibold mb-6">Ulasan Kursus</h3>

      {ratings.length > 0 ? (
        <>
          {/* Rating Summary */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Average Rating */}
            <div className="text-center md:text-left md:w-1/3">
              <div className="text-5xl font-bold text-gray-800 mb-2">{formattedAverage}</div>
              <div className="flex justify-center md:justify-start mb-2">
                <StarRating initialRating={Math.round(averageRating)} readOnly />
              </div>
              <p className="text-gray-500 text-sm">{ratings.length} ulasan</p>
            </div>

            {/* Rating Distribution */}
            <div className="md:w-2/3">
              {[5, 4, 3, 2, 1].map((star, index) => (
                <div key={star} className="flex items-center mb-1">
                  <div className="w-12 text-sm text-gray-600">{star} bintang</div>
                  <div className="flex-1 mx-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentages[index]}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-gray-600">{distribution[index]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex justify-end mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="newest">Terbaru</option>
              <option value="highest">Rating Tertinggi</option>
              <option value="lowest">Rating Terendah</option>
            </select>
          </div>

          {/* Rating List */}
          <div className="space-y-6">
            {sortedRatings.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-medium mr-3">
                      {item.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{item.userName}</div>
                      <div className="text-xs text-gray-500">{formatDate(item.timestamp)}</div>
                    </div>
                  </div>
                  <StarRating initialRating={item.rating} readOnly size="small" />
                </div>

                {item.comment && <p className="text-gray-700 mb-3 text-sm">{item.comment}</p>}

                <div className="flex gap-4 text-sm text-gray-500">
                  <button
                    onClick={() => handleLike(index)}
                    className={`flex items-center gap-1 hover:text-gray-700 ${
                      item.likes && item.likes.includes(user?.id) ? "text-blue-500 hover:text-blue-600" : ""
                    }`}
                  >
                    <ThumbsUp size={14} />
                    <span>{item.likes ? item.likes.length : 0}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <Flag size={14} />
                    <span>Laporkan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MessageSquare size={40} className="mx-auto mb-2 opacity-30" />
          <p>Belum ada ulasan untuk kursus ini</p>
        </div>
      )}
    </div>
  )
}

export default CourseRatings
