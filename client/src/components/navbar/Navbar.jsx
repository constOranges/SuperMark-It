import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LoginForm from "../loginForm/LoginForm.jsx";
import Alerts from "../alerts/Alerts.jsx";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import $ from "jquery";
import "./Navbar.scss";

const Navbar = ({ loggedIn, setLoggedIn, user, getUser }) => {
  const [open, setOpen] = useState(false);
  const [addDropDown, setAddDropDown] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setLoggedIn(false);
        console.log(res);
        getUser();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const favoritesList = user?.lists[0];

  const handleClickAway = () => {
    setOpen(false);
  };

  const addItemClickAway = () => {
    setAddDropDown(false);
  };

  const alertClickAway = () => {
    setOpenAlert(false);
    $(".notifIcon").removeClass("selectedNav");
  };

  const closeLogin = () => {
    setOpen(false);
  };

  $(function () {
    $(".icon").on("click", function () {
      $(".icon").removeClass("selectedNav");
      $(this).addClass("selectedNav");
    });
  });

  $(function () {
    $(".logo").on("click", function () {
      $(".icon").removeClass("selectedNav");
      $(".homeIcon").addClass("selectedNav");
    });
  });

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <Link className="link logo" to="/">
            <img
              className="logo"
              src="/images/logo.jpg"
              alt="Blue background with white text"
            />
          </Link>
          <div className="mobileNotifIcon">
            <NotificationsRoundedIcon className="navIcon" />
          </div>
        </div>
        <div className="right">
          <div className="icons">
            <div className="homeIcon icon">
              <Link className="link" to="/">
                <HomeRoundedIcon className="navIcon" />
              </Link>
            </div>
            <div className="searchIcon icon">
              <Link className="link" to="/search">
                <SearchRoundedIcon className="navIcon" />
              </Link>
            </div>
            <ClickAwayListener onClickAway={addItemClickAway}>
              <div className="addIcon icon">
                <AddBoxRoundedIcon
                  className="navIcon link"
                  onClick={() => setAddDropDown(!addDropDown)}
                />
                {addDropDown && (
                  <div className="addItemDropDown">
                    <Link
                      className="link addLink"
                      to="/add"
                      onClick={() => setAddDropDown(!addDropDown)}
                    >
                      Add To Category
                    </Link>
                    <Link
                      className="link addLink"
                      to="/addListItem"
                      onClick={() => setAddDropDown(!addDropDown)}
                    >
                      Add To List
                    </Link>
                  </div>
                )}
              </div>
            </ClickAwayListener>
            {user ? (
              <div className="favIcon icon">
                <Link className="link" to={`/list/${favoritesList._id}`}>
                  <FavoriteRoundedIcon className="navIcon" />
                </Link>
              </div>
            ) : (
              <div className="favIcon">
                <Link className="link" to={`/list/1`}>
                  <FavoriteRoundedIcon className="navIcon" />
                </Link>
              </div>
            )}

            {/* Handler that closes login form when clicking outside of container */}
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="dropDown">
                <div className="profileIcon link icon">
                  <PersonRoundedIcon
                    className="navIcon userIcon"
                    onClick={() => setOpen(!open)}
                  />
                </div>

                {open && (
                  <div className="formContainer">
                    {loggedIn ? (
                      <div className="logoutForm">
                        <Link className="link" to="/" onClick={logoutHandler}>
                          Logout
                        </Link>
                      </div>
                    ) : (
                      <div className="logInOverlay">
                        <ClickAwayListener onClickAway={closeLogin}>
                          <div className="userForm">
                            <LoginForm
                              setOpen={setOpen}
                              setLoggedIn={setLoggedIn}
                              getUser={getUser}
                            />
                            <Link
                              className="link"
                              to="/newUser"
                              onClick={() => setOpen(!open)}
                            >
                              Sign-up
                            </Link>
                          </div>
                        </ClickAwayListener>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ClickAwayListener>

            <ClickAwayListener onClickAway={alertClickAway}>
              <div className="dropDown">
                <div className="notifIcon link icon">
                  <NotificationsRoundedIcon
                    className="navIcon"
                    onClick={() => setOpenAlert(!openAlert)}
                  />
                </div>

                {openAlert && <Alerts user={user} />}
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
