import React from "react";
import {useState} from "react";
import { Link } from "react-router-dom";
import "./ListCatOptions.scss";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const ListCatOptions = () => {

    

    return (
        <div className="listCatOptions">
            <div className="item">
                <Link className="iconLink">
                    <CreateOutlinedIcon className="icon" />
                </Link>
                <Link className="link">Edit</Link>
            </div>
            <div className="item">
                <Link className="deleteLink">
                    <DeleteOutlineOutlinedIcon className="icon" />
                </Link>
                <Link className="deleteLink">Delete</Link>
            </div>
        </div>
    )
}

export default ListCatOptions;