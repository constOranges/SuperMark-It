import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../homepage/Homepage.scss";
import axios from "axios";
import Options from "../options/Options";
import ListOptions from "../listOptions/ListOptions";
import $ from "jquery";

const Homepage = () => {
  const [user, setUser] = useState(null);

  // useState that controls toggle visiblity between Kitchen categories and List categories
  const [kitchen, setKitchen] = useState(true);

  // Fetch current user data from API on page refresh
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //jquery that highlights whether Kitchen or List is selected
  $(function () {
    $(".hLink").on("click", function () {
      $(".hLink").removeClass("selected");
      $(this).addClass("selected");
    });
  });

  return (
    <div className="homepage">
      <div className="options">
        <div className="top">
          <div className="item">
            <Link
              className="link hLink selected"
              onClick={() => setKitchen(true)}
            >
              <div> KITCHEN </div>
            </Link>
          </div>
          <div className="item">
            <Link className="link hLink" onClick={() => setKitchen(false)}>
              <div>LISTS</div>
            </Link>
          </div>
        </div>
      </div>
      {kitchen ? <Options user={user} /> : <ListOptions user={user} />}
    </div>
  );
};

export default Homepage;
