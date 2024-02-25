import axios from "axios";
import { Request, Response } from "express";
import express from "express";
const weeklyCommitActivityRoute = express.Router();

export const getWeeklyCommitActivityUrl = (
  owner: string,
  repo: string
): string => {
  // https://api.github.com/repos/{owner}/{repo}/stats/code_frequency
  // https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-the-weekly-commit-activity

  const { GITHUB_BASE_URL } = process.env;
  return `${GITHUB_BASE_URL}/repos/${owner}/${repo}/community/profile`;
};

export const getWeeklyCommitActivity = async (
  owner: string,
  repo: string
): Promise<any> => {
  const response = await axios.get(getWeeklyCommitActivityUrl(owner, repo));
  return response.data;
};

weeklyCommitActivityRoute.get(
  "/:owner/:repo",
  async (req: Request, res: Response) => {
    const { owner, repo } = req.params;

    try {
      const commitActivity = await getWeeklyCommitActivity(owner, repo);
      res.json(commitActivity);
    } catch (error: any) {
      console.log(error);
    }
  }
);

export default weeklyCommitActivityRoute;
