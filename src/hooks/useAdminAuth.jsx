import { useNavigate } from "react-router";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const useAdminAuth = () => {
  const navigate = useNavigate();

  const login = (username, password) => {
    if (
      username.trim().toLowerCase() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      return { success: true };
    } else {
      return { success: false, message: "Username atau password salah" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  return {
    login,
    logout,
    isAdminLoggedIn,
  };
};

export default useAdminAuth;
