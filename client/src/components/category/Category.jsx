import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Category.scss";
import ItemCard from "../itemCard/ItemCard";
import ListCatOptions from "../listCatOptions/ListCatOptions";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const categoryId = useParams();

  const getCategory = async () => {
    await axios
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
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleClickAway = () => {
    setOpen(false);
  };

  const prodList = [];

  const products = category.map((cat) => {
    if (`/category/${cat._id}` == window.location.pathname) {
      cat.items.forEach((item) => {
        prodList.push(item);
      });
    }
  });
  const catName = category.map((cat) => {
    if (`/category/${cat._id}` == window.location.pathname) {
      return cat.categoryName;
    }
  });

  return (
    <div className="category">
      <div className="top">
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <div className="more" onClick={() => setOpen(!open)}>
              <MoreHorizIcon className="catIcons" />
            </div>
            {open && (
              <ListCatOptions categoryId={categoryId} catName={catName} />
            )}
          </div>
        </ClickAwayListener>
        <h1>{catName}</h1>
        <Link to="/add" className="buttonLink">
          <AddRoundedIcon className="catIcons" />
        </Link>
      </div>
      <div className="center">
        <Form>
          <InputGroup>
            <Form.Control
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              placeholder="Search Items"
            />
          </InputGroup>
        </Form>
      </div>
      <div className="bottom">
        {products
          ? prodList
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.itemName.toLowerCase().includes(search);
              })
              .map((item) => (
                <ItemCard
                  item={item}
                  categoryId={categoryId}
                  getCategory={getCategory}
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default Category;
