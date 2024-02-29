import React, { useState } from "react";
import defaultImage from "../../defaultImage/orange.png";
import { DateTime } from "luxon";
import "./Alerts.scss";

const Alerts = ({ user }) => {
  const currentDate = new Date().getTime();
  console.log(user);

  return (
    <div className="notificationDropDown">
      {user
        ? user.notifications.map((notification) => {
            const expDateInt = new Date(notification.expDate).getTime();
            return (
              <div className="addLink">
                {notification.imagePath ? (
                  <img
                    src={notification.imagePath?.url}
                    alt="Image of product"
                    className="image"
                  />
                ) : (
                  <img
                    src={defaultImage}
                    alt="Image of product"
                    className="image"
                  />
                )}

                {currentDate < expDateInt ? (
                  <p>{`${
                    notification.itemName
                  } will expire on ${DateTime.fromISO(notification.expDate)
                    .toUTC()
                    .toFormat("LL/dd/yyyy")}`}</p>
                ) : (
                  <p>{`${notification.itemName} has expired`}</p>
                )}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Alerts;
