"use client"

import { useNavigate } from "react-router"
import { useAuth } from "../context/authContext"

const useMentorAuth = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const isMentorLoggedIn = user && user.role === "guru"

  const redirectIfNotMentor = () => {
    if (!isMentorLoggedIn) {
      navigate("/login", { state: { from: "/mentor" } })
      return false
    }
    return true
  }

  return {
    isMentorLoggedIn,
    redirectIfNotMentor,
  }
}

export default useMentorAuth
