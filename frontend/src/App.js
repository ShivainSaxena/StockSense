import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import TopNavBar from "./components/TopNavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Search from "./pages/Search";
import { useState, useEffect } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { useFillStocks } from "./hooks/useFillStocks";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, dispatch } = useAuthContext(); // Context for authentication
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { fillstocks } = useFillStocks(); // Custom hook for filling stocks

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user }); // Log in user if found in local storage
      fillstocks(user.token).then((res) => {
        if (res) {
          dispatch({ type: "LOGOUT" }); // Log out if fillstocks fails
        }
      });
    }
    setIsLoading(false); // Set loading to false
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={true} />{" "}
        {/* Notifications */}
        {!user && <TopNavBar />}{" "}
        {/* Show top navigation bar if not logged in */}
        <Routes>
          <Route
            path="/"
            element={!user ? <Landing /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/sign-up"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={user ? <Search /> : <Navigate to="/" />}
          />
          <Route
            path="/insights"
            element={user ? <Insights /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
