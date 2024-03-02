import axios from "axios";
import { Request, Response } from "express";
import express from "express";
const channelTotalMembersRoute = express.Router();

export const getChannelTotalMembersUrl = (channel: string): string => {
  const { TELEGRAM_BASE_URL, TELEGRAM_TOKEN } = process.env;

  // https://api.telegram.org/bot<token-here>/getChatMembersCount?chat_id=<channel-name>

  return `${TELEGRAM_BASE_URL}/bot${TELEGRAM_TOKEN}/getChannels?chat_id=${channel}`;
};

export const getChannelTotalMembers = async (channel: string): Promise<any> => {
  const response = await axios.get(getChannelTotalMembersUrl(channel));
  console.log(response.data);

  return response.data;
};

channelTotalMembersRoute.get(
  "/:channel",
  async (req: Request, res: Response) => {
    const { channel } = req.params;

    function parseString(inputString: string) {
      try {
        const { pathname } = new URL(inputString);
        return "@" + pathname.substring(1);
      } catch (error) {
        if (inputString.startsWith("-")) {
          return inputString;
        } else if (/^[a-zA-Z]+$/.test(inputString)) {
          return "@" + inputString;
        } else {
          console.log("String does not match any condition");
          throw error;
        }
      }
    }

    try {
      const commitActivity = await getChannelTotalMembers(parseString(channel));
      res.json(commitActivity);
    } catch (error: any) {
      // console.log(error);
      res.status(400);
    }
  }
);

export default channelTotalMembersRoute;
