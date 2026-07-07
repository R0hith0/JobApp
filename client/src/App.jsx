import { useEffect, useState } from "react";
import axios from "axios";
import InternshipCard from "./components/InternshipCard";
import "./App.css";

function App() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/internships")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data;

        setInternships(data || []);
        setLoading(false);
      })
      .catch(() => {
        setInternships([]);
        setLoading(false);
      });
  }, []);

  
  const filteredInternships = internships.filter((item) => {
    const matchesSearch =
      item.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      item.role?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      item.workMode?.toUpperCase() === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">

      
      <header className="topbar">

        <div className="logo">
          Internship Tracker
        </div>

        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="topbar-search"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="topbar-select"
        >
          <option value="ALL">All</option>
          <option value="REMOTE">Remote</option>
          <option value="ONSITE">Onsite</option>
          <option value="HYBRID">Hybrid</option>
        </select>

      </header>

     
      <main className="container">

        {loading ? (
          <p>Loading...</p>
        ) : filteredInternships.length === 0 ? (
          <p>No internships found</p>
        ) : (
          <div className="grid">
            {filteredInternships.map((item, index) => (
              <InternshipCard
                key={index}
                companyName={item.companyName}
                role={item.role}
                workMode={item.workMode}
                stipend={item.stipend}
              />
            ))}
          </div>
        )}

      </main>

    </div>
  );
}

export default App;