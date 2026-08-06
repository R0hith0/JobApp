import "./TopBar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function TopBar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="topbar">

      <div className="brand">
        Project
      </div>


      <div className="topbar-actions">

        <button className="profile-btn">
          👤 Profile
        </button>


        <button className="settings-btn">
          ⚙
        </button>


        <button 
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default TopBar;