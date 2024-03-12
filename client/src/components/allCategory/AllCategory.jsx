import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import "./AllCategory.scss";
import ItemCard from "../itemCard/ItemCard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import $ from "jquery";

const AllCategory = () => {
  const [search, setSearch] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [userTimezone, setUserTimezone] = useState("");

  const getUserData = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUserTimezone(res.data.user.timezone);
        setAllItems([]);
        res.data.user.categories.map((category) => {
          category.items.map((item) => {
            setAllItems((oldArray) => [
              ...oldArray,
              {
                ...item,
                categoryName: category.categoryName,
                categoryId: category._id,
              },
            ]);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getDefaultItemList = () => {
    getUserData();
  };

  const sortExpDate = () => {
    const sortingArr = [...allItems];
    sortingArr.sort(function (a, b) {
      return new Date(a.expDate) - new Date(b.expDate);
    });
    setAllItems(sortingArr);
  };

  const sortAlphabetically = () => {
    const sortingArr = [...allItems];
    sortingArr.sort(function (a, b) {
      if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) {
        return -1;
      } else if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    setAllItems(sortingArr);
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
        <span> </span>
        <h1>All Items</h1>
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
      {allItems.length > 0 ? (
        <div className="bottom">
          {allItems
            ?.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.itemName.toLowerCase().includes(search);
            })
            .map((item) => (
              <ItemCard
                item={item}
                categoryName={item.categoryName}
                categoryId={item.categoryId}
                getUserData={getUserData}
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

export default AllCategory;
