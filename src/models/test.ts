// models/Iplut.js
import mongoose from "mongoose";

const iplutSchema = new mongoose.Schema({
  // Define your schema here
  name: String,
  score: Number
  // Other fields...
});

export default mongoose.model("Iplut", iplutSchema);
