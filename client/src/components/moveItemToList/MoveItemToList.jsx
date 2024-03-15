import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import axios from "axios";
import "./MoveItemToList.scss";

const MoveItemToList = ({ item }) => {
  const [listOptions, setListOptions] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [itemName] = useState(item.itemName);
  const [brand, setBrand] = useState(item.brand ? item.brand : "");
  const [quantity, setQuantity] = useState(item.quantity ? item.quantity : 0);
  const [imagePath, setImagePath] = useState(
    item.imagePath ? item.imagePath : null
  );
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const itemId = item._id;
  const lists = [];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setListOptions(res.data.user.lists);
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

  const moveToListHandler = (e) => {
    e.preventDefault();

    setSuccess(false);
    setErrors([]);

    if (selectedLists.length < 1) {
      setErrors([
        "Please select a list.",
      ]);
      return;
    }

    selectedLists.forEach((list) => {
      lists.push(list._id);
    });

    axios
      .patch(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/items/existingItemToLists`,
        {
          itemId,
          itemName,
          brand,
          quantity,
          imagePath,
          lists,
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
      <form onSubmit={moveToListHandler}>
        <div className="moveItemToListForm">
          <div className="form-group">
            <label htmlFor="lists">Lists</label>
            <MultiSelect
              className="multiselect"
              value={selectedLists}
              onChange={(e) => setSelectedLists(e.target.value)}
              options={listOptions}
              optionLabel="listName"
              display="chip"
              placeholder="Select Lists"
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

export default MoveItemToList;
