import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DeleteUser.scss";

const DeleteUser = ({ setDeleteToggle, deleteToggle }) => {
  const { getUser, setLoggedIn } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
          axios
          .post(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/logout`,
            {},
            { withCredentials: true }
          )
          .then((res) => {
            setLoggedIn(false);
            console.log(res);
            getUser();
            navigate("/");
            setOpen(false);
          })
          .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="overlay">
      <div className="deleteUserAlert">
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
      </div>
    </div>
  );
};

export default DeleteUser;
