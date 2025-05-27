
import bgGrid from "../assets/bgGrid.png"
import logo from "../assets/codeinajaLogo.svg"
import usePageTitle from "../hooks/usePageTitle"
import useRole from "../hooks/useRole"
import { useEffect } from "react"
import { registerSchema } from "../validation/users.js"
import {registerAPI} from "../api/users/v1.js";
import useGender from "../hooks/useGender.jsx";
import useErrors from "../hooks/useErrors.jsx";
import useStatusMessage from "../hooks/useStatusMessage.jsx";
import useForm from "../hooks/useForm.jsx";
import useSubmitting from "../hooks/useSubmitting.jsx";

const Register = () => {
  usePageTitle("Register")
  const { role, handleRoleChange } = useRole()
  const { gender, handleGenderChange } = useGender()

  // State for form data
  const { formData, setFormData, handleChangeForm, handleValidation} = useForm({
    nama: "",
    email: "",
    password: "",
    role: role,
    gender: gender,
    photo: null,
  });

  // State for errors message
  const { errors, setErrors, handleWhenInputForm, handleZodErrors } = useErrors();

  // State for loading and status message
  const {isSubmitting, setIsSubmitting} = useSubmitting()
  const { statusMessage, setStatusMessage } = useStatusMessage()



  // Update role in form data when role is changed
  useEffect(() => {
    setFormData((prev) => ({ ...prev, role }))
  }, [role])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      gender
    }))
  }, [gender]);

  // Handler for input change
  const handleChange = (e) => {
    handleChangeForm(e);

    // Clear error for this field when user starts typing
    handleWhenInputForm(e)
  }

  // Handler for form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validasi form with Zod
    try {
      handleValidation(registerSchema);
      // clear errors when valid data
      setErrors({})

      setIsSubmitting(true)
      setStatusMessage({ type: "", message: "" })
      try {
        // default photo profile
        const photoUrl = `${window.location.origin}/assets/profile.jpg`;

        // Format data to send request api
        const userData = {
          name: formData.nama,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          gender: formData.gender,
          photo: photoUrl,

        }
        const response = await registerAPI(userData);

        setStatusMessage({
          type: "success",
          message: `Berhasil mendaftar akun dengan email ${response.email}`,
        })

        // Reset form after success response
        setFormData({
          name: "",
          email: "",
          password: "",
          role: role,
          gender: gender,
          photo: null,
        })

        setStatusMessage({
          type: "success",
          message: "Berhasil registrasi, halaman akan beralih ke login...",
        })

        // Redirect to log in
        setTimeout(() => {
          window.location.href = "/login"
        }, 200)

      } catch (error) {
        console.error("Registration error:", error)
        setStatusMessage({
          type: "error",
          message: error.message ? error.message : "Registrasi gagal. Silahkan coba lagi.",
        })
      } finally {
        setIsSubmitting(false)
      }
    } catch (zodError) {
      handleZodErrors(zodError);
    }
  }


  return (
      <div className="min-h-screen flex items-center justify-center bg-white relative">
        <div className="absolute inset-0 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bgGrid})` }} />

        <div className="z-10 w-full max-w-md px-6 py-1">
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 mb-4">
              <img src={logo || "/placeholder.svg"} alt="codeinaja logo" className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-semibold text-black mb-4">Registrasi</h1>
            <p className="text-gray-400 text-sm mt-1 text-center font-medium leading-relaxed">
              Buat akun sekarang untuk akses penuh ke
              <br /> seluruh course di CodeinAja Course.
            </p>
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
            <div>
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan Nama"
                  className={`input-style ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan Email"
                  className={`input-style ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan Password"
                  className={`input-style ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Gender Selection */}
            <div>
              <p className="text-gray-700 text-sm mb-2">Jenis Kelamin:</p>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                      type="checkbox"
                      checked={gender === "male"}
                      onChange={() => handleGenderChange("male")}
                      className="custom-checkbox"
                  />
                  <span>Laki-laki</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                      type="checkbox"
                      checked={gender === "female"}
                      onChange={() => handleGenderChange("female")}
                      className="custom-checkbox"
                  />
                  <span>Perempuan</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>

            {/* Pilihan Peran */}
            <div>
              <p className="text-gray-700 text-sm mb-2">Daftar sebagai:</p>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={role === "mentor"}
                        onChange={() => handleRoleChange("mentor")}
                        className="custom-checkbox"
                    />
                    <span>Guru</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={role === "student"}
                        onChange={() => handleRoleChange("student")}
                        className="custom-checkbox"
                    />
                    <span>Siswa</span>
                  </label>
                </div>
              </div>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            <button type="submit" className="submit-style w-full" disabled={isSubmitting}>
              {isSubmitting ? "Mendaftar..." : "Daftar"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Sudah punya akun?{" "}
            <a href="/login" className="text-orange-500 font-medium">
              Masuk
            </a>
          </p>
        </div>
      </div>
  )
}

export default Register
