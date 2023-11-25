import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNewItem.scss";

const AddNewItem = () => {

    const [itemName, setItemName] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [expDate, setExpDate] = useState(new Date());
    const [notifyDate, setNotifyDate] = useState(new Date());
    const [imagePath, setImagePath] = useState(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();


    const resetHandler = (e) => {
        e.preventDefault();
        navigate("/");
    }


  return (
    <div className="newItemPage">
      <div className="itemForm">
        <h2>Add an Item</h2>
        <form onSubmit={""} onReset={resetHandler}>
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
            <label htmlFor="expDate">Expiration Date</label>
            <input
              type="date"
              className="form-control"
              name="expDate"
              id="expDate"
              pattern="\d{4}-\d{2}-\d{2}"
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
              onChange={(e) => setNotifyDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              id="image"
              onChange={(e) => setImagePath(e.target.value)}
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
}

export default AddNewItem;