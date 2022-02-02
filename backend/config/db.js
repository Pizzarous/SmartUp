// Conectar ficheiro ao MongoDB
// const mongoose = require('mongoose')
import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL ?? "mongodb://localhost:27017")
    console.log(`MongoDB Connected: "mongodb://localhost:27017"`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

// module.exports =  { connectDB };
export { connectDB };