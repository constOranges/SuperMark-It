import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MoveToList.scss";

const MoveToList = ({ itemId }) => {
  const [lists, setLists] = useState([]);
  const [listId, setListId] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setLists(res.data.user.lists);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const listHandler = (e) => {
    e.preventDefault();
    setListId(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/items/existingItemToList`,
        {
          itemId,
          listId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setSuccess(true);
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

  return (
    <div className="dropDownForm">
      <form onSubmit={submitHandler}>
        <div className="moveItemForm">
          <div className="form-group">
            <select
              name="lists_id"
              className="listSelect"
              aria-label="Select List"
              id="lists_id"
              onChange={listHandler}
            >
              <option defaultValue>Select List</option>
              {lists.map((list) => {
                return (
                  <option value={list._id} key={list._id}>
                    {list.listName}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button className="addBtn" type="submit">
              Add Item
            </button>
          </div>
        </div>
      </form>
      {success ? <p>Item added succesfully!</p> : null}
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

export default MoveToList;
