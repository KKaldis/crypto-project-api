import axios from "axios";
import express from "express";
import { Request, Response } from "express";
const allContributorCommitActivity = express.Router();

export const getAllContributorCommitActivityUrl = (
  owner: string,
  repo: string
): string => {
  // https://api.github.com/repos/{owner}/{repo}/stats/contributors
  // https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#get-all-contributor-commit-activity

  const { GITHUB_BASE_URL } = process.env;
  return `${GITHUB_BASE_URL}/repos/${owner}/${repo}/stats/contributors`;
};

export const getAllContributorCommitActivity = async (
  owner: string,
  repo: string
): Promise<any> => {
  const response = await axios.get(
    getAllContributorCommitActivityUrl(owner, repo)
  );
  return response.data;
};

allContributorCommitActivity.get(
  "/:owner/:repo",
  async (req: Request, res: Response) => {
    const { owner, repo } = req.params;

    try {
      const commitActivity = await getAllContributorCommitActivity(owner, repo);
      res.json(commitActivity);
    } catch (error: any) {
      console.log(error);
    }
  }
);

export default allContributorCommitActivity;
