import express from "express";
import fearGreed from "./other/fear-greed";
import websiteTech from "./other/website-tech";
const otherRoutes = express.Router();

//  * Fear Greed Index
otherRoutes.use("/fear-greed", fearGreed);

//  * Website Technologys
otherRoutes.use("/website-tech", websiteTech);

export default otherRoutes;
