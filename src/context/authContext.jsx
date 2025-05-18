"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the auth context
const AuthContext = createContext()

// Sample user data
const SAMPLE_USERS = [
  { id: 1, email: "student@example.com", password: "password123", name: "Student User", role: "student", photo: "" },
  { id: 2, email: "teacher@example.com", password: "password123", name: "Teacher User", role: "guru", photo: "" },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [purchasedCourses, setPurchasedCourses] = useState([])
  const [courseProgress, setCourseProgress] = useState({})
  const [courseRatings, setCourseRatings] = useState({})

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedPurchasedCourses = localStorage.getItem("purchasedCourses")
    const storedProgress = localStorage.getItem("courseProgress")
    const storedRatings = localStorage.getItem("courseRatings")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedPurchasedCourses) {
      setPurchasedCourses(JSON.parse(storedPurchasedCourses))
    }

    if (storedProgress) {
      setCourseProgress(JSON.parse(storedProgress))
    }

    if (storedRatings) {
      setCourseRatings(JSON.parse(storedRatings))
    }

    setLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  // Save purchased courses to localStorage
  useEffect(() => {
    localStorage.setItem("purchasedCourses", JSON.stringify(purchasedCourses))
  }, [purchasedCourses])

  // Save course progress to localStorage
  useEffect(() => {
    localStorage.setItem("courseProgress", JSON.stringify(courseProgress))
  }, [courseProgress])

  // Save course ratings to localStorage
  useEffect(() => {
    localStorage.setItem("courseRatings", JSON.stringify(courseRatings))
  }, [courseRatings])

  // Login function
  const login = (email, password) => {
    const foundUser = SAMPLE_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return { success: true, user: userWithoutPassword }
    }

    return { success: false, message: "Email atau password salah" }
  }



  // Logout function
  const logout = () => {
    setUser(null)
  }

  // Update profile function
  const updateProfile = (updates) => {
    // In a real application, this would handle file uploads to a server
    // and update the user profile with the returned URL
    setUser((prev) => ({ ...prev, ...updates }))
  }

  // Purchase course function
  const purchaseCourse = (courseId) => {
    if (!purchasedCourses.includes(courseId)) {
      setPurchasedCourses([...purchasedCourses, courseId])

      // Initialize progress for this course
      setCourseProgress((prev) => ({
        ...prev,
        [courseId]: { completed: [], progress: 0 },
      }))

      return true
    }
    return false
  }

  // Check if a course is purchased
  const isCoursePurchased = (courseId) => {
    return purchasedCourses.includes(courseId)
  }

  // Update lesson progress
  const updateLessonProgress = (courseId, lessonId) => {
    setCourseProgress((prev) => {
      const courseData = prev[courseId] || { completed: [], progress: 0 }

      // If lesson is already completed, don't update
      if (courseData.completed.includes(lessonId)) {
        return prev
      }

      // Add lesson to completed list
      const newCompleted = [...courseData.completed, lessonId]

      // Calculate new progress percentage
      // Assuming we know the total number of lessons from the course data
      const totalLessons = courseId === 1 ? 3 : courseId === 2 ? 3 : 3 // Hardcoded for now
      const newProgress = Math.round((newCompleted.length / totalLessons) * 100)

      return {
        ...prev,
        [courseId]: {
          completed: newCompleted,
          progress: newProgress,
        },
      }
    })
  }

  // Get course progress
  const getCourseProgress = (courseId) => {
    return courseProgress[courseId] || { completed: [], progress: 0 }
  }

  // Check if a lesson is completed
  const isLessonCompleted = (courseId, lessonId) => {
    const course = courseProgress[courseId]
    return course ? course.completed.includes(lessonId) : false
  }

  // Check if a course is completed
  const isCourseCompleted = (courseId) => {
    const progress = getCourseProgress(courseId)
    return progress.progress === 100
  }

  // Submit a rating for a course
  const submitRating = async (courseId, ratingData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCourseRatings((prev) => {
          const courseRatingsList = prev[courseId] || []

          // Check if user has already rated this course
          const existingRatingIndex = courseRatingsList.findIndex((rating) => rating.userId === ratingData.userId)

          let updatedRatings

          if (existingRatingIndex >= 0) {
            // Update existing rating
            updatedRatings = [...courseRatingsList]
            updatedRatings[existingRatingIndex] = {
              ...ratingData,
              likes: updatedRatings[existingRatingIndex].likes || [],
            }
          } else {
            // Add new rating
            updatedRatings = [...courseRatingsList, { ...ratingData, likes: [] }]
          }

          return {
            ...prev,
            [courseId]: updatedRatings,
          }
        })

        resolve()
      }, 500) // Simulate API delay
    })
  }

  // Get ratings for a course
  const getCourseRatings = (courseId) => {
    return courseRatings[courseId] || []
  }

  // Check if user has rated a course
  const hasUserRatedCourse = (courseId) => {
    if (!user) return false

    const ratings = courseRatings[courseId] || []
    return ratings.some((rating) => rating.userId === user.id)
  }

  // Like a rating
  const likeRating = (courseId, ratingIndex) => {
    if (!user) return

    setCourseRatings((prev) => {
      const courseRatingsList = [...(prev[courseId] || [])]

      if (courseRatingsList[ratingIndex]) {
        const likes = courseRatingsList[ratingIndex].likes || []

        // Toggle like
        if (likes.includes(user.id)) {
          courseRatingsList[ratingIndex] = {
            ...courseRatingsList[ratingIndex],
            likes: likes.filter((id) => id !== user.id),
          }
        } else {
          courseRatingsList[ratingIndex] = {
            ...courseRatingsList[ratingIndex],
            likes: [...likes, user.id],
          }
        }
      }

      return {
        ...prev,
        [courseId]: courseRatingsList,
      }
    })
  }

  // Auth context value
  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    purchaseCourse,
    isCoursePurchased,
    updateLessonProgress,
    getCourseProgress,
    isLessonCompleted,
    isCourseCompleted,
    submitRating,
    getCourseRatings,
    hasUserRatedCourse,
    likeRating,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
