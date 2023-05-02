import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Layout from "./components/Layout"

import Welcome from "./pages/Welcome"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UpdateProfileManagement from "./pages/UpdateProfileManagement"
import NewProfileManagement from "./pages/NewProfileManagement"
import NewFuelQuote from "./pages/NewFuelQuote"
import FuelQuoteHistory, { quoteHistoryLoader } from "./pages/FuelQuoteHistory"
import { useSelector } from "react-redux"
import "./App.css"

export const activeLink = (isActive) => (isActive ? "link" : "")

function App() {
  const client = useSelector((state) => state.client.clientId)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="user">
          <Route
            index
            element={
              client ? <UpdateProfileManagement /> : <NewProfileManagement />
            }
          />
          <Route
            path="profile-management"
            element={
              client ? <UpdateProfileManagement /> : <NewProfileManagement />
            }
          />
          <Route path="new-fuel-quote" element={<NewFuelQuote />} />
          <Route
            path="fuel-quote-history"
            element={<FuelQuoteHistory />}
            loader={quoteHistoryLoader}
          />
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
