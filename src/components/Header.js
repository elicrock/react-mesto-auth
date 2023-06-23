import React from "react";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, link, linkText, email }) {
  return (
    <header className="header">
      <Link to="/react-mesto-auth" className="header__logo" />
      <nav className="header__links">
        {isLoggedIn && <p className="header__email">{email}</p>}
        <Link to={link} className={`header__link ${isLoggedIn && 'header__link_islogin'}`}>{linkText}</Link>
      </nav>
    </header>
  );
}

export default Header;