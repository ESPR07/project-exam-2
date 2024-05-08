import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import VenuePage from "./pages/VenuePage"
import { createContext, useState } from "react"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"

type PrivateRoute = {
  auth: {
    isLoggedIn: boolean
  },
  children: JSX.Element
}

export const AuthContext = createContext<{isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}>({isLoggedIn: false, setIsLoggedIn: () => {}});

function Layout() {

  return(
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

function App() {
  const authToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authToken? true : false);
  const contextValue = {isLoggedIn, setIsLoggedIn};

  function PrivateRoute({auth: {isLoggedIn}, children} : PrivateRoute) {
    return isLoggedIn ? children : <Navigate to="/" />
  }

  function PrivateRouteReverseCheck({auth: {isLoggedIn}, children} : PrivateRoute) {
    return !isLoggedIn ? children : <Navigate to="/" />
  }

  return (
    <AuthContext.Provider value={contextValue}>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="venue/:id" element={<VenuePage/>}/>
        <Route path="register" element={<PrivateRouteReverseCheck auth={{isLoggedIn}} children={<RegisterPage/>}/>}/>
        <Route path="profile" element={<PrivateRoute auth={{isLoggedIn}} children={<ProfilePage/>}/>}/>
        <Route path="profile/create-venue" element={<PrivateRoute auth={{isLoggedIn}} children={<RegisterPage/>}/>}/>
      </Route>
    </Routes>
    </AuthContext.Provider>
  )
}

export default App
