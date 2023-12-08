import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";
import AddNewItem from "./components/addNewItem/AddNewItem";
import NewUserForm from "./components/newUserForm/NewUserForm";
import Category from "./components/category/Category";
import List from "./components/list/List";
import NewCategoryForm from "./components/newCategoryForm/NewCategoryForm";

const Layout = () => {

  const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }, []);


  return (
    <div className="app">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/list/:id",
        element: <List />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/add",
        element: <AddNewItem />,
      },
      {
        path: "/newUser",
        element: <NewUserForm />,
      },
      {
        path: "/newCategory",
        element: <NewCategoryForm />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} forceRefresh={true}/>
      </div>
    </>
  );
}

export default App;
