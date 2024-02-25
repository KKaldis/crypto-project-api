import axios from "axios";
import { Request, Response } from "express";
import express from "express";
const channelTotalMembersRoute = express.Router();

export const getChannelTotalMembersUrl = (channel: string): string => {
  const { TELEGRAM_BASE_URL, TELEGRAM_TOKEN } = process.env;

  // https://api.telegram.org/bot<token-here>/getChatMembersCount?chat_id=<channel-name>

  return `${TELEGRAM_BASE_URL}/bot${TELEGRAM_TOKEN}/getChatMembersCount?chat_id=@${channel}`;
};

export const getChannelTotalMembers = async (channel: string): Promise<any> => {
  const response = await axios.get(getChannelTotalMembersUrl(channel));
  return response.data.result;
};

channelTotalMembersRoute.get(
  "/:channel",
  async (req: Request, res: Response) => {
    const { channel } = req.params;

    try {
      const commitActivity = await getChannelTotalMembers(channel);
      res.json(commitActivity);
    } catch (error: any) {
      console.log(error);
      res.status(400);
    }
  }
);

export default channelTotalMembersRoute;
