"use client"

import { useState } from "react"
import { Star } from "lucide-react"

const StarRating = ({ initialRating = 0, onChange, readOnly = false, size = "default" }) => {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (value) => {
    if (readOnly) return
    setRating(value)
    if (onChange) onChange(value)
  }

  const handleMouseEnter = (value) => {
    if (readOnly) return
    setHoverRating(value)
  }

  const handleMouseLeave = () => {
    if (readOnly) return
    setHoverRating(0)
  }

  // Determine star size based on the size prop
  const starSize = size === "small" ? 16 : size === "large" ? 24 : 20

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          disabled={readOnly}
          className={`${readOnly ? "cursor-default" : "cursor-pointer"} p-1 focus:outline-none`}
          aria-label={`Rate ${value} out of 5 stars`}
        >
          <Star
            size={starSize}
            className={`${
              (hoverRating || rating) >= value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  )
}

export default StarRating
