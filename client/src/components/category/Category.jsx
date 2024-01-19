import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Category.scss";
import ItemCard from "../itemCard/ItemCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setCategory(res.data.user.categories);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const products = category.map((items) => {
    return items.items
  });
  const catName = category.map((name) => {
    return name.categoryName;
  });
  console.log(products)


  return (
    <div className="category">
      <div className="top">
        <h1>{catName}</h1>
        <button>
          <Link to="/add" className="buttonLink">+ Add Item</Link>
        </button>
      </div>
      <div className="bottom">
        {products ? products[0]?.map((item) => <ItemCard item={item} />) : null}
        <p className="arrows">
          <Link>
            <ArrowBackIcon className="arrowBack" />
          </Link>
          <Link>
            <ArrowForwardIcon className="arrowForward" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Category;
