import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import VenuePage from "./pages/VenuePage"

function Layout() {

  return(
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="venue/:id" element={<VenuePage/>}/>
      </Route>
    </Routes>
  )
}

export default App
