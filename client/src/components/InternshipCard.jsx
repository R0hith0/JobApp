function InternshipCard({ companyName, role, workMode, stipend }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{companyName}</h2>
      </div>

      <div className="card-body">
        <p><span>Role:</span> {role}</p>
        <p><span>Mode:</span> {workMode}</p>
        <p><span>Stipend:</span> {stipend}</p>
      </div>
    </div>
  );
}

export default InternshipCard;