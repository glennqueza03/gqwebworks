import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <NavLink to="/" className="corner-logo" aria-label="GQWebworks home">
        <img src="/images/gqwebworkslogo.png" alt="GQWebworks" />
      </NavLink>
      <nav className="nav-pill" aria-label="Primary">
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <a href="/#services">Services</a>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <a href="/#faq">FAQ</a>
          <a href="/#contact">Contact</a>
        </div>
        <div className="nav-end">
          <NavLink to="/project" className="nav-cta">
            Latest project
          </NavLink>
          <button
            type="button"
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
      {open ? (
        <div className="nav-drawer">
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>
          <a href="/#services" onClick={() => setOpen(false)}>
            Services
          </a>
          <NavLink to="/portfolio" onClick={() => setOpen(false)}>
            Portfolio
          </NavLink>
          <a href="/#faq" onClick={() => setOpen(false)}>
            FAQ
          </a>
          <a href="/#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
          <NavLink to="/project" onClick={() => setOpen(false)}>
            Latest project
          </NavLink>
        </div>
      ) : null}
    </header>
  );
}
