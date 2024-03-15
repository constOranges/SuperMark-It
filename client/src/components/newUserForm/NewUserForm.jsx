import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import "./NewUserForm.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";

const NewUserForm = () => {
  const { setLoggedIn, getUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezoneArray, setTimezoneArray] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorToggle, setErrorToggle] = useState(false);
  const navigate = useNavigate();

  const registrationHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/register`,
        {
          name,
          email,
          timezone,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoggedIn(true);
        navigate("/");
        getUser();
      })
      .catch((err) => {
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

  useEffect(() => {
    const fetchedTimezones = moment.tz.names();
    setTimezoneArray(fetchedTimezones);

    const defaultTimezone = moment.tz.guess();
    setTimezone(defaultTimezone);
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      setErrorToggle(true);
    }
  });

  const errorHandler = () => {
    setErrors([]);
    setErrorToggle(false);
  };

  const resetHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="newUserPage">
      <div className="registrationForm">
        <h2>Sign-Up</h2>
        <form onSubmit={registrationHandler} onReset={resetHandler}>
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
            <label htmlFor="timezone">Timezone</label>
            <select
              name="timezone"
              id="timezone"
              className="form-control"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {timezoneArray.map((tz) => (
                <option key={tz} value={tz}>
                  {tz.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
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
              type="password"
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="btn">
            <button className="submitBtn" type="submit">
              Submit
            </button>
            <button className="cancelBtn" type="reset">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {errorToggle ? (
        <ErrorMessage errors={errors} errorHandler={errorHandler} />
      ) : null}
    </div>
  );
};

export default NewUserForm;
