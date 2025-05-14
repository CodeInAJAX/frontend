"use client"

import { useState } from "react"
import StarRating from "./StarRating"
import { useAuth } from "../context/authContext"
import { X } from "lucide-react"

const RatingModal = ({ courseId, courseName, onClose, onRatingSubmitted }) => {
  const { user, submitRating } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate input
    if (rating === 0) {
      setError("Silakan berikan rating bintang")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Submit the rating
    submitRating(courseId, {
      rating,
      comment,
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        setIsSubmitting(false)
        if (onRatingSubmitted) onRatingSubmitted()
        onClose()
      })
      .catch((err) => {
        setIsSubmitting(false)
        setError("Terjadi kesalahan. Silakan coba lagi.")
        console.error("Error submitting rating:", err)
      })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Beri Rating Kursus</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-6 text-center">
            <p className="text-gray-600 mb-4">Bagaimana pengalaman belajar Anda di kursus "{courseName}"?</p>
            <div className="flex justify-center mb-2">
              <StarRating initialRating={rating} onChange={setRating} size="large" />
            </div>
            <div className="text-sm text-gray-500">
              {rating === 1 && "Sangat Buruk"}
              {rating === 2 && "Buruk"}
              {rating === 3 && "Cukup"}
              {rating === 4 && "Baik"}
              {rating === 5 && "Sangat Baik"}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Komentar (Opsional)
            </label>
            <textarea
              id="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bagikan pengalaman belajar Anda..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Rating"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RatingModal
