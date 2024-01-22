import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ListCatOptions.scss";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ListCatOptions = ({ listId, listName, categoryId, catName }) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();


    const deleteCatHandler = () => {
      if (window.confirm(`Are you sure you want to delete ${catName}?`))

        if (categoryId) {
          categoryId = categoryId.id;
        }
        
      axios
        .patch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/categories/remove`,
          {
            categoryId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          navigate("/");
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

  const deleteListHandler = () => {
    if (window.confirm(`Are you sure you want to delete ${listName}`))
    if(listId) {
        listId = listId.id;
    }
      axios
        .patch(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/lists/remove`,
          {
            listId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          navigate("/");
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
    <div className="listCatOptions">
      <div className="item">
        <Link className="iconLink">
          <CreateOutlinedIcon className="icon" />
        </Link>
        <Link className="link">Edit</Link>
      </div>
      {categoryId ? (
        <Link className="deleteLink" onClick={() => deleteCatHandler()}>
          <div className="item">
            <DeleteOutlineOutlinedIcon className="icon" />

            <Link className="deleteLink">Delete</Link>
          </div>
        </Link>
      ) : (
        <Link className="deleteLink" onClick={() => deleteListHandler()}>
          <div className="item">
            <DeleteOutlineOutlinedIcon className="icon" />

            <Link className="deleteLink">Delete</Link>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ListCatOptions;
