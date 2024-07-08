import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../App.css";
import MediaQuery from "react-responsive";

const TopNavBar = () => {
  return (
    <header className="top-nav">
      <Link to="/">
        <div className="logo-name">
          <img src={Logo} alt="Logo" className="logo-img" />

          <h1>
            Stock<strong>Sense</strong>
          </h1>
        </div>
      </Link>
      <MediaQuery minWidth={701}>
        <div className="nav-links">
          <Link to="/login" className="login-link">
            Login
          </Link>
          <Link to="/sign-up">Get Started</Link>
        </div>
      </MediaQuery>
    </header>
  );
};

export default TopNavBar;
