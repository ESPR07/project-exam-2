import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage/Homepage"
import VenuePage from "./pages/VenuePage/VenuePage"
import { createContext, useState } from "react"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import CreateVenuePage from "./pages/CreateVenuePage/CreateVenuePage"
import EditVenuePage from "./pages/EditVenuePage/EditVenuePage"

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
    if(!isLoggedIn) {
      alert("You need to be logged in to access this page, redirecting to homepage.")
    }
    return isLoggedIn ? children : <Navigate to="/" />
  }

  function PrivateRouteReverseCheck({auth: {isLoggedIn}, children} : PrivateRoute) {
    if(isLoggedIn) {
      alert("You are already logged in, redirecting to homepage.");
    }
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
        <Route path="profile/create-venue" element={<PrivateRoute auth={{isLoggedIn}} children={<CreateVenuePage/>}/>}/>
        <Route path="profile/update-venue/:id" element={<PrivateRoute auth={{isLoggedIn}} children={<EditVenuePage/>}/>}/>
      </Route>
    </Routes>
    </AuthContext.Provider>
  )
}

export default App
