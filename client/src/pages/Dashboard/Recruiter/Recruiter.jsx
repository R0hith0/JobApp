import { useAuth } from "../../../context/AuthContext";

function Recruiter() {

  const { user } = useAuth();

  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <p>Welcome, {user?.name}</p>
    </div>
  );
}

export default Recruiter;