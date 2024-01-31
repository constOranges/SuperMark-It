import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./List.scss";
import ListCatOptions from "../listCatOptions/ListCatOptions";
import ItemCard from "../itemCard/ItemCard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const List = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const listId = useParams();

  const getList = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setList(res.data.user.lists);
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

  const products = list.filter((items) => {
    if (`/list/${items._id}` == window.location.pathname) {
      prodList.push(items.items);
    }
  });

  const listName = list.map((name) => {
    if (`/list/${name._id}` == window.location.pathname) {
      return name.listName;
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
            {open && <ListCatOptions listId={listId} listName={listName} />}
          </div>
        </ClickAwayListener>
        <Link to="/addListItem" className="buttonLink">
          <button>+ Add Item</button>
        </Link>
      </div>
      <div className="bottom">
        {products
          ? prodList[0]?.map((item) => (
              <ItemCard item={item} key={item.id} listId={listId} getList={getList}/>
            ))
          : null}
      </div>
    </div>
  );
};

export default List;
