import React from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  async function handleOnSubmit(e) {
    e.preventDefault()

    const formData = {
      username: document.getElementById("username_input").value,
      password: document.getElementById("password_input").value,
    }

    try {
      const response = await fetch("http://localhost:3500/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const { message } = await response.json()

      if (response.status === 200 || response.status === 201) {
        navigate("/login")
      } else alert(message)
    } catch (error) {
      console.error(error)
      alert("Error registering account")
    }
  }

  return (
    <div className="container">
      <form className="" onSubmit={handleOnSubmit} id="login">
        <h1 className="form__title">Register</h1>
        <div className="form__message form__message--error"></div>
        <div className="form__input-group">
          <input
            type="text"
            id="username_input"
            className="form__input"
            required
            autoFocus
            placeholder="username"
          />
          <div className="form__input-error-message"></div>
        </div>
        <div className="form__input-group">
          <input
            type="password"
            id="password_input"
            className="form__input"
            required
            placeholder="password"
          />
          <div className="form__input-error-message"></div>
        </div>
        <div className="form__input-group">
          <div className="form__input-error-message"></div>
        </div>
        <button className="form__button" type="submit">
          Continue
        </button>
      </form>
    </div>
  )
}

export default Register
