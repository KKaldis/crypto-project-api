import express from "express";
const telegramRoutes = express.Router();
import channelTotalMembersRoute from "./telegram/get-channel-total-members";
//  * Channel Total Members Count

telegramRoutes.use("/get-channel-total-members", channelTotalMembersRoute);

export default telegramRoutes;
