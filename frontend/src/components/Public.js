import React from "react"
import { NavLink } from "react-router-dom"
import { activeLink } from "../App"

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">FuelMule!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Get a free quote today</p>
        <br />
        <p>Owner: Group 27</p>
      </main>
      <footer>
        <NavLink to="/login" className={activeLink}>
          Login
        </NavLink>
      </footer>
    </section>
  )
  return content
}

export default Public
