import React from "react";
import "../homepage/Homepage.scss";
import Options from "../options/Options";

const Homepage = ({loggedIn, setLoggedIn}) => {
    return(
        <div className="homepage">
            <Options />
        </div>
    )
}



export default Homepage;