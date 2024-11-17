import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  Button,
  TextField,
} from "@mui/material";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [showTable, setShowTable] = useState(false); // State to toggle table visibility

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/contacts", {
        params: { page, pageSize },
      });
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchCustomers();
    }
  }, [showTable]); // Fetch data only when the table is shown

  const startEditing = (customer) => {
    setEditingCustomer(customer._id);
    setUpdatedDetails({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      company: customer.company,
      jobTitle: customer.jobTitle,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const EditCustomer = async (event, CustomerId) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/contacts/${CustomerId}`,
        updatedDetails
      );
      console.log("Customer Updated:", response.data);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (error) {
      console.error("Error Updating Customer:", error);
    }
  };

  const DeleteCustomer = async (event, CustomerId) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/contacts/${CustomerId}`
      );
      console.log("Customer Deleted:", response.data);
      fetchCustomers();
    } catch (error) {
      console.error("Error Deleting Customer:", error);
    }
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Customer Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowTable(true)}
        sx={{ marginBottom: 2 }}
      >
        Show Table
      </Button>
      {showTable && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={customer._id}>
                  <TableCell align="center">
                    {(page - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell align="center">
                    {editingCustomer === customer._id ? (
                      <TextField
                        name="firstName"
                        value={updatedDetails.firstName}
                        onChange={handleUpdateChange}
                        size="small"
                      />
                    ) : (
                      customer.firstName
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingCustomer === customer._id ? (
                      <TextField
                        name="lastName"
                        value={updatedDetails.lastName}
                        onChange={handleUpdateChange}
                        size="small"
                      />
                    ) : (
                      customer.lastName
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingCustomer === customer._id ? (
                      <TextField
                        name="email"
                        value={updatedDetails.email}
                        onChange={handleUpdateChange}
                        size="small"
                      />
                    ) : (
                      customer.email
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingCustomer === customer._id ? (
                      <TextField
                        name="phoneNumber"
                        value={updatedDetails.phoneNumber}
                        onChange={handleUpdateChange}
                        size="small"
                      />
                    ) : (
                      customer.phoneNumber
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingCustomer === customer._id ? (
                      <TextField
                        name="company"
                        value={updatedDetails.company}
                        onChange={handleUpdateChange}
                        size="small"
                      />
                    ) : (
                      customer.company
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingCustomer === customer._id ? (
                      <TextField
                        name="jobTitle"
                        value={updatedDetails.jobTitle}
                        onChange={handleUpdateChange}
                        size="small"
                      />
                    ) : (
                      customer.jobTitle
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingCustomer === customer._id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => EditCustomer(e, customer._id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => startEditing(customer)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={(e) => DeleteCustomer(e, customer._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {showTable && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        />
      )}
    </Paper>
  );
};

export default CustomersList;
