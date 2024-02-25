import axios from "axios";
import { Request, Response } from "express";
import express from "express";
import OrgReposRes from "./models/org-repos.model";
const orgRepos = express.Router();

export const getOrgReposUrl = (owner: string): string => {
  const { GITHUB_BASE_URL } = process.env;
  return `${GITHUB_BASE_URL}/orgs/${owner}/repos`;
};

export const getOrgRepos = async (owner: string): Promise<OrgReposRes> => {
  const response = await axios.get(getOrgReposUrl(owner));
  return response.data;
};

orgRepos.get("/:owner", async (req: Request, res: Response) => {
  const { owner } = req.params;

  try {
    const commitActivity = await getOrgRepos(owner);
    res.json(commitActivity);
  } catch (error: any) {
    console.log(error);
  }
});

export default orgRepos;
