import "./JobCard.css";

function JobCard({
  company,
  title,
  tags = [],
  salary,
  location = "Location TBD",
  status = "Accepting applications",
  logo,
}) {
  return (
    <div className="job-card">

      <div className="job-card-logo">
        {logo ? (
          <img src={logo} alt={company} />
        ) : (
          company.charAt(0)
        )}
      </div>


      <div className="job-card-content">

        <div className="job-card-top">

          <div className="job-card-main">

            <h2 className="job-card-title">
              {title}
            </h2>

            <p className="job-card-company">
              {company}
            </p>

          </div>

        </div>


        <div className="job-card-meta">

          <span>{location}</span>

          <span>•</span>

          <span>{status}</span>

        </div>


        <div className="job-card-salary">
          {salary}
        </div>


        <div className="job-card-tags">

          {tags.map((tag, index) => (
            <span 
              className="job-card-tag" 
              key={index}
            >
              {tag}
            </span>
          ))}

        </div>


      </div>

    </div>
  );
}

export default JobCard;