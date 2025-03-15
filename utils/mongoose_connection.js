const mongoose = require('mongoose')
// const MongoClient = require('mongodb').MongoClient;
// const Mongo = new MongoClient(process.env.MONGO_URL);
// db = Mongo.connect().then(()=>console.log("Connected to Mongo Database")).catch(function(error){
//     console.log(error)
//     console.log("Failed to connect to MongoDB server")
// });

// Mongo Database Connection by using mongoose
mongoose.connect(process.env.MONGO_URL+"/"+process.env.DATABASE).then(async(connection) => {
    console.log('MongoDB connected successfully!')
    // Defining the schema for insured Policies
    DB = connection;
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
