"use client";

import { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { courseList } from "../utils/content";
import useAdminRedirect from "../hooks/useAdminRedirect";
import useAdminAuth from "../hooks/useAdminAuth";
import { useNavigate } from "react-router";

import {
  Users,
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
} from "lucide-react";

const AdminDashboard = () => {
  usePageTitle("Admin Dashboard");
  useAdminRedirect();

  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login"); // redirect ke halaman login
  };
  

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock stats data
  const stats = [
    { label: "Total Pengguna", value: "1,245", icon: Users, change: "+12%" },
    {
      label: "Total Kursus",
      value: courseList.length,
      icon: BookOpen,
      change: "+3%",
    },
    { label: "Pendapatan", value: "Rp 24.5M", icon: BarChart2, change: "+8%" },
    { label: "Tingkat Konversi", value: "24%", icon: BarChart2, change: "+2%" },
  ];

  // Filter courses based on search term
  const filteredCourses = courseList.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete course
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the course
    console.log(`Deleting course: ${selectedCourse.id}`);
    setShowDeleteModal(false);
    // Then refresh the course list
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md z-20 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <div
            className={`flex items-center ${
              !sidebarOpen && "justify-center w-full"
            }`}
          >
            <span
              className={`text-xl font-bold text-orange-500 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Admin<span className="italic">Panel</span>
            </span>
            {!sidebarOpen && (
              <span className="text-xl font-bold text-orange-500">A</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "courses", label: "Kursus", icon: BookOpen },
              { id: "users", label: "Pengguna", icon: Users },
              { id: "content", label: "Konten", icon: FileText },
              { id: "settings", label: "Pengaturan", icon: Settings },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-600 hover:bg-gray-100"
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
            {activeTab === "courses" && "Manajemen Kursus"}
            {activeTab === "users" && "Manajemen Pengguna"}
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
                A
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">
                          {stat.value}
                        </h3>
                      </div>
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <stat.icon size={24} className="text-orange-500" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span
                        className={`text-xs font-medium ${
                          stat.change.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Aktivitas Terbaru
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        user: "Tirta Hakim",
                        action: "menambahkan kursus baru",
                        time: "2 jam yang lalu",
                      },
                      {
                        user: "Julian Sanz",
                        action: "mengupdate konten homepage",
                        time: "5 jam yang lalu",
                      },
                      {
                        user: "Muhammad Rusdi",
                        action: "menghapus pengguna",
                        time: "1 hari yang lalu",
                      },
                      {
                        user: "Admin",
                        action: "mengubah pengaturan website",
                        time: "2 hari yang lalu",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-medium mr-3">
                          {activity.user.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm text-gray-800">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.action}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Kursus Populer
                  </h3>
                  <div className="space-y-4">
                    {courseList.slice(0, 4).map((course, index) => (
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
                          <h4 className="text-sm font-medium text-gray-800">
                            {course.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {course.mentor}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-800">
                            245
                          </p>
                          <p className="text-xs text-gray-500">Siswa</p>
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
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Cari kursus..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-80"
                  />
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2">
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
                          Mentor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jumlah Video
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={course.image || "/placeholder.svg"}
                                alt={course.title}
                                className="w-10 h-10 rounded object-cover mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {course.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ID: {course.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {course.mentor}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {course.videos.length}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
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
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      Tidak ada kursus yang ditemukan
                    </p>
                  </div>
                )}

                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Menampilkan {filteredCourses.length} dari{" "}
                    {courseList.length} kursus
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
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Manajemen Pengguna
              </h3>
              <p className="text-gray-600">
                Halaman manajemen pengguna sedang dalam pengembangan.
              </p>
            </div>
          )}

          {activeTab === "content" && (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Manajemen Konten
              </h3>
              <p className="text-gray-600">
                Halaman manajemen konten sedang dalam pengembangan.
              </p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Pengaturan Website
              </h3>
              <p className="text-gray-600">
                Halaman pengaturan sedang dalam pengembangan.
              </p>
            </div>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Konfirmasi Hapus
            </h3>
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
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
