import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const UserRoleManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [editUserData, setEditUserData] = useState(null);


  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/roles");
      setRoles(response.data.roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchUsers();
      fetchRoles();
    }
  }, [showTable]);


  const assignRoleToUser = async () => {
    if (!selectedUser || !newRole) return;
    try {
      await axios.put(`http://localhost:5000/users/${selectedUser._id}/role`, {
        role: newRole,
      });
      setSelectedUser(null);
      setNewRole("");
      fetchUsers();
    } catch (error) {
      console.error("Error assigning role to user:", error);
    }
  };


  const editUser = async () => {
    if (!editUserData) return;
    try {
      await axios.put(`http://localhost:5000/contacts/${editUserData._id}`, editUserData);
      setEditUserData(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User, Role, and Permission Management
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
        <>
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Typography variant="h5" sx={{ padding: 2 }}>
              User Management
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Job Title</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phoneNumber}</TableCell>
                    <TableCell align="center">{user.company}</TableCell>
                    <TableCell align="center">{user.jobTitle}</TableCell>
                    <TableCell align="center">
                      {user.role?.name || "No Role"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setSelectedUser(user)}
                        sx={{ marginRight: 1 }}
                      >
                        Assign Role
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditUserData(user)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          {selectedUser && (
            <Dialog
              open={Boolean(selectedUser)}
              onClose={() => setSelectedUser(null)}
            >
              <DialogTitle>Assign Role to {selectedUser.firstName}</DialogTitle>
              <DialogContent>
                <Select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  fullWidth
                >
                  <MenuItem value="">Select Role</MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedUser(null)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={assignRoleToUser}>
                  Assign Role
                </Button>
              </DialogActions>
            </Dialog>
          )}


          {editUserData && (
            <Dialog
              open={Boolean(editUserData)}
              onClose={() => setEditUserData(null)}
            >
              <DialogTitle>Edit User</DialogTitle>
              <DialogContent>
                <TextField
                  label="First Name"
                  value={editUserData.firstName}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, firstName: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Last Name"
                  value={editUserData.lastName}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, lastName: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={editUserData.email}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, email: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone"
                  value={editUserData.phoneNumber}
                  onChange={(e) =>
                    setEditUserData({
                      ...editUserData,
                      phoneNumber: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Company"
                  value={editUserData.company}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, company: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Job Title"
                  value={editUserData.jobTitle}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, jobTitle: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditUserData(null)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={editUser}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </Paper>
  );
};

export default UserRoleManagement;
