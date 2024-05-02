import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import VenuePage from "./pages/VenuePage"
import { createContext, useState } from "react"
import RegisterPage from "./pages/RegisterPage"

export const AuthContext = createContext<{isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}>({isLoggedIn: false, setIsLoggedIn: () => {}});

function Layout() {
  const authToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authToken? true : false);
  const contextValue = {isLoggedIn, setIsLoggedIn};

  return(
    <>
      <AuthContext.Provider value={contextValue}>
        <Navbar/>
        <Outlet/>
      </AuthContext.Provider>
    </>
  )
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="venue/:id" element={<VenuePage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
