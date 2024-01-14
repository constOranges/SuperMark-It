import React from "react";
import { useState } from "react";
import "./ItemCard.scss";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ItemOptions from "../itemOptions/ItemOptions";

const ItemCard = ({ item }) => {
    const [open, setOpen] = useState(false);
    console.log(item);
    
    
    //Fix issue where option menus overlap each other
    // Can probably solve this using ClickAwayListener


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
        <div className="right">
          <div className="more" onClick={() => setOpen(!open)}>
            <MoreHorizIcon className="moreIcon" />
          </div>
        </div>
        {open && <ItemOptions />}
      </div>
    );
}

export default ItemCard;