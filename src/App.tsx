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

type ProfileContext = {
  isLoggedIn: boolean,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  name: string | null,
  avatar: string | null,
  banner: string | null,
  isVenueManager: boolean | null,
}

export const AuthContext = createContext<ProfileContext>({isLoggedIn: false, setIsLoggedIn: () => {}, name: "", avatar: "", banner: "", isVenueManager: false});

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
  const name = localStorage.getItem("name");
  const avatar = localStorage.getItem("avatar");
  const banner = localStorage.getItem("banner");
  const isVenueManager = Boolean(localStorage.getItem("isManager"));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authToken? true : false);
  const contextValue = {isLoggedIn, setIsLoggedIn, name, avatar, banner, isVenueManager};

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
        <Route path="profile/create-venue" element={<PrivateRoute auth={{isLoggedIn}} children={<CreateVenuePage/>}/>}/>
        <Route path="profile/update-venue/:id" element={<PrivateRoute auth={{isLoggedIn}} children={<EditVenuePage/>}/>}/>
      </Route>
    </Routes>
    </AuthContext.Provider>
  )
}

export default App
