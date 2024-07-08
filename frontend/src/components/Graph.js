import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { format } from "date-fns";
import { useStockContext } from "../hooks/useStockContext";
import MediaQuery from "react-responsive";

const Graph = ({ data: s }) => {
  const { state } = useStockContext();

  const getMin = (data) =>
    parseInt(Math.min(...data.map((d) => parseFloat(d.close))));
  const getMax = (data) =>
    parseInt(Math.max(...data.map((d) => parseFloat(d.close))));

  const matchedObject = state.find((o) => o.Symbol === s.symbol);

  return (
    <div className="chart-cont">
      <section className="legend">
        <h1>{s.symbol}</h1>
        <p>{matchedObject ? matchedObject.Name : "Unknown Name"}</p>
        <p>Interval: {s.interval}</p>
      </section>
      <MediaQuery minWidth={780}>
        <LineChart width={620} height={336} data={s.data}>
          <Tooltip />
          <XAxis
            dataKey="datetime"
            stroke="#cdc2ba"
            tickFormatter={(tick) => format(tick, "MMM d")}
          />
          <YAxis
            dataKey="close"
            domain={[getMin(s.data) - 10, getMax(s.data) + 10]}
            stroke="#cdc2ba"
            padding={{ bottom: 20 }}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke={
              parseFloat(s.data[0].close) >
              parseFloat(s.data.slice(-1)[0].close)
                ? "#cf2c30"
                : "#42ba96"
            }
            dot={false}
          />
        </LineChart>
      </MediaQuery>
      <MediaQuery maxWidth={780}>
        <LineChart width={250} height={336} data={s.data}>
          <Tooltip />
          <XAxis
            dataKey="datetime"
            stroke="#cdc2ba"
            tickFormatter={(tick) => format(tick, "MMM d")}
          />
          <YAxis
            dataKey="close"
            domain={[getMin(s.data) - 10, getMax(s.data) + 10]}
            stroke="#cdc2ba"
            hide={true}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke={
              parseFloat(s.data[0].close) >
              parseFloat(s.data.slice(-1)[0].close)
                ? "#cf2c30"
                : "#42ba96"
            }
            dot={false}
          />
        </LineChart>
      </MediaQuery>
    </div>
  );
};

export default Graph;
