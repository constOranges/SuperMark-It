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
import MoveToList from "../moveToList/MoveToList";

// DELETE: make sure to add options to delete from list, category, or all items

const ItemOptions = ({ item, categoryId, listId }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);

  const itemId = item._id;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setCategories(res.data.user.categories);
        setLists(res.data.user.lists);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteFromCatHandler = () => {
    if (window.confirm(`Are you sure you want to delete ${item.itemName}`))
      if (categoryId) {
        categoryId = categoryId.id;
      }

    axios
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
        console.log(itemId);
        window.location.reload();
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
  };

  const deleteFromListHandler = () => {
    if (window.confirm(`Are you sure you want to delete ${item.itemName}`))
      if (listId) {
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
        console.log(itemId);
        window.location.reload();
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
  };

  return (
    <div className="itemOptions">
      {categoryId ? (
        <Link className="iconLink" onClick={() => setOpen(true)}>
          <div className="item">
            <PlaylistAddOutlinedIcon className="icon" />
            <Link className="link">Add To List</Link>
          </div>
        </Link>
      ) : null}
      {open ? <MoveToList itemId={itemId} /> : null}
      {listId ? (
        <Link className="iconLink">
          <div className="item">
            <CreateNewFolderOutlinedIcon className="icon" />
            <Link className="link">Add To Category</Link>
          </div>
        </Link>
      ) : null}
      <Link className="iconLink">
        <div className="item">
          <CreateOutlinedIcon className="icon" />
          <Link className="link">Edit</Link>
        </div>
      </Link>
      {categoryId ? (
        <Link className="iconLink">
          <div className="item">
            <AutorenewOutlinedIcon className="icon" />
            <Link className="link">Renew</Link>
          </div>
        </Link>
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
