import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"

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
      </Route>
    </Routes>
  )
}

export default App
