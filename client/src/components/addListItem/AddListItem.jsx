import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddListItem.scss";

const AddListItem = () => {
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imagePath, setImagePath] = useState(null);
  const [lists, setLists] = useState([]);
  const [listId, setListId] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // Fetch current user data to access available categories
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

  const resetHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePath(reader.result);
    };
  };

  const imageHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/items/newItemToList`,
        {
          itemName,
          brand,
          quantity,
          imagePath,
          listId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate(-1);
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
    <div className="newItemPage">
      <div className="itemForm">
        <h2>Add an Item</h2>
        <form onSubmit={submitHandler} onReset={resetHandler}>
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              id="itemName"
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="list">List</label>
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
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              id="brand"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              id="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              capture="environment"
              name="image"
              id="image"
              onChange={imageHandler}
            />
          </div>
          <div className="btn">
            <button className="submitBtn" type="submit">
              Add Item
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

export default AddListItem;
