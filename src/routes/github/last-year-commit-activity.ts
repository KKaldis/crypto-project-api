import axios from "axios";
import { Request, Response } from "express";
import express from "express";
const lastYearCommitActivity = express.Router();

export const getLastYearCommitActivityUrl = (
  owner: string,
  repo: string
): string => {
  // https://api.github.com/repos/{owner}/{repo}/stats/commit_activity
  // https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-the-last-year-of-commit-activity

  const { GITHUB_BASE_URL } = process.env;
  return `${GITHUB_BASE_URL}/repos/${owner}/${repo}/stats/commit_activity`;
};

export const getLastYearCommitActivity = async (
  owner: string,
  repo: string
): Promise<any> => {
  const response = await axios.get(getLastYearCommitActivityUrl(owner, repo));
  return response.data;
};

lastYearCommitActivity.get(
  "/:owner/:repo",
  async (req: Request, res: Response) => {
    const { owner, repo } = req.params;

    try {
      const commitActivity = await getLastYearCommitActivity(owner, repo);
      res.json(commitActivity);
    } catch (error: any) {
      console.log(error);
    }
  }
);

export default lastYearCommitActivity;
