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

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedPurchasedCourses = localStorage.getItem("purchasedCourses")
    const storedProgress = localStorage.getItem("courseProgress")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedPurchasedCourses) {
      setPurchasedCourses(JSON.parse(storedPurchasedCourses))
    }

    if (storedProgress) {
      setCourseProgress(JSON.parse(storedProgress))
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
