import "./FilterSidebar.css";


function FilterSidebar({ filters, setFilters }) {
  const toggleFilter = (category, value) => {

    setFilters((prev) => {


      const exists = prev[category].includes(value);
      return {
        ...prev,
        [category]: exists

          ? prev[category].filter((item) => item !== value)

          : [...prev[category], value]
      };
    });
  };

  const FilterOption = ({ category, value, label }) => (

  <label className="filter-option">

    <input
      type="checkbox"
      checked={filters[category].includes(value)}
      onChange={() => toggleFilter(category, value)}
    />

    <span className="custom-checkbox">
      {filters[category].includes(value) && "✓"}
    </span>

    <span>
      {label}
    </span>

  </label>
);

  return (


    <aside className="filter-sidebar">

      <div className="filter-header">

  <h3>
    Filters
  </h3>

  <button
    className="clear-filter"
    onClick={() =>
      setFilters({
        schedule: [],
        workMode: [],
        employmentType: []
      })
    }
  >
    Clear
  </button>

</div>
      <div className="filter-section">
        <p>

          Working Schedule

        </p>
        <FilterOption

          category="schedule"

          value="9-5"
         label="9-5"

        />



        <FilterOption

          category="schedule"

          value="Flexible"
label="Flexible"

        />



        <FilterOption

          category="schedule"

          value="PART_TIME"

          label="Part Time"

        />


      </div>






      <div className="filter-section">


        <p>

          Work Mode

        </p>



        <FilterOption

          category="workMode"

          value="REMOTE"

          label="Remote"

        />



        <FilterOption

          category="workMode"

          value="HYBRID"

          label="Hybrid"

        />



        <FilterOption

          category="workMode"

          value="ONSITE"

          label="On-site"

        />


      </div>






      <div className="filter-section">


        <p>

          Employment Type

        </p>



        <FilterOption

          category="employmentType"

          value="Fresher"
label="Fresher"

        />



        <FilterOption

          category="employmentType"

          value="FULL_TIME"

          label="Full-time"

        />



        <FilterOption

          category="employmentType"

          value="CONTRACT"

          label="Contract"

        />


      </div>



    </aside>


  );


}


export default FilterSidebar;