"use client"

import { Navigate, useLocation } from "react-router"
import { useApp } from "../context/appContext.jsx"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useApp()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

export default ProtectedRoute
