import "./Options.scss";
import React from "react";
import { Link } from "react-router-dom";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import BreakfastDiningOutlinedIcon from "@mui/icons-material/BreakfastDiningOutlined";
import IcecreamRoundedIcon from "@mui/icons-material/IcecreamRounded";
import RiceBowlRoundedIcon from "@mui/icons-material/RiceBowl";
import LocalCafeRoundedIcon from "@mui/icons-material/LocalCafe";
import RestaurantRoundedIcon from "@mui/icons-material/Restaurant";
import LocalBarRoundedIcon from "@mui/icons-material/LocalBar";
import TapasRoundedIcon from "@mui/icons-material/Tapas";
import SetMealRoundedIcon from "@mui/icons-material/SetMeal";
import EggRoundedIcon from "@mui/icons-material/Egg";
import BakeryDiningRoundedIcon from "@mui/icons-material/BakeryDining";
import LocalPizzaRoundedIcon from "@mui/icons-material/LocalPizza";
import LunchDiningRoundedIcon from "@mui/icons-material/LunchDining";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Options = ({ user }) => {


  function UserIcon(iconPath) {
    const value = JSON.stringify(iconPath);
    if (value.includes("kitchen")) {
      return <KitchenRoundedIcon className="catIcon" />;
    } else if (value.includes("fastfood")) {
      return <FastfoodRoundedIcon className="catIcon" />;
    } else if (value.includes("breakfast")) {
      return <BreakfastDiningOutlinedIcon className="catIcon" />;
    } else if (value.includes("bakery")) {
      return <BakeryDiningRoundedIcon className="catIcon" />;
    } else if (value.includes("egg")) {
      return <EggRoundedIcon className="catIcon" />;
    } else if (value.includes("icecream")) {
      return <IcecreamRoundedIcon className="catIcon" />;
    } else if (value.includes("pizza")) {
      return <LocalPizzaRoundedIcon className="catIcon" />;
    } else if (value.includes("lunch")) {
      return <LunchDiningRoundedIcon className="catIcon" />;
    } else if (value.includes("rice")) {
      return <RiceBowlRoundedIcon className="catIcon" />;
    } else if (value.includes("cafe")) {
      return <LocalCafeRoundedIcon className="catIcon" />;
    } else if (value.includes("restaurant")) {
      return <RestaurantRoundedIcon className="catIcon" />;
    } else if (value.includes("setmeal")) {
      return <SetMealRoundedIcon className="catIcon" />;
    } else if (value.includes("bar")) {
      return <LocalBarRoundedIcon className="catIcon" />;
    } else if (value.includes("tapas")) {
      return <TapasRoundedIcon className="catIcon" />;
    } else {
      return null;
    }
  }


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
                      <UserIcon iconPath={cat.iconPath} />
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
