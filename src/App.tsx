import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"

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
        <Route path="venue:id" element={""}/>
      </Route>
    </Routes>
  )
}

export default App
