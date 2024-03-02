import express from "express";
import serverTotalMembersRoute from "./discord/get-server-total-members";
const discordRoutes = express.Router();
//  * Channel Total Members Count

discordRoutes.use("/get-server-total-members", serverTotalMembersRoute);

export default discordRoutes;
