import { useState } from "react";
import axios from "axios";
import "./CreateJob.css";


function CreateJob() {

  const [formData, setFormData] = useState({

    companyName: "",
    role: "",
    qualification: "",
    experienceRequired: "",
    description: "",
    stipend: "",
    workMode: "",
    duration: "",
    workingHours: ""

  });


  const [message, setMessage] = useState("");



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      await axios.post(
        "http://localhost:3000/api/jobs",
        formData
      );


      setMessage("Job created successfully");


      setFormData({

        companyName: "",
        role: "",
        qualification: "",
        experienceRequired: "",
        description: "",
        stipend: "",
        workMode: "",
        duration: "",
        workingHours: ""

      });


    } catch (error) {

      setMessage(
        "Failed to create job"
      );

    }

  };



  return (

    <div className="create-job-page">


      <h1>
        Create Job Posting
      </h1>


      <form
        className="job-form"
        onSubmit={handleSubmit}
      >


        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />


        <input
          name="role"
          placeholder="Job Role"
          value={formData.role}
          onChange={handleChange}
        />


        <input
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
        />


        <input
          name="experienceRequired"
          placeholder="Experience Required"
          value={formData.experienceRequired}
          onChange={handleChange}
        />


        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
        />


        <input
          name="stipend"
          placeholder="Salary / Stipend"
          value={formData.stipend}
          onChange={handleChange}
        />


        <select
          name="workMode"
          value={formData.workMode}
          onChange={handleChange}
        >

          <option value="">
            Work Mode
          </option>

          <option value="remote">
            Remote
          </option>

          <option value="hybrid">
            Hybrid
          </option>

          <option value="onsite">
            On-site
          </option>

        </select>


        <input
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
        />


        <input
          name="workingHours"
          placeholder="Working Hours"
          value={formData.workingHours}
          onChange={handleChange}
        />


        <button type="submit">
          Post Job
        </button>


      </form>


      <p>
        {message}
      </p>


    </div>

  );

}


export default CreateJob;