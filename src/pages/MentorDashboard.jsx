"use client"

import { useState } from "react"
import { useNavigate } from "react-router"
import usePageTitle from "../hooks/usePageTitle"
import useMentorRedirect from "../hooks/useMentorRedirect"
import { useAuth } from "../context/authContext"
import { courseList } from "../utils/content"

import {
  BookOpen,
  BarChart2,
  Settings,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  Bell,
  LogOut,
  Upload,
  Video,
  Users,
} from "lucide-react"

const MentorDashboard = () => {
  usePageTitle("Mentor Dashboard")
  useMentorRedirect()

  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showNewCourseModal, setShowNewCourseModal] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    isPaid: false,
    price: 0,
  })

  // Filter courses to only show this mentor's courses
  const mentorCourses = courseList.filter((course) => course.mentor === user?.name)

  // Filter courses based on search term
  const filteredCourses = mentorCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle delete course
  const handleDeleteClick = (course) => {
    setSelectedCourse(course)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the course
    console.log(`Deleting course: ${selectedCourse.id}`)
    setShowDeleteModal(false)
    // Then refresh the course list
  }

  // Handle new course form
  const handleNewCourseChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewCourse({
      ...newCourse,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNewCourseSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would call an API to create the course
    console.log("Creating new course:", newCourse)
    setShowNewCourseModal(false)
    // Then refresh the course list
  }

  // Mock stats data
  const stats = [
    { label: "Total Kursus", value: mentorCourses.length, icon: BookOpen, change: "+1" },
    { label: "Total Siswa", value: "245", icon: Users, change: "+12%" },
    { label: "Total Video", value: "24", icon: Video, change: "+3" },
    { label: "Pendapatan", value: "Rp 4.5M", icon: BarChart2, change: "+8%" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-md z-20 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-4 flex items-center justify-between border-b">
          <div className={`flex items-center ${!sidebarOpen && "justify-center w-full"}`}>
            <span className={`text-xl font-bold text-orange-500 ${!sidebarOpen && "hidden"}`}>
              Mentor<span className="italic">Panel</span>
            </span>
            {!sidebarOpen && <span className="text-xl font-bold text-orange-500">M</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "courses", label: "Kursus Saya", icon: BookOpen },
              { id: "content", label: "Konten", icon: FileText },
              { id: "settings", label: "Pengaturan", icon: Settings },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                    activeTab === item.id ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={20} className="min-w-5" />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-4 border-t">
            <button
              className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={20} className="min-w-5" />
              {sidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 overflow-x-hidden">
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "courses" && "Kursus Saya"}
            {activeTab === "content" && "Manajemen Konten"}
            {activeTab === "settings" && "Pengaturan"}
          </h1>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0) || "M"}
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name || "Mentor"}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                      </div>
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <stat.icon size={24} className="text-orange-500" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`text-xs font-medium ${
                          stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stat.change} dari bulan lalu
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Kursus Populer</h3>
                  <div className="space-y-4">
                    {mentorCourses.length > 0 ? (
                      mentorCourses.map((course, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                        >
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">{course.title}</h4>
                            <p className="text-xs text-gray-500">{course.mentor}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-800">245</p>
                            <p className="text-xs text-gray-500">Siswa</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Belum ada kursus</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
                  <div className="space-y-4">
                    {[
                      {
                        action: "menambahkan kursus baru",
                        time: "2 jam yang lalu",
                      },
                      {
                        action: "mengupdate video pembelajaran",
                        time: "5 jam yang lalu",
                      },
                      {
                        action: "menjawab pertanyaan siswa",
                        time: "1 hari yang lalu",
                      },
                      {
                        action: "mengubah detail kursus",
                        time: "2 hari yang lalu",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-medium mr-3">
                          {user?.name?.charAt(0) || "M"}
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">Anda</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari kursus..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-80"
                  />
                </div>
                <button
                  onClick={() => setShowNewCourseModal(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  <span>Tambah Kursus</span>
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kursus
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jumlah Video
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Harga
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <tr key={course.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                  src={course.image || "/placeholder.svg"}
                                  alt={course.title}
                                  className="w-10 h-10 rounded object-cover mr-3"
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                  <div className="text-xs text-gray-500">ID: {course.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Aktif
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{course.videos.length}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {course.isPaid ? `Rp ${course.price.toLocaleString("id-ID")}` : "Gratis"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end gap-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Edit size={18} />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleDeleteClick(course)}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                            Belum ada kursus yang dibuat. Klik "Tambah Kursus" untuk membuat kursus baru.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {filteredCourses.length > 0 && (
                  <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Menampilkan {filteredCourses.length} dari {mentorCourses.length} kursus
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Sebelumnya
                      </button>
                      <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Upload Konten</h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2">
                  <Upload size={18} />
                  <span>Upload Video</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Panduan Upload Video</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Format video yang didukung: MP4, MOV, AVI</li>
                    <li>Ukuran maksimal: 2GB per video</li>
                    <li>Resolusi yang direkomendasikan: 1080p (Full HD)</li>
                    <li>Durasi maksimal: 120 menit</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Panduan Materi Kursus</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Pastikan materi terstruktur dengan baik</li>
                    <li>Sertakan penjelasan yang jelas untuk setiap topik</li>
                    <li>Tambahkan latihan atau quiz untuk evaluasi pemahaman</li>
                    <li>Sediakan materi tambahan seperti PDF atau slide presentasi</li>
                  </ul>
                </div>

                <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50">
                  <Upload size={40} className="text-gray-400 mb-2" />
                  <p className="text-gray-600 mb-2">Drag & drop file video di sini</p>
                  <p className="text-gray-400 text-sm mb-4">atau</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                    Pilih File
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Akun</h3>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Ceritakan tentang diri Anda sebagai mentor..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Delete Course Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-4">
              Apakah Anda yakin ingin menghapus kursus "{selectedCourse?.title}
              "? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Course Modal */}
      {showNewCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Kursus Baru</h3>

            <form onSubmit={handleNewCourseSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Kursus
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newCourse.title}
                  onChange={handleNewCourseChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi Kursus
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={newCourse.description}
                  onChange={handleNewCourseChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPaid"
                  name="isPaid"
                  checked={newCourse.isPaid}
                  onChange={handleNewCourseChange}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isPaid" className="ml-2 block text-sm text-gray-700">
                  Kursus Berbayar
                </label>
              </div>

              {newCourse.isPaid && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={newCourse.price}
                    onChange={handleNewCourseChange}
                    min="0"
                    step="1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required={newCourse.isPaid}
                  />
                </div>
              )}

              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Kursus
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-500 hover:text-orange-600"
                      >
                        <span>Upload gambar</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">atau drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 2MB</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCourseModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  Buat Kursus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MentorDashboard
