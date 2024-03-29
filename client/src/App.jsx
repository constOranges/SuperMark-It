import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Homepage from "./components/homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";
import AddNewItem from "./components/addNewItem/AddNewItem";
import AddListItem from "./components/addListItem/AddListItem";
import NewUserForm from "./components/newUserForm/NewUserForm";
import Category from "./components/category/Category";
import List from "./components/list/List";
import AllCategory from "./components/allCategory/AllCategory";
import NewCategoryForm from "./components/newCategoryForm/NewCategoryForm";
import NewListForm from "./components/newListForm/NewListForm";
import UpdateCatItemForm from "./components/updateCatItemForm/UpdateCatItemForm";
import UpdateListItemForm from "./components/updateListItemForm/UpdateListItemForm";
import UpdateCatForm from "./components/updateCatForm/UpdateCatForm";
import EditUserForm from "./components/editUserForm/EditUserForm";

function App() {


  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
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
          path: "/category/all",
          element: <AllCategory />,
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
          path: "/addListItem",
          element: <AddListItem />,
        },
        {
          path: "/updateCatItem/:id",
          element: <UpdateCatItemForm />,
        },
        {
          path: "/updateListItem/:id",
          element: <UpdateListItemForm />,
        },
        {
          path: "/newUser",
          element: <NewUserForm />,
        },
        {
          path: "/editUser",
          element: <EditUserForm />,
        },
        {
          path: "/newCategory",
          element: <NewCategoryForm />,
        },
        {
          path: "/newList",
          element: <NewListForm />,
        },
        {
          path: "/updateCategory",
          element: <UpdateCatForm />,
        },
      ],
    },
  ]);

  return (
    <>
      <div>
        <UserProvider>
          <RouterProvider router={router} forceRefresh={true} />
        </UserProvider>
      </div>
    </>
  );
}

export default App;
