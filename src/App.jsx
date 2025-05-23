import { RouterProvider } from "react-router"
import { router } from "./routers"
import { AppProvider } from "./context/appContext.jsx"

const App = () => {
  return (
      <AppProvider>
      <RouterProvider router={router} />
      </AppProvider>
  )
}

export default App
