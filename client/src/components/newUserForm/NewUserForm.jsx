import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewUserForm.scss";

const NewUserForm = ({ loggedIn, setLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const registrationHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/register`,
        {
          name,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // setLoggedIn(true);
        console.log("working");
        navigate("/");
      })
      .catch((err) => {
        // setLoggedIn(false);
        console.log("not working");
        if (err.response.data.code === 11000) {
          let keyName = Object.keys(err.response.data.keyValue)[0];
          setErrors([`The ${keyName} provided already exists.`]);
        } else {
          console.log(err);
          const errorResponse = err.response.data.errors;
          const errorArray = [];
          for (const key of Object.keys(errorResponse)) {
            errorArray.push(errorResponse[key].message);
          }
          setErrors(errorArray);
        }
      });
  };

  return (
    <div>
      <div className="errorMessage">
        {errors ? errors.map((err) => <h3>{err}</h3>) : null}
      </div>

      <div className="loginForm">
        <h2>Sign-Up</h2>
        <form onSubmit={registrationHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="text"
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
          <button type="reset">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
