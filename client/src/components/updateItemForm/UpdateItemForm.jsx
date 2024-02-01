import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateItemForm = () => {
  const location = useLocation();
  let { item, categoryId } = location.state;
  const itemExpDate = item.expDate.slice(0, 10);
  const itemNotifyDate = item.notifyDate.slice(0, 10);
  const [itemName, setItemName] = useState(item.itemName);
  const [brand, setBrand] = useState(item.brand);
  const [quantity, setQuantity] = useState(item.quantity);
  const [expDate, setExpDate] = useState(itemExpDate);
  const [notifyDate, setNotifyDate] = useState(itemNotifyDate);
  const [imagePath, setImagePath] = useState("");
  const [errors, setErrors] = useState([]);

  const itemId = item._id;
  categoryId = categoryId.id;

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
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/items/updateItemInCategory`,
        {
          itemName,
          brand,
          quantity,
          expDate,
          notifyDate,
          imagePath,
          categoryId,
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
        const errorResponse = err.response.data.errors;
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key].message);
        }
        setErrors(errorArray);
      });
  };

  return (
    <div>
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
            <label htmlFor="expDate">Expiration Date</label>
            <input
              type="date"
              className="form-control"
              name="expDate"
              id="expDate"
              pattern="\d{4}-\d{2}-\d{2}"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notifyDate">Notify Date</label>
            <input
              type="date"
              className="form-control"
              name="notifyDate"
              id="notifyDate"
              pattern="\d{4}-\d{2}-\d{2}"
              value={notifyDate}
              onChange={(e) => setNotifyDate(e.target.value)}
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

export default UpdateItemForm;
