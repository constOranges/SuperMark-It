import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.scss";


const LoginForm = ({ loggedIn, setLoggedIn }) => {

    const [loginErrors, setLoginErrors] = useState("");

    const navigate = useNavigate();
    
    const loginHandler = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/login`, {
            email,
            password
        }, { withCredentials: true })
        .then((res) => {
            setLoggedIn(true);
            Navigate("/");
        })
        .catch((err) => {
            setLoggedIn(false);
            setLoginErrors(err.response.data);
        })
    }


    return (
      <div className="loginForm">
        <h4>Log in</h4>
        <form onSubmit={loginHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
            />
          </div>
          <div className="form-group">
            <button className="loginBtn" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    );
}


export default LoginForm;