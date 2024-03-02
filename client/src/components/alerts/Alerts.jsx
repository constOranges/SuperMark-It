import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "../../defaultImage/orange.png";
import { DateTime } from "luxon";
import CloseIcon from "@mui/icons-material/Close";
import "./Alerts.scss";

const Alerts = () => {
  const [notifications, setNotifications] = useState([]);
  const currentDate = new Date().getTime();

  const getNotifications = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setNotifications(res.data.user.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const deleteHandler = async (e, notificationId) => {
    e.preventDefault();
    await axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/notifications/delete`,
        {
          notificationId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        getNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAll = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/notifications/clearall`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        getNotifications();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="notificationDropDown">
      {notifications.length > 0 ? (
        <div>
          <button onClick={(e) => deleteAll(e)}>CLEAR ALL</button>
          {notifications.map((notification) => {
            const expDateInt = new Date(notification.expDate).getTime();
            return (
              <div className="addLink">
                <CloseIcon
                  className="close"
                  onClick={(e) => deleteHandler(e, notification._id)}
                />
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
          })}
        </div>
      ) : (<p>No notifications</p>)}
    </div>
  );
};

export default Alerts;
