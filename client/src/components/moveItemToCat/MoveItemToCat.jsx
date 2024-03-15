import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import axios from "axios";
import "./MoveItemToCat.scss";

const MoveItemToCat = ({ item }) => {
  if (item.expDate && item.notifyDate) {
    var itemExpDate = item.expDate.slice(0, 10);
    var itemNotifyDate = item.notifyDate.slice(0, 10);
  }
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [itemName] = useState(item.itemName);
  const [brand, setBrand] = useState(item.brand ? item.brand : "");
  const [quantity, setQuantity] = useState(item.quantity ? item.quantity : 0);
  const [expDate, setExpDate] = useState(
    itemExpDate ? itemExpDate : null
  );
  const [notifyDate, setNotifyDate] = useState(
    itemNotifyDate ? itemNotifyDate : null
  );
  const [imagePath, setImagePath] = useState(
    item.imagePath ? item.imagePath : null
  );
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const itemId = item._id;
  const categories = [];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setCategoryList(res.data.user.categories);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const moveToCatHandler = (e) => {
    e.preventDefault();
    setSuccess(false);
    setErrors([]);

    if (selectedCategories.length < 1) {
      setErrors([
        "Please select a category.",
      ]);
      return;
    }

    selectedCategories.forEach((category) => {
      categories.push(category._id);
    });

    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL
        }/api/items/existingItemToCategories`,
        {
          itemId,
          itemName,
          brand,
          quantity,
          expDate,
          notifyDate,
          imagePath,
          categories,
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
      <form onSubmit={moveToCatHandler}>
        <div className="moveItemCatForm">
          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            <MultiSelect
              className="multiselect"
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              options={categoryList}
              optionLabel="categoryName"
              display="chip"
              placeholder="Select Categories"
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
          <div>
            <button className="addBtn" type="submit">
              Add Item
            </button>
          </div>
        </div>
      </form>

      {success ? <p>Item added successfully!</p> : null}
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

export default MoveItemToCat;
