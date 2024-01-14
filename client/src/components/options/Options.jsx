import "./Options.scss";
import React from "react";
import { Link } from "react-router-dom";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import BreakfastDiningOutlinedIcon from "@mui/icons-material/BreakfastDiningOutlined";
import IcecreamRoundedIcon from "@mui/icons-material/IcecreamRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Options = ({ user }) => {

  return (
    <div className="options">
      <div className="bottom">
        <div className="categories">
          <Link to="/newCategory" className="link">
            <div className="cat">
              <AddOutlinedIcon className="catIcon" />
              <div className="catBody">NEW CATEGORY</div>
            </div>
          </Link>
          <Link className="link" to="/category/1">
            <div className="cat">
              <FastfoodRoundedIcon className="catIcon" />
              <div className="catBody">ALL</div>
            </div>
          </Link>
          <Link className="link">
            <div className="cat">
              <KitchenRoundedIcon className="catIcon" />
              <div className="catBody">FRIDGE</div>
            </div>
          </Link>
          <Link className="link">
            <div className="cat">
              <IcecreamRoundedIcon className="catIcon" />
              <div className="catBody">FREEZER</div>
            </div>
          </Link>
          <Link className="link">
            <div className="cat">
              <BreakfastDiningOutlinedIcon className="catIcon" />
              <div className="catBody">PANTRY</div>
            </div>
          </Link>

          {/* User-created categories */}
          {user
            ? user.categories.map((cat) => {
                return (
                  <Link to={`/category/${cat._id}`} className="link">
                    <div className="cat">
                      <div className="catBody">{cat.categoryName}</div>
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

export default Options;
