import React from "react";
import bgGrid from "../assets/bgGrid.png";
import logo from "../assets/codeinajaLogo.svg";
import usePageTitle from "../hooks/usePageTitle"; 
const Login = () => {
  usePageTitle("Login");
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgGrid})` }}
      />
      <div className="z-10 w-full max-w-md px-6 py-1">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4 ">
            <img src={logo} alt="codeinaja logo" className="w-12 h-12"/>
          </div>
          <h1 className="text-3xl font-semibold text-black mb-4">Masuk</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
          Yuk mulai perjalanan belajarmu!
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Masukkan alamat email"
            className="input-style"
          />
          <input
            type="password"
            placeholder="Masukkan password"
            className="input-style"
          />
          <button
            type="submit"
            className="submit-style"
          >
            Masuk
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">atau</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          type="button"
          className="w-full py-2 border border-orange-500 text-orange-500 font-semibold rounded-md hover:bg-orange-50 transition"
        >
          Masuk dengan Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{" "}
          <a href="/register" className="text-orange-500 font-medium">
            Registrasi
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
