import express from "express";
import fearGreed from "./other/fear-greed";
const otherRoutes = express.Router();

//  * Fear Greed Index
otherRoutes.use("/fear-greed", fearGreed);

export default otherRoutes;
