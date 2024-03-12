import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import "./EditUserForm.scss";
import ErrorMessage from "../errorMessage/ErrorMessage";

const EditUserForm = ({ user, getUser, setLoggedIn }) => {
  const [timezoneArray, setTimezoneArray] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(user?.email ? user?.email : "");
  const [timezone, setTimezone] = useState(
    user?.timezone ? user?.timezone : ""
  );
  const [errors, setErrors] = useState([]);
  const [errorToggle, setErrorToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedTimezones = moment.tz.names();
    setTimezoneArray(fetchedTimezones);
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

  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/updateuser`,
        {
          email,
          oldPassword,
          newPassword,
          confirmPassword,
          timezone,
        },
        { withCredentials: true }
      )
      .then((res) => {
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

  const deleteUserHandler = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        `Are you sure you want to delete this account? This cannot be undone.`
      )
    ) {
      axios
        .patch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/deleteuser`,
          {
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          getUser();
          navigate("/");
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
    }
  };

  return (
    <div className="newUserPage">
      <div className="registrationForm">
        <h2>Update Account Settings</h2>
        <form onSubmit={updateHandler} onReset={resetHandler}>
          <div className="form-group">
            <label htmlFor="email">Change Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
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
            <label htmlFor="password">Old Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
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
              Update User
            </button>
            <button className="cancelBtn" type="reset">
              Cancel
            </button>
          </div>
        </form>

        <h4
          className="deleteText"
          onClick={() => setDeleteToggle(!deleteToggle)}
        >
          {" "}
          Delete User
        </h4>
        {deleteToggle ? (
          <form onSubmit={deleteUserHandler}>
            <div className="form-group">
              <label htmlFor="password">Enter Current Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="btn">
              <button className="deleteBtn" type="submit">
                Delete User
              </button>
              <button
                className="cancelBtn"
                type="reset"
                onClick={() => setDeleteToggle(!deleteToggle)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}
      </div>
      {errorToggle ? (
        <ErrorMessage errors={errors} errorHandler={errorHandler} />
      ) : null}
    </div>
  );
};

export default EditUserForm;
