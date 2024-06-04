import React from "react";

const Header = () => {
  return (
    <header className="App-header">
      <p className="logo">
        <a href="./App.js" className="flex">
          <img src="/logo.png" alt="logo" /> 가계부
        </a>
      </p>
      <p className="login">
        <a href="">
          <img src="/login.png" />
        </a>
      </p>
    </header>
  );
};

export default Header;
