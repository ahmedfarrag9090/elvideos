import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../imgs/image-4gold.png";
import avatar from "../../imgs/avatar3.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  //   to updae state when user scroll virtecaly by +100px
  useEffect(() => {
    const setBg = () => {
      window.addEventListener("scroll", () => {
        window.scrollY >= 100 ? setScrolled(true) : setScrolled(false);
      });
    };
    setBg();
  }, []);

  return (
    <nav className={`navbar  ${scrolled ? "bg-dark" : null}`}>
      <h1>EL<img src={logo} className="logo" alt="Logo" />ideos</h1>
      <img src={avatar} className="avatar" alt="avatar" />
    </nav>
  );
}

export default Navbar;
