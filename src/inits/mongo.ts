import mongoose from "mongoose";

console.log("Initiializing MongoDB");

(async () => {
  const { MONGO_BASE_URL, MONGO_BASE_NAME } = process.env;
  try {
    await mongoose.connect(`mongodb://${MONGO_BASE_URL}/${MONGO_BASE_NAME}`);
    console.log(
      `Connected to MongoDB: mongodb://${MONGO_BASE_URL}/${MONGO_BASE_NAME}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
