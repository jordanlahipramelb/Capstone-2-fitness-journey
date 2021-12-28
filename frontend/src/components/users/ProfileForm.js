import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import FitnessJourneyApi from "../../api";
import UserContext from "../auth/UserContext";

const ProfileForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    password: "",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    city: currentUser.city,
    state: currentUser.state,
    bio: currentUser.bio,
    fitnessType: currentUser.fitnessType,
  });
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);
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
  const listStates = map(states);
  const listTypes = map(fitnessTypes);

  /** Handle form submission:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      city: formData.city,
      state: formData.state,
      bio: formData.bio,
      fitnessType: formData.fitnessType,
    };

    let username = formData.username;
    let updatedUser;

    console.log(profileData);
    try {
      // calls API when form is submitted
      updatedUser = await FitnessJourneyApi.saveProfile(username, profileData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData((formData) => ({ ...formData, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  };

  /** Handle form data changing */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
    setFormErrors([]);
  };

  return (
    <div className="ProfileForm mb-5">
      <div className="container col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3>Profile</h3>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Username</label>
                <p className="form-control-plaintext">{formData.username}</p>
              </div>
              <div className="form-group">
                <label htmlFor="firstName" className="mt-2">
                  First Name
                </label>
                <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="mt-2">
                  Last Name
                </label>
                <input
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="mt-2">
                  Email
                </label>
                <input
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="city" className="mt-2">
                  City
                </label>

                <input
                  name="city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state" className="mt-2">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  className="form-control"
                  value={formData.state}
                  onChange={handleChange}
                >
                  {listStates}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bio" className="mt-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="form-control"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fitnessType" className="mt-2">
                  Fitness Type
                </label>
                <select
                  id="fitnessType"
                  name="fitnessType"
                  className="form-control"
                  value={formData.fitnessType}
                  onChange={handleChange}
                >
                  {listTypes}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="mt-4">
                  Confirm password to make changes:
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                {formErrors.length ? (
                  <Alert type="danger" messages={formErrors} />
                ) : null}

                {saveConfirmed ? (
                  <Alert type="success" messages={["Updated successfully."]} />
                ) : null}
              </div>
              <button
                className="btn btn-primary btn-block mt-4"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const map = (listName) => {
  return listName.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));
};
export default ProfileForm;
