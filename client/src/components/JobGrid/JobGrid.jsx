import JobCard from "../JobCard/JobCard";
import "./JobGrid.css";

function JobGrid({ jobs = [] }) {

  return (
    <div className="job-grid">

      {jobs.map((item, index) => (

        <JobCard
          key={index}
          job={item}
          company={item.companyName}
          title={item.role}
          salary={item.stipend}
          location={item.location}
          tags={[item.workMode]}
        />

      ))}

    </div>
  );
}

export default JobGrid;