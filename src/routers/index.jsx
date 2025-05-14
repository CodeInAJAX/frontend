import { createBrowserRouter } from "react-router"
import RootLayout from "../layouts/RootLayout"
import ErrorPage from "../components/ErrorPage"
import Homepage from "../pages/_index"
import About from "../pages/About"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Contact from "../pages/Contact"
import Course from "../pages/Course"
import CourseDetail from "../pages/CourseDetail"
import AdminDashboard from "../pages/AdminDashboard"
import AdminLogin from "../pages/AdminLogin"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/courses", element: <Course /> },
      { path: "/course/:id", element: <CourseDetail /> },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
])
