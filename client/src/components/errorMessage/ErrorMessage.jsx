import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const ErrorMessage = ({ errors, errorHandler }) => {
  return (
    <div className="overlay">
      <div className="errorMessage">
        <CloseIcon className="close" onClick={errorHandler}/>
        {errors.map((err) => (
          <p>{err}</p>
        ))}
      </div>
    </div>
  );
};

export default ErrorMessage;
