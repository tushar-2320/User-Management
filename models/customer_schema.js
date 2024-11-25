
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true }, 
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    status: { type: String, required: true, enum: ['Active', 'Inactive'] },
    password: { type: String, required: true }
  });
  

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
