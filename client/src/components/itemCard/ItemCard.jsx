import React from "react";
import { useState, useEffect } from "react";
// should we remove luxon npm package?
import { DateTime } from "luxon";
import moment from "moment-timezone";
import "./ItemCard.scss";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ItemOptions from "../itemOptions/ItemOptions";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import defaultImage from "../../defaultImage/orange.png";

const ItemCard = ({
  item,
  categoryId,
  listId,
  getCategory,
  getList,
  categoryName,
  listName,
  getUserData
}) => {
  const [open, setOpen] = useState(false);
  const [expired, setExpired] = useState(null);
  const currentDate = new Date().getTime();
  const expDateInt = new Date(item.expDate).getTime();

  // Pass this in as prop from GET currentuser
  const userTimezone = "America/Los_Angeles";

  // Do I need to adjust this to use displayDateInLocalTimezone()?
  useEffect(() => {
    if (expDateInt < currentDate) {
      setExpired("EXPIRED");
    }
  }, []);

  const handleClickAway = () => {
    setOpen(false);
  };

  const displayDateInLocalTimezone = (dateInput) => {
    const dateMoment = moment.utc(dateInput);
    const convertedMoment = dateMoment.clone().tz(userTimezone, true);
    return convertedMoment.format("MM/DD/YYYY");
  }

  return (
    <div className="itemCard">
      <div className="left">
        {item.imagePath ? (
          <img
            src={item.imagePath?.url}
            alt="Image of product"
            className="image"
          />
        ) : (
          <img
            src={defaultImage}
            alt="Image of product"
            className="image"
          />
        )}
      </div>
      <div className="middle">
        <h3>{item.itemName}</h3>
        <p>{item.brand}</p>
        {item.quantity > 0 ? <p>Quantity: {item.quantity}</p> : null}
        {categoryId ? (
          expired ? (
            <div className="expiredText">
              <span>
                Expired:{" "}
                {/* {DateTime.fromISO(item.expDate).toUTC().toFormat("LL/dd/yyyy")} */}
                {displayDateInLocalTimezone(item.expDate)}
              </span>
            </div>
          ) : (
            <p>
              Expires:{" "}
              {displayDateInLocalTimezone(item.expDate)}
            </p>
          )
        ) : null}

        {categoryName ? (
          <p>
            <strong>Category: </strong>
            {categoryName}
          </p>
        ) : null}
        {listName ? (
          <p>
            <strong>List: </strong>
            {listName}
          </p>
        ) : null}
      </div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div className="right">
            <div className="more" onClick={() => setOpen(!open)}>
              <MoreHorizIcon className="moreIcon" />
            </div>
          </div>
          {open && (
            <ItemOptions
              item={item}
              categoryId={categoryId}
              listId={listId}
              getCategory={getCategory}
              getList={getList}
              getUserData={getUserData}
              setOpen={setOpen}
            />
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default ItemCard;
