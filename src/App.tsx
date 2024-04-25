import { Outlet, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import { createContext } from "react"
import { dummyVenueList, getVenueList, VenueList } from "./API/Data/getVenueList";

const API_BASE = process.env.API_BASE_URL;
const API_VENUES_PATH = process.env.API_VENUES;
const API_VENUES_URL = `${API_BASE}${API_VENUES_PATH}`

type VenueContext = {
  allVenues: VenueList,
  loading: Boolean,
  error: Boolean
}

export const VenuesContext = createContext<VenueContext>({
  allVenues: dummyVenueList,
  loading: false,
  error: false
});

function Layout() {
  const {venueList, isLoading, isError} = getVenueList(`${API_VENUES_URL}?limit=10`)

  return(
    <VenuesContext.Provider value={{allVenues: venueList, loading: isLoading, error: isError}}>
    <>
      <Navbar/>
      <Outlet/>
    </>
    </VenuesContext.Provider>
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
