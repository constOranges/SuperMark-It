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
import "./Navbar.scss";

const Navbar = ({loggedIn, setLoggedIn}) => {

  const [open, setOpen] = useState(false);
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
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <Link className="link" to="/">
            SUPER MARK-IT
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
            <div className="notifIcon">
              <NotificationsRoundedIcon className="navIcon" />
            </div>
            <div className="dropDown">
              <div className="profileIcon">
                <PersonRoundedIcon
                  className="navIcon userIcon"
                  onClick={() => setOpen(!open)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div>
          {loggedIn ? ( 
            <Link className="link" to="/" onClick={logoutHandler}>
              Logout
            </Link>
          ) : (
            <div className="userForm">
              <LoginForm setOpen={setOpen} />
              <Link className="link" to="/newUser" onClick={() => setOpen(!open)}>
                Sign-up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
