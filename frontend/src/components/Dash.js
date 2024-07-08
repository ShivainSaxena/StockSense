import React, { useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useSessionStorage } from "../hooks/useSessionStorage";
import Widget from "./Widget";
import Graph from "./Graph";
import mobile from "is-mobile";
import toast from "react-hot-toast";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useFetch } from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = ({ dashStocks, updateDashStocks }) => {
  const [layout, setLayout] = useSessionStorage("dashboardLayout", []);
  const isPhone = useMediaQuery({
    query: "(max-width: 778px)",
  });
  const { AuthFetch } = useFetch();
  const { user } = useAuthContext();

  useEffect(() => {
    if (layout.length === 0) {
      const iLayout = dashStocks.map((s, i) => {
        if (s.type === "widget") {
          return {
            i: `item${i}`,
            x: i % 5,
            y: 0,
            w: isPhone ? 2 : 1,
            h: 1,
          };
        } else if (s.type === "graph") {
          return {
            i: `item${i}`,
            x: i % 5,
            y: 0,
            w: 2,
            h: 2,
          };
        }
      });

      setLayout(iLayout);
    }
  }, [dashStocks]);

  useEffect(() => {
    // Validate layout sizes and adjust if necessary
    const validatedLayout = layout.map((item) => {
      const stock = dashStocks.find((s, i) => `item${i}` === item.i);
      if (stock?.type === "graph" && (item.w !== 2 || item.h !== 2)) {
        return { ...item, w: 2, h: 2 };
      }
      if (
        stock?.type === "widget" &&
        ((isPhone && item.w !== 2) || item.w !== 1 || item.h !== 1)
      ) {
        return { ...item, w: isPhone ? 2 : 1, h: 1 };
      }
      return item;
    });

    if (JSON.stringify(validatedLayout) !== JSON.stringify(layout)) {
      setLayout(validatedLayout);
    }
  }, [layout, dashStocks, setLayout]);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const loopOverStocks = (stocks) => {
    return stocks.map((s, i) => {
      if (s.type === "widget") {
        return (
          <div key={`item${i}`}>
            <Widget data={s} />
            <div
              className="deleteWidget"
              onMouseDown={(event) => {
                event.stopPropagation();
                deleteStock(s.symbol);
              }}
            >
              X
            </div>
          </div>
        );
      } else if (s.type === "graph") {
        return (
          <div key={`item${i}`}>
            <Graph data={s} />
            <div
              className="deleteWidget"
              onMouseDown={(event) => {
                event.stopPropagation();
                deleteStock(s.symbol);
              }}
            >
              X
            </div>
          </div>
        );
      }
    });
  };

  const deleteStock = async (symbol) => {
    const response = await AuthFetch("/api/dashboard", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ ticker: symbol }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error);
    } else {
      setLayout([]);
      const filtered = dashStocks.filter((s) => s.symbol !== symbol);
      filtered.length !== 0
        ? updateDashStocks(filtered)
        : updateDashStocks(null);

      toast.success(data.mssg);
    }
  };

  return (
    <div>
      <MediaQuery minWidth={2030}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={5}
          rowHeight={167}
          width={1700}
          isResizable={false}
          onLayoutChange={onLayoutChange}
          isDraggable={!mobile()}
        >
          {loopOverStocks(dashStocks)}
        </GridLayout>
      </MediaQuery>
      <MediaQuery minWidth={1670} maxWidth={2030}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={4}
          rowHeight={167}
          width={1350}
          isResizable={false}
          onLayoutChange={onLayoutChange}
          isDraggable={!mobile()}
        >
          {loopOverStocks(dashStocks)}
        </GridLayout>
      </MediaQuery>
      <MediaQuery minWidth={1300} maxWidth={1670}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={3}
          rowHeight={167}
          width={1010}
          isResizable={false}
          onLayoutChange={onLayoutChange}
          isDraggable={!mobile()}
        >
          {loopOverStocks(dashStocks)}
        </GridLayout>
      </MediaQuery>
      <MediaQuery minWidth={780} maxWidth={1300}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={2}
          rowHeight={167}
          width={680}
          isResizable={false}
          onLayoutChange={onLayoutChange}
          isDraggable={!mobile()}
        >
          {loopOverStocks(dashStocks)}
        </GridLayout>
      </MediaQuery>
      <MediaQuery maxWidth={780}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={2}
          rowHeight={167}
          width={280}
          isResizable={false}
          onLayoutChange={onLayoutChange}
          isDraggable={!mobile()}
        >
          {loopOverStocks(dashStocks)}
        </GridLayout>
      </MediaQuery>
    </div>
  );
};

export default Dashboard;
