import React from "react";
import { useState } from "react";
import { DateTime } from "luxon";
import "./ItemCard.scss";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ItemOptions from "../itemOptions/ItemOptions";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const ItemCard = ({
  item,
  categoryId,
  listId,
  getCategory,
  getList,
  categoryName,
  listName,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className="itemCard">
      <div className="left">
        <img
          src={item.imagePath?.url}
          alt="Image of product"
          className="image"
        />
      </div>
      <div className="middle">
        <h3>{item.itemName}</h3>
        <p>{item.brand}</p>
        {item.quantity > 0 ? <p>Quantity: {item.quantity}</p> : null}
        {categoryId ? (
          <p>
            Expires:{" "}
            {DateTime.fromISO(item.expDate).toUTC().toFormat("LL/dd/yyyy")}
          </p>
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
              setOpen={setOpen}
            />
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default ItemCard;
