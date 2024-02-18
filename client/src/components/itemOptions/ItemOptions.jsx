import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ItemOptions.scss";
import axios from "axios";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoveItemToCat from "../moveItemToCat/MoveItemToCat";
import MoveItemToList from "../moveItemToList/MoveItemToList";
import RenewItem from "../renewItem/RenewItem";

// DELETE: make sure to add options to delete from list, category, or all items

const ItemOptions = ({
  item,
  categoryId,
  listId,
  getCategory,
  getList,
  getUserData,
  setOpen,
}) => {
  const [toggleCat, setToggleCat] = useState(false);
  const [toggleList, setToggleList] = useState(false);
  const [toggleRenew, setToggleRenew] = useState(false);
  const [errors, setErrors] = useState([]);

  const itemId = item._id;

  const deleteFromCatHandler = async () => {
    if (window.confirm(`Are you sure you want to delete ${item.itemName}`)) {
      if (categoryId && typeof categoryId === "object") {
        categoryId = categoryId.id;
      }
      await axios
        .patch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/items/removeItemFromCategory`,
          {
            itemId,
            categoryId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setOpen(false);
          if (typeof getCategory === "function") {
            getCategory();
          } else {
            getUserData();
          }
        })
        .catch((err) => {
          console.log(err);
          const errorResponse = err.response.data.errors;
          const errorArray = [];
          for (const key of Object.keys(errorResponse)) {
            errorArray.push(errorResponse[key].message);
          }
          setErrors(errorArray);
        });
    }
  };

  const deleteFromListHandler = () => {
    if (window.confirm(`Are you sure you want to delete ${item.itemName}`)) {
      if (listId && typeof listId === "object") {
        listId = listId.id;
      }
      axios
        .patch(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/items/removeItemFromList`,
          {
            itemId,
            listId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setOpen(false);
          if (typeof getList === "function") {
            getList();
          } else {
            getUserData();
          }
        })
        .catch((err) => {
          console.log(err);
          const errorResponse = err.response.data.errors;
          const errorArray = [];
          for (const key of Object.keys(errorResponse)) {
            errorArray.push(errorResponse[key].message);
          }
          setErrors(errorArray);
        });
    }
  };

  const toggleListHandler = (e) => {
    e.preventDefault();
    setToggleList(!toggleList);
    setToggleCat(false);
    setToggleRenew(false);
  };

  const toggleCatHandler = (e) => {
    e.preventDefault();
    setToggleCat(!toggleCat);
    setToggleList(false);
    setToggleRenew(false);
  };

  const toggleRenewHandler = (e) => {
    e.preventDefault();
    setToggleRenew(!toggleRenew);
    setToggleList(false);
    setToggleCat(false);
  };

  return (
    <div className="itemOptions">
      <Link className="iconLink" onClick={toggleCatHandler}>
        <div className="item slideAnimation">
          <CreateNewFolderOutlinedIcon className="icon" />
          <Link className="link">Add To Category</Link>
        </div>
      </Link>

      {toggleCat ? <MoveItemToCat item={item} /> : null}

      <Link className="iconLink" onClick={toggleListHandler}>
        <div className="item">
          <PlaylistAddOutlinedIcon className="icon" />
          <Link className="link">Add To List</Link>
        </div>
      </Link>

      {toggleList ? <MoveItemToList item={item} /> : null}

      {categoryId ? (
        <Link
          className="iconLink"
          to={`/updateCatItem/${itemId}`}
          state={{ item: item, categoryId: categoryId }}
        >
          <div className="item">
            <CreateOutlinedIcon className="icon" />
            Edit
          </div>
        </Link>
      ) : (
        <Link
          className="iconLink"
          to={`/updateListItem/${itemId}`}
          state={{ item: item, listId: listId }}
        >
          <div className="item">
            <CreateOutlinedIcon className="icon" />
            Edit
          </div>
        </Link>
      )}

      {categoryId ? (
        <Link className="iconLink" onClick={toggleRenewHandler}>
          <div className="item">
            <AutorenewOutlinedIcon className="icon" />
            <Link className="link">Renew</Link>
          </div>
        </Link>
      ) : null}

      {toggleRenew ? (
        <RenewItem
          item={item}
          categoryId={categoryId}
          getCategory={getCategory}
        />
      ) : null}

      {categoryId ? (
        <Link className="deleteLink" onClick={() => deleteFromCatHandler()}>
          <div className="item">
            <DeleteOutlineOutlinedIcon className="icon" />

            <Link className="deleteLink">Delete</Link>
          </div>
        </Link>
      ) : (
        <Link className="deleteLink" onClick={() => deleteFromListHandler()}>
          <div className="item">
            <DeleteOutlineOutlinedIcon className="icon" />

            <Link className="deleteLink">Delete</Link>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ItemOptions;
