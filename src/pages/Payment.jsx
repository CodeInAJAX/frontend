"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { courseList, paymentMethods } from "../utils/content"
import { useAuth } from "../context/authContext"
import usePageTitle from "../hooks/usePageTitle"

const Payment = () => {
  usePageTitle("Pembayaran")
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, purchaseCourse, isCoursePurchased } = useAuth()

  const courseId = Number.parseInt(id)
  const course = courseList.find((c) => c.id === courseId)

  const [selectedMethod, setSelectedMethod] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate("/login", { state: { from: `/payment/${id}` } })
      return
    }

    // Check if course exists
    if (!course) {
      setError("Kursus tidak ditemukan")
      return
    }

    // Check if course is already purchased
    if (isCoursePurchased(courseId)) {
      navigate(`/course/${id}`)
      return
    }

    // Check if course is free
    if (!course.isPaid) {
      // Auto-purchase free courses
      purchaseCourse(courseId)
      navigate(`/course/${id}`)
      return
    }
  }, [user, course, courseId, id, isCoursePurchased, navigate, purchaseCourse])

  const handlePayment = (e) => {
    e.preventDefault()

    if (!selectedMethod) {
      setError("Silakan pilih metode pembayaran")
      return
    }

    setLoading(true)
    setError("")

    // Simulate payment processing
    setTimeout(() => {
      // Purchase the course
      purchaseCourse(courseId)
      setLoading(false)
      setSuccess(true)

      // Redirect to course after 2 seconds
      setTimeout(() => {
        navigate(`/course/${id}`)
      }, 2000)
    }, 1500)
  }

  if (!course) {
    return <div className="min-h-screen p-10 text-center text-xl text-red-700">Kursus tidak ditemukan.</div>
  }

  return (
    <section className="min-h-screen py-16 px-4 md:px-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Pembayaran Kursus</h1>

        {success ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg mb-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Pembayaran Berhasil!</h2>
            <p>Terima kasih telah membeli kursus ini. Anda akan dialihkan ke halaman kursus dalam beberapa detik...</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Course Details */}
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Detail Pesanan</h2>

              <div className="flex items-start gap-4 mb-6">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">Mentor: {course.mentor}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Harga Kursus</span>
                  <span>Rp {course.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Diskon</span>
                  <span>- Rp 0</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t">
                  <span>Total</span>
                  <span>Rp {course.price.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="md:w-1/2">
              <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
                )}

                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`block border rounded-lg p-4 cursor-pointer transition ${
                        selectedMethod === method.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedMethod === method.id}
                          onChange={() => setSelectedMethod(method.id)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-medium ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {loading ? "Memproses..." : "Bayar Sekarang"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Payment
