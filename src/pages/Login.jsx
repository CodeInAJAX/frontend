"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { Link } from "react-router"
import bgGrid from "../assets/bgGrid.png"
import logo from "../assets/codeinajaLogo.svg"
import usePageTitle from "../hooks/usePageTitle"
import { useAuth } from "../context/authContext"

const Login = () => {
  usePageTitle("Login")
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  // Get the redirect path from location state or default to homepage
  const from = location.state?.from || "/"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    const result = login(formData.email, formData.password)

    if (result.success) {
      // Redirect to the page they were trying to access or homepage
      navigate(from)
    } else {
      setError(result.message || "Login gagal. Silakan coba lagi.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div className="absolute inset-0 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bgGrid})` }} />
      <div className="z-10 w-full max-w-md px-6 py-1">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4 ">
            <img src={logo || "/placeholder.svg"} alt="codeinaja logo" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-semibold text-black mb-4">Masuk</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">Yuk mulai perjalanan belajarmu!</p>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Masukkan alamat email"
            className="input-style"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Masukkan password"
            className="input-style"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-style">
            Masuk
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-orange-500 font-medium">
            Registrasi
          </Link>
        </p>

        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-2 font-medium">Demo Accounts:</p>
          <p className="text-xs text-gray-600">Student: student@example.com / password123</p>
          <p className="text-xs text-gray-600">Teacher: teacher@example.com / password123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
