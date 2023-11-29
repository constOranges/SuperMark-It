import React from "react";
import { Link } from "react-router-dom";
import "./Category.scss";
import ItemCard from "../itemCard/ItemCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Category = () => {

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
      {
        id: 4,
        img: "https://www.goodnes.com/sites/g/files/jgfbjl321/files/styles/gdn_hero_pdp_product_image/public/gdn_product/field_product_images/hotpockets-iommoprps3lth3u54wow.png.webp?itok=siU6tP9U",
        title: "Pepperoni Pizza Hot Pockets",
        brand: "Hot Pockets",
        exp: "12/1/2024",
      },
    ];

    return (
      <div className="category">
        <div className="top">
          <h1>All Items</h1>
        </div>
        <div className="bottom">
          {data.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
          <p className="arrows">
            <Link><ArrowBackIcon className="arrowBack" /></Link>
            <Link><ArrowForwardIcon className="arrowForward" /></Link>
          </p>
        </div>
      </div>
    );
}

export default Category;