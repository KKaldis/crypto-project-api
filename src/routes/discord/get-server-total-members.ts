import axios from "axios";
import express, { Request, Response } from "express";
const serverTotalMembersRoute = express.Router();
const { DISCORD_API_BASE_URL, DISCORD_TOKEN } = process.env;

export const getServerTotalMembersUrl = (server: string): string => {
  return `${DISCORD_API_BASE_URL}/invites/${server}?with_counts=true&with_expiration=true`;
};

export const getServerTotalMembers = async (server: string): Promise<any> => {
  const response = await axios.get(getServerTotalMembersUrl(server), {
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`
    }
  });
  return response.data.result;
};

//! WIP
serverTotalMembersRoute.get("/:server", async (req: Request, res: Response) => {
  const { server } = req.params;

  try {
    const commitActivity = await getServerTotalMembers(server);
    console.log(commitActivity);

    res.json(commitActivity);
  } catch (error: any) {
    // console.log(error);
    res.status(400);
  }
});

export default serverTotalMembersRoute;
