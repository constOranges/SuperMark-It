import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./UpdateListItemForm.scss";

const UpdateListItemForm = () => {
  const location = useLocation();
  let { item, listId } = location.state;
  const [itemName, setItemName] = useState(item.itemName);
  const [brand, setBrand] = useState(item.brand);
  const [quantity, setQuantity] = useState(item.quantity);
  const [imagePath, setImagePath] = useState("");
  const [errors, setErrors] = useState([]);

  const itemId = item._id;

  if (typeof listId === "object") {
    listId = listId.id;
  }

  const navigate = useNavigate();

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

  const resetHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/items/updateItemInList`,
        {
          itemName,
          brand,
          quantity,
          imagePath,
          listId,
          itemId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data;
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key]);
        }
        setErrors(errorArray);
      });
  };

  return (
    <div className="updateItemPage">
      <div className="itemForm">
        <h2>Edit Item</h2>
        <form onSubmit={submitHandler} onReset={resetHandler}>
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              className="form-control"
              name="itemName"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              id="brand"
              value={brand}
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
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Change Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              capture="environment"
              name="image"
              id="image"
              key="image"
              onChange={imageHandler}
            />
          </div>
          <div className="btn">
            <button className="submitBtn" type="submit">
              Update Item
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

export default UpdateListItemForm;
