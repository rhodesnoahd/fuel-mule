import { NavLink, useNavigate } from "react-router-dom"
import { activeLink } from "../App"
import { batch, useSelector, useDispatch } from "react-redux"
import {
  setClientId,
  setFullname,
  setAddress1,
  setAddress2,
  setCity,
  setStateCode,
  setZipCode,
} from "../redux/features/client"
import { setUserId, setUserName } from "../redux/features/user"
import { setQuotes, setIsComponentRendered } from "../redux/features/fuelQuote"

function Navbar() {
  const userName = useSelector((state) => state.user.userName)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOut = (e) => {
    e.preventDefault()

    batch(() => {
      dispatch(setUserId(undefined))
      dispatch(setUserName(undefined))
      dispatch(setClientId(undefined))
      dispatch(setFullname(undefined))
      dispatch(setAddress1(undefined))
      dispatch(setAddress2(undefined))
      dispatch(setCity(undefined))
      dispatch(setStateCode(undefined))
      dispatch(setZipCode(undefined))
      dispatch(setUserId(undefined))
      dispatch(setUserName(undefined))
      dispatch(setQuotes(undefined))
      dispatch(setIsComponentRendered(undefined))
    })
    navigate("/")
  }

  return (
    <nav
      style={{
        backgroundColor: "gray",
        height: "50px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <NavLink to="/" className={activeLink}>
        | FuelMule |
      </NavLink>
      {userName ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <NavLink to="/user/profile-management" className={activeLink}>
            | Manage Profile |
          </NavLink>
          <NavLink to="/user/new-fuel-quote" className={activeLink}>
            | New Quote |
          </NavLink>
          <NavLink to="/user/fuel-quote-history" className={activeLink}>
            | History |
          </NavLink>
          <NavLink to="logout" className={activeLink} onClick={logOut}>
            | Logout |
          </NavLink>
        </div>
      ) : (
        <>
          <NavLink to="login" className={activeLink}>
            | Login |
          </NavLink>
          <NavLink to="register" className={activeLink}>
            | Register |
          </NavLink>
        </>
      )}
      {/* <NavLink to="/" className={activeLink}>
        | FuelMule |
      </NavLink> */}
      {/* <div style={{ display: "flex", alignItems: "center" }}>
        {/* <a href="/user/profile-management" style={{ color: 'white', marginRight: '20px' }}>Profile</a> 
        <NavLink to="/user/profile-management" className={activeLink}>
          | Manage Profile |
        </NavLink>
        <NavLink to="/user/new-fuel-quote" className={activeLink}>
          | New Quote |
        </NavLink>
        <NavLink to="/user/fuel-quote-history" className={activeLink}>
          | History
        </NavLink>
      </div> */}
    </nav>
  )
}

export default Navbar
