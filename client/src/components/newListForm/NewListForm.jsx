import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewListForm.scss";

const NewListForm = () => {
  const [listName, setListName] = useState("");
  const [iconPath, setIconPath] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/lists/add`,
        {
          listName,
          iconPath,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data.errors;
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key].message);
        }
        setErrors(errorArray);
      });
  };

  const resetHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="newListPage">
      <div className="categoryForm">
        <h2>New List</h2>
        <form onSubmit={submitHandler} onReset={resetHandler}>
          <div className="form-group">
            <label htmlFor="categoryName">List Name</label>
            <input
              type="text"
              className="form-control"
              name="listName"
              id="listName"
              onChange={(e) => setListName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="iconPath">Icon</label>
            <input
              type="text"
              className="form-control"
              name="iconPath"
              id="iconPath"
              onChange={(e) => setIconPath(e.target.value)}
            />
          </div>
          <div className="btn">
            <button className="submitBtn" type="submit">
              Add List
            </button>
            <button className="cancelBtn" type="reset">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {errors ? (
        <div className="errorMessage">
          {errors.map((err) => (
            <p>{err}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NewListForm;
