import { useAuth } from "../../context/AuthContext";
import Applicant from "./Applicant/Applicant";
import Recruiter from "./Recruiter/Recruiter";

function Dashboard() {

  const { user } = useAuth();

  if (user?.role === "recruiter") {
    return <Recruiter />;
  }

  return <Applicant />;
}

export default Dashboard;