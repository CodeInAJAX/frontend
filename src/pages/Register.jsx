import bgGrid from "../assets/bgGrid.png";
import logo from "../assets/codeinajaLogo.svg";
import usePageTitle from "../hooks/usePageTitle";
import useRole from "../hooks/useRole";
const Register = () => {
  usePageTitle("Register");

  const { role, handleRoleChange } = useRole();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgGrid})` }}
      />

      <div className="z-10 w-full max-w-md px-6 py-1">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4">
            <img src={logo} alt="codeinaja logo" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-semibold text-black mb-4">Registrasi</h1>
          <p className="text-gray-400 text-sm mt-1 text-center font-medium leading-relaxed">
            Buat akun sekarang untuk akses penuh ke
            <br /> seluruh course di CodeinAja Course.
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Masukkan Nama"
            className="input-style"
          />
          <input
            type="email"
            placeholder="Masukkan Email"
            className="input-style"
          />
          <input
            type="password"
            placeholder="Masukkan Password"
            className="input-style"
          />

          {/* Pilihan Peran */}
          <div>
            <p className="text-gray-700 text-sm mb-2">Daftar sebagai:</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={role === "guru"}
                    onChange={() => handleRoleChange("guru")}
                    className="custom-checkbox"
                  />
                  <span>Guru</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={role === "siswa"}
                    onChange={() => handleRoleChange("siswa")}
                    className="custom-checkbox"
                  />
                  <span>Siswa</span>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-style w-full">
            Daftar
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
  );
};

export default Register;
