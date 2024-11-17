const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const  Customer=require('./models/customer_schema');
const cors =require('cors');
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const ConnectDb=async()=>{
    try
    {
        await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb atlas");
    }
    catch(error)
    {
        console.error("Mongodb connection error");
        process.exit(1);

    }
}
app.get('/contacts', async (req, res) => {
    console.log("entered get");
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 10; 
    const skip = (page - 1) * pageSize;

    try {
        const customers = await Customer.find().skip(skip).limit(pageSize);
        const totalCustomers = await Customer.countDocuments();
        const totalPages = Math.ceil(totalCustomers / pageSize);
        console.log({
            customers,
            page,
            pageSize,
            totalPages,
            totalCustomers
        });
        
        res.json({
            customers,
            page,
            pageSize,
            totalPages,
            totalCustomers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers' });
    }
});
app.post('/contacts',async(req,res)=>
{
    const{firstName,lastName,email,phoneNumber,company,jobTitle}=req.body;
    const newCustomer= new Customer({
        firstName,
        lastName,
        email,
        phoneNumber,
        company,
        jobTitle,


    });
    await newCustomer.save();
    res.status(201).json({message:'customer saved succesfully'});

});
app.put('/contacts/:id',async(req,res)=>{
const {id}=req.params;
const updates=req.body;
try
{
    const updated=await Customer.findByIdAndUpdate(id,updates,{new:true});
    res.status(200).json(updated);
}
catch(error)
{
    res.status(500).json({message:'error updating customer'});
}
});
app.delete('/contacts/:id',async(req,res)=>
{
    console.log('Entered delete');
    const {id}=req.params;
    try
    {
        await Customer.findByIdAndDelete(id);
        res.status(200).json({message:'customer updated successfully'});

    }
    catch(error)
    {
        res.status(500).json({message:'error deleting customer'});
    }

});
const port=5000;
app.listen(port,()=>{
    ConnectDb();
    console.log(`Server is running on http://localhost:${port}`);
});

