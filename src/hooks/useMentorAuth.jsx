"use client"

import { useNavigate } from "react-router"
import { useApp } from "../context/appContext.jsx"

const useMentorAuth = () => {
  const navigate = useNavigate()
  const { user } = useApp()

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
