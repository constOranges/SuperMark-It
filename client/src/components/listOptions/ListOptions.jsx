import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./ListOptions.scss";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";


const ListOptions = ({ user }) => {

  return (
    <div className="options">
      <div className="bottom">
        <div className="categories">
          <Link to="/newList" className="link">
            <div className="cat">
              <AddOutlinedIcon className="catIcon" />
              <div className="catBody">NEW LIST</div>
            </div>
          </Link>

          <Link to="/list/1" className="link">
            <div className="cat">
              <FavoriteIcon className="catIcon" />
              <div className="catBody">FAVORITES</div>
            </div>
          </Link>

          {/* User-created lists */}
          {user
            ? user.lists.map((list) => {
                return (
                  <Link to={`/list/${list._id}`} className="link">
                    <div className="cat">
                      <div className="catBody">{list.listName}</div>
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ListOptions;
