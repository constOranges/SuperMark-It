import './App.scss';
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Homepage from './components/homepage/Homepage';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
import AddNewItem from './components/addNewItem/AddNewItem';


const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );

}


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
        path: "/search",
        element: <Search />,
      },
      {
        path: "/add",
        element: <AddNewItem />,
      }
    ],
  },
]);

function App() {


  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App
