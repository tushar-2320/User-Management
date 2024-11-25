import { useState } from "react";
import { TextField, Box, Typography, Button } from "@mui/material";
import axios from "axios";

function FormComponent() {
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/contacts", formdata);
      console.log("Data submitted successfully", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: "",
        jobTitle: "",
      });
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        User  Management
      </Typography>
      <Box sx={{ display: "flex", gap: 5, alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              type="text"
              required
              label="First Name"
              name="firstName"
              value={formdata.firstName}
              onChange={handleChange}
            />
            <TextField
              type="text"
              required
              label="Last Name"
              name="lastName"
              value={formdata.lastName}
              onChange={handleChange}
            />
            <TextField
              type="email"
              required
              label="Email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
            />
            <TextField
              type="tel"
              required
              label="Phone Number"
              name="phoneNumber"
              value={formdata.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              type="text"
              required
              label="Company"
              name="company"
              value={formdata.company}
              onChange={handleChange}
            />
            <TextField
              type="text"
              required
              label="Job Title"
              name="jobTitle"
              value={formdata.jobTitle}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" sx={{ alignSelf: "center" }}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default FormComponent;
