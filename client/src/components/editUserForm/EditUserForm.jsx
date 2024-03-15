import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import "./EditUserForm.scss";
import DeleteUser from "../deleteUser/DeleteUser";
import ErrorMessage from "../errorMessage/ErrorMessage";

const EditUserForm = () => {
  const { user, getUser } = useContext(UserContext);
  const [timezoneArray, setTimezoneArray] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
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
          <DeleteUser
            setDeleteToggle={setDeleteToggle}
            deleteToggle={deleteToggle}
            getUser={getUser}
          />
        ) : null}
      </div>
      {errorToggle ? (
        <ErrorMessage errors={errors} errorHandler={errorHandler} />
      ) : null}
    </div>
  );
};

export default EditUserForm;
