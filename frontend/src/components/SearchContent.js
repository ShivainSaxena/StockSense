import { useStockContext } from "../hooks/useStockContext";
import { useState } from "react";
import CompanyProfile from "./CompanyProfile";
import toast from "react-hot-toast";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetch } from "../hooks/useFetch";
import { Modal } from "antd";

const SearchContent = () => {
  const { state } = useStockContext();
  const { user } = useAuthContext();
  const { AuthFetch } = useFetch();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [searchParam] = useState(["Symbol", "Name", "Industry"]);

  const [clicked, setClicked] = useState("");
  const [searching, setSearching] = useState(true);

  const [stockData, setStockData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  const handleValue = () => {
    if (!clicked) {
      return q;
    } else {
      return clicked;
    }
  };

  const searchStock = async () => {
    setSearching(false);
    const symbol = clicked.split(" ")[0];
    const response = await AuthFetch(`/api/stock/${symbol}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error("Failed to fetch stock data");
      setSearching(true);
      setQ("");
      setClicked("");
    } else {
      setStockData(data);
    }
  };

  const addStock = async (type) => {
    setIsModalOpen(false);
    const response = await AuthFetch("/api/dashboard/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ ticker: clicked.split(" ")[0], type }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error);
    } else {
      sessionStorage.removeItem("dashboardLayout");
      navigate("/dashboard");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="content">
      <div className="searchbar">
        <h1>Search for a stock:</h1>
        <div
          className="search-area"
          style={{ pointerEvents: !searching ? "none" : "auto" }}
        >
          <input
            type="search"
            value={handleValue()}
            onChange={(e) => {
              setQ(e.target.value);
              setSearching(true);
              setClicked("");
            }}
          />
          <MediaQuery maxWidth={650}>
            <br />
          </MediaQuery>

          <button
            style={{
              pointerEvents: !clicked ? "none" : "auto",
              background: !clicked ? "#3d2fb6" : "#5542f6",
            }}
            onClick={searchStock}
            disabled={!searching}
          >
            Search
          </button>

          <div
            className="all-results"
            style={{ display: !searching ? "none" : "block" }}
          >
            <table>
              {q ? (
                <tbody>
                  <tr
                    style={{
                      display: search(state).length > 0 ? "table-row" : "none",
                    }}
                  >
                    <td>Symbol</td>
                    <td>Company Name</td>
                    <td>Industry</td>
                  </tr>
                  {search(state)
                    .slice(0, 100)
                    .map((item) => (
                      <tr
                        onClick={() => {
                          setClicked(
                            `${item.Symbol} - ${item.Name} - ${item.Industry}`
                          );
                        }}
                        key={item._id}
                      >
                        <td>{item.Symbol}</td>
                        <td>{item.Name}</td>
                        <td>{item.Industry}</td>
                      </tr>
                    ))}
                </tbody>
              ) : (
                <></>
              )}
            </table>
            {q && (
              <div
                className="no-results"
                style={{
                  display: search(state).length === 0 ? "block" : "none",
                }}
              >
                No results found
              </div>
            )}
          </div>
        </div>
      </div>
      {stockData && (
        <>
          <CompanyProfile stockData={stockData} />
          <div className="search-actions">
            <button
              onClick={() => {
                setSearching(true);
                setQ("");
                setClicked("");
                setStockData(null);
              }}
            >
              Search New stock
            </button>
            <button onClick={showModal}>Add to Dashboard</button>
          </div>
        </>
      )}
      <Modal
        title="Choose Display Type:"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <div className="display-btns">
          <button onClick={() => addStock("widget")}>Widget</button>
          <button onClick={() => addStock("graph")}>Graph</button>
        </div>
      </Modal>
    </div>
  );
};

export default SearchContent;
