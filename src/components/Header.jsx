import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import useScrollDirection from "../hooks/useScrollDirection";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import "../styles/Header.css"; 
import "../App.css"; 

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();

  return (
    <header className={`header ${scrollDirection === "down" ? "hide" : ""}`}>
        <div className="navbar_logo">
        <Link to="/">
          <img src={logo} alt="ABB Logo" />
        </Link>
      </div>

      <nav className={`nav ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/menu" onClick={() => setMenuOpen(false)}>Menu</NavLink>
        <NavLink to="/Events" onClick={() => setMenuOpen(false)}>Events</NavLink>
        <NavLink to="/outlets" onClick={() => setMenuOpen(false)}>Outlets</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</NavLink>
      </nav>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <GiHamburgerMenu />
      </div>
    </header>
  );
};
