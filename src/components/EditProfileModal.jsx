/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { useAuth } from "../context/authContext"
import { X } from "lucide-react"

const EditProfileModal = ({ onClose }) => {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    photo: user?.photo || "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewPhoto, setPreviewPhoto] = useState(user?.photo || "")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Update photo preview when URL changes
    if (name === "photo" && value) {
      setPreviewPhoto(value)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = "Nama tidak boleh kosong"
    }

    // Validate photo URL if provided
    if (formData.photo && !isValidUrl(formData.photo)) {
      newErrors.photo = "URL foto tidak valid"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      updateProfile(formData)
      setIsSubmitting(false)
      onClose()
    }, 500)
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!formData.name) return "U"
    return formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {/* Profile Photo Preview */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-3">
              {previewPhoto ? (
                <img
                  src={previewPhoto || "/placeholder.svg"}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                  onError={() => setPreviewPhoto("")}
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-medium">
                  {getInitials()}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-2">Profile Photo</p>
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Photo URL Input */}
          <div className="mb-6">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
              URL Foto Profil
            </label>
            <div className="flex">
              <input
                type="text"
                id="photo"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className={`w-full px-3 py-2 border ${
                  errors.photo ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
            </div>
            {errors.photo && <p className="mt-1 text-sm text-red-500">{errors.photo}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Masukkan URL gambar dari internet (contoh: https://example.com/photo.jpg)
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
