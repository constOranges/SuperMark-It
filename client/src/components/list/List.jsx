import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./List.scss";
import ListCatOptions from "../listCatOptions/ListCatOptions";
import ItemCard from "../itemCard/ItemCard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const List = () => {

const [open, setOpen] = useState(false);  

const data = [
  {
    id: 1,
    img: "https://images.heb.com/is/image/HEBGrocery/prd-medium/000145080.jpg",
    title: "Orange Juice",
    brand: "Tropicana",
    exp: "1/1/2024",
  },
  {
    id: 2,
    img: "https://images.costcobusinessdelivery.com/ImageDelivery/imageService?profileId=12028466&itemId=427381&recipeName=680",
    title: "Eggs",
    brand: "Kirkland",
    exp: "12/24/2023",
  },
  {
    id: 3,
    img: "https://target.scene7.com/is/image/Target/GUEST_2fb69cb5-a940-492e-85a7-ac1ab33749a1?wid=2000",
    title: "Mayonnaise",
    brand: "Kewpie",
    exp: "2/5/2024",
  },
];

    return (
      <div className="list">
        <div className="top">
          <h1>Favorites</h1>
          <Link>
            <MoreHorizIcon
              className="moreIcon"
              onClick={() => setOpen(!open)}
            />
          </Link>
        </div>
        <div className="bottom">
          {data.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
        {open && <ListCatOptions />}
      </div>
    );
}

export default List;