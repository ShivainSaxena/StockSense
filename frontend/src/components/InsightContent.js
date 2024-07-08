import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import InsightProfile from "./InsightProfile";

const InsightContent = () => {
  const [symbol, setSymbol] = useState("");
  const [clicked, setClicked] = useState(false);
  const { AuthFetch } = useFetch();
  const { user } = useAuthContext();
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setClicked(true);
    const response = await AuthFetch(`/api/predict/${symbol}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error("Failed to fetch stock insights");
      setSymbol("");
      setClicked(false);
      setLoading(false);
    } else {
      setLoading(false);
      setInsightData(data);
    }
  };

  return (
    <div className="content">
      <section className="predict-search">
        <h1 className="insight-head">
          Enter a Stock Symbol for Trend Predictions and Insights:
        </h1>
        <div
          style={{
            pointerEvents: clicked ? "none" : "auto",
          }}
        >
          <input
            type="search"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <button
            disabled={!symbol || clicked}
            onClick={handleSearch}
            style={{
              pointerEvents: !symbol ? "none" : "auto",
              background: !symbol ? "#3d2fb6" : "#5542f6",
            }}
          >
            Search
          </button>
        </div>
      </section>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="loader"></div>
        </div>
      )}
      {insightData && (
        <>
          <InsightProfile data={insightData} />
          <div className="search-actions">
            <button
              onClick={() => {
                setSymbol("");
                setClicked(false);
                setInsightData(null);
              }}
            >
              Search New stock
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InsightContent;
