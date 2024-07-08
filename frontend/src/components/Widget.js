const Widget = ({ data: s }) => {
  return (
    <div className="widget">
      <header>
        <section className="name">
          <h1>{s.symbol}</h1>
          <p>{s.name}</p>
        </section>
        <section className="change">
          <h2
            style={{
              color: parseFloat(s.percent_change) > 0 ? "#42ba96" : "#cf2c30",
            }}
          >
            {parseFloat(s.percent_change) > 0 && "+"}
            {parseFloat(s.percent_change).toFixed(2)}%
          </h2>
          <h2
            style={{
              color: parseFloat(s.change) > 0 ? "#42ba96" : "#cf2c30",
            }}
          >
            {parseFloat(s.change) > 0 && "+"}
            {parseFloat(s.change).toFixed(2)}
          </h2>
        </section>
      </header>
      <section className="price">
        <p>
          <strong
            style={{
              color: parseFloat(s.change) > 0 ? "#42ba96" : "#cf2c30",
            }}
          >
            {parseFloat(s.close).toFixed(2)}
          </strong>
          USD
        </p>
      </section>
    </div>
  );
};

export default Widget;
