import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Category.scss";
import ItemCard from "../itemCard/ItemCard";
import ListCatOptions from "../listCatOptions/ListCatOptions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const categoryId = useParams();

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

  const handleClickAway = () => {
    setOpen(false);
  };

  const prodList = [];

  const products = category.map((items) => {
    if (`/category/${items._id}` == window.location.pathname) {
      prodList.push(items.items);
    }
  });
  const catName = category.map((name) => {
    if (`/category/${name._id}` == window.location.pathname) {
      return name.categoryName;
    }
  });

  return (
    <div className="category">
      <div className="top">
        <h1>{catName}</h1>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <div className="more" onClick={() => setOpen(!open)}>
              <MoreHorizIcon className="moreIcon" />
            </div>
            {open && <ListCatOptions categoryId={categoryId} catName={catName} />}
          </div>
        </ClickAwayListener>
        <Link to="/add" className="buttonLink">
          <button>+ Add Item</button>
        </Link>
      </div>
      <div className="bottom">
        {products
          ? prodList[0]?.map((item) => (
              <ItemCard item={item} categoryId={categoryId} />
            ))
          : null}
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
