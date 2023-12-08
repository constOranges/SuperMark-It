import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../homepage/Homepage.scss";
import axios from "axios";
import Options from "../options/Options";

const Homepage = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
            withCredentials: true,
        })
        .then((res) => {
            setUser(res.data.user)
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    

  return (
    <div className="homepage">
      <Options  user={user}/>
    </div>
  );
};

export default Homepage;
