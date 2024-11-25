const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data'); 
const Customer = require('./models/customer_schema');
const Role = require('./models/role_schema');

dotenv.config();

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); 
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const SaveData = async () => {
  try {
    console.log("Saving data...");

    const roles = ['Admin', 'Manager', 'Editor', 'Viewer'];


    const roleDocs = [];
    for (const roleName of roles) {
      let role = await Role.findOne({ name: roleName });
      if (!role) {
        role = await Role.create({ name: roleName });
        console.log(`Inserted role: ${roleName}`);
      } else {
        console.log(`Role already exists: ${roleName}`);
      }
      roleDocs.push(role);
    }

    const usersWithRoles = data.map((customer) => {
      const role = roleDocs.find((roleDoc) => roleDoc.name === customer.role);
      return {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        company: customer.company,
        jobTitle: customer.jobTitle,
        role: role ? role._id : null, 
        status: customer.status,
        password: customer.password,
      };
    });


    await Customer.insertMany(usersWithRoles);
    console.log("Users saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

ConnectDb()
  .then(() => SaveData())
  .catch((error) => console.error('Error:', error));
