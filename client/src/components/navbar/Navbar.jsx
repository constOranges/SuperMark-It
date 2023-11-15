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
    return(
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <Link className="link" to="/">SUPER MARK-IT</Link>
                </div>
                <div className="right">
                    <div className="icons">
                        <div className="homeIcon">
                            <HomeRoundedIcon />
                        </div>
                        <div className="addIcon">
                            <AddBoxRoundedIcon />
                        </div>
                        <div className="searchIcon">
                            <SearchRoundedIcon />
                        </div>
                        <div className="favIcon">
                            <FavoriteRoundedIcon />
                        </div>
                        <div className="notifIcon">
                            <NotificationsRoundedIcon />
                        </div>
                        <div className="profileIcon">
                            <PersonRoundedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Navbar;