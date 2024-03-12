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
import $ from "jquery";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  const [userTimezone, setUserTimezone] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const categoryId = useParams();

  const getCategory = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setCategories(res.data.user.categories);
        setUserTimezone(res.data.user.timezone);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    categories.filter((cat) => {
      if (`/category/${cat._id}` == window.location.pathname) {
        setCurrentCategory(cat);
      }
    });
  }, [categories]);

  useEffect(() => {
    setItems(currentCategory.items);
  }, [currentCategory]);

  const handleClickAway = () => {
    setOpen(false);
  };

  const getDefaultItemList = () => {
    getCategory();
  };

  const sortExpDate = () => {
    const sortingArr = [...items];
    sortingArr.sort(function (a, b) {
      return new Date(a.expDate) - new Date(b.expDate);
    });
    setItems(sortingArr);
  };

  const sortAlphabetically = () => {
    const sortingArr = [...items];
    sortingArr.sort(function (a, b) {
      if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) {
        return -1;
      } else if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    setItems(sortingArr);
  };

  $(function () {
    $(".sortButton").on("click", function () {
      $(".sortButton").removeClass("selectedSort");
      $(this).addClass("selectedSort");
    });
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
              <ListCatOptions
                categoryId={categoryId}
                category={currentCategory}
              />
            )}
          </div>
        </ClickAwayListener>
        <h1>{currentCategory?.categoryName}</h1>
        <Link to="/add" className="buttonLink">
          <AddRoundedIcon className="catIcons" />
        </Link>
      </div>
      <div className="center">
        <Form className="searchForm">
          <InputGroup>
            <Form.Control
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              placeholder="Search Items"
            />
          </InputGroup>
        </Form>
        <div className="buttons">
          <h4>Sort By:</h4>
          <button
            className="sortButton selectedSort"
            onClick={getDefaultItemList}
          >
            Date Added
          </button>
          <h4>|</h4>
          <button className="sortButton" onClick={sortExpDate}>
            Expiration Date
          </button>
          <h4>|</h4>
          <button className="sortButton" onClick={sortAlphabetically}>
            A-Z
          </button>
        </div>
      </div>

      {items?.length > 0 ? (
        <div className="bottom">
          {items
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
                userTimezone={userTimezone}
              />
            ))}
        </div>
      ) : (
        <div className="noItems">
          <p>No Items Available</p>
        </div>
      )}
    </div>
  );
};

export default Category;
