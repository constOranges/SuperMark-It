import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./List.scss";
import ListCatOptions from "../listCatOptions/ListCatOptions";
import ItemCard from "../itemCard/ItemCard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import $ from "jquery";

const List = () => {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState("");
  const [currentList, setCurrentList] = useState({});
  const [items, setItems] = useState([]);
  const listId = useParams();

  const getList = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setLists(res.data.user.lists);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    lists.filter((list) => {
      if (`/list/${list._id}` == window.location.pathname) {
        setCurrentList(list);
      }
    });
  }, [lists]);

  useEffect(() => {
    setItems(currentList.items);
  }, [currentList]);

  const getDefaultItemList = () => {
    getList();
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

  const handleClickAway = () => {
    setOpen(false);
  };

  $(function () {
    $(".sortButton").on("click", function () {
      $(".sortButton").removeClass("selectedSort");
      $(this).addClass("selectedSort");
    });
  });

  return (
    <div className="list">
      <div className="top">
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <div className="more" onClick={() => setOpen(!open)}>
              <MoreHorizIcon className="catIcons" />
            </div>
            {open && <ListCatOptions listId={listId} list={currentList} />}
          </div>
        </ClickAwayListener>
        <h1>{currentList?.listName}</h1>
        <Link to="/addListItem" className="buttonLink">
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
          <button className="sortButton selectedSort" onClick={getDefaultItemList}>
            Date Added
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
                key={item.id}
                listId={listId}
                getList={getList}
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

export default List;
