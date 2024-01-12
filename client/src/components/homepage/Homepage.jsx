import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../homepage/Homepage.scss";
import axios from "axios";
import Options from "../options/Options";
import ListOptions from "../listOptions/ListOptions";
import $ from "jquery";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [kitchen, setKitchen] = useState(true);

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

  $(".link").on("click", function () {
    $(".link").removeClass("selected");
    $(this).addClass("selected");
  });

  return (
    <div className="homepage">
      <div className="options">
        <div className="top">
          <div className="item">
            <Link className="link" onClick={() => setKitchen(true)}>
              <div> KITCHEN </div>
            </Link>
          </div>
          <div className="item">
            <Link className="link" onClick={() => setKitchen(false)}>
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
