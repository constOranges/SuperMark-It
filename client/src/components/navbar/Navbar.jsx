import React from "react";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import "./Navbar.scss";


const Navbar = () => {
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
              <div className="profileIcon">
                <PersonRoundedIcon className="navIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}


export default Navbar;