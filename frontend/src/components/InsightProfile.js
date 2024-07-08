import Up from "../assets/up.png";
import Down from "../assets/down.png";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Popover } from "antd";
import StackedBarChart from "./StackedBarChart";

const content = (
  <div>
    <p style={{ width: "clamp(12.5rem, 11.875rem + 3.125vw, 15.625rem)" }}>
      The predicted stock price is based on historical data and machine learning
      models, and may not be accurate.
    </p>
  </div>
);

const InsightProfile = ({ data }) => {
  return (
    <section className="insight-profile">
      <div className="prediction-head">
        <h1>Predictions</h1>
        <Popover
          content={content}
          title="Disclaimer"
          trigger="click"
          placement="right"
        >
          <IoInformationCircleOutline />
        </Popover>
      </div>
      <div className="prediction">
        <article className="trend">
          {data.change === "up" ? (
            <img src={Up} alt="Up" />
          ) : (
            <img src={Down} alt="Down" />
          )}
          <p>
            {data.change === "up" ? "Trending Upwards" : "Trending Downwards"}
          </p>
        </article>
        <div className="tmrw-price">
          <p className="predicted-price-label">
            Tomorrow's Predicted Closing Price:
          </p>
          <p className="predicted-price">${data.tPrice}</p>
        </div>
      </div>
      <section className="insight-info">
        <article className="recommendation">
          <h1>Recommendations</h1>
          <StackedBarChart data={data} />
        </article>
        <article className="news">
          <h1>News</h1>
          {data.news.map((a, i) => {
            return (
              <a href={a.url} target="_blank" rel="noreferrer" key={i}>
                <div className="news-article">
                  <p className="date">{a.datetime}</p>
                  <h2 className="headline">{a.headline}</h2>
                  <p className="source">{a.source}</p>
                </div>
              </a>
            );
          })}
        </article>
      </section>
    </section>
  );
};

export default InsightProfile;
