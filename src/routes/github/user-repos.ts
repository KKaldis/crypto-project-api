import axios from "axios";
import { Request, Response } from "express";
import express from "express";
import UserReposRes from "./models/users-repos.model";
const userReposRoute = express.Router();

export const getUserReposUrl = (owner: string): string => {
  const { GITHUB_BASE_URL } = process.env;
  return `${GITHUB_BASE_URL}/users/${owner}/repos`;
};

export const getUserRepos = async (owner: string): Promise<UserReposRes> => {
  const response = await axios.get(getUserReposUrl(owner));
  return response.data;
};

userReposRoute.get("/:owner", async (req: Request, res: Response) => {
  const { owner } = req.params;

  try {
    const commitActivity = await getUserRepos(owner);
    res.json(commitActivity);
  } catch (error: any) {
    console.log(error);
  }
});

export default userReposRoute;
