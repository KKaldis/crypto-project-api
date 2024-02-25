import axios from "axios";
import { Request, Response } from "express";
import express from "express";
const weeklyCommitCountRoute = express.Router();

export const getWeeklyCommitCountUrl = (
  owner: string,
  repo: string
): string => {
  // https://api.github.com/repos/{owner}/{repo}/stats/participation
  // https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-the-weekly-commit-count

  const { GITHUB_BASE_URL } = process.env;
  return `${GITHUB_BASE_URL}/repos/${owner}/${repo}/community/profile`;
};

export const getWeeklyCommitCount = async (
  owner: string,
  repo: string
): Promise<any> => {
  const response = await axios.get(getWeeklyCommitCountUrl(owner, repo));
  return response.data;
};

weeklyCommitCountRoute.get(
  "/:owner/:repo",
  async (req: Request, res: Response) => {
    const { owner, repo } = req.params;

    try {
      const commitActivity = await getWeeklyCommitCount(owner, repo);
      res.json(commitActivity);
    } catch (error: any) {
      console.log(error);
    }
  }
);

export default weeklyCommitCountRoute;
