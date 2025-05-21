"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router"
import useMentorAuth from "./useMentorAuth"

const useMentorRedirect = (user) => {
  const navigate = useNavigate()
  const { isMentorLoggedIn, isLoading } = useMentorAuth(user)

  useEffect(() => {
    // Only redirect if we're done loading and user is not a mentor
    if (!isLoading && !isMentorLoggedIn) {
      navigate("/login", { state: { from: "/mentor" } })
    }
  }, [isMentorLoggedIn, navigate, isLoading])

  return { isLoading }
}

export default useMentorRedirect