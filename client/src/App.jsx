import './App.css';
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Homepage from './components/homepage/Homepage';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';


const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Navbar />
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
        element:<Homepage />,
      }
    ]
  }
])

function App() {


  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App
