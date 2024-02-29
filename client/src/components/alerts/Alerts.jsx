import React, { useState } from "react";
import axios from "axios";
import "./Alerts.scss";

const Alerts = ({ user }) => {
  const currentDate = new Date().getTime();
  console.log(user)

  return (
    <div className="addItemDropDown">
      {user
        ? user.notifications.map((notification) => {
            const expDateInt = new Date(notification.expDate).getTime();
            <div>
              <img
                src={notification.imagePath?.url}
                alt="Image of product"
                className="image"
              />
              {currentDate < expDateInt ? (
                <p>{`${notification.itemName} will expire on ${notification.expDate}`}</p>
              ) : (
                <p>{`${notification.itemName} has expired`}</p>
              )}
            </div>;
          })
        : null}
    </div>
  );
};

export default Alerts;
