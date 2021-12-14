import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  /** Handle form submission. */

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    // login function prop passed in from API->App->Routes
    let result = await login(formData);

    // redirect to companies if successful
    if (result.success) {
      history.push("/companies");
    } else {
      setFormErrors(result.errors);
    }
  };

  /** Updates form field when typing */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const { username, password } = formData;

  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>

        <div className="card  mb-5">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              <button className="btn btn-primary mt-3" onSubmit={handleSubmit}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
