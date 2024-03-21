import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import "../homepage/Homepage.scss";
import axios from "axios";
import Options from "../options/Options";
import ListOptions from "../listOptions/ListOptions";
import $ from "jquery";

const Homepage = () => {
  const { user, getUser, loading, setLoading } = useContext(UserContext);
  // useState that controls toggle visiblity between Kitchen categories and List categories
  const [kitchen, setKitchen] = useState(true);

  //jquery that highlights whether Kitchen or List is selected
  $(function () {
    $(".hLink").on("click", function () {
      $(".hLink").removeClass("selected");
      $(this).addClass("selected");
    });
  });

  useEffect(() => {
    if(user){
      setLoading(false);
    }
  }, [user])

  return (
    <div className="homepage">
      {loading ? (
        <div className="loading"> 
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
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
          <div>{kitchen ? <Options /> : <ListOptions />}</div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
