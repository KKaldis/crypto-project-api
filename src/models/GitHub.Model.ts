import mongoose from "mongoose";

// Define the GitHubEntrySchema to represent each timestamp entry
const GitHubEntrySchema = new mongoose.Schema({
  // Define the properties of each GitHub entry
  timestamp: { type: Date, default: Date.now }, // Date and time of the GitHub entry
  data: { type: { commits: Number } } // Additional data related to the entry (e.g., GitHub event)
});

export default GitHubEntrySchema;
