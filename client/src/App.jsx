import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoggedIn(true);
        setUser(res.data.user);
      })
      .catch((err) => {
        setLoggedIn(false);
        setUser(null);
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  const Layout = () => {
    return (
      <div className="app">
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          user={user}
          getUser={getUser}
        />
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
          element: <Homepage user={user} />,
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
          element: (
            <NewUserForm
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              getUser={getUser}
            />
          ),
        },
        {
          path: "/editUser",
          element: (
            <EditUserForm
              user={user}
              getUser={getUser}
              setLoggedIn={setLoggedIn}
            />
          ),
        },
        {
          path: "/newCategory",
          element: <NewCategoryForm getUser={getUser}  />,
        },
        {
          path: "/newList",
          element: <NewListForm getUser={getUser} />,
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
        <RouterProvider router={router} forceRefresh={true} />
      </div>
    </>
  );
}

export default App;
