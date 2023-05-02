import React from "react"
import { useSelector } from "react-redux"

const Welcome = () => {
  const userName = useSelector((state) => state.user.userName)

  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to{" "}
          <span className="nowrap">FuelMule, {userName || "guest"}!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Get a free quote today</p>
        <p>Owner: Group 27</p>
      </main>
    </section>
  )
  return content
}

export default Welcome
