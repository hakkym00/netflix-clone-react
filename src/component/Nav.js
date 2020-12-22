import React, { useEffect, useState } from "react";
import "../Nav.css";

function Nav() {
  const [handleShow, setHandleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHandleShow(true);
      } else {
        setHandleShow(false);
      }
      return () => window.removeEventListener("scroll");
    });
  }, []);
  return (
    <div className={`nav ${handleShow && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="Avatar"
      />
    </div>
  );
}

export default Nav;
