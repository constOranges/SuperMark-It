import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState(null);

  const categoryArr = [];
  const listArr = [];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const itemData = () => {
    userData?.categories.forEach((category) => {
      category?.items.forEach((item) => {
        categoryArr.push(item);
      });
    });

    userData?.lists.forEach((list) => {
      list?.items.forEach((item) => {
        listArr.push(item);
      });
    });
  };

  itemData();

  return (
    <div className="search">
      <h1>Search</h1>
      <Form>
        <InputGroup>
          <Form.Control
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Items"
          />
        </InputGroup>
      </Form>

      <h1>Category Items</h1>
      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {categoryArr
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.itemName.toLowerCase().includes(search);
            })
            .map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <img src={item.imagePath?.url}></img>
                  </td>
                  <td>{item.itemName}</td>
                  <td>{item.brand}</td>
                  <td>{item.quantity}</td>
                  <td>{item.expDate?.slice(0, 10)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <h1>List Items</h1>
      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {listArr
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.itemName.toLowerCase().includes(search);
            })
            .map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <img src={item.imagePath?.url}></img>
                  </td>
                  <td>{item.itemName}</td>
                  <td>{item.brand}</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Search;
