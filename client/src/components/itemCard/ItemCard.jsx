import React from "react";
import "./ItemCard.scss";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ItemCard = ({ item }) => {
    return (
      <div className="itemCard">
        <div className="left">
          <img src={item.img} alt="Image of product" className="image" />
        </div>
        <div className="middle">
          <h3>{item.title}</h3>
          <p>{item.brand}</p>
          <p>Expires: {item.exp}</p>
        </div>
        <div className="right">
          <Link>
            <MoreHorizIcon />
          </Link>
        </div>
      </div>
    );
}

export default ItemCard;