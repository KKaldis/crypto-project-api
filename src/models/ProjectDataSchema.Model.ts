import mongoose from "mongoose";
import GitHubEntrySchema from "./GitHub.Model";

// Define the ProjectDataSchema for the MongoDB document
const ProjectDataSchema = new mongoose.Schema({
  // Define the field for the GitHub time series data
  github: [GitHubEntrySchema]
});

const MainDataSchema = new mongoose.Schema({
  contractAddress: ProjectDataSchema
});

// Define a model using the MainSchema
const MainDataModel = mongoose.model("MainData", MainDataSchema);

export default MainDataModel;
