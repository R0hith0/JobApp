function InternshipCard({
  companyName,
  role,
  tags = [],
  stipend,
  location = "Location TBD",
  logoUrl,
}) {
  return (
    <div className="card">

      <div className="card-main">

        <div className="company-logo">
          {logoUrl ? (
            <img src={logoUrl} alt={companyName} />
          ) : (
            companyName.charAt(0)
          )}
        </div>


        <div className="company-details">

          <h2 className="company-name">
            {companyName}
          </h2>

          <h3 className="job-title">
            {role}
          </h3>


          <div className="tags">
            {tags.map((tag, index) => (
              <span className="tag" key={index}>
                {tag}
              </span>
            ))}
          </div>

        </div>

      </div>


      <div className="card-middle">

        <p className="stipend">
          {stipend}
        </p>

        <p className="status">
          Accepting applications
        </p>

      </div>


      <div className="card-footer">

        <p>
          {location}
        </p>

        <button className="details-btn">
          View Details
        </button>

      </div>


    </div>
  );
}

export default InternshipCard;