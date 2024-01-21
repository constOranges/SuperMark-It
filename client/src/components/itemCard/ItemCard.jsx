import React from "react";
import { useState } from "react";
import "./ItemCard.scss";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ItemOptions from "../itemOptions/ItemOptions";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const ItemCard = ({ item, categoryId }) => {
  const [open, setOpen] = useState(false);
  

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className="itemCard">
      <div className="left">
        <img src={item.imagePath} alt="Image of product" className="image" />
      </div>
      <div className="middle">
        <h3>{item.itemName}</h3>
        <p>{item.brand}</p>
        <p>Expires: {item.expDate}</p>
      </div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div className="right">
            <div className="more" onClick={() => setOpen(!open)}>
              <MoreHorizIcon className="moreIcon" />
            </div>
          </div>
          {open && <ItemOptions item={item} categoryId={categoryId}/>}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default ItemCard;
