import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ListCatOptions.scss";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ListCatOptions = ({ listId, categoryId, category, list }) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const deleteCatHandler = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${category.categoryName}?`
      )
    ) {
      if (categoryId) {
        categoryId = categoryId.id;
      }

      await axios
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
          window.location.reload(false);
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

  const deleteListHandler = async () => {
    if (window.confirm(`Are you sure you want to delete ${list.listName}`)) {
      if (listId) {
        listId = listId.id;
      }
      await axios
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
          window.location.reload(false);
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

  return (
    <div className="listCatOptions">
      <Link
        className="link"
        to="/updateCategory"
        state={{
          categoryId: categoryId,
          listId: listId,
          list: list,
          category: category,
        }}
      >
        <div className="item">
          <CreateOutlinedIcon className="icon" />
          Edit
        </div>
      </Link>

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
