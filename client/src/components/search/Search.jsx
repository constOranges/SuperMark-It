import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ItemCard from "../itemCard/ItemCard";
import $ from "jquery";
import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState(null);
  const [userTimezone, setUserTimezone] = useState("");
  const [toggle, setToggle] = useState(true);

  const categoryArr = [];
  const listArr = [];

  const getUserData = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data.user);
        setUserTimezone(res.data.user.timezone);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const itemData = () => {
    userData?.categories.forEach((category) => {
      categoryArr.push(category);
    });

    userData?.lists.forEach((list) => {
      listArr.push(list);
    });
  };

  itemData();

  $(function () {
    $(".hLink").on("click", function () {
      $(".hLink").removeClass("selected");
      $(this).addClass("selected");
    });
  });

  return (
    <div className="search">
      <Form>
        <InputGroup>
          <Form.Control
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Items"
          />
        </InputGroup>
      </Form>

      <div className="searchOptions">
        <div className="top">
          <div className="item">
            <Link
              className="link hLink selected"
              onClick={() => setToggle(true)}
            >
              <div>Categories</div>
            </Link>
          </div>
          <div className="item">
            <Link className="link hLink" onClick={() => setToggle(false)}>
              <div>Lists</div>
            </Link>
          </div>
        </div>
      </div>
      {toggle ?
        <div className="catItems">
          {categoryArr.map((category) => {
            return (
              category.items?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.itemName.toLowerCase().includes(search);
              }).map((item) => (
                <ItemCard
                  item={item}
                  categoryName={category.categoryName}
                  categoryId={category._id}
                  getUserData={getUserData}
                  userTimezone={userTimezone}
                />
              )))
          })}
        </div>
        :
        <div className="listItems">
          {listArr.map((list) => {
            return (
              list.items?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.itemName.toLowerCase().includes(search);
              }).map((item) => (
                <ItemCard
                  item={item}
                  listName={list.listName}
                  listId={list._id}
                  getUserData={getUserData}
                  userTimezone={userTimezone}
                />
              )))
          })}
        </div>
      }
    </div>
  );
};

export default Search;
