import React from "react";
import { Link } from "react-router-dom";
import "./ItemOptions.scss";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// DELETE: make sure to add options to delete from list, category, or all items

const ItemOptions = () => {
    return (
        <div className="itemOptions">
            <div className="item">
                <Link className="iconLink">
                    <PlaylistAddOutlinedIcon className="icon" />
                </Link>
                <Link>Add To List</Link>
            </div>
            <div className="item">
                <Link className="iconLink">
                    <CreateNewFolderOutlinedIcon className="icon" />
                </Link>
                <Link>Add To Category</Link>
            </div>
            <div className="item">
                <Link className="iconLink">
                    <CreateOutlinedIcon className="icon" />
                </Link>
                <Link>Edit</Link>
            </div>
            <div className="item">
                <Link className="iconLink">
                    <AutorenewOutlinedIcon className="icon" />
                </Link>
                <Link>Renew</Link>
            </div>
            <div className="item">
                <Link className="iconLink">
                    <DeleteOutlineOutlinedIcon className="icon" />
                </Link>
                <Link>Delete</Link>
            </div>
        </div>
    )
}

export default ItemOptions;