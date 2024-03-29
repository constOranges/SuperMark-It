import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
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
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./NewCategoryForm.scss";

const NewCategoryForm = () => {
  const { getUser } = useContext(UserContext);
  const [categoryName, setCategoryName] = useState(null);
  const [iconPath, setIconPath] = useState(null);
  const [errors, setErrors] = useState([]);
  const [errorToggle, setErrorToggle] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/categories/add`,
        {
          categoryName,
          iconPath,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        axios
          .get(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            const newCategory =
              res.data.user.categories[res.data.user.categories.length - 1];
            navigate(`/category/${newCategory._id}`);
            getUser();
          })
          .catch((err) => {
            console.log(err);
          });
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

  useEffect(() => {
    if (errors.length > 0) {
      setErrorToggle(true);
    }
  });

  const errorHandler = () => {
    setErrors([]);
    setErrorToggle(false);
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
        <h2>New Category</h2>
        <form onSubmit={submitHandler} onReset={resetHandler}>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              className="form-control"
              name="categoryName"
              id="categoryName"
              onChange={(e) => setCategoryName(e.target.value)}
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
              Add Category
            </button>
            <button className="cancelBtn" type="reset">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {errorToggle ? (
        <ErrorMessage errors={errors} errorHandler={errorHandler} />
      ) : null}
    </div>
  );
};

export default NewCategoryForm;
