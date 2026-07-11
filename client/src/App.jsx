import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/header/header";
import JobGrid from "./components/JobGrid/JobGrid";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";

import "./App.css";


function App() {

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Latest");


  const [filters, setFilters] = useState({

    schedule: [],

    workMode: [],

    employmentType: []

  });



  useEffect(() => {

    axios
      .get("http://localhost:3000/api/jobs")

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

      item.companyName
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      item.role
        ?.toLowerCase()
        .includes(search.toLowerCase());





    const matchesSchedule =
  filters.schedule.length === 0 ||
  filters.schedule.includes(item.workingHours);



    const matchesWorkMode =

      filters.workMode.length === 0 ||

      filters.workMode.includes(item.workMode?.toUpperCase());





    const matchesEmployment =
  filters.employmentType.length === 0 ||
  filters.employmentType.includes(item.experienceRequired);




    return (

      matchesSearch &&

      matchesSchedule &&

      matchesWorkMode &&

      matchesEmployment

    );


  });






  const sortedInternships = [...filteredInternships].sort((a, b) => {


    const dateA = new Date(a.createdAt);

    const dateB = new Date(b.createdAt);



    if (sort === "Latest") {

      return dateB - dateA;

    }



    return dateA - dateB;


  });






  return (

    <div className="app">


      <Header

        search={search}

        setSearch={setSearch}

        sort={sort}

        setSort={setSort}

      />





      <main className="container">


        <DashboardLayout>



          <FilterSidebar

            filters={filters}

            setFilters={setFilters}

          />





          {

            loading ? (

              <p>Loading...</p>


            ) : sortedInternships.length === 0 ? (

              <p>No jobs found</p>


            ) : (

              <JobGrid

                jobs={sortedInternships}

              />

            )

          }



        </DashboardLayout>


      </main>


    </div>

  );


}


export default App;