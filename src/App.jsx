import { RouterProvider } from "react-router"
import { router } from "./routers"
import { AuthProvider } from "./context/authContext"

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
