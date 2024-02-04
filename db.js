// const mongoose = require("mongoose");

// //Define the mongoDB connection URL
// const mongoURL = "mongodb://localhost:27017/hotels";

// //Set up MongoDB connection
// mongoose.connect(mongoURL, {
//   userNewUrlParser: true,
//   //   useUnifiedTopology: true,
// });

// //Get the default connection
// //Mongoose maintains a default connection object representing the MongoDB connection.

// const db = mongoose.connection;

const mongoose = require("mongoose");
require("dotenv").config();
//const MONGO_URI = "mongodb://localhost:27017/hotels";

const MONGO_URL = process.env.MONGO_URI;
const db = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

db();

module.exports = db;
// // Define event listeners for the database connection
// db.on("connected", () => {
//   console.log("Connected to MongoDB server");
// });

// db.on("error", () => {
//   console.log("Error in connecting to MongoDB server");
// });

// db.on("disconnected", () => {
//   console.log("MongoDB server disconnected");
// });

// //Export the database connection
// module.exports = db;
