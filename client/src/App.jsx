import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/internships");

      console.log("FULL RESPONSE:", res);
      console.log("DATA ONLY:", res.data);

      setInternships(res.data.data);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Internship Tracker 🚀</h1>

      <h3>Debug count: {internships.length}</h3>

      {internships.length === 0 ? (
        <p>No internships found</p>
      ) : (
        internships.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px"
            }}
          >
            <h2>{item.companyName}</h2>
            <p>{item.role}</p>
            <p>{item.workMode}</p>
            <p>{item.stipend}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;