"use client";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAdminAuth from "../hooks/useAdminAuth";
import usePageTitle from "../hooks/usePageTitle";
import logo from "../assets/codeinajaLogo.svg";

const AdminLogin = () => {
  usePageTitle("Admin Login");
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(credentials.username, credentials.password);

    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="p-8 rounded-lg w-full max-w-md md:shadow-sm bg-white">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 mb-4">
            <img
              src={logo || "/placeholder.svg"}
              alt="codeinaja logo"
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm">
            Masuk ke panel admin CodeinAja
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="admin"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-orange-500 hover:underline">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
