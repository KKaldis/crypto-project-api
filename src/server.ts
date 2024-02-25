import dotenv from "dotenv";
import { Request, Response } from "express";
import express from "express";
import githubRoutes from "@routes/github";
import telegramRoutes from "@routes/telegram";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@inits/swagger";

// const cors = require('cors')
dotenv.config();
const { VERSION, PORT, NODE_ENV } = process.env;

//  ? Connect MongoDB
import "./inits/mongo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  ? Cors Configuration
// app.use(
//   cors({
//     origin: process.env.NODE_ENV === "DEVELOPMENT" ? "*" : /domain\.gr$/,
//     methods: ["POST", "GET"],
//     // credentials: true,
//   })
// );

//  * Github endpoints
app.use("/github", githubRoutes);

//  * Telegram endpoints
app.use("/telegram", telegramRoutes);

//  * API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//  * Service Status
app.get("/status", (req: Request, res: Response) => {
  res.status(200).send(`Mode: ${NODE_ENV} - Version: ${VERSION}
  `);
});

//  * 404
app.get("*", function (req: Request, res: Response) {
  res.status(404).send("404 Nothing Here");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API version: ${VERSION}`);
  console.log(`Mode: ${NODE_ENV}`);
});
