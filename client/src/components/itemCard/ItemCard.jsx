import React from "react";
import { useState } from "react";
import "./ItemCard.scss";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ItemOptions from "../itemOptions/ItemOptions";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const ItemCard = ({ item, categoryId, listId }) => {
  const [open, setOpen] = useState(false);

  // Date input displays time by default so use .toDateString() to display the date only
  let itemExpDate = new Date(item.expDate);
  let dateWithoutTime = itemExpDate.toDateString();

  const handleClickAway = () => {
    setOpen(false);
  };

  console.log(item.imagePath)

  return (
    <div className="itemCard">
      <div className="left">
        <img src={item.imagePath} alt="Image of product" className="image" />
      </div>
      <div className="middle">
        <h3>{item.itemName}</h3>
        <p>{item.brand}</p>
        {categoryId ? <p>Quantity: {item.quantity}</p> : null}
        {categoryId ? <p>Expires: {dateWithoutTime}</p> : null}
      </div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div className="right">
            <div className="more" onClick={() => setOpen(!open)}>
              <MoreHorizIcon className="moreIcon" />
            </div>
          </div>
          {open && (
            <ItemOptions item={item} categoryId={categoryId} listId={listId} />
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default ItemCard;
