import React from "react"
import { batch, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserId, setUserName } from "../redux/features/user"
import {
  setClientId,
  setFullname,
  setAddress1,
  setAddress2,
  setCity,
  setStateCode,
  setZipCode,
} from "../redux/features/client"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleOnSubmit(e) {
    e.preventDefault()

    const formData = {
      username: document.getElementById("username_input").value,
      password: document.getElementById("password_input").value,
    }

    try {
      const response = await fetch("http://localhost:3500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const { message, _user_id, _user_name, _client_schema } =
        await response.json()

      batch(() => {
        dispatch(setUserId(_user_id))
        dispatch(setUserName(_user_name))
        if (_client_schema) {
          batch(() => {
            dispatch(setClientId(_client_schema.user_credentials))
            dispatch(setFullname(_client_schema.fullname))
            dispatch(setAddress1(_client_schema.address1))
            dispatch(setAddress2(_client_schema.address2))
            dispatch(setCity(_client_schema.city))
            dispatch(setStateCode(_client_schema._state))
            dispatch(setZipCode(_client_schema.zipcode))
          })
        }
        // } else {
        //   dispatch(setFullname(_client_schema.fullname))
        // }
      })
      if (response.status === 200 || response.status === 201) {
        if (_client_schema) {
          navigate("/user/new-fuel-quote")
        } else {
          navigate("/user/profile-management")
        }
      } else alert(message)
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <div className="container">
      <form className="" onSubmit={handleOnSubmit} id="login">
        <h1 className="form__title">Login</h1>
        <div className="form__message form__message--error"></div>
        <div className="form__input-group">
          <input
            type="text"
            id="username_input"
            name="username"
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
            name="password"
            className="form__input"
            required
            placeholder="password"
          />
          <div className="form__input-error-message"></div>
        </div>
        <button className="form__button" type="submit">
          Continue
        </button>
      </form>
    </div>
  )
}

export default Login
