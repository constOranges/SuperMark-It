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
      <div className="top">
        <div className="item">
          <Link className="link">KITCHEN</Link>
        </div>
        <div className="item">
          <Link className="link">LISTS</Link>
        </div>
      </div>
      <div className="bottom">
        <div className="categories">
          <div className="cat">
            <Link className="link">
              <AddOutlinedIcon className="catIcon" />
              <div className="catBody">
                <Link to="/newCategory" className="link">
                  NEW CATEGORY
                </Link>
              </div>
            </Link>
          </div>
          <div className="cat">
            <FastfoodRoundedIcon className="catIcon" />
            <div className="catBody">
              <Link className="link" to="/category/1">
                ALL
              </Link>
            </div>
          </div>
          <div className="cat">
            <KitchenRoundedIcon className="catIcon" />
            <div className="catBody">
              <Link className="link">FRIDGE</Link>
            </div>
          </div>
          <div className="cat">
            <IcecreamRoundedIcon className="catIcon" />
            <div className="catBody">
              <Link className="link">FREEZER</Link>
            </div>
          </div>
          <div className="cat">
            <BreakfastDiningOutlinedIcon className="catIcon" />
            <div className="catBody">
              <Link className="link">PANTRY</Link>
            </div>
          </div>

          {user
            ? user.categories.map((cat) => {
                return (
                  <div className="cat">
                    <Link className="link">
                      <div className="catBody">
                        <Link to={`/category/${cat._id}`} className="link">
                          {cat.categoryName}
                        </Link>
                      </div>
                    </Link>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Options;
