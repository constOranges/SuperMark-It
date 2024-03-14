import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteUser.scss";

const DeleteUser = ({ setPassword, setDeleteToggle, deleteToggle }) => {
  const navigate = useNavigate();
  console.log("working");

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
