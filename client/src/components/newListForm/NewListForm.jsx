import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import $ from "jquery";
import "./NewListForm.scss";

const NewListForm = () => {
  const [listName, setListName] = useState("");
  const [iconPath, setIconPath] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/lists/add`,
        {
          listName,
          iconPath,
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

  const resetHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  $(function () {
    $(".indivIcon").on("click", function () {
      $(".indivIcon").removeClass("selected");
      $(this).addClass("selected");
    });
  });

  //ICON HANDLERS
  const kitchenHandler = () => {
    setIconPath("kitchen");
  };

  const fastFoodHandler = () => {
    setIconPath("fastfood");
  };

  const breakfastHandler = () => {
    setIconPath("breakfast");
  };

  const bakeryHandler = () => {
    setIconPath("bakery");
  };

  const eggHandler = () => {
    setIconPath("egg");
  };

  const iceCreamHandler = () => {
    setIconPath("icecream");
  };

  const pizzaHandler = () => {
    setIconPath("pizza");
  };

  const lunchHandler = () => {
    setIconPath("lunch");
  };

  const riceHandler = () => {
    setIconPath("rice");
  };

  const cafeHandler = () => {
    setIconPath("cafe");
  };

  const restaurantHandler = () => {
    setIconPath("restaurant");
  };

  const setMealHandler = () => {
    setIconPath("setmeal");
  };

  const barHandler = () => {
    setIconPath("bar");
  };

  const tapasHandler = () => {
    setIconPath("tapas");
  };

  return (
    <div className="newCategoryPage">
      <div className="categoryForm">
        <h2>New List</h2>
        <form onSubmit={submitHandler} onReset={resetHandler}>
          <div className="form-group">
            <label htmlFor="categoryName">List Name</label>
            <input
              type="text"
              className="form-control"
              name="listName"
              id="listName"
              onChange={(e) => setListName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="iconPath">Icon</label>
            <div className="iconSelect">
              <KitchenRoundedIcon
                className="indivIcon"
                onClick={kitchenHandler}
              />
              <FastfoodRoundedIcon
                className="indivIcon"
                onClick={fastFoodHandler}
              />
              <BreakfastDiningOutlinedIcon
                className="indivIcon"
                onClick={breakfastHandler}
              />
              <BakeryDiningRoundedIcon
                className="indivIcon"
                onClick={bakeryHandler}
              />
              <EggRoundedIcon className="indivIcon" onClick={eggHandler} />
              <IcecreamRoundedIcon
                className="indivIcon"
                onClick={iceCreamHandler}
              />
              <LocalPizzaRoundedIcon
                className="indivIcon"
                onClick={pizzaHandler}
              />
              <LunchDiningRoundedIcon
                className="indivIcon"
                onClick={lunchHandler}
              />
              <RiceBowlRoundedIcon
                className="indivIcon"
                onClick={riceHandler}
              />
              <LocalCafeRoundedIcon
                className="indivIcon"
                onClick={cafeHandler}
              />
              <RestaurantRoundedIcon
                className="indivIcon"
                onClick={restaurantHandler}
              />
              <SetMealRoundedIcon
                className="indivIcon"
                onClick={setMealHandler}
              />
              <LocalBarRoundedIcon className="indivIcon" onClick={barHandler} />
              <TapasRoundedIcon className="indivIcon" onClick={tapasHandler} />
            </div>
          </div>
          <div className="btn">
            <button className="submitBtn" type="submit">
              Add List
            </button>
            <button className="cancelBtn" type="reset">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {errors ? (
        <div className="errorMessage">
          {errors.map((err) => (
            <p>{err}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default NewListForm;
