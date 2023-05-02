import React from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import {
  setSuggestedPrice,
  setTotalAmountDue,
  setIsComponentRendered,
} from "../redux/features/fuelQuote"
import { useNavigate } from "react-router-dom"

const NewFuelQuote = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const id = useSelector((state) => state.user.userId)

  const { address1, address2, city, stateCode, zipcode } = useSelector(
    (state) => state.client
  )

  const suggested_price = useSelector((state) => {
    if (state.fuelQuote.isComponentRendered) {
      return state.fuelQuote.suggested_price
    }
    return null
  })

  const total_amount_due = useSelector((state) => {
    if (state.fuelQuote.isComponentRendered) {
      return state.fuelQuote.total_amount_due
    }
    return null
  })

  async function handleGetQuote(e) {
    e.preventDefault()
    const formData = {
      user_credentials: id,
      gallons_requested: document.getElementById("galsReqd").value,
      _state: stateCode,
    }
    try {
      const response = await fetch("http://localhost:3500/new-fuel-quote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const { message, _sP, _tA } = await response.json()

      if (response.status === 200) {
        alert(message)
        batch(() => {
          dispatch(setSuggestedPrice(_sP))
          dispatch(setTotalAmountDue(_tA))
          dispatch(setIsComponentRendered(true))
        })
        // update slice
        // navigate("/user/fuel-quote-history")
      } else alert(message)
    } catch (error) {
      console.error(error)
      alert("Unable to complete request")
    }
  }
  async function handleOnSubmit(e) {
    e.preventDefault()

    // console.log(document.getElementById("delivDate").value);

    const formData = {
      user_credentials: id,
      gallons_requested: document.getElementById("galsReqd").value,
      delivery_date: document.getElementById("delivDate").value,
      address1: address1,
      address2: address2,
      city: city,
      _state: stateCode,
      zipcode: zipcode,
    }
    try {
      const response = await fetch("http://localhost:3500/new-fuel-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const { message } = await response.json()

      if (response.status === 200 || response.status === 201) {
        navigate("/user/fuel-quote-history")
        dispatch(setIsComponentRendered(false))
        dispatch(setSuggestedPrice(undefined))
        dispatch(setTotalAmountDue(undefined))
      } else alert(message)
    } catch (error) {
      console.error(error)
      alert("Unable to complete request")
    }
  }

  return (
    <div>
      <h1>Fuel Quote Form</h1>
      <fieldset>
        <form onSubmit={handleOnSubmit}>
          <p>
            <label htmlFor="galsReqd">
              <b>Gallons Requested:</b>{" "}
            </label>
            <input
              type="number"
              name="gallons"
              id="galsReqd"
              required
              autoFocus
            />
            <label htmlFor="delivDate">
              <b>Delivery Date:</b>
            </label>
            <input
              onChange={() =>
                console.log(document.getElementById("delivDate").value)
              }
              type="date"
              name="date"
              id="delivDate"
              required
            />
          </p>
          <button
            className="form__button"
            type="button"
            onClick={handleGetQuote}
          >
            Get Quote
          </button>
          <p className="button">
            <input type="submit" value="Submit" id="hoverYes" />
          </p>
        </form>
      </fieldset>
      <p>
        <br />
      </p>
      <fieldset>
        <div>
          <p>
            <b>Delivery Address: </b>
            {address1} {address2} {city}, {stateCode} {zipcode}
          </p>
        </div>
        <p>
          <b>Suggested price:</b>
          {suggested_price
            ? "$" +
              (
                Math.round((suggested_price + Number.EPSILON) * 100) / 100
              ).toFixed(2)
            : ""}
        </p>
        <p>
          <b>Total:</b>
          {total_amount_due
            ? "$" +
              (
                Math.round((total_amount_due + Number.EPSILON) * 100) / 100
              ).toFixed(2)
            : ""}
        </p>
      </fieldset>
    </div>
  )
}

export default NewFuelQuote
