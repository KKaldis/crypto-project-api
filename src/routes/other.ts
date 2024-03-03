import express from "express";
import fearGreed from "./other/fear-greed";
import websiteTech from "./other/website-tech";
import websiteWhois from "./other/website-whois";
const otherRoutes = express.Router();

//  * Fear Greed Index
otherRoutes.use("/fear-greed", fearGreed);

//  * Website Technologys
otherRoutes.use("/website-tech", websiteTech);

//  * Website Whois info
otherRoutes.use("/website-whois", websiteWhois);

export default otherRoutes;
