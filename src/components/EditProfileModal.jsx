"use client"

import { useState, useRef } from "react"
import { useApp } from "../context/appContext.jsx"
import { X, Upload, Camera } from "lucide-react"

const EditProfileModal = ({ onClose }) => {
  const { user, updateProfile } = useApp()
  const [name, setName] = useState(user?.name || "")
  const [nameError, setNameError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(user?.photo || "")
  const [imageFile, setImageFile] = useState(null)
  const [imageError, setImageError] = useState("")
  const fileInputRef = useRef(null)

  const handleNameChange = (e) => {
    setName(e.target.value)
    if (e.target.value.trim()) {
      setNameError("")
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.match("image.*")) {
      setImageError("Please select an image file (jpg, png, etc)")
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image size should be less than 2MB")
      return
    }

    setImageError("")
    setImageFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const validateForm = () => {
    let isValid = true

    if (!name.trim()) {
      setNameError("Nama tidak boleh kosong")
      isValid = false
    }

    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // In a real application, you would upload the file to a server here
    // For this demo, we'll simulate the upload by using the base64 data

    // Simulate API call with a timeout
    setTimeout(() => {
      updateProfile({
        name,
        photo: imagePreview, // In a real app, this would be the URL returned from the server
      })
      setIsSubmitting(false)
      onClose()
    }, 800)
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!name) return "U"
    return name
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
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="mb-3 relative">
              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-medium">
                  {getInitials()}
                </div>
              )}

              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200"
              >
                <Camera size={18} className="text-gray-700" />
              </button>
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

            <button
              type="button"
              onClick={triggerFileInput}
              className="text-sm text-orange-500 font-medium flex items-center mt-1"
            >
              <Upload size={14} className="mr-1" />
              Upload Photo
            </button>

            {imageError && <p className="mt-1 text-xs text-red-500">{imageError}</p>}
            <p className="text-xs text-gray-500 mt-1">Max file size: 2MB (JPG, PNG)</p>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={`w-full px-3 py-2 border ${
                nameError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {nameError && <p className="mt-1 text-sm text-red-500">{nameError}</p>}
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
