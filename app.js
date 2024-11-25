const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const Role = require("./models/role_schema");
const User = require("./models/customer_schema");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};


app.get("/contacts", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  try {
    const customers = await User.find().skip(skip).limit(pageSize);
    const totalCustomers = await User.countDocuments();
    const totalPages = Math.ceil(totalCustomers / pageSize);

    res.json({ customers, page, pageSize, totalPages, totalCustomers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
});

app.post("/contacts", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  

  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newCustomer = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    company,
    jobTitle,
  });

  try {
    await newCustomer.save();
    res.status(201).json({ message: "Customer saved successfully", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error saving customer", error: error.message });
  }
});

app.put("/contacts/:id", async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const updated = await User.findByIdAndUpdate(id, updates, { new: true });
//     if (!updated) return res.status(404).json({ message: "Customer not found" });

//     res.status(200).json({ message: "Customer updated successfully", customer: updated });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating customer", error: error.message });
//   }
const { id } = req.params; 
  const updates = req.body;  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {

    console.log("Update request for ID:", id);
    console.log("Updates received:", updates);


    const updatedCustomer = await User.findByIdAndUpdate(id, updates, { new: true });


    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (error) {

    console.error("Error updating customer:", error.message);


    res.status(500).json({ message: "Error updating customer", error: error.message });
  }
});


app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error: error.message });
  }
});


app.get("/roles", async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles", error: error.message });
  }
});


app.post("/roles", async (req, res) => {
  const { name, permissions } = req.body;
  

  if (!name || !Array.isArray(permissions)) {
    return res.status(400).json({ message: "Invalid role data" });
  }

  const newRole = new Role({ name, permissions });

  try {
    await newRole.save();
    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error: error.message });
  }
});


app.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("role");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});


app.put("/users/:userId/role", async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const foundRole = await Role.findOne({ name: role });
    if (!foundRole) return res.status(404).json({ message: "Role not found" });

    user.role = foundRole._id;
    await user.save();
    res.status(200).json({ message: "Role assigned successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error assigning role to user", error: error.message });
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  ConnectDb();
  console.log(`Server is running on http://localhost:${port}`);
});
