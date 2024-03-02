import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./RenewItem.scss";

const RenewItem = ({ item, categoryId, getCategory }) => {
  if (item.expDate && item.notifyDate) {
    var itemExpDate = item.expDate.slice(0, 10);
    var itemNotifyDate = item.notifyDate.slice(0, 10);
  }
  const [expDate, setExpDate] = useState(
    itemExpDate ? itemExpDate : new Date()
  );
  const [notifyDate, setNotifyDate] = useState(
    itemNotifyDate ? itemNotifyDate : new Date()
  );

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const itemId = item._id;

  if (typeof categoryId === "object") {
    categoryId = categoryId.id;
  }

  const renewHandler = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/items/renewItem`,
        {
          expDate,
          notifyDate,
          categoryId,
          itemId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setSuccess(true);
        if (typeof getCategory === "function") {
          getCategory();
        } else {
          getUserData();
        }
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
      <form onSubmit={renewHandler}>
        <div className="renewForm">
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
          <div>
            <button className="addBtn" type="submit">
              Renew Item
            </button>
          </div>
        </div>
      </form>

      {success ? <p className="renewNotif">Item renewed!</p> : null}
    </div>
  );
};

export default RenewItem;
