import mongoose from "mongoose";

(async () => {
  const { MONGO_BASE_URL, MONGO_BASE_NAME } = process.env;
  const baseUrl = `${MONGO_BASE_URL}/${MONGO_BASE_NAME}`;
  try {
    console.log("Initializing MongoDB on:", baseUrl);
    await mongoose.connect(baseUrl, {
      family: 4 // Force the connection to use IPv4 otherwise mongo localhost:/port wont work
    });

    console.log(`Connected to MongoDB: ${baseUrl}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
})();
