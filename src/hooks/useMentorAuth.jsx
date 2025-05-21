"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

const useMentorAuth = (user) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  // Check auth status after component mounts to ensure localStorage is available
  useEffect(() => {
    // Short timeout to ensure context has loaded from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [user]);
  const isMentorLoggedIn = user && user.role == "mentor"

  const redirectIfNotMentor = () => {
    if (!isLoading && !isMentorLoggedIn) {
      navigate("/login", { state: { from: "/mentor" } })
      return false
    }
    return !isLoading && isMentorLoggedIn
  }

  return {
    isMentorLoggedIn,
    redirectIfNotMentor,
    isLoading
  }
}

export default useMentorAuth