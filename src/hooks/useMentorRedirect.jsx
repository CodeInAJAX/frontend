"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router"
import useMentorAuth from "./useMentorAuth"

const useMentorRedirect = () => {
  const navigate = useNavigate()
  const { isMentorLoggedIn } = useMentorAuth()

  useEffect(() => {
    if (!isMentorLoggedIn) {
      navigate("/login", { state: { from: "/mentor" } })
    }
  }, [isMentorLoggedIn, navigate])
}

export default useMentorRedirect
