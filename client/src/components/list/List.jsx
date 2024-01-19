import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./List.scss";
import ListCatOptions from "../listCatOptions/ListCatOptions";
import ItemCard from "../itemCard/ItemCard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const List = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [listId, setListId] = useState(null);


    useEffect(() => {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setList(res.data.user.lists);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  const handleClickAway = () => {
    setOpen(false);
  };

  const prodList = []


  const products = list.filter((items) => {
    if (`/list/${items._id}` == window.location.pathname) {
      prodList.push(items.items)
    }
 
  })

  const listName = list.map((name) => {
    if(`/list/${name._id}` == window.location.pathname){
      return name.listName;
    }
   
  })

  



  console.log(prodList)







  // const data = [
  //   {
  //     id: 1,
  //     img: "https://images.heb.com/is/image/HEBGrocery/prd-medium/000145080.jpg",
  //     title: "Orange Juice",
  //     brand: "Tropicana",
  //     exp: "1/1/2024",
  //   },
  //   {
  //     id: 2,
  //     img: "https://images.costcobusinessdelivery.com/ImageDelivery/imageService?profileId=12028466&itemId=427381&recipeName=680",
  //     title: "Eggs",
  //     brand: "Kirkland",
  //     exp: "12/24/2023",
  //   },
  //   {
  //     id: 3,
  //     img: "https://target.scene7.com/is/image/Target/GUEST_2fb69cb5-a940-492e-85a7-ac1ab33749a1?wid=2000",
  //     title: "Mayonnaise",
  //     brand: "Kewpie",
  //     exp: "2/5/2024",
  //   },
  // ];

  return (
    <div className="list">
      <div className="top">
        <h1>{listName}</h1>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <div className="more" onClick={() => setOpen(!open)}>
              <MoreHorizIcon className="moreIcon" />
            </div>
            {open && <ListCatOptions />}
          </div>
        </ClickAwayListener>
        <button>
          <Link to="/addListItem" className="buttonLink">
            + Add Item
          </Link>
        </button>
      </div>
      <div className="bottom">
        {products? prodList[0]?.map((item) => (
          <ItemCard item={item} key={item.id} />
        )) : null}
      </div>
    </div>
  );
};

export default List;
