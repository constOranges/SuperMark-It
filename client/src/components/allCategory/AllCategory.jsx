import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./AllCategory.scss";
import ItemCard from "../itemCard/ItemCard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const AllCategory = () => {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState(null);

  const categoryArr = [];

  const getUserData = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data.user);
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
  };

  itemData();

  const getDefaultItemList = () => {
    // getUserData();
  };

  const sortExpDate = () => {
    const sortingArr = [...categoryArr];
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
        <Form>
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
      {categoryArr.length > 0 ? (
        <div className="bottom">
          {categoryArr.map((category) => {
            return category.items
              ?.filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.itemName.toLowerCase().includes(search);
              })
              .map((item) => (
                <ItemCard
                  item={item}
                  categoryName={category.categoryName}
                  categoryId={category._id}
                  getUserData={getUserData}
                />
              ));
          })}
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
