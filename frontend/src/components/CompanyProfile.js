import MediaQuery from "react-responsive";

const CompanyProfile = ({ stockData: s }) => {
  return (
    <div className="company-profile">
      <MediaQuery minWidth={1036}>
        <header>
          <img
            src={s.Image}
            alt="company-logo"
            onError={(e) => {
              e.target.src =
                "https://img.collegepravesh.com/2015/09/Default_Logo.png";
            }}
          />
          <div className="general-details">
            <h2>{s.Symbol}</h2>
            <h1>{s.Name}</h1>
            <p>{s.Industry}</p>
            <p>{s.Location}</p>
          </div>
          <div className="misc-details">
            <p>Employees: {s.Employees}</p>
            <p>Stock Type: {s.Type}</p>
            <p>Exchange: {s.Exchange}</p>
          </div>
        </header>
      </MediaQuery>
      <MediaQuery maxWidth={1035}>
        <header className="mobile-header">
          <img src={s.Image} alt="company-logo" />
          <div className="general-details-mobile">
            <h2>{s.Symbol}</h2>
            <h1>{s.Name}</h1>
            <p>{s.Industry}</p>
            <p>{s.Location}</p>
          </div>
          <div className="misc-details-mobile">
            <p>Employees: {s.Employees}</p>
            <p>Stock Type: {s.Type}</p>
            <p>Exchange: {s.Exchange}</p>
          </div>
        </header>
      </MediaQuery>

      <p className="company-desc">{s.Profile}</p>
      {s.Website && (
        <h3 className="extras">
          Find out more:
          <a href={s.Website} target="_blank" rel="noreferrer">
            {s.Website}
          </a>
        </h3>
      )}
    </div>
  );
};

export default CompanyProfile;
