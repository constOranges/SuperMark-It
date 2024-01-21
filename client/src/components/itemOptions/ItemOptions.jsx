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

// DELETE: make sure to add options to delete from list, category, or all items

const ItemOptions = ({ item, categoryId, listId }) => {
  const [errors, setErrors] = useState([]);

  const itemId = item._id;


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
      <div className="item">
        <Link className="iconLink">
          <PlaylistAddOutlinedIcon className="icon" />
        </Link>
        <Link className="link">Add To List</Link>
      </div>
      <div className="item">
        <Link className="iconLink">
          <CreateNewFolderOutlinedIcon className="icon" />
        </Link>
        <Link className="link">Add To Category</Link>
      </div>
      <div className="item">
        <Link className="iconLink">
          <CreateOutlinedIcon className="icon" />
        </Link>
        <Link className="link">Edit</Link>
      </div>
      <div className="item">
        <Link className="iconLink">
          <AutorenewOutlinedIcon className="icon" />
        </Link>
        <Link className="link">Renew</Link>
      </div>
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
