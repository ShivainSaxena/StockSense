import { Link } from "react-router-dom";
import "../App.css";
import Mockup from "../assets/mockup.png";
import MediaQuery from "react-responsive";

const Landing = () => {
  return (
    <section className="main-landing">
      <main>
        <div className="main-text">
          <h1>
            Navigate Markets, Maximize Insights: An All-In-One Stock Monitoring
            Platform
          </h1>
          <p>
            The ultimate platform for stock monitoring and management. Create
            personalized dashboards to track your favorite stocks and manage
            your watchlist with ease.
          </p>
          <MediaQuery maxWidth={700}>
            <Link to="/login" className="login-link">
              Login
            </Link>
          </MediaQuery>
          <Link to="/sign-up" className="action-btn">
            Sign Up
          </Link>
        </div>
        <img
          src={Mockup}
          alt="Main Mockup"
          className="mockup"
          width={500}
          height={500}
        />
      </main>
    </section>
  );
};

export default Landing;
