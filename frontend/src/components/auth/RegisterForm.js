import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

const RegisterForm = ({ register }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    bio: "",
    fitnessType: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const states = [
    "---",
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];
  const fitnessTypes = ["---", "Bodybuilder", "Powerlifter", "Powerbuilder"];
  const listStates = states.map((state) => (
    <option value={state}>{state}</option>
  ));
  const listTypes = fitnessTypes.map((type) => (
    <option value={type}>{type}</option>
  ));

  /** Handle form submission. */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let result = await register(formData);

    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  };

  /** Updates form field when typing */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const {
    username,
    password,
    email,
    firstName,
    lastName,
    city,
    state,
    bio,
    fitnessType,
  } = formData;

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card mb-5">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="username" className="mt-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label for="password" className="mt-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label for="firstName" className="mt-2">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label for="lastName" className="mt-2">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label for="email" className="mt-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={handleChange}
                />
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label for="city" className="mt-2">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  className="form-control"
                  value={city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label for="state" className="mt-2">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  className="form-control"
                  value={state}
                  onChange={handleChange}
                >
                  {listStates}
                </select>
              </div>
              <div className="form-group">
                <label for="bio" className="mt-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="form-control"
                  value={bio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label for="fitnessType" className="mt-2">
                  Fitness Type
                </label>
                <select
                  id="fitnessType"
                  name="fitnessType"
                  className="form-control"
                  value={fitnessType}
                  onChange={handleChange}
                >
                  {listTypes}
                </select>
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary mt-3"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
