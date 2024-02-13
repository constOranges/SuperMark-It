import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState(null);

  const itemsArr = [];

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

//   userData?.categories.forEach((category) => {
//     category?.items.forEach((item) => {
//         itemsArr.push(item)
//     })
//   });

//   console.log(itemsArr);

  return (
    <div className="search">
      <h1>Search</h1>
      <Form>
        <InputGroup>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Items"
          />
        </InputGroup>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Expiration Date</th>
            <th>Categories</th>
            <th>Lists</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
};

export default Search;
