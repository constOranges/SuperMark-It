import React, { useState } from "react";
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
import "./Navbar.scss";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const [open, setOpen] = useState(false);
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
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const alertClickAway = () => {
    setOpenAlert(false);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left itim-regular">
          <Link className="link" to="/">
            super mark-it
          </Link>
          <div className="mobileNotifIcon">
            <NotificationsRoundedIcon className="navIcon" />
          </div>
        </div>
        <div className="right">
          <div className="icons">
            <div className="homeIcon">
              <Link className="link" to="/">
                <HomeRoundedIcon className="navIcon" />
              </Link>
            </div>
            <div className="searchIcon">
              <Link className="link" to="/search">
                <SearchRoundedIcon className="navIcon" />
              </Link>
            </div>
            <div className="addIcon">
              <Link className="link" to="/add">
                <AddBoxRoundedIcon className="navIcon" />
              </Link>
            </div>

            <div className="favIcon">
              <Link className="link" to="/list/1">
                <FavoriteRoundedIcon className="navIcon" />
              </Link>
            </div>
            {/* Handler that closes login form when clicking outside of container */}
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="dropDown">
                <div className="profileIcon">
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
                      <div className="userForm">
                        <LoginForm
                          setOpen={setOpen}
                          setLoggedIn={setLoggedIn}
                        />
                        <Link
                          className="link"
                          to="/newUser"
                          onClick={() => setOpen(!open)}
                        >
                          Sign-up
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ClickAwayListener>
            
            <ClickAwayListener onClickAway={alertClickAway}>
              <div className="dropDown">
                <div className="notifIcon">
                  <NotificationsRoundedIcon
                    className="navIcon"
                    onClick={() => setOpenAlert(!openAlert)}
                  />
                </div>

                {openAlert && <Alerts />}
              </div>
            </ClickAwayListener>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
