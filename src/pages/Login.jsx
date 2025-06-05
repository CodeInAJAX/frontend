"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { Link } from "react-router"
import bgGrid from "../assets/bgGrid.png"
import logo from "../assets/codeinajaLogo.svg"
import usePageTitle from "../hooks/usePageTitle"
import { useApp } from "../context/appContext.jsx"
import {loginSchema} from "../validation/users.js";
import z from "zod";

const Login = () => {
  usePageTitle("Login")
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useApp()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: "", message: "" })

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({})

  // Get the redirect path from location state or default to homepage
  const from = location.state?.from || "/"

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))


    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setErrors({})
      setIsSubmitting(true)

      loginSchema.parse(formData)

      const result = await login(formData)

      if (result.success) {

        // Redirect to the page they were trying to access or homepage
        setStatusMessage({
          type: "success",
          message: "Berhasil melakukan login, halaman akan beralih ke beranda...",
        })
        setTimeout(() => {
          navigate(from);
        }, 200)
      } else {
        setStatusMessage({
          type: "error",
          message: result.message
        })
      }
    } catch (zodError) {
      const formattedErrors = {}
      if (zodError instanceof z.ZodError) {
        zodError.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
      }
      setErrors(formattedErrors)
    } finally {
      setIsSubmitting(false)
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

        {/* Status Message */}
        {statusMessage.message && (
            <div
                className={`mb-4 p-3 rounded-lg text-sm ${
                    statusMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
            >
              {statusMessage.message}
            </div>
        )}

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
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Masukkan password"
            className="input-style"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          <input
              type="password"
              name="confirmPassword"
              placeholder="Masukkan Konfirmasi password"
              className="input-style"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              required
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          <button type="submit" className="submit-style" disabled={isSubmitting}>
            {isSubmitting ? "Memasuki..." : "Masuk"}
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
