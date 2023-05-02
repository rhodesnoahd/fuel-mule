import React from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setClientId,
  setFullname,
  setAddress1,
  setAddress2,
  setCity,
  setStateCode,
  setZipCode,
} from "../redux/features/client";

const ProfileManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useSelector((state) => state.user.userId);

  async function handleOnSubmit(e) {
    e.preventDefault();

    const formData = {
      user_credentials: id,
      fullname: document.getElementById("fullname_input").value,
      address1: document.getElementById("address1_input").value,
      address2: document.getElementById("address2_input").value,
      city: document.getElementById("city_input").value,
      _state: document.getElementById("stateCode_selection").value,
      zipcode: document.getElementById("zipcode_input").value,
    };
    try {
      const response = await fetch("http://localhost:3500/profile-management", {
        // TODO change method depending on client
        // method: "POST",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const {
        message,
        _uC,
        _fullname,
        _address1,
        _address2,
        _city,
        __state,
        _zipcode,
      } = await response.json();

      batch(() => {
        dispatch(setClientId(_uC));
        dispatch(setFullname(_fullname));
        dispatch(setAddress1(_address1));
        dispatch(setAddress2(_address2));
        dispatch(setCity(_city));
        dispatch(setStateCode(__state));
        dispatch(setZipCode(_zipcode));
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/user/new-fuel-quote");
      } else alert(message);
    } catch (error) {
      console.error(error);
      alert("Unable to create client");
    }
  }

  return (
    <div className="center">
      <h1>Please Create Profile</h1>
      <form className="" onSubmit={handleOnSubmit}>
        <div className="txt_field">
          <input
            type="text"
            id="fullname_input"
            className="form_input"
            required={true}
            maxLength="50"
            placeholder="Full Name"
          />
        </div>
        <div className="txt_field">
          <input
            type="text"
            id="address1_input"
            className="form_input"
            required={true}
            maxLength="100"
            placeholder="Address 1"
          />
        </div>
        <div className="txt_field">
          <input
            type="text"
            id="address2_input"
            className="form_input"
            optional="true"
            maxLength="100"
            placeholder="Address 2"
          />
        </div>
        <div className="txt_field">
          <input
            type="text"
            id="city_input"
            className="form_input"
            required={true}
            maxLength="100"
            placeholder="City"
          />
        </div>
        <div>
          <label htmlFor="State-dropdown">Select State:</label>
          <select name="state" id="stateCode_selection" required>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="txt_field">
          <input
            type="text"
            id="zipcode_input"
            className="form_input"
            required={true}
            maxLength="9"
            minLength="5"
            placeholder="Zipcode"
          />
        </div>
        <button className="form__button" type="submit">
          Update Information
        </button>
      </form>
    </div>
  );
};

export default ProfileManagement;
