const mongoose=require('mongoose');
const data=require('./data');
const dotenv=require('dotenv');
const Customer=require('./models/customer_schema')
dotenv.config();
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
};
const SaveData=async ()=>{
    try{
        console.log("i am in try");
        console.log(Array.isArray(data));
        //if(Array.isArray(data))
        //{
            console.log("saving....");
            await Customer.insertMany(data);
            console.log("Data saved successfully");
        //}
    }
    catch(error)
    {
        console.error("error saving data:",error);
    }


}
ConnectDb().then(()=>SaveData()).catch((error)=>console.error('Error',error));


