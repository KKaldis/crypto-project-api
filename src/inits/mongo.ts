import mongoose from "mongoose";

console.log("Initiializing MongoDB");

(async () => {
  const { MONGO_BASE_URL, MONGO_BASE_NAME } = process.env;
  const baseUrl = `mongodb://${MONGO_BASE_URL}/${MONGO_BASE_NAME}`;
  try {
    await mongoose.connect(baseUrl);
    console.log(`Connected to MongoDB: ${baseUrl}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
