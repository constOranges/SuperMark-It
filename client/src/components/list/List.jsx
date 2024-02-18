import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./List.scss";
import ListCatOptions from "../listCatOptions/ListCatOptions";
import ItemCard from "../itemCard/ItemCard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const List = () => {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState("");
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

  const handleClickAway = () => {
    setOpen(false);
  };

  const prodList = [];

  const products = lists.filter((list) => {
    if (`/list/${list._id}` == window.location.pathname) {
      list.items.forEach((item) => {
        prodList.push(item);
      });
    }
  });

  const listName = lists.map((list) => {
    if (`/list/${list._id}` == window.location.pathname) {
      return list.listName;
    }
  });

  const currentList = lists.map((list) => {
    if (`/list/${list._id}` == window.location.pathname) {
      return list;
    }
  });

  return (
    <div className="list">
      <div className="top">
        <h1>{listName}</h1>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <div className="more" onClick={() => setOpen(!open)}>
              <MoreHorizIcon className="moreIcon" />
            </div>
            {open && <ListCatOptions listId={listId} list={currentList} />}
          </div>
        </ClickAwayListener>
        <Link to="/addListItem" className="buttonLink">
          <button>Add Item</button>
        </Link>
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
                  key={item.id}
                  listId={listId}
                  getList={getList}
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default List;
