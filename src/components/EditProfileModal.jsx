
"use client"

import { useState, useRef, useEffect } from "react"
import { useApp } from "../context/appContext.jsx"
import { X, Upload, Camera } from "lucide-react"
import useGender from "../hooks/useGender.jsx";
import useErrors from "../hooks/useErrors.jsx";
import useForm from "../hooks/useForm.jsx";
import useSubmitting from "../hooks/useSubmitting.jsx";
import useStatusMessage from "../hooks/useStatusMessage.jsx";
import {editUserSchema} from "../validation/users.js";
import {uploadsProfileAPI} from "../api/uploads/v1.js";

const EditProfileModal = ({ onClose }) => {
  const { user, updateProfile } = useApp()
  const { gender, setGender, handleGenderChange } = useGender()

  // State for errors message
  const {errors, handleZodErrors, handleWhenInputForm} = useErrors()

  // State for loading and status message
  const {isSubmitting, setIsSubmitting} = useSubmitting()
  const {statusMessage, setStatusMessage} = useStatusMessage()
  const photo = new URL(user?.profile?.photo).protocol === "http:" ? new URL(user?.profile?.photo).pathname : user?.profile?.photo
  const [imagePreview, setImagePreview] = useState(photo || "")
  const [imageFile, setImageFile] = useState(null)
  const [imageError, setImageError] = useState("")
  const fileInputRef = useRef(null)

  // Initialize gender based on user's current gender when component mounts
  useEffect(() => {
    if (user?.gender) {
      setGender(user.gender)
    }
  }, [user, setGender])

  // State for form data - properly initialize from user object
  const {formData, setFormData, handleChangeForm, handleValidation}  = useForm({
    name: user?.name || "",
    password: "",
    gender: user?.profile?.gender || gender,
    photo: null,
    about: user?.profile?.about || ""
  })

  const handleChange = (e) => {
    handleChangeForm(e)
    handleWhenInputForm(e)
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
    setFormData((prevState) => ({
      ...prevState,
      photo: file,
    }))
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsSubmitting(true)

      // Validate form data
      handleValidation(editUserSchema)



      // Handle photo upload if there's a new photo
      if (formData.photo) {
        try {
          const { file_url } = await uploadsProfileAPI(formData.photo);
          dataToSubmit.photo = file_url;
        } catch (uploadError) {
          console.error("Error uploading photo:", uploadError);
          setStatusMessage({
            type: "error",
            message: "Gagal mengupload foto, silakan coba lagi"
          });
          setIsSubmitting(false);
          return;
        }
      } else {
        delete formData.photo;
      }

      // Create a copy of the form data for submission
      const dataToSubmit = { ...formData }

      // Update profile
      const result = await updateProfile(dataToSubmit)

      if (result.success) {
        setStatusMessage({
          type: "success",
          message: result.message || "Berhasil memperbarui profile!",
        })
        // Consider adding a small delay before closing the modal
        // setTimeout(onClose, 2000);
      } else {
        setStatusMessage({
          type: "error",
          message: result.message ?? "Gagal melakukan edit, tolong coba lagi...",
        })
      }
    } catch (error) {
      handleZodErrors(error)
    } finally {
      setIsSubmitting(false)
    }
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

          {/* Status Message */}
          {statusMessage.message && (
              <div
                  className={`mx-4 mt-4 p-3 rounded-lg text-sm ${
                      statusMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
              >
                {statusMessage.message}
              </div>
          )}

          <form onSubmit={handleSubmit} className="p-4">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="mb-3 relative">
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                    />
                ) : (
                    user?.profile?.photo ? (
                        <img
                            src={new URL(user.profile.photo).pathname}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                        />
                    ) : (
                        <img
                            src={window.location.origin + "/assets/profile.jpg"}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                        />
                    )
                )}

                <button
                    type="button"
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200"
                >
                  <Camera size={18} className="text-gray-700"/>
                </button>
              </div>

              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>

              <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-sm text-orange-500 font-medium flex items-center mt-1"
              >
                <Upload size={14} className="mr-1"/>
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan Password"
                  className={`w-full px-3 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Gender */}
            <div className="mb-6">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => {
                    handleGenderChange(e.target.value);
                    handleChange(e);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="male">Pria</option>
                <option value="female">Wanita</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
            </div>

            {/* About */}
            <div className="mb-6">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Ceritain dikit tentang kamu..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
              {errors.about && <p className="mt-1 text-sm text-red-500">{errors.about}</p>}
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