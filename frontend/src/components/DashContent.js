import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import { useSessionStorage } from "../hooks/useSessionStorage";
import Dash from "./Dash";

import { Link } from "react-router-dom";

const DashContent = () => {
  const { AuthFetch } = useFetch();
  const { user } = useAuthContext();
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dashStocks, setDashStocks] = useSessionStorage("dashstocks", null);

  useEffect(() => {
    AuthFetch("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          setLoading(false);
          setEmpty(true);
          return;
        } else if (!res.ok) {
          setLoading(false);
          throw new Error("Error fetching Stock Data, try again in one minute");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setDashStocks(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const updateDashStocks = (filtered) => {
    setDashStocks(filtered);
  };

  if (loading) {
    return (
      <div className="content">
        <h1 className="dash-title">Dashboard</h1>
        <div style={{ color: "#faece2" }}>Loading...</div>
      </div>
    );
  }

  if (empty || dashStocks === null) {
    return (
      <div className="content">
        <h1 className="dash-title">Dashboard</h1>
        <section className="empty-dash">
          <h1>Your Dashboard is Empty</h1>
          <Link to="/search">+ Add Stock</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="content">
      <h1 className="dash-title">Dashboard</h1>
      <section className="dash-cont">
        {dashStocks && (
          <Dash dashStocks={dashStocks} updateDashStocks={updateDashStocks} />
        )}
      </section>
    </div>
  );
};

export default DashContent;
