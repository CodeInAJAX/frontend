"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router"
import { useApp } from "../context/appContext.jsx"
import { User, LogOut } from "lucide-react"
import EditProfileModal from "./EditProfileModal"

const ProfileDropdown = () => {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsOpen(false)
  }

  const handleEditProfile = () => {
    setShowEditModal(true)
    setIsOpen(false)
  }


  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          {user?.profile?.photo ? (
                 (new URL(user?.profile?.photo).protocol == "http:") ? <img
                 src={new URL(user.profile.photo).pathname}
                 alt={user.name}
                 className="w-8 h-8 rounded-full object-cover border-2 border-white"
             /> : <img
             src={user.profile.photo}
             alt={user.name}
             className="w-8 h-8 rounded-full object-cover border-2 border-white"
         />
          ) : (
              <img
                  src={window.location.origin + "/assets/profile.jpg"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>

          <button
            onClick={handleEditProfile}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User size={16} className="mr-2" />
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} className="mr-2" />
            Log Out
          </button>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && <EditProfileModal onClose={() => setShowEditModal(false)} />}
    </div>
  )
}

export default ProfileDropdown
