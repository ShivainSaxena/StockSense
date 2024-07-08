import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const StackedBarChart = ({ data: iData }) => {
  const data = [
    {
      name: "",
      StrongBuy: iData.strongBuy,
      Buy: iData.buy,
      Hold: iData.hold,
      Sell: iData.sell,
      StrongSell: iData.strongSell,
    },
  ];

  return (
    <ResponsiveContainer width={200} height={400}>
      <BarChart data={data}>
        <Tooltip />
        <XAxis
          dataKey="name"
          label={{
            value: iData.period,
            offset: 10,
            dy: 15,
            fill: "#cdc2ba",
          }}
        />
        <YAxis
          label={{
            value: "# of Analysts",
            angle: -90,
            offset: 10,
            dx: -20,
            fill: "#cdc2ba",
          }}
          tick={{ fill: "#cdc2ba" }}
        />
        <Legend />
        <Bar dataKey="StrongSell" stackId="a" fill="#813131" barSize={75}>
          <LabelList dataKey="StrongSell" position="center" fill="#fff" />
        </Bar>
        <Bar dataKey="Sell" stackId="a" fill="#F45B5B">
          <LabelList dataKey="Sell" position="center" fill="#fff" />
        </Bar>
        <Bar dataKey="Hold" stackId="a" fill="#B98B1D">
          <LabelList dataKey="Hold" position="center" fill="#fff" />
        </Bar>
        <Bar dataKey="Buy" stackId="a" fill="#1DB954">
          <LabelList dataKey="Buy" position="center" fill="#fff" />
        </Bar>
        <Bar dataKey="StrongBuy" stackId="a" fill="#176F37">
          <LabelList dataKey="StrongBuy" position="center" fill="#fff" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
