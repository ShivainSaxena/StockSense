import Logo from "../assets/logo.png";
import { SlGrid, SlMagnifier, SlLogout } from "react-icons/sl";
import { MdInsights } from "react-icons/md";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate, useLocation } from "react-router-dom";
import MediaQuery from "react-responsive";
import { Drawer } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";

const SideMenu = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    logout();
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MediaQuery minWidth={1036}>
        <div className="side-menu">
          <div className="logo-name-side">
            <img src={Logo} alt="Logo" className="logo-img-side" />
            <h1>
              Stock<strong>Sense</strong>
            </h1>
          </div>
          <ul>
            <li
              onClick={() => navigate("/dashboard")}
              style={{
                background:
                  location.pathname === "/dashboard" ? "#2c314b" : "none",
              }}
            >
              <SlGrid />
              Dashboard
            </li>
            <li
              onClick={() => navigate("/search")}
              style={{
                background:
                  location.pathname === "/search" ? "#2c314b" : "none",
              }}
            >
              <SlMagnifier />
              Search
            </li>
            <li
              onClick={() => navigate("/insights")}
              style={{
                background:
                  location.pathname === "/insights" ? "#2c314b" : "none",
              }}
            >
              <MdInsights />
              Insights
            </li>
          </ul>
          <div id="last">
            <div>{user.email}</div>
            <button onClick={handleClick}>Log out</button>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1035}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: !open ? 1 : 0 }}
          transition={{ duration: 0.275 }}
          className="mobile-side-menu"
          onClick={showDrawer}
        >
          <img
            src={Logo}
            alt="Logo"
            className="logo-img-side"
            style={{ padding: "0 12px" }}
          />
          <ul>
            <li
              style={{
                background:
                  location.pathname === "/dashboard" ? "#2c314b" : "none",
              }}
            >
              <SlGrid />
            </li>
            <li
              style={{
                background:
                  location.pathname === "/search" ? "#2c314b" : "none",
              }}
            >
              <SlMagnifier />
            </li>
            <li
              style={{
                background:
                  location.pathname === "/insights" ? "#2c314b" : "none",
              }}
            >
              <MdInsights />
            </li>
          </ul>
          <div id="last-mobile">
            <button>
              <SlLogout />
            </button>
          </div>
        </motion.div>

        <Drawer
          onClose={onClose}
          open={open}
          placement={"left"}
          width={225}
          zIndex={5}
          className="side-menu-drawer"
        >
          <div className="side-menu">
            <div className="logo-name-side">
              <img src={Logo} alt="Logo" className="logo-img-side" />
              <h1>
                Stock<strong>Sense</strong>
              </h1>
            </div>
            <ul>
              <li
                onClick={() => navigate("/dashboard")}
                style={{
                  background:
                    location.pathname === "/dashboard" ? "#2c314b" : "none",
                }}
              >
                <SlGrid />
                Dashboard
              </li>
              <li
                onClick={() => navigate("/search")}
                style={{
                  background:
                    location.pathname === "/search" ? "#2c314b" : "none",
                }}
              >
                <SlMagnifier />
                Search
              </li>
              <li
                onClick={() => navigate("/insights")}
                style={{
                  background:
                    location.pathname === "/insights" ? "#2c314b" : "none",
                }}
              >
                <MdInsights />
                Insights
              </li>
            </ul>
            <div id="last">
              <div>{user.email}</div>
              <button onClick={handleClick}>Log out</button>
            </div>
          </div>
        </Drawer>
      </MediaQuery>
    </>
  );
};

export default SideMenu;
