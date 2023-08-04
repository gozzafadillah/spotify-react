import React from "react";
import LoginStyle from "../assets/css/login.module.css";
import { LoginSpotify } from "../auth/spotify"; // Move CompleteLogin import to the top

const Login = () => {
  return (
    <>
      <div className={LoginStyle.body}>
        <h1>Welcome to spotify clone</h1>
        <div>
          <LoginSpotify dataName={LoginStyle.btnLogin} />
        </div>
      </div>
    </>
  );
};

export default Login;
